// src/modules/utils.js
// ============================
// Utility functions used across the app
// ============================

/**
 * Clean scanned QR or barcode input.
 * Example:
 *   "pd145045980st999"  -> "145045980"
 *   "PD89345123ST001"   -> "89345123"
 */
export function cleanScannedCode(raw) {
  if (!raw) return "";

  return raw
    .replace(/^pd/i, "")       // remove prefix "pd" or "PD"
    .replace(/st\d+$/i, "")    // remove suffix like "st999"
    .trim();
}

/**
 * Convert timestamp to readable date string
 * (Used mostly in history modal)
 */
export function formatDateTime(ts) {
  return new Date(ts).toLocaleString();
}

/**
 * Optional helper: Check if string is empty
 */
export function isEmpty(str) {
  return !str || str.trim().length === 0;
}
