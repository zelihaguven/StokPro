import { useState, useCallback } from 'react';
import { validateEmail, suggestEmailCorrection, EmailValidationResult } from '@/services/emailValidationService';
import { useToast } from '@/hooks/use-toast';

interface UseEmailValidationReturn {
  isValidating: boolean;
  validationResult: EmailValidationResult | null;
  validateEmailAddress: (email: string) => Promise<EmailValidationResult>;
  clearValidation: () => void;
  showValidationMessage: (result: EmailValidationResult) => void;
}

export const useEmailValidation = (): UseEmailValidationReturn => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<EmailValidationResult | null>(null);
  const { toast } = useToast();

  const validateEmailAddress = useCallback(async (email: string): Promise<EmailValidationResult> => {
    setIsValidating(true);
    
    try {
      const result = await validateEmail(email);
      setValidationResult(result);
      return result;
    } catch (error) {
      console.error('E-posta doğrulama hatası:', error);
      const errorResult: EmailValidationResult = {
        isValid: false,
        status: 'unknown',
        error: 'E-posta doğrulama sırasında bir hata oluştu'
      };
      setValidationResult(errorResult);
      return errorResult;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const clearValidation = useCallback(() => {
    setValidationResult(null);
  }, []);

  const showValidationMessage = useCallback((result: EmailValidationResult) => {
    if (result.isValid) {
      toast({
        title: "✅ Geçerli E-posta",
        description: "E-posta adresi doğrulandı ve geçerli.",
        variant: "default",
      });
    } else {
      let description = result.error || "E-posta adresi geçersiz.";
      
      // Özel durumlar için mesajları özelleştir
      switch (result.status) {
        case 'invalid':
          description = "E-posta adresi formatı geçersiz.";
          break;
        case 'do_not_mail':
          if (result.disposable) {
            description = "Geçici e-posta adresleri kabul edilmez. Lütfen kalıcı bir e-posta adresi kullanın.";
          } else {
            description = "Bu e-posta adresine mail gönderilemez.";
          }
          break;
        case 'spamtrap':
          description = "Bu e-posta adresi spam tuzağı olarak tespit edildi.";
          break;
        case 'abuse':
          description = "Bu e-posta adresi kötüye kullanım bildirimleri için kullanılıyor.";
          break;
        case 'catch-all':
          description = "Bu domain tüm e-postaları kabul ediyor, doğrulama belirsiz.";
          break;
        case 'unknown':
          description = "E-posta adresinin geçerliliği belirlenemedi.";
          break;
      }

      // E-posta önerisi varsa ekle
      if (result.didYouMean) {
        description += ` Şunu mu demek istediniz: ${result.didYouMean}?`;
      } else {
        // Basit önerileri kontrol et
        const suggestion = suggestEmailCorrection(result.account && result.domain ? `${result.account}@${result.domain}` : '');
        if (suggestion) {
          description += ` Şunu mu demek istediniz: ${suggestion}?`;
        }
      }

      toast({
        title: "❌ Geçersiz E-posta",
        description,
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
    isValidating,
    validationResult,
    validateEmailAddress,
    clearValidation,
    showValidationMessage
  };
};

