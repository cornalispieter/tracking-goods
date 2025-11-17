// src/ui/ui.table.js
// ===================================================================
// Summary Table Renderer
// Works with pagination & search from main.js
// ===================================================================

import { formatDateTime } from "../modules/utils.js";
import { openHistoryModal } from "../modules/history.js";

// ===================================================================
// RENDER TABLE (dipanggil dari main.js)
// ===================================================================
export function renderTable(list) {
  const tbody = document.getElementById("summary-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  list.forEach((item) => {
    const tr = document.createElement("tr");
    tr.className =
      "border-b border-[#1e2636] hover:bg-[#1a2234] transition";

    tr.innerHTML = `
      <td class="px-4 py-2 text-sm text-white">${item.kodebarang}</td>
      <td class="px-4 py-2 text-sm text-white">${item.lokasi}</td>
      <td class="px-4 py-2 text-sm text-neon-blue">
        ${formatDateTime(item.updated)}
      </td>
      <td class="px-4 py-2 text-center">
        <button 
          class="history-btn px-3 py-1 rounded-lg bg-neon-blue text-black shadow-neon hover:brightness-110 transition"
          data-kode="${item.kodebarang}">
          🔍
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  bindHistoryButtons();
}

// ===================================================================
// BIND HISTORY BUTTONS
// ===================================================================
function bindHistoryButtons() {
  const buttons = document.querySelectorAll(".history-btn");

  buttons.forEach((btn) => {
    btn.onclick = () => {
      const kode = btn.getAttribute("data-kode");
      openHistoryModal(kode);
    };
  });
}
