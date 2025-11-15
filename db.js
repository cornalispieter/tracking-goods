// db.js - Supabase client setup

// IMPORTANT: Replace these with your actual Supabase credentials
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

// Create Supabase client (renamed to db to avoid namespace conflict)
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Export global (optional)
window.db = db;