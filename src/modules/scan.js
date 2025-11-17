// scan.js – FINAL (QR + BARCODE) for GitHub Pages
// ================================================

import { cleanScannedCode } from "./utils.js";

let stream = null;
let reader = null;

// ================================================
// LOAD ZXING (UMD version, NO module imports)
// ================================================
function loadZXing() {
  if (!reader) {
    // Support QR + all 1D barcodes
    reader = new ZXing.BrowserMultiFormatReader();
  }
}

// ================================================
// CREATE SCANNER UI
// ================================================
function createScannerUI() {
  const div = document.createElement("div");
  div.id = "scannerContainer";
  div.className =
    "fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-[9999]";

  div.innerHTML = `
    <div class="bg-[#0f1624] p-4 rounded-xl shadow-lg text-center">
      <video id="preview" style="width: 260px; border-radius: 10px;"></video>

      <button id="cancelScanBtn"
        class="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold">
        Cancel
      </button>
    </div>
  `;

  document.body.appendChild(div);
}

// ================================================
// START SCANNER (SCAN QR + BARCODE)
// ================================================
export async function startScanner(targetField) {
  loadZXing();

  if (!document.getElementById("scannerContainer")) {
    createScannerUI();
  }

  const video = document.getElementById("preview");
  document.getElementById("cancelScanBtn").onclick = stopScanner;

  try {
    // Always try back camera
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    video.srcObject = stream;
    video.play();

    // ZXing callback
    reader.decodeFromVideoDevice(null, video, (result, err) => {
      if (result) {
        const raw = result.text;
        const cleaned = cleanScannedCode(raw);

        document.getElementById(targetField).value = cleaned;

        stopScanner();
      }
    });
  } catch (e) {
    alert("Camera access denied or not available.");
    stopScanner();
  }
}

// ================================================
// STOP SCANNER
// ================================================
export function stopScanner() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }

  const ui = document.getElementById("scannerContainer");
  if (ui) ui.remove();

  if (reader) {
    reader.reset();
  }
}
