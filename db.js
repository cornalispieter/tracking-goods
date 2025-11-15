// db.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: ganti dengan project kamu sendiri
const SUPABASE_URL = "https://ifynrranqixyoxombfck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";

// Single Supabase client – didefinisikan sekali di sini
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Simpan satu movement baru.
 * Table Supabase: movements
 * Columns: id (uuid), code (text), location (text), created_at (timestamptz, default now())
 */
export async function saveMovement({ code, location }) {
  const { data, error } = await supabase
    .from("movements")
    .insert({ code, location })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Ambil semua movement lalu reduce jadi 1 record terbaru per code.
 */
export async function fetchLatestMovements() {
  const { data, error } = await supabase
    .from("movements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!data) return [];

  const latestByCode = {};
  for (const row of data) {
    // karena sudah sorted desc, pertama kali ketemu adalah yang terbaru
    if (!latestByCode[row.code]) {
      latestByCode[row.code] = row;
    }
  }

  return Object.values(latestByCode);
}

/**
 * Ambil full history untuk satu kode.
 */
export async function fetchHistoryByCode(code) {
  const { data, error } = await supabase
    .from("movements")
    .select("*")
    .eq("code", code)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
