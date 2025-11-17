// src/modules/utils.js
// =====================================================
// Global utility functions used across the entire app
// =====================================================

/**
 * Clean scanned QR or barcode input.
 * Example:
 *   "pd145045980st999"  -> "145045980"
 *   "PD89345123ST001"   -> "89345123"
 *
 * Removes:
 *   - Prefix "PD" (case-insensitive)
 *   - Suffix "STxxx" (case-insensitive)
 */
export function cleanScannedCode(raw) {
  if (!raw) return "";

  return raw
    .replace(/^pd/i, "")        // remove prefix PD
    .replace(/st\d+$/i, "")     // remove suffix STxxx
    .trim();
}

/**
 * Convert timestamp to readable local datetime string
 * Commonly used in table + history modal
 */
export function formatDateTime(ts) {
  return new Date(ts).toLocaleString();
}

/**
 * Check if a string is empty or whitespace
 */
export function isEmpty(str) {
  return !str || str.trim().length === 0;
}

/**
 * Sleep helper (optional)
 * Example: await sleep(300)
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
