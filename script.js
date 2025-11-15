// === SUPABASE CONFIG ===
const SUPABASE_URL = "https://ifynrranqixyoxombfck.supabase.co"; // ganti
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeW5ycmFucWl4eW94b21iZmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNjgwNzIsImV4cCI6MjA3ODc0NDA3Mn0.UqDQd0rrE4vsYjjj5hHNKsBU3c62lgvNjYp4uUEu2GY";                  // ganti

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === TRANSLATIONS (EN, ID, NL, PL) ===
const translations = {
  en: {
    title: "Item Tracking",
    subtitle: "Scan barcode/QR or enter manually. Data is stored in Supabase.",
    label_language: "Lang",
    section_input: "Input Data",
    section_search: "Search",
    section_list: "Stored Data",

    label_item_code: "Item Code",
    label_location: "Location",

    ph_item_code: "e.g. PRD-001 / scanned",
    ph_location: "e.g. Rack A1 / scanned",
    ph_search: "Search by item code...",

    btn_scan_code: "📦 Scan Code",
    btn_scan_location: "📍 Scan Location",
    btn_stop_scan: "✋ Stop Scan",
    btn_save: "💾 Save to Database",
    btn_search: "🔍 Search",
    btn_refresh: "♻️ Show Latest",

    table_header_code: "Item Code",
    table_header_location: "Location",
    table_header_updated: "Last Updated",

    empty_no_data: "No data found.",

    msg_required: "Item code and location are required",
    msg_save_ok: "Data saved",
    msg_save_error: "Failed to save data",
    msg_load_error: "Failed to load data",
    msg_scan_success: "Scan successful: {value}",
    msg_camera_error: "Failed to access camera"
  },

  id: {
    title: "Tracking Barang",
    subtitle: "Scan barcode/QR atau input manual. Data disimpan di Supabase.",
    label_language: "Bhs",
    section_input: "Input Data",
    section_search: "Cari Barang",
    section_list: "Data Tersimpan",

    label_item_code: "Kode Barang",
    label_location: "Lokasi",

    ph_item_code: "Contoh: PRD-001 / hasil scan",
    ph_location: "Contoh: Rak A1 / lokasi scan",
    ph_search: "Cari berdasarkan kode barang...",

    btn_scan_code: "📦 Scan Kode",
    btn_scan_location: "📍 Scan Lokasi",
    btn_stop_scan: "✋ Stop Scan",
    btn_save: "💾 Simpan ke Database",
    btn_search: "🔍 Cari",
    btn_refresh: "♻️ Terbaru",

    table_header_code: "Kode Barang",
    table_header_location: "Lokasi",
    table_header_updated: "Terakhir Update",

    empty_no_data: "Belum ada data.",

    msg_required: "Kode barang dan lokasi wajib diisi",
    msg_save_ok: "Data tersimpan",
    msg_save_error: "Gagal menyimpan data",
    msg_load_error: "Gagal memuat data",
    msg_scan_success: "Scan berhasil: {value}",
    msg_camera_error: "Gagal mengakses kamera"
  },

  nl: {
    title: "Item Tracking",
    subtitle: "Scan een barcode/QR of voer handmatig in. Gegevens worden opgeslagen in Supabase.",
    label_language: "Taal",
    section_input: "Gegevens Invoeren",
    section_search: "Zoeken",
    section_list: "Opgeslagen Gegevens",

    label_item_code: "Artikelcode",
    label_location: "Locatie",

    ph_item_code: "bijv. PRD-001 / gescand",
    ph_location: "bijv. Rek A1 / gescand",
    ph_search: "Zoek op artikelcode...",

    btn_scan_code: "📦 Code Scannen",
    btn_scan_location: "📍 Locatie Scannen",
    btn_stop_scan: "✋ Scan Stoppen",
    btn_save: "💾 Opslaan in Database",
    btn_search: "🔍 Zoeken",
    btn_refresh: "♻️ Laatste Weergeven",

    table_header_code: "Artikelcode",
    table_header_location: "Locatie",
    table_header_updated: "Laatst Bijgewerkt",

    empty_no_data: "Geen gegevens gevonden.",

    msg_required: "Artikelcode en locatie zijn verplicht",
    msg_save_ok: "Gegevens opgeslagen",
    msg_save_error: "Opslaan mislukt",
    msg_load_error: "Gegevens laden mislukt",
    msg_scan_success: "Scan succesvol: {value}",
    msg_camera_error: "Geen toegang tot camera"
  },

  pl: {
    title: "Śledzenie Przedmiotów",
    subtitle: "Zeskanuj kod kreskowy/QR lub wpisz ręcznie. Dane zapisane w Supabase.",
    label_language: "Język",
    section_input: "Wprowadzanie Danych",
    section_search: "Wyszukiwanie",
    section_list: "Zapisane Dane",

    label_item_code: "Kod Przedmiotu",
    label_location: "Lokalizacja",

    ph_item_code: "np. PRD-001 / zeskanowane",
    ph_location: "np. Regał A1 / zeskanowane",
    ph_search: "Szukaj po kodzie przedmiotu...",

    btn_scan_code: "📦 Skanuj Kod",
    btn_scan_location: "📍 Skanuj Lokalizację",
    btn_stop_scan: "✋ Zatrzymaj Skanowanie",
    btn_save: "💾 Zapisz w Bazie",
    btn_search: "🔍 Szukaj",
    btn_refresh: "♻️ Najnowsze",

    table_header_code: "Kod Przedmiotu",
    table_header_location: "Lokalizacja",
    table_header_updated: "Ostatnia Aktualizacja",

    empty_no_data: "Brak danych.",

    msg_required: "Kod przedmiotu i lokalizacja są wymagane",
    msg_save_ok: "Dane zapisano",
    msg_save_error: "Błąd zapisu danych",
    msg_load_error: "Błąd ładowania danych",
    msg_scan_success: "Skan udany: {value}",
    msg_camera_error: "Brak dostępu do kamery"
  }
};

// === LANGUAGE STATE ===
let currentLang = localStorage.getItem("app-lang") || "en";
let currentItems = [];
let lastSearchCode = "";

// === DOM ELEMENTS ===
const itemCodeInput = document.getElementById("itemCode");
const locationInput = document.getElementById("location");
const saveBtn = document.getElementById("saveBtn");
const messageEl = document.getElementById("message");

const readerEl = document.getElementById("reader");
const scanCodeBtn = document.getElementById("scanCodeBtn");
const scanLocationBtn = document.getElementById("scanLocationBtn");
const stopScanBtn = document.getElementById("stopScanBtn");

const searchCodeInput = document.getElementById("searchCode");
const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const itemsContainer = document.getElementById("itemsContainer");
const langSelect = document.getElementById("langSelect");

// === i18n helpers ===
function t(key, vars = {}) {
  const dict = translations[currentLang] || translations.en;
  let str = dict[key] || key;
  Object.keys(vars).forEach((k) => {
    str = str.replace(`{${k}}`, vars[k]);
  });
  return str;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("app-lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  renderItems(currentItems);
}

function showMessageKey(key, vars = {}, error = false) {
  const text = t(key, vars);
  messageEl.textContent = text;
  messageEl.style.color = error ? "#f97373" : "#22c55e";
  if (text) {
    setTimeout(() => {
      messageEl.textContent = "";
    }, 2500);
  }
}

// === SCANNER ===
let html5QrcodeScanner = null;
let currentScanTarget = null;

function startScanner(target) {
  currentScanTarget = target;

  if (!html5QrcodeScanner) {
    html5QrcodeScanner = new Html5Qrcode("reader");
  }

  readerEl.style.display = "block";
  scanCodeBtn.disabled = true;
  scanLocationBtn.disabled = true;
  stopScanBtn.disabled = false;

  html5QrcodeScanner
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decoded) => {
        if (target === "code") itemCodeInput.value = decoded;
        else locationInput.value = decoded;

        showMessageKey("msg_scan_success", { value: decoded }, false);
        stopScanner();
      }
    )
    .catch(() => {
      showMessageKey("msg_camera_error", {}, true);
      stopScanner();
    });
}

function stopScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.stop().then(() => {
      readerEl.style.display = "none";
    });
  }
  scanCodeBtn.disabled = false;
  scanLocationBtn.disabled = false;
  stopScanBtn.disabled = true;
  currentScanTarget = null;
}

// === DATA (Supabase) ===
// NOTE: sekarang fetch dari tabel `items` (master, 1 row per kode)
async function fetchItems(codeFilter = "") {
  lastSearchCode = codeFilter;

  let query = db
    .from("items")
    .select("item_code, location, updated_at")
    .order("updated_at", { ascending: false });

  if (codeFilter) {
    query = query.ilike("item_code", `%${codeFilter}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchItems error", error);
    showMessageKey("msg_load_error", {}, true);
    return;
  }

  currentItems = data || [];
  renderItems(currentItems);
}

// Tabel view (1 row per kode)
function renderItems(items) {
  if (!items || items.length === 0) {
    itemsContainer.innerHTML = `<div class="empty-state">${t("empty_no_data")}</div>`;
    return;
  }

  let html = `
    <table class="items-table">
      <thead>
        <tr>
          <th>${t("table_header_code")}</th>
          <th>${t("table_header_location")}</th>
          <th>${t("table_header_updated")}</th>
        </tr>
      </thead>
      <tbody>
  `;

  items.forEach((item) => {
    const dateStr = item.updated_at
      ? new Date(item.updated_at).toLocaleString()
      : "-";

    html += `
      <tr>
        <td>${item.item_code}</td>
        <td>${item.location}</td>
        <td>${dateStr}</td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  itemsContainer.innerHTML = html;
}

// Save = log ke history + upsert ke master
async function saveItem() {
  const code = itemCodeInput.value.trim();
  const loc = locationInput.value.trim();

  if (!code || !loc) {
    showMessageKey("msg_required", {}, true);
    return;
  }

  // Timestamp sekarang (dipakai utk updated_at)
  const now = new Date().toISOString();

  // 1) Insert ke HISTORY
  const { error: historyErr } = await db
    .from("item_history")
    .insert({ item_code: code, location: loc });

  if (historyErr) {
    console.error("item_history insert error", historyErr);
    showMessageKey("msg_save_error", {}, true);
    return;
  }

  // 2) Upsert ke MASTER (items) supaya 1 row per kode
  const { error: masterErr } = await db
    .from("items")
    .upsert(
      { item_code: code, location: loc, updated_at: now },
      { onConflict: "item_code" }
    );

  if (masterErr) {
    console.error("items upsert error", masterErr);
    showMessageKey("msg_save_error", {}, true);
    return;
  }

  showMessageKey("msg_save_ok");
  itemCodeInput.value = "";
  locationInput.value = "";

  fetchItems(lastSearchCode);
}

// === EVENTS ===
saveBtn.addEventListener("click", saveItem);
scanCodeBtn.addEventListener("click", () => startScanner("code"));
scanLocationBtn.addEventListener("click", () => startScanner("location"));
stopScanBtn.addEventListener("click", stopScanner);

searchBtn.addEventListener("click", () => {
  fetchItems(searchCodeInput.value.trim());
});

refreshBtn.addEventListener("click", () => {
  searchCodeInput.value = "";
  fetchItems("");
});

langSelect.addEventListener("change", (e) => {
  applyLanguage(e.target.value);
});

// === INIT ===
langSelect.value = currentLang;
applyLanguage(currentLang);
fetchItems("");
