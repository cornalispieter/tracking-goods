// main.js

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

  // init language
  window.applyTranslations();
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      window.currentLang = langSelect.value;
      window.applyTranslations();
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // scanner – code
  if (btnStartScanCode && codeInput && step1Label) {
    btnStartScanCode.addEventListener("click", () => {
      startScannerForCode(codeInput, step1Label);
    });
  }

  // scanner – location
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
        alert(window.translations[window.currentLang].errorMissingFields);
        return;
      }
      const ok = await saveUpdateToSupabase(code, location);
      if (ok) {
    await loadSummaryList(tableBody, summaryCount, emptyState);
    alert(window.translations[currentLang].toastSaved);

    // NEW: reset form
    resetForm();
}

    });
  }

  // search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderSummaryList(tableBody, summaryCount, emptyState);
    });
  }

  // history modal backdrop click (close on background)
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

  // initial load list
  if (tableBody && summaryCount && emptyState) {
    loadSummaryList(tableBody, summaryCount, emptyState);
  }

  // expose global untuk tombol history
  window.openHistoryForCode = async (code) => {
    if (!historyList || !historyCodeLabel || !historyCountTag || !historyBackdrop) return;
    await loadHistoryForCode(code, historyList, historyCodeLabel, historyCountTag);
    historyBackdrop.classList.add("show");
  };

  function resetForm() {
  const codeInput = document.getElementById("code-input");
  const locationInput = document.getElementById("location-input");
  const step1Label = document.getElementById("step1-label");

  // Clear values
  codeInput.value = "";
  locationInput.value = "";

  // Remove readOnly locks
  codeInput.readOnly = false;
  locationInput.readOnly = false;

  // Remove locked UI style
  codeInput.classList.remove("locked-input");
  locationInput.classList.remove("locked-input");
  step1Label.classList.remove("locked");

  // Reset scanner status text
  document.getElementById("scanner-status-code").textContent =
    translations[currentLang].scannerIdle;
  document.getElementById("scanner-status-location").textContent =
    translations[currentLang].scannerIdle;

  // Put cursor back to first step
  codeInput.focus();
}

});
