// scan.js - Camera QR/Barcode Scanner
// Uses ZXing library

let scannerActive = false;
let codeReader;

async function startScanner() {
    if (scannerActive) return;
    scannerActive = true;

    if (!codeReader) {
        codeReader = new ZXing.BrowserMultiFormatReader();
    }

    const videoElement = document.getElementById("videoPreview");
    const kodeInput = document.getElementById("kodeInput");
    const lokasiInput = document.getElementById("lokasiInput");

    try {
        const devices = await ZXing.BrowserMultiFormatReader.listVideoInputDevices();
        const backCam = devices.find(d => d.label.toLowerCase().includes("back")) || devices[0];

        await codeReader.decodeFromVideoDevice(backCam.deviceId, videoElement, (result) => {
            if (result) {
                kodeInput.value = result.text;
                stopScanner();
            }
        });
    } catch (err) {
        console.error(err);
        stopScanner();
    }
}

function stopScanner() {
    if (!scannerActive) return;
    scannerActive = false;
    const videoElement = document.getElementById("videoPreview");
    if (codeReader) codeReader.reset();
    videoElement.srcObject = null;
}

window.startScanner = startScanner;
window.stopScanner = stopScanner;