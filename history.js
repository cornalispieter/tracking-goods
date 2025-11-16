// history.js FINAL — With full logic + title “History : kodebarang”
import { loadHistory } from "./db.js";
import { LANG } from "./lang.js";

// ============================
// GLOBAL STATE
// ============================
let historyData = [];
let originalHistoryData = [];
let historyPage = 1;
const historyPageSize = 20;
let activeKodebarang = "";  // <-- keep kodebarang for title

// ============================
// GET DATA BERDASARKAN PAGE
// ============================
function getPagedHistory() {
  const start = (historyPage - 1) * historyPageSize;
  return historyData.slice(start, start + historyPageSize);
}

// ============================
// RENDER TABLE HISTORY
// ============================
function renderHistoryTable() {
  const container = document.getElementById("historyContent");
  const pageData = getPagedHistory();
  const currentLang = localStorage.getItem("app-lang") || "en";

  // HISTORY TITLE UPDATED
  const titleHTML = `
    <h3 class="text-xl mb-3 text-neon-blue font-semibold">
      ${LANG[currentLang].tableHistory} : 
      <span class="text-white">${activeKodebarang}</span>
    </h3>
  `;

  container.innerHTML = `
    ${titleHTML}

    <div class="flex mb-4 gap-3">
      <input id="historyDate" type="date"
        class="px-3 py-2 bg-[#0f1624] border border-neon-blue rounded text-white" />

      <button id="searchHistoryBtn"
        class="px-4 py-2 bg-neon-blue text-black rounded font-semibold shadow-neonSm">
        ${LANG[currentLang].searchDate}
      </button>
    </div>

    <table class="w-full text-left border border-[#1f2937] rounded overflow-hidden">
      <thead class="bg-[#1e2636] text-gray-300">
        <tr>
          <th class="p-3">${LANG[currentLang].tableLocation}</th>
          <th class="p-3">${LANG[currentLang].tableUpdated}</th>
        </tr>
      </thead>
      <tbody>
        ${
          pageData.length > 0
            ? pageData.map(row => `
                <tr class="hover:bg-[#1a2234]">
                  <td class="p-3">${row.lokasi}</td>
                  <td class="p-3">${new Date(row.updated).toLocaleString()}</td>
                </tr>
              `).join("")
            : `
              <tr>
                <td colspan="2" class="text-center py-4 text-gray-400">
                  ${LANG[currentLang].noData}
                </td>
              </tr>
            `
        }
      </tbody>
    </table>

    <div id="historyPagination" class="mt-4 flex justify-center gap-3"></div>
  `;

  attachHistorySearch();
  renderHistoryPagination();
}

// ============================
// PAGINATION CONTROLS
// ============================
function renderHistoryPagination() {
  const totalPages = Math.ceil(historyData.length / historyPageSize);
  const box = document.getElementById("historyPagination");

  box.innerHTML = `
    <button id="historyPrev"
      class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">Prev</button>

    <span class="px-3 py-1 bg-[#0f1624] border border-neon-blue rounded shadow-neonSm text-white">
      Page ${historyPage} / ${totalPages}
    </span>

    <button id="historyNext"
      class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white">Next</button>
  `;

  document.getElementById("historyPrev").onclick = () => {
    if (historyPage > 1) {
      historyPage--;
      renderHistoryTable();
    }
  };

  document.getElementById("historyNext").onclick = () => {
    if (historyPage < totalPages) {
      historyPage++;
      renderHistoryTable();
    }
  };
}

// ============================
// HISTORY SEARCH BY DATE
// ============================
function attachHistorySearch() {
  const btn = document.getElementById("searchHistoryBtn");
  const dateInput = document.getElementById("historyDate");

  btn.onclick = () => {
    const selected = dateInput.value;

    if (!selected) {
      historyData = [...originalHistoryData];
    } else {
      historyData = originalHistoryData.filter(row =>
        row.updated.startsWith(selected)
      );
    }

    historyPage = 1;
    renderHistoryTable();
  };
}

// ============================
// SHOW HISTORY (ENTRY POINT)
// ============================
export async function showHistory(kodebarang) {
  historyPage = 1;
  activeKodebarang = kodebarang; // <-- SAVE FOR TITLE

  showLoading();
  originalHistoryData = await loadHistory(kodebarang);
  historyData = [...originalHistoryData];
  hideLoading();

  renderHistoryTable();
  document.getElementById("historyModal").classList.remove("hidden");
}

// ============================
// CLOSE BUTTON
// ============================
document.getElementById("closeHistory").onclick = () =>
  document.getElementById("historyModal").classList.add("hidden");

// MAKE GLOBAL
window.showHistory = showHistory;
