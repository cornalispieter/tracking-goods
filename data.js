let cachedRows = [];

async function loadData() {
  const { data, error } = await window.supabaseClient
    .from("goods_updates")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) return console.error(error);

  const map = new Map();
  data.forEach(r => {
    if (!map.has(r.code) ||
        new Date(r.updated_at) > new Date(map.get(r.code).updated_at)) {
      map.set(r.code, r);
    }
  });

  cachedRows = [...map.values()];
  renderData();
}

function renderData() {
  const search = document.getElementById("search-input").value.toLowerCase();
  const tbody = document.getElementById("data-body");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("item-count");

  const filtered = cachedRows.filter(r =>
    r.code.toLowerCase().includes(search) ||
    r.location.toLowerCase().includes(search)
  );

  count.textContent = filtered.length;

  if (filtered.length === 0) {
    empty.classList.remove("hidden");
    tbody.innerHTML = "";
    return;
  }

  empty.classList.add("hidden");

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${r.code}</td>
      <td>${r.location}</td>
      <td>${new Date(r.updated_at).toLocaleString()}</td>
      <td><button class="btn-history" onclick="openHistory('${r.code}')">⋯</button></td>
    </tr>
  `).join("");
}

async function saveData(code, location) {
  await window.supabaseClient.from("goods_updates").insert([
    { code, location, updated_at: new Date().toISOString() }
  ]);
  loadData();
}

async function openHistory(code) {
  const { data } = await window.supabaseClient
    .from("goods_updates")
    .select("*")
    .eq("code", code)
    .order("updated_at", { ascending: false });

  document.getElementById("history-code").textContent = code;
  document.getElementById("history-count").textContent = data.length + " logs";

  document.getElementById("history-body").innerHTML = data.map(r => `
    <div>
      <b>${r.location}</b><br>
      ${new Date(r.updated_at).toLocaleString()}
    </div>
    <hr>
  `).join("");

  document.getElementById("history-modal").classList.remove("hidden");
}

document.getElementById("close-history").onclick = () =>
  document.getElementById("history-modal").classList.add("hidden");

document.getElementById("search-input").oninput = renderData;

/* EXPORT CSV */
function exportCSV() {
  if (cachedRows.length === 0) return alert("No data");

  const header = "code,location,updated_at\n";
  const rows = cachedRows.map(r =>
    `${r.code},${r.location},${r.updated_at}`
  ).join("\n");

  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tracking.csv";
  a.click();
}
