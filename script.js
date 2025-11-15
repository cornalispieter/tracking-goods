// script.js

// ---------- I18N (EN, NL, ID, PL) ----------
const translations = {
  en: {
    subtitle: "Simple goods tracking with camera & history.",
    languageLabel: "Lang",
    inputSectionTitle: "New update",
    inputSectionSubtitle: "Use camera or manual input to store location.",
    tabScan: "Scan",
    tabManual: "Manual",
    labelCode: "Item code",
    labelCodeHelper: "Fills from camera",
    labelLocation: "Location",
    labelLocationHelper: "Example: “Warehouse A”",
    btnStartScanner: "Start scanner",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Save update",
    scannerStatusLabel: "Status:",
    scannerIdle: "Idle",
    scannerScanning: "Scanning…",
    scannerDetected: "Code detected",
    scannerStopped: "Scanner stopped",
    listTitle: "Tracked items",
    listSubtitle: "One row per unique item code. Latest update shown.",
    itemsLabel: "items",
    colCode: "Code",
    colLocation: "Location",
    colTime: "Updated",
    colActions: "History",
    emptyState: "No items yet. Add an update to see it here.",
    footerHint1: "Each update is stored as history in Supabase.",
    footerHint2: "List is unique per code, history shows all locations.",
    historyTitle: "History",
    historyHint: "Latest first. Each row = one update.",
    historyCountLabel: "logs",
    searchLabel: "Search",
    noResultsSearch: "No items match your search.",
    errorMissingFields: "Please fill item code and location first.",
    toastSaved: "Update saved.",
    toastErrorSave: "Failed to save update.",
    toastErrorLoad: "Failed to load items.",
    toastErrorHistory: "Failed to load history."
  },
  nl: {
    subtitle: "Eenvoudige goederen-tracking met camera en historie.",
    languageLabel: "Taal",
    inputSectionTitle: "Nieuwe update",
    inputSectionSubtitle:
      "Gebruik de camera of typ handmatig om de locatie op te slaan.",
    tabScan: "Scan",
    tabManual: "Handmatig",
    labelCode: "Artikelcode",
    labelCodeHelper: "Wordt ingevuld via camera",
    labelLocation: "Locatie",
    labelLocationHelper: "Bijv: “Magazijn A”",
    btnStartScanner: "Scanner starten",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Opslaan",
    scannerStatusLabel: "Status:",
    scannerIdle: "Inactief",
    scannerScanning: "Scannen…",
    scannerDetected: "Code gevonden",
    scannerStopped: "Scanner gestopt",
    listTitle: "Geregistreerde items",
    listSubtitle:
      "Eén regel per unieke artikelcode. Laatste update wordt getoond.",
    itemsLabel: "items",
    colCode: "Code",
    colLocation: "Locatie",
    colTime: "Bijgewerkt",
    colActions: "Historie",
    emptyState: "Nog geen items. Voeg een update toe om deze lijst te vullen.",
    footerHint1: "Elke update wordt als historie opgeslagen in Supabase.",
    footerHint2: "Lijst is uniek per code, historie toont alle locaties.",
    historyTitle: "Historie",
    historyHint: "Nieuwste bovenaan. Elke regel = één update.",
    historyCountLabel: "logs",
    searchLabel: "Zoeken",
    noResultsSearch: "Geen items komen overeen met je zoekopdracht.",
    errorMissingFields: "Vul eerst de artikelcode en locatie in.",
    toastSaved: "Update opgeslagen.",
    toastErrorSave: "Opslaan van update is mislukt.",
    toastErrorLoad: "Items laden is mislukt.",
    toastErrorHistory: "Historie laden is mislukt."
  },
  id: {
    subtitle: "Tracking barang sederhana dengan kamera & riwayat lokasi.",
    languageLabel: "Bahasa",
    inputSectionTitle: "Update baru",
    inputSectionSubtitle:
      "Gunakan kamera atau input manual untuk menyimpan lokasi.",
    tabScan: "Scan",
    tabManual: "Manual",
    labelCode: "Kode barang",
    labelCodeHelper: "Terisi dari hasil kamera",
    labelLocation: "Lokasi",
    labelLocationHelper: "Contoh: “Gudang A”",
    btnStartScanner: "Mulai scanner",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Simpan update",
    scannerStatusLabel: "Status:",
    scannerIdle: "Diam",
    scannerScanning: "Scanning…",
    scannerDetected: "Kode terdeteksi",
    scannerStopped: "Scanner berhenti",
    listTitle: "Daftar barang",
    listSubtitle:
      "Satu baris per kode barang unik. Menampilkan update terbaru.",
    itemsLabel: "barang",
    colCode: "Kode",
    colLocation: "Lokasi",
    colTime: "Diupdate",
    colActions: "History",
    emptyState: "Belum ada data. Tambahkan update untuk melihat daftar.",
    footerHint1: "Setiap update disimpan sebagai history di Supabase.",
    footerHint2: "List hanya satu baris per kode, history berisi semua lokasi.",
    historyTitle: "History",
    historyHint:
      "Terbaru di paling atas. Setiap baris = satu update.",
    historyCountLabel: "log",
    searchLabel: "Cari",
    noResultsSearch: "Tidak ada data yang cocok dengan pencarian.",
    errorMissingFields: "Isi dulu kode barang dan lokasi.",
    toastSaved: "Update tersimpan.",
    toastErrorSave: "Gagal menyimpan update.",
    toastErrorLoad: "Gagal memuat daftar barang.",
    toastErrorHistory: "Gagal memuat history."
  },
  pl: {
    subtitle: "Prosty system śledzenia towarów z kamerą i historią.",
    languageLabel: "Język",
    inputSectionTitle: "Nowa aktualizacja",
    inputSectionSubtitle:
      "Użyj kamery lub wprowadź dane ręcznie, aby zapisać lokalizację.",
    tabScan: "Skanuj",
    tabManual: "Ręcznie",
    labelCode: "Kod towaru",
    labelCodeHelper: "Uzupełniany z kamery",
    labelLocation: "Lokalizacja",
    labelLocationHelper: "Np. “Magazyn A”",
    btnStartScanner: "Start skanera",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Zapisz",
    scannerStatusLabel: "Status:",
    scannerIdle: "Bezczynny",
    scannerScanning: "Skanowanie…",
    scannerDetected: "Kod wykryty",
    scannerStopped: "Skaner zatrzymany",
    listTitle: "Śledzone pozycje",
    listSubtitle:
      "Jeden wiersz na unikalny kod towaru. Pokazana ostatnia aktualizacja.",
    itemsLabel: "pozycji",
    colCode: "Kod",
    colLocation: "Lokalizacja",
    colTime: "Zaktualizowano",
    colActions: "Historia",
    emptyState: "Brak danych. Dodaj aktualizację, aby zobaczyć listę.",
    footerHint1:
      "Każda aktualizacja jest zapisywana jako historia w Supabase.",
    footerHint2:
      "Lista jest unikalna per kod, historia pokazuje wszystkie lokalizacje.",
    historyTitle: "Historia",
    historyHint:
      "Najnowsze na górze. Każdy wiersz = jedna aktualizacja.",
    historyCountLabel: "logów",
    searchLabel: "Szukaj",
    noResultsSearch: "Brak pozycji pasujących do wyszukiwania.",
    errorMissingFields:
      "Najpierw wprowadź kod towaru i lokalizację.",
    toastSaved: "Zapisano aktualizację.",
    toastErrorSave:
      "Nie udało się zapisać aktualizacji.",
    toastErrorLoad:
      "Nie udało się załadować listy.",
    toastErrorHistory:
      "Nie udało się załadować historii."
  }
};

let currentLang = "en";
let summaryRows = []; // cache list unik per kode

function applyTranslations() {
  const dict = translations[currentLang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// ---------- Scanner state ----------
let html5QrCode = null;
let isScanning = false;

// ---------- DOM ready ----------
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("language-select");
  const tabScan = document.getElementById("tab-scan");
  const tabManual = document.getElementById("tab-manual");
  const scanMode = document.getElementById("scan-mode");
  const manualMode = document.getElementById("manual-mode");

  const scannedCodeInput = document.getElementById("scanned-code");
  const scanLocationInput = document.getElementById("scan-location");
  const manualCodeInput = document.getElementById("manual-code");
  const manualLocationInput = document.getElementById("manual-location");

  const btnStartScan = document.getElementById("btn-start-scan");
  const btnStopScan = document.getElementById("btn-stop-scan");
  const btnSaveScan = document.getElementById("btn-save-scan");
  const btnSaveManual = document.getElementById("btn-save-manual");

  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");

  // Modal elements
  const historyBackdrop = document.getElementById(
    "history-modal-backdrop"
  );
  const historyList = document.getElementById("history-list");
  const historyCodeLabel = document.getElementById(
    "history-code-label"
  );
  const historyCountTag = document.getElementById("history-count-tag");
  const btnCloseHistory = document.getElementById("btn-close-history");

  // Language init
  applyTranslations();
  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    applyTranslations();
    // re-render list copy text (empty state, search, etc.)
    renderSummaryList(tableBody, summaryCount, emptyState);
  });

  // Default: Scan mode aktif → kode dari kamera
  scannedCodeInput.readOnly = true;
  scannedCodeInput.placeholder = "Scan item code with camera";

  // Tabs
  tabScan.addEventListener("click", () => {
    tabScan.classList.add("active");
    tabManual.classList.remove("active");
    scanMode.style.display = "";
    manualMode.style.display = "none";

    scannedCodeInput.readOnly = true;
    scannedCodeInput.placeholder = "Scan item code with camera";
  });

  tabManual.addEventListener("click", () => {
    tabManual.classList.add("active");
    tabScan.classList.remove("active");
    scanMode.style.display = "none";
    manualMode.style.display = "";
  });

  // Scanner buttons
  btnStartScan.addEventListener("click", () => {
    startScanner(scannedCodeInput);
  });

  btnStopScan.addEventListener("click", () => {
    stopScanner();
  });

  // Save from scan mode
  btnSaveScan.addEventListener("click", async () => {
    const code = scannedCodeInput.value.trim();
    const location = scanLocationInput.value.trim();
    if (!code || !location) {
      alert(translations[currentLang].errorMissingFields);
      return;
    }
    const ok = await saveUpdateToSupabase(code, location);
    if (ok) {
      scanLocationInput.value = "";
      await loadSummaryList(tableBody, summaryCount, emptyState);
      alert(translations[currentLang].toastSaved);
    } else {
      alert(translations[currentLang].toastErrorSave);
    }
  });

  // Save from manual mode
  btnSaveManual.addEventListener("click", async () => {
    const code = manualCodeInput.value.trim();
    const location = manualLocationInput.value.trim();
    if (!code || !location) {
      alert(translations[currentLang].errorMissingFields);
      return;
    }
    const ok = await saveUpdateToSupabase(code, location);
    if (ok) {
      manualCodeInput.value = "";
      manualLocationInput.value = "";
      await loadSummaryList(tableBody, summaryCount, emptyState);
      alert(translations[currentLang].toastSaved);
    } else {
      alert(translations[currentLang].toastErrorSave);
    }
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // Close history modal
  historyBackdrop.addEventListener("click", (e) => {
    if (e.target === historyBackdrop) {
      historyBackdrop.classList.remove("show");
    }
  });
  btnCloseHistory.addEventListener("click", () => {
    historyBackdrop.classList.remove("show");
  });

  // Load initial list
  loadSummaryList(tableBody, summaryCount, emptyState);

  // Global function for history button
  window.openHistoryForCode = async (code) => {
    await loadHistoryForCode(
      code,
      historyList,
      historyCodeLabel,
      historyCountTag
    );
    historyBackdrop.classList.add("show");
  };
});

// ---------- Scanner helpers ----------
function setScannerStatus(textKey) {
  const el = document.getElementById("scanner-status-text");
  const dict = translations[currentLang];
  if (!el || !dict) return;
  el.textContent = dict[textKey] || "";
}

async function startScanner(codeInput) {
  if (isScanning) return;

  try {
    setScannerStatus("scannerScanning");

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) {
      setScannerStatus("scannerIdle");
      alert("No camera found.");
      return;
    }

    // Cari kamera belakang dulu
    const backCam = cameras.find((cam) =>
      /back|rear|environment/i.test(cam.label || "")
    );
    const cameraId = backCam ? backCam.id : cameras[0].id;

    const config = { fps: 10, qrbox: { width: 230, height: 230 } };

    html5QrCode = new Html5Qrcode("qr-reader");
    isScanning = true;

    await html5QrCode.start(
      cameraId,
      config,
      (decodedText) => {
        codeInput.value = decodedText;
        setScannerStatus("scannerDetected");
        // auto stop setelah berhasil
        stopScanner();
      },
      () => {
        // ignore decode error
      }
    );
  } catch (err) {
    console.error("Error starting scanner:", err);
    setScannerStatus("scannerIdle");
    alert("Cannot start camera scanner.");
  }
}

async function stopScanner() {
  if (html5QrCode && isScanning) {
    try {
      await html5QrCode.stop();
      html5QrCode.clear();
    } catch (err) {
      console.warn("Error stopping scanner:", err);
    }
  }
  isScanning = false;
  setScannerStatus("scannerStopped");
}

// ---------- Supabase helpers ----------

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

async function loadSummaryList(tableBody, summaryCountEl, emptyStateEl) {
  try {
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      alert(translations[currentLang].toastErrorLoad);
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
    alert(translations[currentLang].toastErrorLoad);
  }
}

function renderSummaryList(tableBody, summaryCountEl, emptyStateEl) {
  const dict = translations[currentLang];
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
    codeCell.className = "table-cell badge-code";
    codeCell.textContent = row.code;

    const locCell = document.createElement("div");
    locCell.className = "table-cell badge-location";
    locCell.textContent = row.location || "-";

    const timeCell = document.createElement("div");
    timeCell.className = "table-cell badge-time";
    const ts = row.updated_at
      ? new Date(row.updated_at).toLocaleString()
      : "";
    timeCell.textContent = ts;

    const actionCell = document.createElement("div");
    actionCell.className = "table-cell";
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
      alert(translations[currentLang].toastErrorHistory);
      return;
    }

    historyListEl.innerHTML = "";
    historyCodeLabelEl.textContent = code;

    (data || []).forEach((row, idx) => {
      const item = document.createElement("div");
      item.className = "history-item";

      const locEl = document.createElement("div");
      locEl.className = "history-location";
      locEl.textContent = row.location || "-";

      const timeEl = document.createElement("div");
      timeEl.className = "history-time";
      const ts = row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : "";
      timeEl.textContent = ts;

      const seqEl = document.createElement("div");
      seqEl.className = "history-seq";
      seqEl.textContent = `#${idx + 1}`;

      item.appendChild(locEl);
      item.appendChild(timeEl);
      item.appendChild(seqEl);

      historyListEl.appendChild(item);
    });

    historyCountTagEl.textContent = `${data?.length || 0} ${
      translations[currentLang].historyCountLabel
    }`;
  } catch (err) {
    console.error("Unexpected error loading history:", err);
    alert(translations[currentLang].toastErrorHistory);
  }
}
