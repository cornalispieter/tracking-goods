import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';
import { exportToCSV } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {

  let data = await loadData();
  renderTable(data);

  // ==================================================
  // SAVE BUTTON + VALIDASI INPUT
  // ==================================================
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarang = document.getElementById('kodebarang').value.trim();
    const lokasi     = document.getElementById('lokasi').value.trim();

    // VALIDASI
    if (!kodebarang) {
      showError("Kode barang tidak boleh kosong!");
      return;
    }

    if (!lokasi) {
      showError("Lokasi tidak boleh kosong!");
      return;
    }

    // SIMPAN
    await saveRecord(kodebarang, lokasi);
    data = await loadData();
    renderTable(data);
    clearInputs();
    showSuccess("Data Saved!");
  };

  // ==================================================
  // SCAN BUTTONS
  // ==================================================
  document.getElementById('scanKodeBtn').onclick  = () => startScanner('kodebarang');
  document.getElementById('scanLokasiBtn').onclick = () => startScanner('lokasi');
  document.getElementById('fab-scan').onclick      = () => startScanner('kodebarang');

  // ==================================================
  // REALTIME SEARCH
  // ==================================================
  document.getElementById("searchInput").addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = data.filter(item =>
      item.kodebarang.toLowerCase().includes(keyword) ||
      item.lokasi.toLowerCase().includes(keyword) ||
      new Date(item.updated).toLocaleString().toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  // ==================================================
  // EXPORT CSV
  // ==================================================
  document.getElementById('exportCsvBtn').onclick = () => exportToCSV(data);

});

// ==================================================
// POPUP SUCCESS (NEON BLUE)
// ==================================================
function showSuccess(message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-neon-blue text-black px-5 py-3 rounded-xl shadow-neon font-semibold transition";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 1600);
}

// ==================================================
// POPUP ERROR (MERAH NEON)
// ==================================================
function showError(message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg font-semibold";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 1800);
}
