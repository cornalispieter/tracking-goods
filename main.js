/* ============================================================
   main.js — UPDATED (NO LOCK SYSTEM + EXPORT)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("code-input");
  const locationInput = document.getElementById("location-input");

  const btnScanCode = document.getElementById("start-scan-code");
  const btnScanLocation = document.getElementById("start-scan-location");

  const btnSave = document.getElementById("save-update");
  const btnExport = document.getElementById("export-csv");

  const langSelect = document.getElementById("lang-select");

  // Load languages
  Object.keys(translations).forEach((lang) => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang.toUpperCase();
    langSelect.appendChild(opt);
  });

  langSelect.value = currentLang;

  applyTranslations();
  loadSummaryList();


  /* ============================
       SCAN CODE
     ============================ */
  btnScanCode.onclick = startScannerForCode;

  /* ============================
       SCAN LOCATION
     ============================ */
  btnScanLocation.onclick = startScannerForLocation;

  /* ============================
       SAVE ENTRY
     ============================ */
  btnSave.onclick = async () => {
    const code = codeInput.value.trim();
    const loc = locationInput.value.trim();

    if (!code || !loc) return alert("Both fields required.");

    btnSave.disabled = true;

    const ok = await saveUpdateToSupabase(code, loc);

    if (ok) {
      resetForm();
      loadSummaryList();
    } else {
      alert("Save failed.");
      btnSave.disabled = false;
    }
  };

  /* ============================
       EXPORT CSV
     ============================ */
  btnExport.onclick = () => {
    exportToCSV(summaryRows);
  };

  /* ============================
       LANGUAGE SWITCH
     ============================ */
  langSelect.onchange = () => {
    currentLang = langSelect.value;
    applyTranslations();
    loadSummaryList();
  };

  /* ============================
       RESET FORM
     ============================ */
  function resetForm() {
    stopScannerForCode();
    stopScannerForLocation();

    codeInput.value = "";
    locationInput.value = "";

    btnSave.disabled = false;
  }

  /* ============================
       TRANSLATIONS
     ============================ */
  function applyTranslations() {
    const dict = translations[currentLang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }
});
