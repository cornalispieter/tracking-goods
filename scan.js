// Barcode/QR Scanner using ZXing
// Pastikan tambahkan CDN ZXing di index.html:
// <script src="https://unpkg.com/@zxing/library@latest"></script>

export function startScanner(targetFieldId = 'kodebarang') {
  const codeInput = document.getElementById('kodebarang');
  const locationInput = document.getElementById('lokasi');
  const targetInput = document.getElementById(targetFieldId);

  const preview = document.createElement('video');
  preview.setAttribute('playsinline', true);
  preview.style.width = '100%';
  preview.style.maxHeight = '300px';
  preview.style.border = '2px solid #444';
  preview.style.borderRadius = '10px';

  const scannerBox = document.createElement('div');
  scannerBox.style.position = 'fixed';
  scannerBox.style.top = '0';
  scannerBox.style.left = '0';
  scannerBox.style.width = '100%';
  scannerBox.style.height = '100%';
  scannerBox.style.background = 'rgba(0,0,0,0.8)';
  scannerBox.style.padding = '20px';
  scannerBox.style.zIndex = '9999';

  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'Close Scanner';
  closeBtn.style.background = '#900';
  closeBtn.style.color = '#fff';
  closeBtn.style.padding = '10px 15px';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '5px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.marginBottom = '10px';

  scannerBox.appendChild(closeBtn);
  scannerBox.appendChild(preview);
  document.body.appendChild(scannerBox);

  // ZXing reader
  const codeReader = new ZXing.BrowserMultiFormatReader();

  // Start scanning using camera
  codeReader
    .decodeFromVideoDevice(null, preview, (result, err) => {
      if (result) {
        const text = result.text;

        // Kalau format "kode|lokasi" → isi dua-duanya
        if (text.includes('|')) {
          const [kode, lokasi] = text.split('|');
          codeInput.value = kode;
          locationInput.value = lokasi;
        } else {
          // Kalau tidak, isi hanya target input
          if (targetInput) {
            targetInput.value = text;
          }
        }

        codeReader.reset();
        document.body.removeChild(scannerBox);
      }
    })
    .catch((e) => console.error(e));

  closeBtn.onclick = () => {
    codeReader.reset();
    document.body.removeChild(scannerBox);
  };
}
