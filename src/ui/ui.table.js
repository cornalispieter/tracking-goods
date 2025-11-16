// src/ui/ui.table.js
// =====================================================
// UI generator for summary table (goods_summary)
// - Displays Item Code, Location, Updated, History button
// - Responsive (History text on desktop, 📜 icon on mobile)
// - Multi-language support
// =====================================================

import { LANG } from "../i18n/lang.js";
import { showHistory } from "../modules/history.js";

// Render summary table
export function renderTable(list) {
  const tbody = document.getElementById("data-body");
  const currentLang = localStorage.getItem("app-lang") || "en";

  tbody.innerHTML = "";

  if (!list || list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-4 text-gray-400">
          ${LANG[currentLang].noData}
        </td>
      </tr>
    `;
    return;
  }

  list.forEach(row => {
    const tr = document.createElement("tr");
    tr.className =
      "border-b border-[#1e2636] hover:bg-[#121a28] transition";

    tr.innerHTML = `
      <td class="p-3">${row.kodebarang}</td>
      <td class="p-3">${row.lokasi}</td>
      <td class="p-3">${new Date(row.updated).toLocaleString()}</td>

      <!-- HISTORY BUTTON (responsive) -->
      <td class="p-3 text-center">
        <button data-kode="${row.kodebarang}"
          class="bg-neon-blue px-2 py-1 rounded text-black flex justify-center items-center gap-1
                 hover:brightness-110 transition text-sm">

          <!-- Desktop label -->
          <span class="hidden md:inline">${LANG[currentLang].tableHistory}</span>

          <!-- Mobile icon -->
          <span class="md:hidden inline text-lg">📜</span>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Attach history button click events
  document.querySelectorAll("button[data-kode]").forEach(btn => {
    btn.onclick = () => showHistory(btn.dataset.kode);
  });
}
