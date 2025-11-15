// data.js

let summaryRows = [];

// save 1 update ke Supabase
async function saveUpdateToSupabase(code, location) {
  try {
    const { error } = await supabaseClient
      .from("goods_updates")
      .insert([{ code, location }]);
    if (error) {
      console.error("Supabase insert error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unexpected error saving update:", err);
    return false;
  }
}

// load list unik per code
async function loadSummaryList(tableBody, summaryCountEl, emptyStateEl) {
  try {
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      alert(window.translations[window.currentLang].toastErrorLoad);
      return;
    }

    const byCode = new Map();
    (data || []).forEach((row) => {
      if (!row.code) return;
      const existing = byCode.get(row.code);
      if (!existing) {
        byCode.set(row.code, row);
      } else {
        const a = new Date(existing.updated_at).getTime();
        const b = new Date(row.updated_at).getTime();
        if (b > a) byCode.set(row.code, row);
      }
    });

    summaryRows = Array.from(byCode.values()).sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    });

    renderSummaryList(tableBody, summaryCountEl, emptyStateEl);
  } catch (err) {
    console.error("Unexpected error loading list:", err);
    alert(window.translations[window.currentLang].toastErrorLoad);
  }
}

// render list di table
function renderSummaryList(tableBody, summaryCountEl, emptyStateEl) {
  if (!tableBody || !summaryCountEl || !emptyStateEl) return;

  const dict = window.translations[window.currentLang];
  const searchInput = document.getElementById("search-input");
  const term = (searchInput?.value || "").trim().toLowerCase();

  let filtered = summaryRows;
  if (term) {
    filtered = summaryRows.filter((row) => {
      const code = (row.code || "").toLowerCase();
      const loc = (row.location || "").toLowerCase();
      return code.includes(term) || loc.includes(term);
    });
  }

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    emptyStateEl.style.display = "block";
    const span = emptyStateEl.querySelector("[data-i18n='emptyState']");
    if (span) {
      span.textContent = term ? dict.noResultsSearch : dict.emptyState;
    }
  } else {
    emptyStateEl.style.display = "none";
  }

  filtered.forEach((row) => {
    const tr = document.createElement("div");
    tr.className = "table-row";

    const codeCell = document.createElement("div");
    codeCell.className = "badge-code";
    codeCell.textContent = row.code;

    const locCell = document.createElement("div");
    locCell.className = "badge-location";
    locCell.textContent = row.location || "-";

    const timeCell = document.createElement("div");
    timeCell.className = "badge-time";
    const ts = row.updated_at
      ? new Date(row.updated_at).toLocaleString()
      : "";
    timeCell.textContent = ts;

    const actionCell = document.createElement("div");
    const historyBtn = document.createElement("button");
    historyBtn.className = "btn-history";
    historyBtn.textContent = "⋯";
    historyBtn.title = "View history";
    historyBtn.addEventListener("click", () => {
      window.openHistoryForCode(row.code);
    });
    actionCell.appendChild(historyBtn);

    tr.appendChild(codeCell);
    tr.appendChild(locCell);
    tr.appendChild(timeCell);
    tr.appendChild(actionCell);

    tableBody.appendChild(tr);
  });

  summaryCountEl.textContent = filtered.length.toString();
}

// load history per code
async function loadHistoryForCode(
  code,
  historyListEl,
  historyCodeLabelEl,
  historyCountTagEl
) {
  try {
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("*")
      .eq("code", code)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase history error:", error);
      alert(window.translations[window.currentLang].toastErrorHistory);
      return;
    }

    const dict = window.translations[window.currentLang];
    historyListEl.innerHTML = "";
    historyCodeLabelEl.textContent = code;

    const header = document.createElement("div");
    header.className = "history-table-header";
    const hCode = document.createElement("div");
    hCode.textContent = dict.colCode;
    const hLoc = document.createElement("div");
    hLoc.textContent = dict.colLocation;
    const hTime = document.createElement("div");
    hTime.textContent = dict.colTime;
    header.appendChild(hCode);
    header.appendChild(hLoc);
    header.appendChild(hTime);
    historyListEl.appendChild(header);

    (data || []).forEach((row) => {
      const r = document.createElement("div");
      r.className = "history-row";

      const cCode = document.createElement("div");
      cCode.className = "history-code";
      cCode.textContent = row.code;

      const cLoc = document.createElement("div");
      cLoc.className = "history-location";
      cLoc.textContent = row.location || "-";

      const cTime = document.createElement("div");
      cTime.className = "history-time";
      const ts = row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : "";
      cTime.textContent = ts;

      r.appendChild(cCode);
      r.appendChild(cLoc);
      r.appendChild(cTime);
      historyListEl.appendChild(r);
    });

    historyCountTagEl.textContent = `${data?.length || 0} ${
      dict.historyCountLabel
    }`;
  } catch (err) {
    console.error("Unexpected error loading history:", err);
    alert(window.translations[window.currentLang].toastErrorHistory);
  }
}
