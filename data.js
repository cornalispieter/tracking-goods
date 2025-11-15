/* ============================================================
   data.js — Supabase + Data Rendering
   ============================================================ */

let summaryRows = [];

/* Load summary list */
async function loadSummaryList() {
  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");

  const { data, error } = await window.supabaseClient
    .from("goods_updates")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Supabase load error:", error);
    return;
  }

  const map = new Map();
  data.forEach((row) => {
    if (!map.has(row.code)) {
      map.set(row.code, row);
    } else {
      const current = map.get(row.code);
      if (new Date(row.updated_at) > new Date(current.updated_at)) {
        map.set(row.code, row);
      }
    }
  });

  summaryRows = [...map.values()].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  renderSummaryList();
}

/* Render table */
function renderSummaryList() {
  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");

  const dict = translations[currentLang];
  const search = document.getElementById("search-input").value.toLowerCase();

  const filtered = summaryRows.filter((r) => {
    return (
      r.code.toLowerCase().includes(search) ||
      r.location.toLowerCase().includes(search)
    );
  });

  summaryCount.textContent = filtered.length;

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    tableBody.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  tableBody.innerHTML = filtered
    .map((row) => {
      return `
      <tr>
        <td>${row.code}</td>
        <td>${row.location}</td>
        <td>${new Date(row.updated_at).toLocaleString()}</td>
        <td><button class="btn-history" onclick="openHistoryForCode('${row.code}')">⋯</button></td>
      </tr>
    `;
    })
    .join("");
}

/* Save */
async function saveUpdateToSupabase(code, location) {
  const { error } = await window.supabaseClient.from("goods_updates").insert([
    {
      code,
      location,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Save error:", error);
    return false;
  }
  return true;
}

/* Open history */
async function openHistoryForCode(code) {
  const modal = document.getElementById("history-modal");
  const historyList = document.getElementById("history-list");
  const dict = translations[currentLang];

  const { data, error } = await window.supabaseClient
    .from("goods_updates")
    .select("*")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("History error:", error);
    return;
  }

  document.getElementById("history-code-label").textContent = code;
  document.getElementById("history-count-tag").textContent =
    data.length + " " + dict.historyCountLabel;

  historyList.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>${dict.colLocation}</th>
          <th>${dict.colTime}</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (row) => `
          <tr>
            <td>${row.location}</td>
            <td>${new Date(row.updated_at).toLocaleString()}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  modal.classList.add("show");
}

document.getElementById("close-history").onclick = () => {
  document.getElementById("history-modal").classList.remove("show");
};

document.getElementById("search-input").oninput = renderSummaryList;
