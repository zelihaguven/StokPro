
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCompanyOperations } from '@/hooks/useCompanyOperations';
import { Company, UserProfile } from '@/types/company';
import { fetchUserProfile, fetchCompanyById } from '@/services/companyService';

export const useCompany = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const { createCompany: createCompanyOperation, joinCompany: joinCompanyOperation } = useCompanyOperations(user?.id);

  useEffect(() => {
    if (user) {
      fetchUserProfileData();
    }
  }, [user]);

  const fetchUserProfileData = async () => {
    try {
      const profileData = await fetchUserProfile(user?.id!);
      setProfile(profileData);

      if (profileData?.company_id) {
        const companyData = await fetchCompanyById(profileData.company_id);
        setCompany(companyData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (companyName: string) => {
    const companyData = await createCompanyOperation(companyName);
    setCompany(companyData);
    setProfile(prev => prev ? { ...prev, company_id: companyData.id } : null);
    return companyData;
  };

  const joinCompany = async (companyCode: string) => {
    // Check if user is already in this company
    if (profile?.company_id) {
      const existingCompany = await fetchCompanyById(profile.company_id);
      if (existingCompany?.company_code.toLowerCase() === companyCode.toLowerCase()) {
        const { toast } = await import('@/hooks/use-toast');
        toast({
          title: "Bilgi",
          description: "Zaten bu şirkette bulunuyorsunuz.",
        });
        return;
      }
    }

    const companyData = await joinCompanyOperation(companyCode);
    if (companyData) {
      setCompany(companyData);
      setProfile(prev => prev ? { ...prev, company_id: companyData.id } : null);
    }
    return companyData;
  };

  return {
    profile,
    company,
    loading,
    createCompany,
    joinCompany,
    refetch: fetchUserProfileData
  };
};
