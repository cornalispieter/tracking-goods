// =========================
//  Supabase config
// =========================
// GANTI dengan project kamu sendiri:
const SUPABASE_URL = "https://ifynrranqixyoxombfck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Tabel yang dipakai: item_events
// Kolom minimal: id, kodeProduksi (text), lokasi (text), created_at (timestamp)

// =========================
//  Multi language texts
// =========================
const translations = {
  en: {
    title: "Item Tracking App",
    formTitle: "Update item location",
    labelCode: "Item code",
    labelLocation: "Location",
    btnSave: "Save / Update",
    hintText:
      "When you save with the same item code, the current row is updated and older records are kept as history.",
    listTitle: "Current items",
    thCode: "Code",
    thLocation: "Location",
    thUpdated: "Last Updated",
    thActions: "Actions",
    historyTitle: (kode) => `History for ${kode}`,
    historyEmpty: "No history yet for this item.",
    historyLocation: "Location",
    historyTime: "Time",
    btnHistory: "History"
  },
  id: {
    title: "Aplikasi Tracking Barang",
    formTitle: "Update lokasi barang",
    labelCode: "Kode produksi / barang",
    labelLocation: "Lokasi",
    btnSave: "Simpan / Update",
    hintText:
      "Jika menyimpan dengan kode yang sama, baris utama akan di-update dan riwayat perpindahan tetap tersimpan.",
    listTitle: "Daftar barang aktif",
    thCode: "Kode",
    thLocation: "Lokasi",
    thUpdated: "Update Terakhir",
    thActions: "Aksi",
    historyTitle: (kode) => `Riwayat untuk ${kode}`,
    historyEmpty: "Belum ada history untuk barang ini.",
    historyLocation: "Lokasi",
    historyTime: "Waktu",
    btnHistory: "History"
  },
  nl: {
    title: "Item Tracking App",
    formTitle: "Locatie van item bijwerken",
    labelCode: "Itemcode",
    labelLocation: "Locatie",
    btnSave: "Opslaan / Bijwerken",
    hintText:
      "Als je met dezelfde code opslaat, wordt de huidige rij bijgewerkt en blijft de geschiedenis bewaard.",
    listTitle: "Actieve items",
    thCode: "Code",
    thLocation: "Locatie",
    thUpdated: "Laatst bijgewerkt",
    thActions: "Acties",
    historyTitle: (kode) => `Historie voor ${kode}`,
    historyEmpty: "Nog geen historie voor dit item.",
    historyLocation: "Locatie",
    historyTime: "Tijd",
    btnHistory: "Historie"
  },
  pl: {
    title: "Aplikacja do śledzenia przedmiotów",
    formTitle: "Aktualizuj lokalizację przedmiotu",
    labelCode: "Kod przedmiotu",
    labelLocation: "Lokalizacja",
    btnSave: "Zapisz / Aktualizuj",
    hintText:
      "Jeśli zapiszesz z tym samym kodem, aktualny wiersz zostanie zaktualizowany, a historia zostanie zachowana.",
    listTitle: "Aktywne przedmioty",
    thCode: "Kod",
    thLocation: "Lokalizacja",
    thUpdated: "Ostatnia aktualizacja",
    thActions: "Akcje",
    historyTitle: (kode) => `Historia dla ${kode}`,
    historyEmpty: "Brak historii dla tego przedmiotu.",
    historyLocation: "Lokalizacja",
    historyTime: "Czas",
    btnHistory: "Historia"
  }
};

let currentLang = "en";

// =========================
//  DOM references
// =========================
const recordsBody = document.getElementById("recordsBody");
const saveBtn = document.getElementById("saveBtn");
const kodeInput = document.getElementById("kodeProduksi");
const lokasiInput = document.getElementById("lokasi");

const historyBackdrop = document.getElementById("historyBackdrop");
const historyTitleEl = document.getElementById("historyTitle");
const historyContentEl = document.getElementById("historyContent");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const closeHistoryBtn2 = document.getElementById("closeHistoryBtn2");

// =========================
//  Helpers
// =========================
function applyTranslations() {
  const t = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update all History button labels dalam tabel
  document
    .querySelectorAll("button[data-history-btn]")
    .forEach((btn) => (btn.textContent = t.btnHistory));
}

function setLanguage(lang) {
  currentLang = lang;
  document
    .querySelectorAll(".lang-switcher button")
    .forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));
  applyTranslations();
}

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

// =========================
//  Load & render data
// =========================
async function loadItems() {
  // ambil semua events, yang terbaru dulu
  const { data, error } = await supabase
    .from("item_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    recordsBody.innerHTML =
      '<tr><td colspan="4">Error loading data</td></tr>';
    return;
  }

  // ambil hanya event terbaru per kodeProduksi
  const latestMap = {};
  for (const row of data) {
    if (!latestMap[row.kodeProduksi]) {
      latestMap[row.kodeProduksi] = row;
    }
  }

  const latestItems = Object.values(latestMap).sort((a, b) =>
    a.kodeProduksi.localeCompare(b.kodeProduksi)
  );

  renderTable(latestItems);
}

function renderTable(items) {
  recordsBody.innerHTML = "";

  if (!items.length) {
    recordsBody.innerHTML =
      '<tr><td colspan="4">No items yet</td></tr>';
    return;
  }

  const t = translations[currentLang];

  items.forEach((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="code-cell">${item.kodeProduksi}</td>
      <td>${item.lokasi}</td>
      <td class="time-cell">${formatDate(item.created_at)}</td>
      <td class="actions-cell">
        <button data-history-btn data-code="${item.kodeProduksi}">
          ${t.btnHistory}
        </button>
      </td>
    `;

    const historyBtn = tr.querySelector("[data-history-btn]");
    historyBtn.addEventListener("click", () =>
      openHistory(item.kodeProduksi)
    );

    recordsBody.appendChild(tr);
  });
}

// =========================
//  Save / update data
// =========================
async function handleSave() {
  const kodeProduksi = kodeInput.value.trim();
  const lokasi = lokasiInput.value.trim();

  if (!kodeProduksi || !lokasi) {
    alert("Kode dan lokasi tidak boleh kosong.");
    return;
  }

  saveBtn.disabled = true;

  // Simpan event baru ke history (item_events)
  const { error } = await supabase.from("item_events").insert([
    {
      kodeProduksi,
      lokasi
    }
  ]);

  saveBtn.disabled = false;

  if (error) {
    console.error(error);
    alert("Error saving data");
    return;
  }

  // Reset input kecil
  lokasiInput.value = "";
  // Reload list
  await loadItems();
}

// =========================
//  History modal
// =========================
async function openHistory(kodeProduksi) {
  const t = translations[currentLang];
  historyTitleEl.textContent = t.historyTitle(kodeProduksi);
  historyContentEl.innerHTML = "Loading...";

  historyBackdrop.style.display = "flex";

  const { data, error } = await supabase
    .from("item_events")
    .select("*")
    .eq("kodeProduksi", kodeProduksi)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    historyContentEl.textContent = "Error loading history";
    return;
  }

  if (!data.length) {
    historyContentEl.textContent = t.historyEmpty;
    return;
  }

  const rowsHtml = data
    .map(
      (row) => `
      <div style="padding:0.25rem 0; border-bottom:1px solid #e5e7eb;">
        <div><strong>${t.historyLocation}:</strong> ${row.lokasi}</div>
        <div style="font-size:0.8rem; color:#6b7280;">
          <strong>${t.historyTime}:</strong> ${formatDate(row.created_at)}
        </div>
      </div>
    `
    )
    .join("");

  historyContentEl.innerHTML = rowsHtml;
}

function closeHistory() {
  historyBackdrop.style.display = "none";
}

// =========================
//  Event listeners
// =========================
saveBtn.addEventListener("click", handleSave);

document
  .querySelectorAll(".lang-switcher button")
  .forEach((btn) =>
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang))
  );

closeHistoryBtn.addEventListener("click", closeHistory);
closeHistoryBtn2.addEventListener("click", closeHistory);
historyBackdrop.addEventListener("click", (e) => {
  if (e.target === historyBackdrop) closeHistory();
});

// =========================
//  Init
// =========================
(async function init() {
  setLanguage("en"); // default
  await loadItems();
})();
