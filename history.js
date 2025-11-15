import { loadHistory } from './db.js';

export async function showHistory(kodebarang) {
  const modal = document.getElementById("historyModal");
  const container = document.getElementById("historyContent");

  container.innerHTML = `<h3>History for: ${kodebarang}</h3>`;

  const data = await loadHistory(kodebarang);

  if (!data.length) {
    container.innerHTML += `<p>No history found.</p>`;
  } else {
    container.innerHTML += `
      <table class="history-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
                <tr>
                  <td>${row.lokasi}</td>
                  <td>${new Date(row.updated).toLocaleString()}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  modal.style.display = "block";
}

export function attachHistoryClose() {
  document.getElementById("closeHistory").onclick = () => {
    document.getElementById("historyModal").style.display = "none";
  };
}

// 🔥 FIX untuk error showHistory is not defined
window.showHistory = showHistory;
