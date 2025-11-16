// utils.js FINAL VERSION
export function cleanScannedCode(raw) {
  if (!raw) return "";

  return raw
    .replace(/^pd/i, "")        // remove prefix pd
    .replace(/st\d+$/i, "")     // remove suffix st###
    .trim();
}
