
import { supabase } from '@/integrations/supabase/client';
import { Company, UserProfile } from '@/types/company';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;
  return profileData;
};

export const fetchCompanyById = async (companyId: string): Promise<Company | null> => {
  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();

  if (companyError) throw companyError;
  return companyData;
};

export const generateCompanyCode = async (): Promise<string> => {
  const { data: codeData, error: codeError } = await supabase
    .rpc('generate_unique_company_code');

  if (codeError) throw codeError;
  
  console.log('Generated company code:', codeData);
  return codeData;
};

export const createCompanyRecord = async (companyName: string, companyCode: string, userId: string): Promise<Company> => {
  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: companyName,
      company_code: companyCode,
      created_by: userId
    })
    .select()
    .single();

  if (companyError) throw companyError;
  return companyData;
};

export const updateUserProfileCompany = async (userId: string, companyId: string): Promise<void> => {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ company_id: companyId })
    .eq('id', userId);

  if (profileError) throw profileError;
};

// FIXED: Changed from ilike to eq for exact matching
export const findCompanyByCode = async (companyCode: string): Promise<Company | null> => {
  console.log('🔍 Searching for company code:', companyCode);
  
  // First try exact match (case-sensitive)
  const { data: exactMatch, error: exactError } = await supabase
    .from('companies')
    .select('*')
    .eq('company_code', companyCode)
    .maybeSingle();

  if (exactError) {
    console.error('❌ Error in exact match query:', exactError);
    throw exactError;
  }

  if (exactMatch) {
    console.log('✅ Found exact match:', exactMatch);
    return exactMatch;
  }

  // If no exact match, try case-insensitive search
  console.log('🔄 No exact match, trying case-insensitive search...');
  
  const { data: caseInsensitiveMatch, error: caseError } = await supabase
    .from('companies')
    .select('*')
    .ilike('company_code', companyCode)
    .maybeSingle();

  if (caseError) {
    console.error('❌ Error in case-insensitive query:', caseError);
    throw caseError;
  }

  console.log('🔍 Case-insensitive result:', caseInsensitiveMatch);
  return caseInsensitiveMatch;
};

// Alternative approach: Use a more robust search function
export const findCompanyByCodeRobust = async (companyCode: string): Promise<Company | null> => {
  console.log('🔍 Searching for company code (robust):', companyCode);
  
  // Normalize the input
  const normalizedCode = companyCode.trim();
  
  if (!normalizedCode) {
    console.log('❌ Empty company code provided');
    return null;
  }

  try {
    // Get all companies and filter in JavaScript for maximum compatibility
    const { data: allCompanies, error } = await supabase
      .from('companies')
      .select('*');

    if (error) {
      console.error('❌ Error fetching companies:', error);
      throw error;
    }

    if (!allCompanies || allCompanies.length === 0) {
      console.log('📋 No companies found in database');
      return null;
    }

    console.log('📋 All companies:', allCompanies.map(c => ({ id: c.id, code: c.company_code, name: c.name })));

    // First try exact match
    const exactMatch = allCompanies.find(company => 
      company.company_code === normalizedCode
    );

    if (exactMatch) {
      console.log('✅ Found exact match:', exactMatch);
      return exactMatch;
    }

    // Then try case-insensitive match
    const caseInsensitiveMatch = allCompanies.find(company => 
      company.company_code?.toLowerCase() === normalizedCode.toLowerCase()
    );

    if (caseInsensitiveMatch) {
      console.log('✅ Found case-insensitive match:', caseInsensitiveMatch);
      return caseInsensitiveMatch;
    }

    console.log('❌ No company found with code:', normalizedCode);
    return null;

  } catch (error) {
    console.error('❌ Error in robust company search:', error);
    throw error;
  }
};

export const getAllCompanies = async () => {
  const { data: allCompanies, error: listError } = await supabase
    .from('companies')
    .select('company_code, name');
  
  if (listError) console.error('Error listing companies:', listError);
  return allCompanies;
};


