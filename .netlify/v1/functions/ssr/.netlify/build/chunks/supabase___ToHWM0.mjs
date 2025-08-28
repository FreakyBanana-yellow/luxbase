import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zpzigwfjfhogkzuvijzm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwemlnd2ZqZmhvZ2t6dXZpanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjcwNDcsImV4cCI6MjA2NjUwMzA0N30.jMDAFkPhKmLXtLYerLd9z93tugNvw14L4oZvSNkSD2o";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce"
  }
});
function makeServerClient(accessToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} }
  });
}

export { makeServerClient as m, supabase as s };
