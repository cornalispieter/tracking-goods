// utils.js
export function cleanScannedCode(raw) {
  if (!raw) return "";

  return raw
    .replace(/^pd/i, "")        // hapus prefix pd
    .replace(/st\d+$/i, "")     // hapus suffix st + angka
    .trim();
}
