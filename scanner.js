/* ============================================================
   scanner.js — Two independent QR scanners
   ============================================================ */

let qrScannerCode = null;
let qrScannerLocation = null;

/* CODE SCANNER */
function startScannerForCode() {
  const box = document.getElementById("scanner-code-box");
  box.classList.remove("hidden");

  stopScannerForLocation();

  if (qrScannerCode) {
    qrScannerCode.stop();
    qrScannerCode = null;
  }

  qrScannerCode = new Html5Qrcode("qr-reader-code");

  qrScannerCode.start(
    { facingMode: { ideal: "environment" } },
    { fps: 10, qrbox: 200 },
    (decoded) => {
      document.getElementById("code-input").value = decoded;
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

/* LOCATION SCANNER */
function startScannerForLocation() {
  const box = document.getElementById("scanner-location-box");
  box.classList.remove("hidden");

  stopScannerForCode();

  if (qrScannerLocation) {
    qrScannerLocation.stop();
    qrScannerLocation = null;
  }

  qrScannerLocation = new Html5Qrcode("qr-reader-location");

  qrScannerLocation.start(
    { facingMode: { ideal: "environment" } },
    { fps: 10, qrbox: 200 },
    (decoded) => {
      document.getElementById("location-input").value = decoded;
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
