import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';
import { exportToCSV } from './ui.js';

// ============================
// GLOBAL STATE
// ============================
let data = [];
let currentPage = 1;
const pageSize = 20;

function getPagedData() {
  const start = (currentPage - 1) * pageSize;
  return data.slice(start, start + pageSize);
}

function renderPaginationControls() {
  const totalPages = Math.ceil(data.length / pageSize);
  const container = document.getElementById("pageControls");

  if (!container) return;

  container.innerHTML = `
    <div class="flex gap-3 justify-center mt-4">
      <button id="prevPage" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">Prev</button>
      <span class="px-4 py-2 bg-[#0f1624] border border-neon-blue rounded shadow-neonSm text-white">
        Page ${currentPage} / ${totalPages}
      </span>
      <button id="nextPage" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">Next</button>
    </div>
  `;

  document.getElementById("prevPage").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(getPagedData());
      renderPaginationControls();
    }
  };

  document.getElementById("nextPage").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(getPagedData());
      renderPaginationControls();
    }
  };
}

document.addEventListener('DOMContentLoaded', async () => {

  // LOAD DATA + RENDER PAGINATION
  showLoading();
  data = await loadData();
  hideLoading();
  currentPage = 1;
  renderTable(getPagedData());
  renderPaginationControls();

  // ============================
  // SAVE BUTTON + VALIDASI
  // ============================
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarang = document.getElementById('kodebarang').value.trim();
    const lokasi     = document.getElementById('lokasi').value.trim();

    if (!kodebarang) return showError("Kode barang tidak boleh kosong!");
    if (!lokasi)     return showError("Lokasi tidak boleh kosong!");
    showLoading();
    await saveRecord(kodebarang, lokasi);
    data = await loadData();
    hideLoading();
    currentPage = 1;

    renderTable(getPagedData());
    renderPaginationControls();
    clearInputs();
    showSuccess("Data Saved!");
  };

  // ============================
  // SCAN BUTTONS
  // ============================
  document.getElementById('scanKodeBtn').onclick  = () => startScanner('kodebarang');
  document.getElementById('scanLokasiBtn').onclick = () => startScanner('lokasi');
  document.getElementById('fab-scan').onclick      = () => startScanner('kodebarang');

  // ============================
  // REALTIME SEARCH
  // ============================
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = data.filter(item =>
      item.kodebarang.toLowerCase().includes(keyword) ||
      item.lokasi.toLowerCase().includes(keyword) ||
      new Date(item.updated).toLocaleString().toLowerCase().includes(keyword)
    );

    currentPage = 1;
    renderTable(filtered.slice(0, pageSize));
    renderPaginationControls();
  });

  // EXPORT CSV
  document.getElementById('exportCsvBtn').onclick = () => exportToCSV(data);

});

// ============================
// POPUP SUCCESS
// ============================
function showSuccess(message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-neon-blue text-black px-5 py-3 rounded-xl shadow-neon font-semibold transition";
  popup.textContent = message;

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1600);
}

// ============================
// POPUP ERROR
// ============================
function showError(message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg font-semibold";
  popup.textContent = message;

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1800);
}
// ============================
// GLOBAL LOADING SPINNER
// ============================
function showLoading() {
  document.getElementById("loadingOverlay").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.add("hidden");
}
window.showLoading = showLoading;
window.hideLoading = hideLoading;