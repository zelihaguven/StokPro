
import { useToast } from '@/hooks/use-toast';
import { Company } from '@/types/company';
import {
  generateCompanyCode,
  createCompanyRecord,
  updateUserProfileCompany,
  findCompanyByCodeRobust, // Changed to findCompanyByCodeRobust
  getAllCompanies
} from '@/services/companyService';

export const useCompanyOperations = (userId: string | undefined) => {
  const { toast } = useToast();

  const createCompany = async (companyName: string): Promise<Company> => {
    if (!userId) throw new Error('User not authenticated');

    try {
      const companyCode = await generateCompanyCode();
      const companyData = await createCompanyRecord(companyName, companyCode, userId);
      await updateUserProfileCompany(userId, companyData.id);

      toast({
        title: "Başarılı!",
        description: `Şirket oluşturuldu. Şirket kodu: ${companyData.company_code}`,
      });

      return companyData;
    } catch (error) {
      console.error('Error creating company:', error);
      toast({
        title: "Hata",
        description: "Şirket oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const joinCompany = async (companyCode: string): Promise<Company | undefined> => {
    if (!userId) throw new Error('User not authenticated');

    try {
      console.log('🔍 Attempting to join company with code:', companyCode);
      
      // Use the robust search function
      const companyData = await findCompanyByCodeRobust(companyCode);
      
      if (!companyData) {
        // Get all companies for debugging
        const allCompanies = await getAllCompanies();
        console.log('❌ Company not found. Available codes:', allCompanies?.map(c => c.company_code));
        
        toast({
          title: "Hata",
          description: `Bu şirket kodu ile bir şirket bulunamadı: "${companyCode}". Lütfen kodu kontrol edin.`,
          variant: "destructive",
        });
        return;
      }

      console.log('✅ Found company:', companyData);
      
      await updateUserProfileCompany(userId, companyData.id);
      
      toast({
        title: "Başarılı!",
        description: `${companyData.name} şirketine başarıyla katıldınız.`,
      });
      
      return companyData;
    } catch (error) {
      console.error('❌ Error joining company:', error);
      toast({
        title: "Hata",
        description: "Şirkete katılırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    createCompany,
    joinCompany
  };
};


