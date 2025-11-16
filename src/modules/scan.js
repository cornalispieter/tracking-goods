// src/modules/scan.js
// ============================================
// QR / Barcode Scanner using @zxing/browser
// Works perfectly on iOS Safari, Android Chrome, Desktop
// ============================================

import { BrowserMultiFormatReader } from "https://esm.run/@zxing/browser@0.1.1";
import { cleanScannedCode } from "./utils.js";

const codeReader = new BrowserMultiFormatReader();

/**
 * Start scanning from camera and fill target input automatically.
 * @param {string} targetInputId 
 */
export function startScanner(targetInputId) {
  const inputField = document.getElementById(targetInputId);
  if (!inputField) return;

  // Create fullscreen video overlay
  const previewElem = document.createElement("video");
  previewElem.className =
    "fixed inset-0 bg-black/80 z-[9999] w-full h-full object-cover";

  document.body.appendChild(previewElem);

  // Start scanning
  codeReader.decodeOnceFromVideoDevice(undefined, previewElem)
    .then(result => {
      const rawText = result.getText();
      const cleaned = cleanScannedCode(rawText);

      inputField.value = cleaned;

      previewElem.remove();
      codeReader.reset();
    })
    .catch(err => {
      console.error("Scanner error:", err);

      previewElem.remove();
      codeReader.reset();
    });
}
