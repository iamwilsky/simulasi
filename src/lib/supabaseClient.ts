import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vrihtkrvsspodosoogrt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyaWh0a3J2c3Nwb2Rvc29vZ3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzU3MDIsImV4cCI6MjA4ODY1MTcwMn0.A0-Qe1zQt9Fhv2J0lAmtQ-RhKhdrQxA6WdNaUTsGNXQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
