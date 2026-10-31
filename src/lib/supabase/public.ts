import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function getPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return null;
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
