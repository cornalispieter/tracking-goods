// scan.js – FINAL FIXED (UMD ZXing, NON-MODULE)

// =====================
// CLEAN SCANNED DATA
// =====================
function cleanScannedCode(code) {
    if (!code) return "";

    // Normalisasi
    let c = code.trim().toLowerCase();

    // Hapus prefix "pd"
    if (c.startsWith("pd")) {
        c = c.substring(2);
    }

    // Hapus suffix "st" + angka (st001, st999, st25)
    c = c.replace(/st\d+$/i, "");

    return c.toUpperCase(); 
}

// =====================
// SCANNER CORE
// =====================
let stream = null;
let reader = null;

function loadZXing() {
    if (!reader) {
        reader = new ZXing.BrowserMultiFormatReader();
    }
}

function createScannerUI() {
    const div = document.createElement("div");
    div.id = "scannerContainer";
    div.className =
        "fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-[9999]";

    div.innerHTML = `
      <div class="bg-[#0f1624] p-4 rounded-xl shadow-lg text-center">
        <video id="preview" style="width:260px; border-radius:10px;"></video>
        <button id="cancelScanBtn" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Cancel
        </button>
      </div>
    `;

    document.body.appendChild(div);
}

function startScanner(targetField) {
    loadZXing();

    if (!document.getElementById("scannerContainer")) {
        createScannerUI();
    }

    const video = document.getElementById("preview");
    document.getElementById("cancelScanBtn").onclick = stopScanner;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }})
        .then(streamData => {
            stream = streamData;
            video.srcObject = stream;
            video.play();

            reader.decodeFromVideoDevice(null, video, (result, err) => {
                if (result) {
                    const cleaned = cleanScannedCode(result.text);
                    document.getElementById(targetField).value = cleaned;
                    stopScanner();
                }
            });
        })
        .catch(err => {
            alert("Camera access denied.");
            stopScanner();
        });
}

function stopScanner() {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
    }

    const ui = document.getElementById("scannerContainer");
    if (ui) ui.remove();

    if (reader) reader.reset();
}

// Expose to global
window.startScanner = startScanner;
window.stopScanner = stopScanner;
