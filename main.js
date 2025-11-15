document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  renderTable(data);

  // Save Button
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarang = document.getElementById('kodebarang').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();

    if (!kodebarang || !lokasi) return alert('Isi kedua field!');

    await saveRecord(kodebarang, lokasi);
    const updated = await loadData();
    renderTable(updated);
    clearInputs();
  };

  // Scan umum (tombol besar) → default ke kodebarang
  document.getElementById('scanBtn').onclick = () => {
    startScanner('kodebarang');
  };

  // Scan khusus input kodebarang
  const scanKodeBtn = document.getElementById('scanKodeBtn');
  if (scanKodeBtn) {
    scanKodeBtn.onclick = () => startScanner('kodebarang');
  }

  // Scan khusus input lokasi
  const scanLokasiBtn = document.getElementById('scanLokasiBtn');
  if (scanLokasiBtn) {
    scanLokasiBtn.onclick = () => startScanner('lokasi');
  }

  // FAB (kalau ada) → juga ke kodebarang
  const fabScan = document.getElementById('fab-scan');
  if (fabScan) {
    fabScan.onclick = () => startScanner('kodebarang');
  }
});
