// ui.js FINAL — History icon update + responsive + cleaner UI

import { showHistory } from "./history.js";
import { LANG } from "./lang.js";

// Render summary table
export function renderTable(list) {
  const tbody = document.getElementById("data-body");
  tbody.innerHTML = "";

  const currentLang = localStorage.getItem("app-lang") || "en";

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

  list.forEach(item => {
    const tr = document.createElement("tr");
    tr.className = "border-b border-[#1e2636] hover:bg-[#121a28]";

    tr.innerHTML = `
      <td class="p-3">${item.kodebarang}</td>
      <td class="p-3">${item.lokasi}</td>
      <td class="p-3">${new Date(item.updated).toLocaleString()}</td>

      <td class="p-3 text-center">
        <button 
          class="bg-neon-blue px-2 py-1 rounded text-black flex justify-center items-center gap-1 
                 hover:brightness-110 transition text-sm"
          data-kode="${item.kodebarang}">
          
          <!-- Desktop label -->
          <span class="hidden md:inline">${LANG[currentLang].tableHistory}</span>
          
          <!-- Mobile icon -->
          <span class="md:hidden inline text-lg">📜</span>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Add click events to all history buttons
  document.querySelectorAll("button[data-kode]").forEach(btn => {
    btn.onclick = () => showHistory(btn.dataset.kode);
  });
}


export function clearInputs() {
  const kode = document.getElementById("kodebarang");
  const lokasi = document.getElementById("lokasi");

  if (kode) kode.value = "";
  if (lokasi) lokasi.value = "";
}


// Export CSV
export function exportToCSV(data) {
  if (!data || data.length === 0) return;

  const csvRows = [];
  csvRows.push("Item Code,Location,Updated");

  data.forEach(row => {
    csvRows.push(`${row.kodebarang},${row.lokasi},${row.updated}`);
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "tracking_export.csv";
  link.click();

  URL.revokeObjectURL(url);
}
