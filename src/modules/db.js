// src/modules/db.js
// =========================================
// Supabase database integration module
// Handles:
//  - Saving summary
//  - Updating summary
//  - Inserting into history
//  - Loading summary list
//  - Loading history items
// =========================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// =========================================
// CONFIG — GANTI DENGAN DATA MILIKMU SENDIRI
// =========================================
export const SUPABASE_URL  = "https://ifynrranqixyoxombfck.supabase.co";
export const SUPABASE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ========================================================
// SAVE RECORD → hanya insert ke history
// Summary akan diupdate oleh TRIGGER otomatis
// ========================================================
export async function saveRecord(kodebarang, lokasi) {
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("goods_history")
    .insert([{ kodebarang, lokasi, updated: now }]);

  if (error) {
    console.error("Save history error:", error);
    return false;
  }

  return true;
}

// ========================================================
// LOAD SUMMARY (ambil data terbaru dari goods_summary)
// Summary 1 row per kodebarang, tidak ada duplikat
// ========================================================
export async function loadData() {
  const { data, error } = await supabase
    .from("goods_summary")
    .select("*")
    .order("updated", { ascending: false });

  if (error) {
    console.error("Load summary error:", error);
    return [];
  }

  return data;
}

// ========================================================
// LOAD FULL HISTORY (modal)
// ========================================================
export async function loadHistory(kodebarang) {
  const { data, error } = await supabase
    .from("goods_history")
    .select("*")
    .eq("kodebarang", kodebarang)
    .order("updated", { ascending: false });

  if (error) {
    console.error("Load history error:", error);
    return [];
  }

  return data;
}