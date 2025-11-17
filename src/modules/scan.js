// scan.js – FINAL FIXED (UMD ZXing, NON-MODULE)

// =====================
// CLEAN SCANNED DATA (smart cleaning based on field)
// =====================
function cleanScannedCode(code, targetField) {
    if (!code) return "";

    let c = code.trim();

    // HANYA bersihkan PD...STxxx untuk field kodebarang
    if (targetField === "kodebarang") {
        let x = c.toLowerCase();

        // Hapus prefix "pd"
        if (x.startsWith("pd")) {
            x = x.substring(2);
        }

        // Hapus suffix "st" + angka
        x = x.replace(/st\d+$/i, "");

        return x.toUpperCase();
    }

    // Jika field lokasi → jangan diubah
    return c;
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
                    const cleaned = cleanScannedCode(result.text, targetField);
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
