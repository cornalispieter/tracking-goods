// script.js

// ---------- I18N ----------
const translations = {
  en: {
    subtitle: "Simple goods tracking with camera & history.",
    languageLabel: "Lang",
    inputSectionTitle: "New update",
    inputSectionSubtitle: "Step 1: item code. Step 2: location.",
    labelCode: "Item code",
    labelCodeHelper: "Type or scan code",
    labelLocation: "Location",
    labelLocationHelper: 'Example: “Warehouse A”',
    btnStartScanner: "Scan",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Save update",
    btnLockCode: "Lock code & next",
    btnChangeCode: "Change code",
    scannerStatusLabel: "Status:",
    scannerIdle: "Idle",
    scannerScanning: "Scanning…",
    scannerDetected: "Code detected",
    scannerStopped: "Scanner stopped",
    step1Label: "Step 1 · Item code",
    step2Label: "Step 2 · Location",
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
    errorMissingFields: "Please fill code and location first.",
    toastSaved: "Update saved.",
    toastErrorSave: "Failed to save update.",
    toastErrorLoad: "Failed to load items.",
    toastErrorHistory: "Failed to load history."
  },
  nl: {
    subtitle: "Eenvoudige goederen-tracking met camera en historie.",
    languageLabel: "Taal",
    inputSectionTitle: "Nieuwe update",
    inputSectionSubtitle: "Stap 1: artikelcode. Stap 2: locatie.",
    labelCode: "Artikelcode",
    labelCodeHelper: "Typ of scan code",
    labelLocation: "Locatie",
    labelLocationHelper: 'Bijv: “Magazijn A”',
    btnStartScanner: "Scannen",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Opslaan",
    btnLockCode: "Code vastzetten",
    btnChangeCode: "Code wijzigen",
    scannerStatusLabel: "Status:",
    scannerIdle: "Inactief",
    scannerScanning: "Scannen…",
    scannerDetected: "Code gevonden",
    scannerStopped: "Scanner gestopt",
    step1Label: "Stap 1 · Artikelcode",
    step2Label: "Stap 2 · Locatie",
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
    errorMissingFields: "Vul eerst code en locatie in.",
    toastSaved: "Update opgeslagen.",
    toastErrorSave: "Opslaan van update is mislukt.",
    toastErrorLoad: "Items laden is mislukt.",
    toastErrorHistory: "Historie laden is mislukt."
  },
  id: {
    subtitle: "Tracking barang sederhana dengan kamera & riwayat lokasi.",
    languageLabel: "Bahasa",
    inputSectionTitle: "Update baru",
    inputSectionSubtitle: "Step 1: kode barang. Step 2: lokasi.",
    labelCode: "Kode barang",
    labelCodeHelper: "Ketik atau scan kode",
    labelLocation: "Lokasi",
    labelLocationHelper: 'Contoh: “Gudang A”',
    btnStartScanner: "Scan",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Simpan update",
    btnLockCode: "Kunci kode & lanjut",
    btnChangeCode: "Ganti kode",
    scannerStatusLabel: "Status:",
    scannerIdle: "Diam",
    scannerScanning: "Scanning…",
    scannerDetected: "Kode terdeteksi",
    scannerStopped: "Scanner berhenti",
    step1Label: "Step 1 · Kode barang",
    step2Label: "Step 2 · Lokasi",
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
    historyHint: "Terbaru di paling atas. Setiap baris = satu update.",
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
    inputSectionSubtitle: "Krok 1: kod towaru. Krok 2: lokalizacja.",
    labelCode: "Kod towaru",
    labelCodeHelper: "Wpisz lub zeskanuj kod",
    labelLocation: "Lokalizacja",
    labelLocationHelper: 'Np. “Magazyn A”',
    btnStartScanner: "Skanuj",
    btnStopScanner: "Stop",
    btnSaveUpdate: "Zapisz",
    btnLockCode: "Zablokuj kod",
    btnChangeCode: "Zmień kod",
    scannerStatusLabel: "Status:",
    scannerIdle: "Bezczynny",
    scannerScanning: "Skanowanie…",
    scannerDetected: "Kod wykryty",
    scannerStopped: "Skaner zatrzymany",
    step1Label: "Krok 1 · Kod towaru",
    step2Label: "Krok 2 · Lokalizacja",
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
    historyHint: "Najnowsze na górze. Każdy wiersz = jedna aktualizacja.",
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
let summaryRows = [];

// scanner instances
let html5QrCodeCode = null;
let html5QrCodeLocation = null;
let isScanningCode = false;
let isScanningLocation = false;

function applyTranslations() {
  const dict = translations[currentLang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// ---------- DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("language-select");

  const codeInput = document.getElementById("code-input");
  const locationInput = document.getElementById("location-input");
  const step1Label = document.getElementById("step1-label");

  const btnStartScanCode = document.getElementById("btn-start-scan-code");
  const btnStartScanLocation = document.getElementById("btn-start-scan-location");
  const btnSaveUpdate = document.getElementById("btn-save-update");

  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");

  const historyBackdrop = document.getElementById("history-modal-backdrop");
  const historyList = document.getElementById("history-list");
  const historyCodeLabel = document.getElementById("history-code-label");
  const historyCountTag = document.getElementById("history-count-tag");
  const btnCloseHistory = document.getElementById("btn-close-history");

  // init lang
  applyTranslations();
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      currentLang = langSelect.value;
      applyTranslations();
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // scanner code
  if (btnStartScanCode && codeInput && step1Label) {
    btnStartScanCode.addEventListener("click", () => {
      startScannerForCode(codeInput, step1Label);
    });
  }

  // scanner location
  if (btnStartScanLocation && locationInput) {
    btnStartScanLocation.addEventListener("click", () => {
      startScannerForLocation(locationInput);
    });
  }

  // save update
  if (btnSaveUpdate && codeInput && locationInput) {
    btnSaveUpdate.addEventListener("click", async () => {
      const code = codeInput.value.trim();
      const location = locationInput.value.trim();
      if (!code || !location) {
        alert(translations[currentLang].errorMissingFields);
        return;
      }
      const ok = await saveUpdateToSupabase(code, location);
      if (ok) {
        // lokasi dibuka lagi untuk next input, kode tetap
        locationInput.readOnly = false;
        locationInput.classList.remove("locked-input");
        locationInput.value = "";
        await loadSummaryList(tableBody, summaryCount, emptyState);
        alert(translations[currentLang].toastSaved);
        locationInput.focus();
      } else {
        alert(translations[currentLang].toastErrorSave);
      }
    });
  }

  // search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // history modal
  if (historyBackdrop) {
    historyBackdrop.addEventListener("click", (e) => {
      if (e.target === historyBackdrop) {
        historyBackdrop.classList.remove("show");
      }
    });
  }

  if (btnCloseHistory && historyBackdrop) {
    btnCloseHistory.addEventListener("click", () => {
      historyBackdrop.classList.remove("show");
    });
  }

  // load initial list
  if (tableBody && summaryCount && emptyState) {
    loadSummaryList(tableBody, summaryCount, emptyState);
  }

  // expose for history button
  window.openHistoryForCode = async (code) => {
    if (!historyList || !historyCodeLabel || !historyCountTag || !historyBackdrop) return;
    await loadHistoryForCode(code, historyList, historyCodeLabel, historyCountTag);
    historyBackdrop.classList.add("show");
  };
});

// ---------- Scanner helpers ----------
function setScannerStatus(target, key) {
  const dict = translations[currentLang];
  const elId = target === "location" ? "scanner-status-location" : "scanner-status-code";
  const el = document.getElementById(elId);
  if (!el || !dict) return;
  el.textContent = dict[key] || "";
}

// CODE scanner: auto stop & auto lock
async function startScannerForCode(codeInput, step1Label) {
  // kalau masih scanning, matikan dulu (tap scan = restart)
  if (isScanningCode) {
    await stopScannerForCode();
  }

  try {
    setScannerStatus("code", "scannerScanning");

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) {
      setScannerStatus("code", "scannerIdle");
      alert("No camera found.");
      return;
    }

    const backCam = cameras.find((cam) =>
      /back|rear|environment/i.test(cam.label || "")
    );
    const cameraId = backCam ? backCam.id : cameras[0].id;

    html5QrCodeCode = new Html5Qrcode("qr-reader-code");
    const config = { fps: 10, qrbox: { width: 230, height: 230 } };
    isScanningCode = true;

    await html5QrCodeCode.start(
      cameraId,
      config,
      async (decodedText) => {
        codeInput.value = decodedText;
        // auto lock kode
        codeInput.readOnly = true;
        codeInput.classList.add("locked-input");
        step1Label.classList.add("locked");

        setScannerStatus("code", "scannerDetected");
        // stop kamera
        await stopScannerForCode();
        // fokus ke lokasi
        const locationInput = document.getElementById("location-input");
        if (locationInput) locationInput.focus();
      },
      () => {}
    );
  } catch (err) {
    console.error("Error starting code scanner:", err);
    setScannerStatus("code", "scannerIdle");
    alert("Cannot start camera scanner (code).");
  }
}

async function stopScannerForCode() {
  if (html5QrCodeCode && isScanningCode) {
    try {
      await html5QrCodeCode.stop();
      html5QrCodeCode.clear();
    } catch (err) {
      console.warn("Error stopping code scanner:", err);
    }
  }
  isScanningCode = false;
  setScannerStatus("code", "scannerStopped");
}

// LOCATION scanner: auto stop & auto lock
async function startScannerForLocation(locationInput) {
  if (isScanningLocation) {
    await stopScannerForLocation();
  }

  try {
    setScannerStatus("location", "scannerScanning");

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras || cameras.length === 0) {
      setScannerStatus("location", "scannerIdle");
      alert("No camera found.");
      return;
    }

    const backCam = cameras.find((cam) =>
      /back|rear|environment/i.test(cam.label || "")
    );
    const cameraId = backCam ? backCam.id : cameras[0].id;

    html5QrCodeLocation = new Html5Qrcode("qr-reader-location");
    const config = { fps: 10, qrbox: { width: 230, height: 230 } };
    isScanningLocation = true;

    await html5QrCodeLocation.start(
      cameraId,
      config,
      async (decodedText) => {
        locationInput.value = decodedText;
        // auto lock lokasi
        locationInput.readOnly = true;
        locationInput.classList.add("locked-input");

        setScannerStatus("location", "scannerDetected");
        await stopScannerForLocation();
      },
      () => {}
    );
  } catch (err) {
    console.error("Error starting location scanner:", err);
    setScannerStatus("location", "scannerIdle");
    alert("Cannot start camera scanner (location).");
  }
}

async function stopScannerForLocation() {
  if (html5QrCodeLocation && isScanningLocation) {
    try {
      await html5QrCodeLocation.stop();
      html5QrCodeLocation.clear();
    } catch (err) {
      console.warn("Error stopping location scanner:", err);
    }
  }
  isScanningLocation = false;
  setScannerStatus("location", "scannerStopped");
}

// ---------- Supabase ----------
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
  if (!tableBody || !summaryCountEl || !emptyStateEl) return;

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

// ---------- History ----------
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

    const dict = translations[currentLang];
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
    alert(translations[currentLang].toastErrorHistory);
  }
}
