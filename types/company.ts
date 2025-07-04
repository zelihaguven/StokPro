
export interface Company {
  id: string;
  name: string;
  company_code: string;
  created_at: string;
  created_by: string;
}

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  company_id: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
