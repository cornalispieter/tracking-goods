/* ============================================================
   scanner.js — Two QR Scanners
   ============================================================ */

let qrScannerCode = null;
let qrScannerLocation = null;

function startScannerForCode() {
  document.getElementById("scanner-code-box").classList.remove("hidden");
  stopScannerForLocation();

  if (qrScannerCode) qrScannerCode.stop();

  qrScannerCode = new Html5Qrcode("qr-reader-code");

  qrScannerCode.start(
    { facingMode: { ideal: "environment" } },
    { fps: 10, qrbox: 200 },
    (text) => {
      document.getElementById("code-input").value = text;
      stopScannerForCode();
    }
  );
}

function stopScannerForCode() {
  if (!qrScannerCode) return;
  document.getElementById("scanner-code-box").classList.add("hidden");
  qrScannerCode.stop().then(() => {
    qrScannerCode.clear();
    qrScannerCode = null;
  });
}

function startScannerForLocation() {
  document.getElementById("scanner-location-box").classList.remove("hidden");
  stopScannerForCode();

  if (qrScannerLocation) qrScannerLocation.stop();

  qrScannerLocation = new Html5Qrcode("qr-reader-location");

  qrScannerLocation.start(
    { facingMode: { ideal: "environment" } },
    { fps: 10, qrbox: 200 },
    (text) => {
      document.getElementById("location-input").value = text;
      stopScannerForLocation();
    }
  );
}

function stopScannerForLocation() {
  if (!qrScannerLocation) return;
  document.getElementById("scanner-location-box").classList.add("hidden");
  qrScannerLocation.stop().then(() => {
    qrScannerLocation.clear();
    qrScannerLocation = null;
  });
}

window.startScannerForCode = startScannerForCode;
window.startScannerForLocation = startScannerForLocation;
window.stopScannerForCode = stopScannerForCode;
window.stopScannerForLocation = stopScannerForLocation;
