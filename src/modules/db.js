// src/modules/db.js
// ======================================================================
// Supabase database module
// Features:
//  - Save record (insert into history only)
//  - Summary auto-updated by trigger
//  - Load summary list
//  - Load full history for modal
//  - Realtime listener on goods_summary
// ======================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ======================================================================
// CONFIG (sesuai punya kamu)
// ======================================================================
export const SUPABASE_URL =
  "https://ifynrranqixyoxombfck.supabase.co";

export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ======================================================================
// SAVE RECORD → Insert hanya ke goods_history
// Summary akan update otomatis via TRIGGER Supabase
// ======================================================================
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

// ======================================================================
// LOAD SUMMARY → Ambil 1 row per kodebarang dari goods_summary
// ======================================================================
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

// ======================================================================
// LOAD FULL HISTORY → Tampil di History Modal
// ======================================================================
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

// ======================================================================
// REALTIME LISTENER (Trigger ketika goods_summary berubah)
// ======================================================================
export function subscribeRealtime(callback) {
  supabase
    .channel("goods_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "goods_summary",
      },
      (payload) => {
        console.log("Realtime update:", payload);
        callback(); // refresh UI
      }
    )
    .subscribe();
}

// ======================================================================
// (OPTIONAL) loadSummary() — versi lama
// DIBIARKAN AGAR TIDAK ADA FITUR YANG HILANG
// Tapi tidak dipakai lagi di main.js
// ======================================================================
export async function loadSummary() {
  const { data, error } = await supabase
    .from("goods_summary")
    .select("*")
    .order("updated", { ascending: false });

  if (error) {
    console.error("Summary load error:", error);
    return [];
  }

  return data;
}
