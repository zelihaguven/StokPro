// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hyzmlgstwbljljpzpgyf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5em1sZ3N0d2JsamxqcHpwZ3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTE0OTMsImV4cCI6MjA2NTY2NzQ5M30.7j6g0HFzfTl5bWtbutP-RLSrDvDOCXVgH2HsLiv6fJY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);