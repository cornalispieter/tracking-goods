// data.js — FIXED VERSION

let summaryRows = [];

// Load summary (unique codes)
async function loadSummaryList(tableBody, summaryCount, emptyState) {
  try {
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("code, location, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Load error:", error);
      return;
    }

    const map = new Map();

    data.forEach((row) => {
      if (!row.code) return;
      const exist = map.get(row.code);

      if (!exist) map.set(row.code, row);
      else {
        if (new Date(row.updated_at) > new Date(exist.updated_at)) {
          map.set(row.code, row);
        }
      }
    });

    summaryRows = Array.from(map.values());

    summaryRows.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    renderSummaryList(tableBody, summaryCount, emptyState);

  } catch (err) {
    console.error("Fatal:", err);
  }
}

// Render list
function renderSummaryList(tableBody, summaryCount, emptyState) {
  const dict = window.translations[window.currentLang];
  const search = (document.getElementById("search-input")?.value || "")
    .toLowerCase()
    .trim();

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
            <button class="btn btn-small" onclick="openHistoryForCode('${r.code}')">
              ⋯
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// Save
async function saveUpdateToSupabase(code, location) {
  try {
    const { error } = await supabaseClient.from("goods_updates").insert([
      {
        code: code,
        location: location,
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Load history
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
