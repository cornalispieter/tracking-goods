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

// =========================================
// SAVE RECORD
// Automatically:
//    - Insert/update summary table
//    - Insert history entry
// =========================================
export async function saveRecord(kodebarang, lokasi) {

  // 1) INSERT OR UPDATE SUMMARY
  const { error: summaryErr } = await supabase
    .from("goods_summary")
    .upsert(
      {
        kodebarang,
        lokasi,
        updated: new Date().toISOString()
      },
      { onConflict: "kodebarang" }
    );

  if (summaryErr) {
    console.error("Failed updating summary:", summaryErr);
    return false;
  }

  // 2) INSERT INTO HISTORY
  const { error: historyErr } = await supabase
    .from("goods_history")
    .insert({
      kodebarang,
      lokasi,
      updated: new Date().toISOString()
    });

  if (historyErr) {
    console.error("Failed inserting history:", historyErr);
    return false;
  }

  return true;
}

// =========================================
// LOAD SUMMARY LIST (DESC UPDATED)
// =========================================
export async function loadData() {
  const { data, error } = await supabase
    .from("goods_summary")
    .select("*")
    .order("updated", { ascending: false });

  if (error) {
    console.error("Failed to load summary:", error);
    return [];
  }

  return data || [];
}

// =========================================
// LOAD HISTORY FOR SPECIFIC KODEBARANG
// =========================================
export async function loadHistory(kodebarang) {
  const { data, error } = await supabase
    .from("goods_history")
    .select("*")
    .eq("kodebarang", kodebarang)
    .order("updated", { ascending: false });

  if (error) {
    console.error("Failed to load history:", error);
    return [];
  }

  return data || [];
}
