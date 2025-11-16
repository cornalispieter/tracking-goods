// main.js FINAL VERSION
import { loadData, saveRecord } from './db.js';
import { renderTable, clearInputs } from './ui.js';
import { startScanner } from './scan.js';
import { exportToCSV } from './ui.js';
import { LANG } from './lang.js';
import { cleanScannedCode } from './utils.js';

// ============================
// LANGUAGE
// ============================
let currentLang = localStorage.getItem("app-lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("app-lang", lang);
}

// apply language to UI
function applyLanguageToUI() {
  const t = LANG[currentLang];

  const title = document.getElementById("labelAppTitle");
  if (title) title.textContent = t.appTitle;

  const kodeInput = document.getElementById("kodebarang");
  if (kodeInput) kodeInput.placeholder = t.formItemCode;

  const lokasiInput = document.getElementById("lokasi");
  if (lokasiInput) lokasiInput.placeholder = t.formLocation;

  const saveBtnLabel = document.getElementById("labelSaveBtn");
  if (saveBtnLabel) saveBtnLabel.textContent = t.formSave;

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  const exportBtnLabel = document.getElementById("labelExportBtn");
  if (exportBtnLabel) exportBtnLabel.textContent = t.exportCsv;

  const thItemCode = document.getElementById("thItemCode");
  if (thItemCode) thItemCode.textContent = t.tableItemCode;

  const thLocation = document.getElementById("thLocation");
  if (thLocation) thLocation.textContent = t.tableLocation;

  const thUpdated = document.getElementById("thUpdated");
  if (thUpdated) thUpdated.textContent = t.tableUpdated;

  const thHistory = document.getElementById("thHistory");
  if (thHistory) thHistory.textContent = t.tableHistory;
}

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

// ============================
// MAIN LOAD
// ============================
document.addEventListener('DOMContentLoaded', async () => {

  // LANGUAGE
  const langSelect = document.getElementById("languageSelect");
  langSelect.value = currentLang;
  applyLanguageToUI();

  langSelect.onchange = () => {
    setLanguage(langSelect.value);
    applyLanguageToUI();
  };

  // LOAD SUMMARY
  showLoading();
  data = await loadData();
  hideLoading();

  currentPage = 1;
  renderTable(getPagedData());
  renderPaginationControls();

  // SAVE BUTTON
  document.getElementById('saveBtn').onclick = async () => {
    const kodebarangRaw = document.getElementById('kodebarang').value.trim();
    const lokasiRaw     = document.getElementById('lokasi').value.trim();

    // Clean QR format!
    const kodebarang = cleanScannedCode(kodebarangRaw);
    const lokasi     = lokasiRaw.trim();  

    if (!kodebarang) return showError("errorKodeEmpty");
    if (!lokasi)     return showError("errorLokasiEmpty");

    showLoading();
    await saveRecord(kodebarang, lokasi);
    data = await loadData();
    hideLoading();

    currentPage = 1;
    renderTable(getPagedData());
    renderPaginationControls();
    clearInputs();

    showSuccess("successSave");
  };

  // SCAN BUTTONS
  document.getElementById('scanKodeBtn').onclick  = () => startScanner('kodebarang');
  document.getElementById('scanLokasiBtn').onclick = () => startScanner('lokasi');
  document.getElementById('fab-scan').onclick      = () => startScanner('kodebarang');

  // SEARCH LIVE
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
function showSuccess(key) {
  const message = LANG[currentLang][key];
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-neon-blue text-black px-5 py-3 rounded-xl shadow-neon font-semibold";

  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1600);
}

// ============================
// POPUP ERROR
// ============================
function showError(key) {
  const message = LANG[currentLang][key];
  const popup = document.createElement("div");
  popup.className =
    "fixed top-6 right-6 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg font-semibold";

  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1800);
}

// ============================
// LOADING
// ============================
function showLoading() {
  document.getElementById("loadingOverlay").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.add("hidden");
}

window.showLoading = showLoading;
window.hideLoading = hideLoading;
