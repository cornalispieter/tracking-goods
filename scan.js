export function startScanner(targetFieldId = 'kodebarang') {
  const codeInput = document.getElementById('kodebarang');
  const locationInput = document.getElementById('lokasi');
  const targetInput = document.getElementById(targetFieldId);

  const preview = document.createElement('video');
  preview.setAttribute('playsinline', true);
  preview.className =
    "w-full max-w-md mx-auto border border-neon-blue rounded-xl shadow-neon";

  const scannerBox = document.createElement('div');
  scannerBox.className =
    "fixed inset-0 bg-black/80 p-6 z-[9999] flex flex-col items-center gap-4";

  const closeBtn = document.createElement('button');
  closeBtn.innerText = "Close Scanner";
  closeBtn.className =
    "px-4 py-2 bg-red-600 hover:bg-red-700 rounded";

  scannerBox.appendChild(closeBtn);
  scannerBox.appendChild(preview);
  document.body.appendChild(scannerBox);

  const codeReader = new ZXing.BrowserMultiFormatReader();

  codeReader.decodeFromVideoDevice(null, preview, (result) => {
    if (result) {
      new Audio("wood_plank_flicks.ogg").play();
      const text = result.text;

      if (text.includes("|")) {
        const [kode, lokasi] = text.split("|");
        codeInput.value = kode;
        locationInput.value = lokasi;
      } else {
        targetInput.value = text;
      }

      codeReader.reset();
      scannerBox.remove();
    }
  });

  closeBtn.onclick = () => {
    codeReader.reset();
    scannerBox.remove();
  };
}
