// scan.js - Fixed ZXing Scanner
// Working version for barcode & QR scan (mobile friendly)

import {
    BrowserMultiFormatReader,
    NotFoundException
} from "https://unpkg.com/@zxing/browser@latest";

let scannerActive = false;
let reader = new BrowserMultiFormatReader();

async function startScanner() {
    if (scannerActive) return;
    scannerActive = true;

    const video = document.getElementById("videoPreview");
    const kodeInput = document.getElementById("kodeInput");

    try {
        // Get all cameras
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (devices.length === 0) {
            alert("No camera found on this device.");
            return;
        }

        // Prefer back camera
        let backCam = devices.find(d => d.label.toLowerCase().includes("back"))
                   || devices[devices.length - 1];

        await reader.decodeFromVideoDevice(backCam.deviceId, video, (result, err) => {
            if (result) {
                kodeInput.value = result.getText();
                stopScanner(); // auto stop after success
            }
        });

    } catch (e) {
        console.error("Scanner start error:", e);
        stopScanner();
    }
}

function stopScanner() {
    if (!scannerActive) return;
    scannerActive = false;

    const video = document.getElementById("videoPreview");
    reader.reset();
    video.srcObject = null;
}

window.startScanner = startScanner;
window.stopScanner = stopScanner;
