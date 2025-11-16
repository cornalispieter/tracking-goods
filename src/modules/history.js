// src/modules/history.js
// ==================================================================
// Handles:
//   - Load history per kodebarang
//   - Pagination (20 per page)
//   - Search by date
//   - Rendering content inside modal
//
// UI modal wrapper is in: ui.modal.js
//
// 100% compatible with:
//   db.js, lang.js, ui.table.js, main.js
// ==================================================================

import { loadHistory as dbLoadHistory } from "./db.js";
import { LANG } from "../i18n/lang.js";
import { formatDateTime } from "./utils.js";

// ======================================================
// GLOBAL STATE
// ======================================================
let historyFullData = [];
let historyFiltered = [];
let activeKodebarang = "";
let page = 1;
const pageSize = 20;

// ======================================================
// PUBLIC ENTRY POINT
// ======================================================
export async function showHistory(kodebarang) {
  activeKodebarang = kodebarang;
  page = 1;

  const modal = document.getElementById("historyModal");
  const content = document.getElementById("historyContent");
  const currentLang = localStorage.getItem("app-lang") || "en";

  // Loading display
  content.innerHTML = `
    <div class="text-center py-6 text-gray-300">
      ${LANG[currentLang].loading}
    </div>
  `;
  modal.classList.remove("hidden");

  // Load from DB
  historyFullData = await dbLoadHistory(kodebarang);
  historyFiltered = [...historyFullData];

  renderHistoryTable();
}

// ======================================================
// RENDER FULL HISTORY TABLE
// ======================================================
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

    <!-- DATE SEARCH -->
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
          <th class="p-2">${LANG[currentLang].tableLocation}</th>
          <th class="p-2 w-40">${LANG[currentLang].tableUpdated}</th>
        </tr>
      </thead>

      <tbody>
        ${
          paged.length > 0
            ? paged
                .map(
                  (row) => `
          <tr class="hover:bg-[#121a28] border-b border-[#1e2636]">
            <td class="p-3">${row.lokasi}</td>
            <td class="p-3">${formatDateTime(row.updated)}</td>
          </tr>`
                )
                .join("")
            : `
          <tr>
            <td colspan="2" class="text-center py-4 text-gray-400">
              ${LANG[currentLang].noDataHistory}
            </td>
          </tr>`
        }
      </tbody>
    </table>

    <!-- PAGINATION -->
    <div class="mt-4 flex justify-center gap-3">
      <button id="historyPrev"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Prev
      </button>

      <span class="px-3 py-1 bg-[#0f1624] border border-neon-blue rounded shadow-neonSm text-white">
        Page ${page} / ${Math.max(getTotalPages(), 1)}
      </span>

      <button id="historyNext"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">
        Next
      </button>
    </div>
  `;

  attachHistoryEvents();
}

// ======================================================
// PAGINATION HELPERS
// ======================================================
function getTotalPages() {
  return Math.ceil(historyFiltered.length / pageSize);
}

function getPagedData() {
  const start = (page - 1) * pageSize;
  return historyFiltered.slice(start, start + pageSize);
}

// ======================================================
// EVENT HANDLERS (SEARCH + PAGINATION)
// ======================================================
function attachHistoryEvents() {
  // Search by date
  document.getElementById("historySearchBtn").onclick = () => {
    const selected = document.getElementById("historyDateInput").value;

    if (!selected) {
      historyFiltered = [...historyFullData];
    } else {
      historyFiltered = historyFullData.filter((h) =>
        h.updated.startsWith(selected)
      );
    }

    page = 1;
    renderHistoryTable();
  };

  // Prev page
  document.getElementById("historyPrev").onclick = () => {
    if (page > 1) {
      page--;
      renderHistoryTable();
    }
  };

  // Next page
  document.getElementById("historyNext").onclick = () => {
    if (page < getTotalPages()) {
      page++;
      renderHistoryTable();
    }
  };
}

// ======================================================
// MAKE AVAILABLE TO WINDOW (but NOT exported twice)
// ======================================================
window.showHistory = showHistory;
