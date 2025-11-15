// Supabase DB module with automatic history logging via trigger
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// === GANTI SESUAI PROJECT SUPABASE ANDA ===
const SUPABASE_URL = "https://ifynrranqixyoxombfck.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Load main summary data
export async function loadData() {
  const { data, error } = await supabase
    .from('goods_summary')
    .select('*')
    .order('updated', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// Save item (summary only) — history will be auto-logged by trigger
export async function saveRecord(kodebarang, lokasi) {
  const timestamp = new Date().toISOString();

  const { error } = await supabase
    .from('goods_summary')
    .upsert({
      kodebarang,
      lokasi,
      updated: timestamp
    }, { onConflict: 'kodebarang' });

  if (error) console.error(error);
  return true;
}

// Load full history for specific item
export async function loadHistory(kodebarang) {
  const { data, error } = await supabase
    .from('goods_history')
    .select('*')
    .eq('kodebarang', kodebarang)
    .order('updated', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}