import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cxvhukydnayklznlasrp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dmh1a3lkbmF5a2x6bmxhc3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjQyOTksImV4cCI6MjA3MjE0MDI5OX0.5fO2NT9vSyzV_7yKKuDdL6KHOs7vYmaddwWvkek7dLI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
