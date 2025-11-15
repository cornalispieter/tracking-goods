let cachedRows = [];

async function loadData() {
  const { data, error } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) return console.error(error);

  const map = new Map();
  data.forEach(row => {
    if (!map.has(row.code) || new Date(row.updated_at) > new Date(map.get(row.code).updated_at)) {
      map.set(row.code, row);
    }
  });

  cachedRows = [...map.values()];

  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("data-body");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("item-count");
  const search = document.getElementById("search-input").value.toLowerCase();

  const rows = cachedRows.filter(r =>
    r.code.toLowerCase().includes(search) ||
    r.location.toLowerCase().includes(search)
  );

  count.textContent = rows.length;

  if (rows.length === 0) {
    empty.classList.remove("hidden");
    tbody.innerHTML = "";
    return;
  }

  empty.classList.add("hidden");

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.code}</td>
      <td>${r.location}</td>
      <td>${new Date(r.updated_at).toLocaleString()}</td>
      <td>
        <button class="btn-history" onclick="openHistory('${r.code}')">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

async function saveData(code, location) {
  await supabaseClient.from("goods_updates").insert([
    { code, location, updated_at: new Date().toISOString() }
  ]);

  loadData();
}

/* EXPORT CSV */
function exportCSV() {
  if (cachedRows.length === 0) return alert("No data");

  const lines = ["code,location,updated_at"];
  cachedRows.forEach(r => {
    lines.push(`${r.code},${r.location},${r.updated_at}`);
  });

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tracking_export.csv";
  a.click();

  URL.revokeObjectURL(url);
}

/* HISTORY MODAL */
async function openHistory(code) {
  const modal = document.getElementById("history-modal");
  const body = document.getElementById("history-body");
  const label = document.getElementById("history-code");
  const count = document.getElementById("history-count");

  const { data } = await supabaseClient
    .from("goods_updates")
    .select("*")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  label.textContent = code;
  count.textContent = `${data.length} logs`;

  body.innerHTML = data.map(r => `
    <div class="history-row">
      <div><b>${r.location}</b></div>
      <div>${new Date(r.updated_at).toLocaleString()}</div>
    </div>
  `).join("");

  modal.classList.remove("hidden");
}

document.getElementById("close-history").onclick = () =>
  document.getElementById("history-modal").classList.add("hidden");
