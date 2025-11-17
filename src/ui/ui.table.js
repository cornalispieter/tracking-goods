import { formatDate } from "./utils.js";

//
// Render tabel summary
//
export function renderSummaryTable(list) {
  const tbody = document.getElementById("summary-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  list.forEach(item => {
    const tr = document.createElement("tr");
    tr.className = "border-b border-gray-700";

    tr.innerHTML = `
      <td class="px-3 py-2 text-sm">${item.kodebarang}</td>
      <td class="px-3 py-2 text-sm">${item.lokasi}</td>
      <td class="px-3 py-2 text-sm">${formatDate(item.updated)}</td>
      <td class="px-3 py-2 text-center">
        <button 
          class="history-btn bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm"
          data-kode="${item.kodebarang}">
          🔍
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
