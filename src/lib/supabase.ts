import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the default Supabase client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Export a function to create a new client when needed
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

// Define types for our database tables
export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  marketing_consent: boolean;
  product_interest: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CallRecord = {
  id?: string;
  user_id: string;
  call_id: string;
  call_duration?: number;
  call_summary?: string;
  call_sentiment?: string;
  call_successful?: boolean;
  created_at?: string;
};

export type InterestDetails = {
  id?: string;
  user_id: string;
  company_size?: string;
  lead_volume?: string;
  current_crm?: string;
  additional_info?: string;
  created_at?: string;
}; 