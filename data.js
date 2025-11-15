// data.js — NEW CLEAN VERSION

// This will contain processed summary rows (unique codes)
let summaryRows = [];

// LOAD ALL ITEMS → then render
async function loadSummaryList(tableBody, summaryCount, emptyState) {
  try {
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("code, location, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase load error:", error);
      return;
    }

    // Group by "code", keep latest
    const map = new Map();
    data.forEach((row) => {
      if (!row.code) return;

      const existing = map.get(row.code);
      if (!existing) {
        map.set(row.code, row);
      } else {
        const a = new Date(existing.updated_at).getTime();
        const b = new Date(row.updated_at).getTime();
        if (b > a) map.set(row.code, row);
      }
    });

    summaryRows = Array.from(map.values());

    // Sort by updated time (latest top)
    summaryRows.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    renderSummaryList(tableBody, summaryCount, emptyState);

  } catch (err) {
    console.error("loadSummaryList fatal:", err);
  }
}


// RENDER SUMMARY LIST
function renderSummaryList(tableBody, summaryCount, emptyState) {
  const keyword = (document.getElementById("search-input")?.value || "")
    .trim()
    .toLowerCase();

  const dict = window.translations[window.currentLang];

  // Filter rows
  const rows = summaryRows.filter((r) => {
    if (!keyword) return true;
    return (
      r.code.toLowerCase().includes(keyword) ||
      r.location.toLowerCase().includes(keyword)
    );
  });

  // Update count
  summaryCount.textContent = rows.length;

  // Empty state
  if (rows.length === 0) {
    emptyState.style.display = "block";
    tableBody.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  // Render table rows
  tableBody.innerHTML = rows
    .map((r) => {
      const ts = new Date(r.updated_at).toLocaleString();

      return `
        <tr>
          <td>${r.code}</td>
          <td>${r.location}</td>
          <td>${ts}</td>
          <td>
            <button class="btn btn-small" onclick="openHistoryForCode('${r.code}')">
              ${dict.btnViewHistory}
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}



// SAVE UPDATE TO SUPABASE  
async function saveUpdateToSupabase(code, location) {
  try {
    const { error } = await supabaseClient.from("goods_updates").insert([
      {
        code: code,
        location: location,
        updated_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error("Save error:", error);
      return false;
    }

    return true;

  } catch (err) {
    console.error("Save fatal:", err);
    return false;
  }
}



// LOAD FULL HISTORY FOR ONE CODE
async function loadHistoryForCode(code, historyList, codeLabel, countTag) {
  const dict = window.translations[window.currentLang];

  codeLabel.textContent = code;

  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("location, updated_at")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  countTag.textContent = data.length;

  historyList.innerHTML = data
    .map((r) => {
      const ts = new Date(r.updated_at).toLocaleString();
      return `
        <div class="history-item">
          <div><strong>${dict.colLocation}:</strong> ${r.location}</div>
          <div><strong>${dict.colTime}:</strong> ${ts}</div>
        </div>
      `;
    })
    .join("");
}



// EXPORT SUMMARY TO CSV
async function exportSummaryToCsv() {
  try {
    const dict = window.translations[window.currentLang];

    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("code, location, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      alert(dict.toastErrorLoad);
      return;
    }

    if (!data || data.length === 0) {
      alert(dict.toastExportNoData);
      return;
    }

    // Group per code
    const byCode = new Map();
    data.forEach((row) => {
      const existing = byCode.get(row.code);
      if (!existing) byCode.set(row.code, row);
    });

    const summary = Array.from(byCode.values());

    const header = [
      '"' + dict.colCode + '"',
      '"' + dict.colLocation + '"',
      '"' + dict.colTime + '"'
    ];

    const rows = summary.map((r) => {
      return [
        `"${r.code}"`,
        `"${r.location}"`,
        `"${new Date(r.updated_at).toLocaleString()}"`
      ].join(",");
    });

    const csv = [header.join(","), ...rows].join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "goods-tracking.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

  } catch (err) {
    console.error("CSV export fatal:", err);
    alert("Failed to export CSV.");
  }
}
