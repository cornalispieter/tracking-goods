// src/modules/scan.js
// ======================================================
// Camera Scanner Module using ZXing
// Features:
//  - Scan QR & barcode
//  - Auto-fill target input
//  - Auto-clean scanned code (PDxxxxxST999 → xxxxx)
//  - Auto-stop scanner after success
//  - Cancel button to close scanner
//  - Non-fullscreen preview (more proportional)
// ======================================================

import { cleanScannedCode } from "./utils.js";

// ZXing Loader
const ZXING_LINK =
  "https://cdn.jsdelivr.net/npm/@zxing/library@0.20.0/esm/index.min.js";

let codeReader = null;
let stream = null;

// ======================================================
// Create scanner container dynamically
// ======================================================
function createScannerUI() {
  const container = document.createElement("div");
  container.id = "scannerContainer";
  container.className =
    "fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-[9999]";

  container.innerHTML = `
    <div class="bg-[#0f1624] p-4 rounded-xl shadow-lg text-center">
      <video id="preview" style="width: 280px; border-radius: 10px;"></video>

      <button id="cancelScanBtn"
        class="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold">
        Cancel
      </button>
    </div>
  `;

  document.body.appendChild(container);
}

// ======================================================
// START SCANNER
// targetField = "kodebarang" atau "lokasi"
// ======================================================
export async function startScanner(targetField) {
  // load ZXing only once
  if (!codeReader) {
    const module = await import(ZXING_LINK);
    codeReader = new module.BrowserMultiFormatReader();
  }

  // Create UI if not exist
  if (!document.getElementById("scannerContainer")) {
    createScannerUI();
  }

  const video = document.getElementById("preview");

  // Cancel button
  document.getElementById("cancelScanBtn").onclick = stopScanner;

  // Start camera
  try {
    const devices = await codeReader.listVideoInputDevices();

    const backCam =
      devices.find(d => d.label.toLowerCase().includes("back")) ||
      devices[0];

    stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: backCam.deviceId },
    });

    video.srcObject = stream;
    video.play();

    // Begin decode loop
    codeReader.decodeFromVideoDevice(backCam.deviceId, video, (result, err) => {
      if (result) {
        let raw = result.text;
        let cleaned = cleanScannedCode(raw);

        document.getElementById(targetField).value = cleaned;
        stopScanner();
      }
    });
  } catch (e) {
    console.error("Scanner error:", e);
    alert("Camera scan not available on this device.");
    stopScanner();
  }
}

// ======================================================
// STOP SCANNER (auto or cancel)
// ======================================================
export function stopScanner() {
  if (codeReader) {
    codeReader.reset();
  }

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }

  const container = document.getElementById("scannerContainer");
  if (container) container.remove();
}
