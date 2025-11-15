/* ============================================================
   data.js — Supabase + Data Rendering
   ============================================================ */

/* Supabase client already created in db.js:
   const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
*/

let summaryRows = []; // cache untuk list utama


/* ============================================================
   LOAD SUMMARY (Unique per code)
   ============================================================ */
async function loadSummaryList() {
  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");

  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error loading:", error);
    return;
  }

  // unique per code → ambil update terbaru
  const map = new Map(); // key = code

  data.forEach((row) => {
    if (!map.has(row.code)) {
      map.set(row.code, row);
    } else {
      const existing = map.get(row.code);
      if (new Date(row.updated_at) > new Date(existing.updated_at)) {
        map.set(row.code, row);
      }
    }
  });

  summaryRows = [...map.values()].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  renderSummaryList(summaryRows, tableBody, summaryCount, emptyState);
}


/* ============================================================
   RENDER SUMMARY TABLE
   ============================================================ */
function renderSummaryList(rows, tableBody, summaryCount, emptyState) {
  const dict = translations[currentLang];

  const searchValue = document
    .getElementById("search-input")
    .value.toLowerCase();

  // filter by search
  const filtered = rows.filter((r) => {
    return (
      r.code.toLowerCase().includes(searchValue) ||
      r.location.toLowerCase().includes(searchValue)
    );
  });

  summaryCount.textContent = filtered.length;

  // no data
  if (filtered.length === 0) {
    emptyState.style.display = "block";
    tableBody.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  tableBody.innerHTML = filtered
    .map((r) => {
      const timestamp = new Date(r.updated_at).toLocaleString();
      return `
      <tr>
        <td>${r.code}</td>
        <td>${r.location}</td>
        <td>${timestamp}</td>
        <td>
          <button class="btn-history" onclick="openHistoryForCode('${r.code}')">
            ⋯
          </button>
        </td>
      </tr>
    `;
    })
    .join("");
}


/* ============================================================
   SAVE UPDATE
   ============================================================ */
async function saveUpdateToSupabase(code, location) {
  const { error } = await supabaseClient.from("goods_updates").insert([
    {
      code,
      location,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Save failed:", error);
    return false;
  }

  return true;
}


/* ============================================================
   LOAD HISTORY (Full list for specific code)
   ============================================================ */
async function openHistoryForCode(code) {
  const modal = document.getElementById("history-modal");
  const historyList = document.getElementById("history-list");
  const dict = translations[currentLang];
  const codeLabel = document.getElementById("history-code-label");
  const countLabel = document.getElementById("history-count-tag");

  codeLabel.textContent = code;

  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  countLabel.textContent = data.length + " " + dict.historyCountLabel;

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
          .map((r) => {
            return `
            <tr>
              <td>${r.location}</td>
              <td>${new Date(r.updated_at).toLocaleString()}</td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;

  modal.classList.add("show");
}


/* ============================================================
   CLOSE HISTORY MODAL
   ============================================================ */
document.getElementById("close-history").addEventListener("click", () => {
  document.getElementById("history-modal").classList.remove("show");
});


/* ============================================================
   SEARCH EVENT
   ============================================================ */
document.getElementById("search-input").addEventListener("input", () => {
  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");

  renderSummaryList(summaryRows, tableBody, summaryCount, emptyState);
});
