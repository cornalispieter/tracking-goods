// data.js — TABLE FIX VERSION

let summaryRows = [];

// Load unique items
async function loadSummaryList(tableBody, summaryCount, emptyState) {
  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  // unique per code
  const map = new Map();

  data.forEach((row) => {
    const exist = map.get(row.code);
    if (!exist) map.set(row.code, row);
    else if (new Date(row.updated_at) > new Date(exist.updated_at))
      map.set(row.code, row);
  });

  summaryRows = [...map.values()].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  renderSummaryList(tableBody, summaryCount, emptyState);
}

// Render table
function renderSummaryList(tableBody, summaryCount, emptyState) {
  const dict = window.translations[window.currentLang];
  const search = (document.getElementById("search-input")?.value || "").trim().toLowerCase();

  const rows = summaryRows.filter((r) => {
    return (
      r.code.toLowerCase().includes(search) ||
      r.location.toLowerCase().includes(search)
    );
  });

  summaryCount.textContent = rows.length;

  if (rows.length === 0) {
    emptyState.style.display = "block";
    tableBody.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  tableBody.innerHTML = rows
    .map((r) => {
      const ts = new Date(r.updated_at).toLocaleString();
      return `
        <tr>
          <td>${r.code}</td>
          <td>${r.location}</td>
          <td>${ts}</td>
          <td>
            <button class="btn-history" onclick="openHistoryForCode('${r.code}')">⋯</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// Save update
async function saveUpdateToSupabase(code, location) {
  const { error } = await supabaseClient.from("goods_updates").insert([
    {
      code,
      location,
      updated_at: new Date().toISOString(),
    },
  ]);

  return !error;
}

// HISTORY TABLE
async function loadHistoryForCode(code, historyList, codeLabel, countTag) {
  const dict = window.translations[window.currentLang];

  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  codeLabel.textContent = code;
  countTag.textContent = data.length;

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
}
