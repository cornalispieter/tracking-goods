// src/modules/history.js
// ================================================================
// Handles:
//  - Load history for specific kodebarang
//  - Pagination
//  - Search by date
//  - Rendering table inside modal
//  - Showing/hiding modal
//
// UI modal wrapper is created by ui.modal.js
// ================================================================

import { loadHistory as dbLoadHistory } from "./db.js";
import { LANG } from "../i18n/lang.js";
import { formatDateTime } from "./utils.js";

// ============================
// GLOBAL STATE
// ============================
let historyFullData = [];     // all history
let historyFiltered = [];     // filtered (search)
let activeKodebarang = "";    // used for title
let historyPage = 1;
const pageSize = 20;

// ============================
// PUBLIC ENTRY POINT
// ============================
export async function showHistory(kodebarang) {
  activeKodebarang = kodebarang;
  historyPage = 1;

  const modal = document.getElementById("historyModal");
  const content = document.getElementById("historyContent");
  const currentLang = localStorage.getItem("app-lang") || "en";

  // Display loading
  content.innerHTML = `
    <div class="text-center py-6 text-gray-300">
      ${LANG[currentLang].loading}
    </div>
  `;
  modal.classList.remove("hidden");

  // Load history from DB
  historyFullData = await dbLoadHistory(kodebarang);
  historyFiltered = [...historyFullData];

  renderHistoryTable();
}

// ============================
// RENDER FULL HISTORY TABLE
// ============================
function renderHistoryTable() {
  const container = document.getElementById("historyContent");
  const currentLang = localStorage.getItem("app-lang") || "en";

  const paged = getPagedData();

  container.innerHTML = `
    <!-- TITLE -->
    <h3 class="text-xl mb-4 font-semibold text-neon-blue">
      ${LANG[currentLang].historyTitle} : 
      <span class="text-white">${activeKodebarang}</span>
    </h3>

    <!-- SEARCH DATE -->
    <div class="flex gap-3 mb-4">
      <input id="historyDateInput"
        type="date"
        class="px-3 py-2 bg-[#0f1624] border border-neon-blue rounded text-white" />

      <button id="historySearchBtn"
        class="px-4 py-2 bg-neon-blue text-black rounded shadow-neonSm">
        ${LANG[currentLang].searchDate}
      </button>
    </div>

    <!-- TABLE -->
    <table class="w-full text-left border border-[#1f2937] rounded-xl overflow-hidden">
      <thead class="bg-[#1e2636] text-gray-300">
        <tr>
          <th class="p-3">${LANG[currentLang].tableLocation}</th>
          <th class="p-3 w-40">${LANG[currentLang].tableUpdated}</th>
        </tr>
      </thead>
      <tbody>
        ${paged.length > 0 ? paged.map(row => `
          <tr class="hover:bg-[#121a28] border-b border-[#1e2636]">
            <td class="p-3">${row.lokasi}</td>
            <td class="p-3">${formatDateTime(row.updated)}</td>
          </tr>
        `).join("") : `
          <tr>
            <td colspan="2" class="text-center py-4 text-gray-400">
              ${LANG[currentLang].noDataHistory}
            </td>
          </tr>
        `}
      </tbody>
    </table>

    <!-- PAGINATION -->
    <div class="mt-4 flex justify-center gap-3">
      <button id="historyPrev"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Prev
      </button>

      <span class="px-3 py-1 bg-[#0f1624] border border-neon-blue rounded shadow-neonSm text-white">
        Page ${historyPage} / ${Math.max(1, getTotalPages())}
      </span>

      <button id="historyNext"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Next
      </button>
    </div>
  `;

  attachHistoryEvents();
}

// ============================
// PAGINATION HELPERS
// ============================
function getTotalPages() {
  return Math.ceil(historyFiltered.length / pageSize);
}

function getPagedData() {
  const start = (historyPage - 1) * pageSize;
  return historyFiltered.slice(start, start + pageSize);
}

// ============================
// SEARCH + PAGINATION EVENT HANDLERS
// ============================
function attachHistoryEvents() {
  const currentLang = localStorage.getItem("app-lang") || "en";

  document.getElementById("historySearchBtn").onclick = () => {
    const selectedDate = document.getElementById("historyDateInput").value;

    if (!selectedDate) {
      historyFiltered = [...historyFullData];
    } else {
      historyFiltered = historyFullData.filter(h =>
        h.updated.startsWith(selectedDate)
      );
    }

    historyPage = 1;
    renderHistoryTable();
  };

  document.getElementById("historyPrev").onclick = () => {
    if (historyPage > 1) {
      historyPage--;
      renderHistoryTable();
    }
  };

  document.getElementById("historyNext").onclick = () => {
    if (historyPage < getTotalPages()) {
      historyPage++;
      renderHistoryTable();
    }
  };
}

// ================================================================
// MAKE FUNCTION AVAILABLE TO main.js / table.js
// ================================================================
export { showHistory };
window.showHistory = showHistory;
