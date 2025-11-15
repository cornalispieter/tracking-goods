/* ============================================================
   scanner.js — Two independent QR scanners
   ============================================================ */

let qrScannerCode = null;      // scanner untuk kode barang
let qrScannerLocation = null;  // scanner untuk lokasi


/* ============================================================
   START SCANNER FOR CODE
   ============================================================ */
function startScannerForCode() {
  const box = document.getElementById("scanner-code-box");
  box.classList.remove("hidden");

  // stop scanner location jika masih hidup
  stopScannerForLocation();

  if (qrScannerCode) {
    qrScannerCode.stop();
    qrScannerCode = null;
  }

  qrScannerCode = new Html5Qrcode("qr-reader-code");

  qrScannerCode.start(
    { facingMode: "environment" }, // kamera belakang
    {
      fps: 10,
      qrbox: 200,
    },
    (decodedText) => {
      document.getElementById("code-input").value = decodedText;

      stopScannerForCode();
    },
    (errorMessage) => {
      // ignore scanning errors
    }
  );
}


/* ============================================================
   STOP SCANNER FOR CODE
   ============================================================ */
function stopScannerForCode() {
  const box = document.getElementById("scanner-code-box");
  box.classList.add("hidden");

  if (qrScannerCode) {
    qrScannerCode.stop().then(() => {
      qrScannerCode.clear();
      qrScannerCode = null;
    });
  }
}


/* ============================================================
   START SCANNER FOR LOCATION
   ============================================================ */
function startScannerForLocation() {
  const box = document.getElementById("scanner-location-box");
  box.classList.remove("hidden");

  // kalau scanner code masih aktif → stop dulu
  stopScannerForCode();

  if (qrScannerLocation) {
    qrScannerLocation.stop();
    qrScannerLocation = null;
  }

  qrScannerLocation = new Html5Qrcode("qr-reader-location");

  qrScannerLocation.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 200,
    },
    (decodedText) => {
      document.getElementById("location-input").value = decodedText;

      stopScannerForLocation();
    },
    (errorMessage) => {
      // ignore scanning errors
    }
  );
}


/* ============================================================
   STOP SCANNER FOR LOCATION
   ============================================================ */
function stopScannerForLocation() {
  const box = document.getElementById("scanner-location-box");
  box.classList.add("hidden");

  if (qrScannerLocation) {
    qrScannerLocation.stop().then(() => {
      qrScannerLocation.clear();
      qrScannerLocation = null;
    });
  }
}


/* ============================================================
   EXTERNAL ACCESS FROM main.js
   ============================================================ */
window.startScannerForCode = startScannerForCode;
window.startScannerForLocation = startScannerForLocation;
window.stopScannerForCode = stopScannerForCode;
window.stopScannerForLocation = stopScannerForLocation;
