// Render table with History buttons (modern UI)
export function renderTable(data) {
  const tbody = document.getElementById("data-body");

  if (!data || data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:25px; opacity:0.7;">
          🔍 No items found.<br>
          Start scanning or adding items.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data
    .map(
      (item) => `
      <tr class="row-item">
        <td>${item.kodebarang}</td>
        <td>${item.lokasi}</td>
        <td>${new Date(item.updated).toLocaleString()}</td>

        <td>
          <button class="btn-history" onclick="showHistory('${item.kodebarang}')">
            📜 History
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Clear inputs after save
export function clearInputs() {
  document.getElementById("kodebarang").value = "";
  document.getElementById("lokasi").value = "";
}
export function exportToCSV(data) {
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diexport!");
    return;
  }

  const header = ["kodebarang", "lokasi", "updated"];
  const rows = data.map(item => [
    item.kodebarang,
    item.lokasi,
    new Date(item.updated).toLocaleString()
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [header, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "tracking-goods.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
