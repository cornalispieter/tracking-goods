import { loadHistory } from "./db.js";

// ============================
// GLOBAL STATE
// ============================
let historyData = [];
let originalHistoryData = [];
let historyPage = 1;
const historyPageSize = 20;

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

  container.innerHTML = `
    <h3 class="text-xl mb-3 text-neon-blue font-semibold">History</h3>

    <div class="flex mb-4 gap-3">
      <input id="historyDate" type="date"
        class="px-3 py-2 bg-[#0f1624] border border-neon-blue rounded text-white" />
      <button id="searchHistoryBtn"
        class="px-4 py-2 bg-neon-blue text-black rounded font-semibold">
        Search Date
      </button>
    </div>

    <table class="w-full text-left border border-[#1f2937] rounded">
      <thead class="bg-[#1e2636]">
        <tr>
          <th class="p-3">Location</th>
          <th class="p-3">Updated</th>
        </tr>
      </thead>
      <tbody>
        ${
          pageData.map(row => `
            <tr class="hover:bg-[#1a2234]">
              <td class="p-3">${row.lokasi}</td>
              <td class="p-3">${new Date(row.updated).toLocaleString()}</td>
            </tr>
          `).join("")
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
  showLoading();
  originalHistoryData = await loadHistory(kodebarang);
  historyData = [...originalHistoryData];
  hideLoading();
  renderHistoryTable();
  document.getElementById("historyModal").classList.remove("hidden");
}

// CLOSE BUTTON
document.getElementById("closeHistory").onclick = () =>
  document.getElementById("historyModal").classList.add("hidden");

// MAKE GLOBAL
window.showHistory = showHistory;
