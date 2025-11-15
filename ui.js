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
