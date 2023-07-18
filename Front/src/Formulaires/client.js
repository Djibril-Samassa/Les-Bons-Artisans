import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rqtrszwstufwroklozmh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdHJzendzdHVmd3Jva2xvem1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2Mjg0NTQsImV4cCI6MjAwNTIwNDQ1NH0.wBx9tjVDIp9iJgvmkxRr-FXAf2oseMvgSZpBlfDucNE"
);

export { supabase };
