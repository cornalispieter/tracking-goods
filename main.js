import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';
import { attachHistoryClose } from './history.js';
import { exportToCSV } from './ui.js';
import { renderTable, clearInputs, showToast } from './ui.js';



document.addEventListener('DOMContentLoaded', async () => {

  // ===========================
  // LOAD DATA
  // ===========================
  let data = await loadData();
  renderTable(data);

  // ===========================
  // SAVE BUTTON
  // ===========================
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarang = document.getElementById('kodebarang').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();

    if (!kodebarang || !lokasi) {
      alert('Isi kedua field!');
      return;
    }

    await saveRecord(kodebarang, lokasi);
    data = await loadData();
    renderTable(data);
    clearInputs();
    showToast("Data berhasil disimpan!");
  };

  // ===========================
  // SCAN BUTTON (KODE)
  // ===========================
  const scanKodeBtn = document.getElementById('scanKodeBtn');
  if (scanKodeBtn) {
    scanKodeBtn.onclick = () => startScanner('kodebarang');
  }

  // ===========================
  // SCAN BUTTON (LOKASI)
  // ===========================
  const scanLokasiBtn = document.getElementById('scanLokasiBtn');
  if (scanLokasiBtn) {
    scanLokasiBtn.onclick = () => startScanner('lokasi');
  }

  // ===========================
  // FAB SCAN BUTTON
  // ===========================
  const fabScan = document.getElementById('fab-scan');
  if (fabScan) {
    fabScan.onclick = () => startScanner('kodebarang');
  }

  // ===========================
  // REALTIME SEARCH
  // ===========================
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();

      const filtered = data.filter(item =>
        item.kodebarang.toLowerCase().includes(keyword) ||
        item.lokasi.toLowerCase().includes(keyword) ||
        new Date(item.updated).toLocaleString().toLowerCase().includes(keyword)
      );

      renderTable(filtered);
    });
  }  // <--- CLOSE IF

  // ===========================
  // HISTORY MODAL CLOSE
  // ===========================
  attachHistoryClose();

  const exportCsvBtn = document.getElementById('exportCsvBtn');
if (exportCsvBtn) {
  exportCsvBtn.onclick = () => exportToCSV(data);
}

}); // <--- CLOSE DOMContentLoaded
