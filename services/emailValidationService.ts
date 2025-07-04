// E-posta doğrulama servisi
// Bu servis, e-posta adreslerinin gerçek olup olmadığını kontrol eder

interface EmailValidationResult {
  isValid: boolean;
  status: 'valid' | 'invalid' | 'catch-all' | 'unknown' | 'spamtrap' | 'abuse' | 'do_not_mail';
  subStatus?: string;
  account?: string;
  domain?: string;
  didYouMean?: string;
  disposable?: boolean;
  toxic?: boolean;
  firstName?: string;
  lastName?: string;
  gender?: string;
  location?: string;
  credits?: number;
  error?: string;
}

// Basit e-posta formatı kontrolü
export const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Geçici e-posta sağlayıcılarının listesi
const disposableEmailDomains = [
  '10minutemail.com',
  'guerrillamail.com',
  'tempmail.org',
  'mailinator.com',
  'yopmail.com',
  'temp-mail.org',
  'throwaway.email',
  'getnada.com',
  'maildrop.cc',
  'sharklasers.com',
  'trashmail.com',
  'dispostable.com',
  'tempinbox.com',
  'mailcatch.com',
  'emailondeck.com'
];

// Geçici e-posta kontrolü
export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableEmailDomains.includes(domain);
};

// Basit e-posta doğrulama (gerçek API olmadan)
export const validateEmailBasic = async (email: string): Promise<EmailValidationResult> => {
  // Format kontrolü
  if (!validateEmailFormat(email)) {
    return {
      isValid: false,
      status: 'invalid',
      error: 'Geçersiz e-posta formatı'
    };
  }

  // Geçici e-posta kontrolü
  if (isDisposableEmail(email)) {
    return {
      isValid: false,
      status: 'do_not_mail',
      disposable: true,
      error: 'Geçici e-posta adresleri kabul edilmez'
    };
  }

  // Domain kontrolü (basit)
  const domain = email.split('@')[1];
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  
  if (commonDomains.includes(domain.toLowerCase())) {
    return {
      isValid: true,
      status: 'valid',
      account: email.split('@')[0],
      domain: domain
    };
  }

  // Diğer domainler için belirsiz sonuç
  return {
    isValid: true,
    status: 'unknown',
    account: email.split('@')[0],
    domain: domain
  };
};

// ZeroBounce API entegrasyonu (API anahtarı gerekli)
export const validateEmailWithZeroBounce = async (
  email: string, 
  apiKey?: string
): Promise<EmailValidationResult> => {
  if (!apiKey) {
    console.warn('ZeroBounce API anahtarı bulunamadı, basit doğrulama kullanılıyor');
    return validateEmailBasic(email);
  }

  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API hatası: ${response.status}`);
    }

    const data = await response.json();

    return {
      isValid: data.status === 'valid',
      status: data.status,
      subStatus: data.sub_status,
      account: data.account,
      domain: data.domain,
      didYouMean: data.did_you_mean,
      disposable: data.disposable,
      toxic: data.toxic,
      firstName: data.firstname,
      lastName: data.lastname,
      gender: data.gender,
      location: data.location,
      credits: data.credits_used
    };
  } catch (error) {
    console.error('ZeroBounce API hatası:', error);
    // API hatası durumunda basit doğrulamaya geri dön
    return validateEmailBasic(email);
  }
};

// Ana e-posta doğrulama fonksiyonu
export const validateEmail = async (email: string): Promise<EmailValidationResult> => {
  // Önce basit format kontrolü
  if (!validateEmailFormat(email)) {
    return {
      isValid: false,
      status: 'invalid',
      error: 'Geçersiz e-posta formatı'
    };
  }

  // ZeroBounce API anahtarını environment'dan al
  const apiKey = process.env.REACT_APP_ZEROBOUNCE_API_KEY;
  
  // API anahtarı varsa ZeroBounce kullan, yoksa basit doğrulama
  if (apiKey) {
    return validateEmailWithZeroBounce(email, apiKey);
  } else {
    return validateEmailBasic(email);
  }
};

// E-posta önerisi (yaygın yazım hatalarını düzelt)
export const suggestEmailCorrection = (email: string): string | null => {
  const commonMistakes: { [key: string]: string } = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com'
  };

  const [localPart, domain] = email.split('@');
  if (!domain) return null;

  const correctedDomain = commonMistakes[domain.toLowerCase()];
  if (correctedDomain) {
    return `${localPart}@${correctedDomain}`;
  }

  return null;
};

