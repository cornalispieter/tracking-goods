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
      const dict = window.translations[window.currentLang];

      if (!code || !location) {
        alert(dict.errorMissingFields);
        return;
      }

      const ok = await saveUpdateToSupabase(code, location);
      if (ok) {
        await loadSummaryList(tableBody, summaryCount, emptyState);
        alert(dict.toastSaved);

        // reset form & unlock input
        resetForm();
      } else {
        alert(dict.toastErrorSave);
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

  // --- helper: reset form setelah save ---
  function resetForm() {
    const dict = window.translations[window.currentLang];

    const codeInputEl = document.getElementById("code-input");
    const locationInputEl = document.getElementById("location-input");
    const step1LabelEl = document.getElementById("step1-label");

    if (!codeInputEl || !locationInputEl || !step1LabelEl) return;

    // Clear values
    codeInputEl.value = "";
    locationInputEl.value = "";

    // Remove readOnly locks
    codeInputEl.readOnly = false;
    locationInputEl.readOnly = false;

    // Remove locked UI style
    codeInputEl.classList.remove("locked-input");
    locationInputEl.classList.remove("locked-input");
    step1LabelEl.classList.remove("locked");

    // Reset scanner status text ke "Idle" (pakai bahasa aktif)
    const statusCode = document.getElementById("scanner-status-code");
    const statusLoc = document.getElementById("scanner-status-location");
    if (statusCode) statusCode.textContent = dict.scannerIdle;
    if (statusLoc) statusLoc.textContent = dict.scannerIdle;

    // Fokus balik ke kode barang
    codeInputEl.focus();
    // Export current summaryRows to CSV (Excel / Google Sheets friendly)
function exportSummaryToCsv() {
  try {
    if (!summaryRows || summaryRows.length === 0) {
      alert(window.translations[window.currentLang].toastExportNoData);
      return;
    }

    const dict = window.translations[window.currentLang];

    const header = [
      '"' + (dict.colCode || "Code") + '"',
      '"' + (dict.colLocation || "Location") + '"',
      '"' + (dict.colTime || "Updated") + '"'
    ];

    const rows = summaryRows.map((row) => {
      const code = String(row.code || "").replace(/"/g, '""');
      const loc = String(row.location || "").replace(/"/g, '""');
      const ts = row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : "";

      return `"${code}","${loc}","${ts.replace(/"/g, '""')}"`;
    });

    const csvContent = [header.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : String(n));
    const filename =
      "goods-tracking-" +
      now.getFullYear() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      "-" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      ".csv";

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error exporting CSV:", err);
    alert("Failed to export CSV.");
  }
}

  }
  const btnExportCsv = document.getElementById("btn-export-csv");


// export CSV
if (btnExportCsv) {
  btnExportCsv.addEventListener("click", () => {
    if (typeof exportSummaryToCsv === "function") {
      exportSummaryToCsv();
    }
  });
}

});
