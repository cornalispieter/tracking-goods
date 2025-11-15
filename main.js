// main.js – clean rewritten version

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("language-select");

  const codeInput = document.getElementById("code-input");
  const locationInput = document.getElementById("location-input");
  const step1Label = document.getElementById("step1-label");

  const btnStartScanCode = document.getElementById("btn-start-scan-code");
  const btnStartScanLocation = document.getElementById("btn-start-scan-location");
  const btnSaveUpdate = document.getElementById("btn-save-update");
  const btnExportCsv = document.getElementById("btn-export-csv");

  const tableBody = document.getElementById("table-body");
  const summaryCount = document.getElementById("summary-count");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");

  const historyBackdrop = document.getElementById("history-modal-backdrop");
  const historyList = document.getElementById("history-list");
  const historyCodeLabel = document.getElementById("history-code-label");
  const historyCountTag = document.getElementById("history-count-tag");
  const btnCloseHistory = document.getElementById("btn-close-history");

  // INITIAL LANGUAGE APPLY
  if (typeof window.applyTranslations === "function") {
    window.applyTranslations();
  }

  // CHANGE LANGUAGE
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      window.currentLang = langSelect.value;
      window.applyTranslations();
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // START SCANNER - CODE
  if (btnStartScanCode) {
    btnStartScanCode.addEventListener("click", () => {
      startScannerForCode(codeInput, step1Label);
    });
  }

  // START SCANNER - LOCATION
  if (btnStartScanLocation) {
    btnStartScanLocation.addEventListener("click", () => {
      startScannerForLocation(locationInput);
    });
  }

  // SAVE UPDATE
  if (btnSaveUpdate) {
    btnSaveUpdate.addEventListener("click", async () => {
      const code = codeInput.value.trim();
      const location = locationInput.value.trim();
      const dict = window.translations[window.currentLang];

      if (!code || !location) {
        alert(dict.errorMissingFields);
        return;
      }

      const ok = await saveUpdateToSupabase(code, location);

      if (ok) {
        await loadSummaryList(tableBody, summaryCount, emptyState);
        alert(dict.toastSaved);
        resetForm();
      } else {
        alert(dict.toastErrorSave);
      }
    });
  }

  // SEARCH
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // EXPORT CSV
  if (btnExportCsv) {
    btnExportCsv.addEventListener("click", () => {
      if (typeof exportSummaryToCsv === "function") {
        exportSummaryToCsv();
      }
    });
  }

  // HISTORY MODAL CLOSE (BACKGROUND)
  if (historyBackdrop) {
    historyBackdrop.addEventListener("click", (e) => {
      if (e.target === historyBackdrop) {
        historyBackdrop.classList.remove("show");
      }
    });
  }

  // HISTORY MODAL CLOSE BUTTON
  if (btnCloseHistory) {
    btnCloseHistory.addEventListener("click", () => {
      historyBackdrop.classList.remove("show");
    });
  }

  // INITIAL FETCH LIST
  if (tableBody && summaryCount && emptyState) {
    loadSummaryList(tableBody, summaryCount, emptyState);
  }

  // GLOBAL FUNCTION FOR "History" BUTTON
  window.openHistoryForCode = async (code) => {
    await loadHistoryForCode(code, historyList, historyCodeLabel, historyCountTag);
    historyBackdrop.classList.add("show");
  };

  // RESET FORM
  function resetForm() {
    const dict = window.translations[window.currentLang];

    // Clear inputs
    codeInput.value = "";
    locationInput.value = "";

    // Unlock fields
    codeInput.readOnly = false;
    locationInput.readOnly = false;

    codeInput.classList.remove("locked-input");
    locationInput.classList.remove("locked-input");
    step1Label.classList.remove("locked");

    // Reset scanner status
    const statusCode = document.getElementById("scanner-status-code");
    const statusLoc = document.getElementById("scanner-status-location");

    if (statusCode) statusCode.textContent = dict.scannerIdle;
    if (statusLoc) statusLoc.textContent = dict.scannerIdle;

    // Stop active scanners
    if (typeof stopScannerForCode === "function") stopScannerForCode();
    if (typeof stopScannerForLocation === "function") stopScannerForLocation();

    // Focus back to code input
    codeInput.focus();
  }
});
