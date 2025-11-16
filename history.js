import { loadHistory } from "./db.js";

export async function showHistory(kodebarang) {
  const modal = document.getElementById("historyModal");
  const container = document.getElementById("historyContent");

  const data = await loadHistory(kodebarang);

  container.innerHTML = `
    <h3 class="text-xl mb-3 text-neon-blue font-semibold drop-shadow">History for: ${kodebarang}</h3>
    <table class="w-full text-left border border-[#1f2937]">
      <thead class="bg-[#1e2636]">
        <tr>
          <th class="p-3">Location</th>
          <th class="p-3">Updated</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr class="hover:bg-[#1a2234]">
            <td class="p-3">${row.lokasi}</td>
            <td class="p-3">${new Date(row.updated).toLocaleString()}</td>
          </tr>`).join("")}
      </tbody>
    </table>
  `;

  modal.classList.remove("hidden");
}

document.getElementById("closeHistory").onclick = () =>
  document.getElementById("historyModal").classList.add("hidden");

// Biar global
window.showHistory = showHistory;
