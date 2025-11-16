// src/modules/scan.js
// ======================================================================
// Stable small scanner window with proper camera stop for iOS/Safari.
// ======================================================================

import { BrowserMultiFormatReader } from "https://esm.run/@zxing/browser@0.1.1";
import { cleanScannedCode } from "./utils.js";

let codeReader = null;
let videoStream = null;

/** Stop camera properly (iOS + Android + Desktop) */
function stopCamera() {
  try {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
    }
  } catch (e) {
    console.warn("Camera stop failed:", e);
  }

  if (codeReader) {
    try {
      codeReader.reset();
    } catch {}
  }
}

/** Close scanner overlay safely */
function closeOverlay(overlay) {
  stopCamera();
  if (overlay) overlay.remove();
}

/** Start scanner */
export function startScanner(targetInputId) {
  const inputField = document.getElementById(targetInputId);
  if (!inputField) return;

  codeReader = new BrowserMultiFormatReader();

  // Overlay
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex justify-center items-center";

  // Wrapper box
  const box = document.createElement("div");
  box.className =
    "relative bg-[#0f1624] border border-neon-blue rounded-xl p-4 flex flex-col items-center";
  box.style.width = "260px";

  // Video preview
  const videoElem = document.createElement("video");
  videoElem.className = "rounded-lg mb-3";
  videoElem.style.width = "240px";
  videoElem.style.height = "180px";
  videoElem.style.objectFit = "cover";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.className =
    "absolute top-2 right-2 text-white text-xl hover:text-neon-blue transition";
  closeBtn.onclick = () => closeOverlay(overlay);

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className =
    "mt-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition";
  cancelBtn.onclick = () => closeOverlay(overlay);

  box.appendChild(closeBtn);
  box.appendChild(videoElem);
  box.appendChild(cancelBtn);

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Start camera + scanning
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      videoStream = stream;
      videoElem.srcObject = stream;
      videoElem.play();

      return codeReader.decodeFromVideoDevice(null, videoElem, (result) => {
        if (result) {
          const raw = result.getText();
          const cleaned = cleanScannedCode(raw);

          inputField.value = cleaned;

          // Auto close when scanned
          closeOverlay(overlay);
        }
      });
    })
    .catch((err) => {
      console.error("Camera error:", err);
      closeOverlay(overlay);
    });
}
