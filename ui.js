// ui.js - UI Rendering Helpers

// Render main data into table (unique latest records)
function renderMainTable(records) {
    const tbody = document.getElementById("dataBody");
    tbody.innerHTML = "";

    records.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.kodebarang}</td>
            <td>${row.lokasi}</td>
            <td>${new Date(row.updated_at).toLocaleString()}</td>
            <td><button class="history-btn" onclick="loadHistory('${row.kodebarang}')"><i class='fa fa-clock'></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Render history table
function renderHistoryTable(records) {
    const tbody = document.getElementById("historyBody");
    tbody.innerHTML = "";

    records.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.kodebarang}</td>
            <td>${row.lokasi}</td>
            <td>${new Date(row.updated_at).toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Search filter
function filterSearch(term) {
    const rows = document.querySelectorAll("#dataBody tr");
    rows.forEach(tr => {
        tr.style.display = tr.innerText.toLowerCase().includes(term.toLowerCase()) ? "" : "none";
    });
}

// Export CSV
function exportCSV() {
    let rows = [];
    document.querySelectorAll("#dataBody tr").forEach(tr => {
        const cols = [...tr.children].map(td => td.innerText);
        rows.push(cols.join(","));
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tracking_data.csv";
    a.click();
}

// Export functions to global use
window.renderMainTable = renderMainTable;
window.renderHistoryTable = renderHistoryTable;
window.filterSearch = filterSearch;
window.exportCSV = exportCSV;