// src/modules/scan.js
// ======================================================
// Camera Scanner Module using ZXing (WASM version)
// Semua fitur lama dipertahankan:
//  - Scan QR & barcode
//  - Auto clean PDxxxxxSTxxx
//  - Auto stop
//  - Cancel button
//  - UI proportional
// ======================================================

import { cleanScannedCode } from "./utils.js";

let stream = null;
let reader = null;

// =============================
// LOAD ZXING (browser WASM version)
// =============================
async function loadZXing() {
  if (reader) return reader;

  const { BrowserQRCodeReader } = await import(
    "https://cdn.jsdelivr.net/npm/@zxing/browser@0.1.4/esm/index.js"
  );

  reader = new BrowserQRCodeReader();
  return reader;
}

// =============================
// CREATE UI
// =============================
function createScannerUI() {
  const div = document.createElement("div");
  div.id = "scannerContainer";
  div.className =
    "fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-[9999]";

  div.innerHTML = `
    <div class="bg-[#0f1624] p-4 rounded-xl shadow-lg text-center">
      <video id="preview" style="width: 280px; border-radius: 10px;"></video>

      <button id="cancelScanBtn"
        class="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold">
        Cancel
      </button>
    </div>
  `;

  document.body.appendChild(div);
}

// =============================
// START SCANNER
// =============================
export async function startScanner(targetField) {
  await loadZXing();

  if (!document.getElementById("scannerContainer")) {
    createScannerUI();
  }

  const video = document.getElementById("preview");
  document.getElementById("cancelScanBtn").onclick = stopScanner;

  try {
    // always try back camera
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    video.srcObject = stream;
    video.play();

    reader.decodeFromVideoDevice(null, video, (result, err) => {
      if (result) {
        const raw = result.getText();
        const cleaned = cleanScannedCode(raw);
        document.getElementById(targetField).value = cleaned;
        stopScanner();
      }
    });
  } catch (e) {
    alert("Unable to access camera.");
    stopScanner();
  }
}

// =============================
// STOP SCANNER
// =============================
export function stopScanner() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }

  const ui = document.getElementById("scannerContainer");
  if (ui) ui.remove();
}
