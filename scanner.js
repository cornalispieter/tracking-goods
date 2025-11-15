// scanner.js

let html5QrCodeCode = null;
let html5QrCodeLocation = null;
let isScanningCode = false;
let isScanningLocation = false;

function setScannerStatus(target, key) {
  const dict = window.translations[window.currentLang];
  const elId = target === "location" ? "scanner-status-location" : "scanner-status-code";
  const el = document.getElementById(elId);
  if (!el || !dict) return;
  el.textContent = dict[key] || "";
}

// CODE scanner: auto stop & auto lock
async function startScannerForCode(codeInput, step1Label) {
  if (isScanningCode) {
    await stopScannerForCode();
  }

  try {
    setScannerStatus("code", "scannerScanning");

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) {
      setScannerStatus("code", "scannerIdle");
      alert("No camera found.");
      return;
    }

    const backCam = cameras.find((cam) =>
      /back|rear|environment/i.test(cam.label || "")
    );
    const cameraId = backCam ? backCam.id : cameras[0].id;

    html5QrCodeCode = new Html5Qrcode("qr-reader-code");
    const config = { fps: 10, qrbox: { width: 230, height: 230 } };
    isScanningCode = true;

    await html5QrCodeCode.start(
      cameraId,
      config,
      async (decodedText) => {
        codeInput.value = decodedText;
        codeInput.readOnly = true;
        codeInput.classList.add("locked-input");
        step1Label.classList.add("locked");

        setScannerStatus("code", "scannerDetected");
        await stopScannerForCode();

        const locationInput = document.getElementById("location-input");
        if (locationInput) locationInput.focus();
      },
      () => {}
    );
  } catch (err) {
    console.error("Error starting code scanner:", err);
    setScannerStatus("code", "scannerIdle");
    alert("Cannot start camera scanner (code).");
  }
}

async function stopScannerForCode() {
  if (html5QrCodeCode && isScanningCode) {
    try {
      await html5QrCodeCode.stop();
      html5QrCodeCode.clear();
    } catch (err) {
      console.warn("Error stopping code scanner:", err);
    }
  }
  isScanningCode = false;
  setScannerStatus("code", "scannerStopped");
}

// LOCATION scanner: auto stop & auto lock
async function startScannerForLocation(locationInput) {
  if (isScanningLocation) {
    await stopScannerForLocation();
  }

  try {
    setScannerStatus("location", "scannerScanning");

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) {
      setScannerStatus("location", "scannerIdle");
      alert("No camera found.");
      return;
    }

    const backCam = cameras.find((cam) =>
      /back|rear|environment/i.test(cam.label || "")
    );
    const cameraId = backCam ? backCam.id : cameras[0].id;

    html5QrCodeLocation = new Html5Qrcode("qr-reader-location");
    const config = { fps: 10, qrbox: { width: 230, height: 230 } };
    isScanningLocation = true;

    await html5QrCodeLocation.start(
      cameraId,
      config,
      async (decodedText) => {
        locationInput.value = decodedText;
        locationInput.readOnly = true;
        locationInput.classList.add("locked-input");

        setScannerStatus("location", "scannerDetected");
        await stopScannerForLocation();
      },
      () => {}
    );
  } catch (err) {
    console.error("Error starting location scanner:", err);
    setScannerStatus("location", "scannerIdle");
    alert("Cannot start camera scanner (location).");
  }
}

async function stopScannerForLocation() {
  if (html5QrCodeLocation && isScanningLocation) {
    try {
      await html5QrCodeLocation.stop();
      html5QrCodeLocation.clear();
    } catch (err) {
      console.warn("Error stopping location scanner:", err);
    }
  }
  isScanningLocation = false;
  setScannerStatus("location", "scannerStopped");
}
