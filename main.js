import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';

// Load data when page loads
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  renderTable(data);

  // Button events
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarang = document.getElementById('kodebarang').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();

    if (!kodebarang || !lokasi) return alert('Isi kedua field!');

    await saveRecord(kodebarang, lokasi);
    const updated = await loadData();
    renderTable(updated);
    clearInputs();
  };

  document.getElementById('scanBtn').onclick = () => {
    startScanner();
  };
});