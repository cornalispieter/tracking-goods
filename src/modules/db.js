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
// SAVE DATA (insert into history + summary)
// ========================================================
export async function saveRecord(kodebarang, lokasi) {
  const now = new Date().toISOString();

  // Insert into history
  const { error: errHistory } = await supabase
    .from("goods_history")
    .insert([{ kodebarang, lokasi, updated: now }]);

  if (errHistory) {
    console.error("History insert error:", errHistory);
    return false;
  }

  // Update summary (upsert)
  const { error: errSummary } = await supabase
    .from("goods_summary")
    .upsert([{ kodebarang, lokasi, updated: now }], {
      onConflict: "kodebarang"
    });

  if (errSummary) {
    console.error("Summary upsert error:", errSummary);
    return false;
  }

  return true;
}

// ========================================================
// LOAD SUMMARY — show only LATEST per kodebarang
// NOT from goods_summary table BUT from goods_history
// ========================================================
export async function loadData() {
  // Ambil semua history diurutkan dari yang terbaru
  const { data, error } = await supabase
    .from("goods_history")
    .select("kodebarang, lokasi, updated")
    .order("updated", { ascending: false });

  if (error) {
    console.error("Load summary error:", error);
    return [];
  }

  // Gunakan map agar hanya record pertama (terbaru) yg dipakai
  const latestMap = {};

  data.forEach((row) => {
    if (!latestMap[row.kodebarang]) {
      latestMap[row.kodebarang] = row; // row pertama = terbaru
    }
  });

  return Object.values(latestMap); // summary bersih tanpa duplicate
}

// ========================================================
// LOAD HISTORY DETAIL (for modal)
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