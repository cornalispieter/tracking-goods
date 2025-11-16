// src/modules/scan.js
// ================================================================
// Small embedded scanner window (non-fullscreen) with CANCEL button
// ================================================================

import { BrowserMultiFormatReader } from "https://esm.run/@zxing/browser@0.1.1";
import { cleanScannedCode } from "./utils.js";

const codeReader = new BrowserMultiFormatReader();

/**
 * Start scanning camera in a small centered box.
 */
export function startScanner(targetInputId) {
  const inputField = document.getElementById(targetInputId);
  if (!inputField) return;

  // Overlay (darkened background)
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex justify-center items-center";

  // Camera box wrapper
  const cameraBox = document.createElement("div");
  cameraBox.className =
    "relative bg-[#0f1624] border border-neon-blue shadow-neon rounded-xl p-4 flex flex-col items-center";
  cameraBox.style.width = "260px";

  // Video preview element
  const previewElem = document.createElement("video");
  previewElem.className = "rounded-lg mb-3";
  previewElem.style.width = "240px";
  previewElem.style.height = "180px";
  previewElem.style.objectFit = "cover";

  // Close "X" button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.className =
    "absolute top-2 right-2 text-white text-2xl hover:text-neon-blue transition";
  closeBtn.onclick = () => {
    codeReader.reset();
    overlay.remove();
  };

  // CANCEL button (NEW, visible clearly)
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className =
    "mt-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition";
  cancelBtn.onclick = () => {
    codeReader.reset();
    overlay.remove();
  };

  // Assemble DOM
  cameraBox.appendChild(closeBtn);
  cameraBox.appendChild(previewElem);
  cameraBox.appendChild(cancelBtn);
  overlay.appendChild(cameraBox);
  document.body.appendChild(overlay);

  // Start camera scanning
  codeReader
    .decodeOnceFromVideoDevice(undefined, previewElem)
    .then((result) => {
      const rawText = result.getText();
      const cleaned = cleanScannedCode(rawText);

      inputField.value = cleaned;

      codeReader.reset();
      overlay.remove();
    })
    .catch((err) => {
      console.error("Scanner error:", err);

      codeReader.reset();
      overlay.remove();
    });
}
