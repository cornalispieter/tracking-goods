// src/modules/scan.js
// ================================================================
// Small embedded scanner window (non-fullscreen)
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

  // WRAPPER (background click to close)
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex justify-center items-center";

  // CAMERA BOX (small, not fullscreen)
  const cameraBox = document.createElement("div");
  cameraBox.className =
    "bg-[#0f1624] border border-neon-blue shadow-neon rounded-xl p-3";
  cameraBox.style.width = "260px";
  cameraBox.style.height = "220px";
  cameraBox.style.display = "flex";
  cameraBox.style.flexDirection = "column";
  cameraBox.style.justifyContent = "center";
  cameraBox.style.alignItems = "center";

  // VIDEO PREVIEW
  const previewElem = document.createElement("video");
  previewElem.className = "rounded-lg";
  previewElem.style.width = "240px";
  previewElem.style.height = "180px";
  previewElem.style.objectFit = "cover";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.className =
    "absolute top-3 right-3 text-white text-2xl hover:text-neon-blue transition";
  closeBtn.onclick = () => {
    codeReader.reset();
    overlay.remove();
  };

  // Assemble
  cameraBox.appendChild(previewElem);
  overlay.appendChild(cameraBox);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Start scanning
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
