import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';

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

  // FAB scan → default ke kodebarang
  const fabScan = document.getElementById('fab-scan');
  if (fabScan) {
    fabScan.onclick = () => startScanner('kodebarang');
  }

  // === Realtime Search ===
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = data.filter(item =>
    item.kodebarang.toLowerCase().includes(keyword) ||
    item.lokasi.toLowerCase().includes(keyword) ||
    new Date(item.updated).toLocaleString().toLowerCase().includes(keyword)
  );

  renderTable(filtered);
});
