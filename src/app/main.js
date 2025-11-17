// src/app/main.js
// ======================================================================
// Main Application Controller
// Handles:
//   - UI rendering (form, table, modal)
//   - Loading & refreshing summary data
//   - Pagination
//   - Search
//   - Language switching
//   - FAB Scan Button
//   - Realtime update listener
// ======================================================================

import { LANG } from "../i18n/lang.js";
import { loadData, subscribeRealtime } from "../modules/db.js";
import { renderFormUI } from "../ui/ui.form.js";
import { renderTable } from "../ui/ui.table.js";
import { renderHistoryModal } from "../ui/ui.modal.js";

// ======================================================================
// GLOBAL STATE
// ======================================================================
let summaryData = [];
let filteredData = [];
let page = 1;
const pageSize = 20;

// ======================================================================
// INIT APP
// ======================================================================
window.onload = async () => {
  initLanguage();
  renderFormUI();
  renderHistoryModal();

  await loadSummaryData(); // initial table load
  
  attachSearchBox();
  attachLanguageControl();
  attachFABScan();
  renderPagination();

  // Realtime listener from Supabase
  subscribeRealtime(async () => {
    await loadSummaryData(); // auto refresh when db changes
  });
};

// ======================================================================
// LOAD SUMMARY DATA FROM SUPABASE
// ======================================================================
async function loadSummaryData() {
  showLoading(true);

  summaryData = await loadData();
  filteredData = [...summaryData];
  page = 1;

  renderTablePage();
  renderPagination();

  showLoading(false);
}

// ======================================================================
// RENDER TABLE PAGE (20 rows per page)
// ======================================================================
function renderTablePage() {
  const start = (page - 1) * pageSize;
  const sliced = filteredData.slice(start, start + pageSize);

  renderTable(sliced);
}

// ======================================================================
// PAGINATION UI
// ======================================================================
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const container = document.getElementById("pageControls");

  if (!container) return;

  container.innerHTML = `
    <div class="flex justify-center gap-3 mt-4">
      <button id="prevPage"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Prev
      </button>

      <span class="px-3 py-1 bg-[#0f1624] border border-neon-blue
                   text-white rounded shadow-neonSm">
        Page ${page} / ${Math.max(totalPages, 1)}
      </span>

      <button id="nextPage"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Next
      </button>
    </div>
  `;

  document.getElementById("prevPage").onclick = () => {
    if (page > 1) {
      page--;
      renderTablePage();
      renderPagination();
    }
  };

  document.getElementById("nextPage").onclick = () => {
    if (page < totalPages) {
      page++;
      renderTablePage();
      renderPagination();
    }
  };
}

// ======================================================================
// SEARCH BOX (FILTER DATA)
// ======================================================================
function attachSearchBox() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.oninput = () => {
    const term = input.value.toLowerCase();

    filteredData = summaryData.filter(row =>
      row.kodebarang.toLowerCase().includes(term) ||
      row.lokasi.toLowerCase().includes(term)
    );

    page = 1;
    renderTablePage();
    renderPagination();
  };
}

// ======================================================================
// LANGUAGE CONTROL
// ======================================================================
function initLanguage() {
  if (!localStorage.getItem("app-lang")) {
    localStorage.setItem("app-lang", "en");
  }

  document.getElementById("languageSelect").value =
    localStorage.getItem("app-lang");

  applyLanguage();
}

function attachLanguageControl() {
  document.getElementById("languageSelect").onchange = () => {
    const newLang = document.getElementById("languageSelect").value;

    localStorage.setItem("app-lang", newLang);

    applyLanguage();
    renderFormUI();
    loadSummaryData(); // re-render table text
    renderHistoryModal();
  };
}

function applyLanguage() {
  const lang = localStorage.getItem("app-lang") || "en";

  document.getElementById("labelAppTitle").textContent =
    LANG[lang].appTitle;

  document.getElementById("searchInput").placeholder =
    LANG[lang].searchPlaceholder;

  document.getElementById("exportCsvBtn").textContent =
    LANG[lang].exportCsv;
}

// ======================================================================
// LOADING OVERLAY
// ======================================================================
function showLoading(state) {
  const overlay = document.getElementById("loadingOverlay");
  if (!overlay) return;

  if (state) overlay.classList.remove("hidden");
  else overlay.classList.add("hidden");
}

// ======================================================================
// FLOATING ACTION BUTTON (SCAN)
// ======================================================================
function attachFABScan() {
  const fab = document.getElementById("fab-scan");
  if (!fab) return;

  fab.onclick = () => startScanner("kodebarang");
}

// ======================================================================
// EXPORTS (used by ui.form.js after saving record)
// ======================================================================
export { loadSummaryData };
