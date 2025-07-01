import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://iolzccjlmlwctomndjrq.supabase.co', // ✅ full project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IiolzccjlmlwctomndjrqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMjA2MDAsImV4cCI6Mjg2MjU2NjUwMH0.tksEUSArCwEmp-_z9CM4-g9120SPKZhH6JTK7LCpo8' // ✅ full anon public key
);
