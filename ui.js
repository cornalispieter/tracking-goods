export function renderTable(data) {
  const tbody = document.getElementById("data-body");

  if (!data || data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center p-6 opacity-70">
          🔍 No items found.<br>Start scanning or adding items.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr class="hover:bg-[#1a2234] transition">
      <td class="p-4">${item.kodebarang}</td>
      <td class="p-4">${item.lokasi}</td>
      <td class="p-4">${new Date(item.updated).toLocaleString()}</td>
      <td class="p-4">
        <button onclick="showHistory('${item.kodebarang}')"
          class="px-4 py-2 bg-neon-blue text-black rounded shadow-neonSm font-medium hover:brightness-110">
          History
        </button>
      </td>
    </tr>
  `).join("");
}

export function clearInputs() {
  document.getElementById("kodebarang").value = "";
  document.getElementById("lokasi").value = "";
}

export function exportToCSV(data) {
  if (!data || data.length === 0) return alert("Tidak ada data!");

  const header = ["kodebarang", "lokasi", "updated"];
  const rows = data.map(i => [i.kodebarang, i.lokasi, new Date(i.updated).toLocaleString()]);

  let csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map(e => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "tracking-goods.csv";
  link.click();
}
