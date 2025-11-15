/* ============================================================
   main.js — Control full UI logic
   ============================================================ */

/*
  Dependencies available:
  - translations (from i18n.js)
  - loadSummaryList(), saveUpdateToSupabase() (data.js)
  - startScannerForCode(), startScannerForLocation() (scanner.js)
*/

document.addEventListener("DOMContentLoaded", () => {

  /* DOM Reference */
  const codeInput = document.getElementById("code-input");
  const locationInput = document.getElementById("location-input");

  const btnScanCode = document.getElementById("start-scan-code");
  const btnLockCode = document.getElementById("lock-code");

  const btnScanLocation = document.getElementById("start-scan-location");
  const btnLockLocation = document.getElementById("lock-location");

  const btnSave = document.getElementById("save-update");

  const step1Label = document.getElementById("step1-label");
  const step2Label = document.getElementById("step2-label");

  const langSelect = document.getElementById("lang-select");

  /* ============================================================
     INITIALIZATION
     ============================================================ */

  // Fill language dropdown
  Object.keys(translations).forEach((lang) => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang.toUpperCase();
    langSelect.appendChild(opt);
  });
  langSelect.value = window.currentLang;

  applyTranslations();
  loadSummaryList(); // load initial data


  /* ============================================================
     STEP 1 — LOCK CODE
     ============================================================ */
  btnLockCode.addEventListener("click", () => {
    const code = codeInput.value.trim();
    if (!code) return;

    codeInput.classList.add("locked-input");
    codeInput.disabled = true;

    // highlight step 1 as done
    step1Label.classList.add("locked");

    // enable step 2
    locationInput.disabled = false;
    btnScanLocation.disabled = false;
    btnLockLocation.disabled = false;
  });


  /* ============================================================
     STEP 2 — LOCK LOCATION
     ============================================================ */
  btnLockLocation.addEventListener("click", () => {
    const loc = locationInput.value.trim();
    if (!loc) return;

    locationInput.classList.add("locked-input");
    locationInput.disabled = true;
    step2Label.classList.add("locked");

    btnSave.disabled = false;
  });


  /* ============================================================
     SCANNER BUTTONS
     ============================================================ */

  btnScanCode.addEventListener("click", () => {
    startScannerForCode();
  });

  btnScanLocation.addEventListener("click", () => {
    startScannerForLocation();
  });


  /* ============================================================
     SAVE UPDATE
     ============================================================ */
  btnSave.addEventListener("click", async () => {
    const code = codeInput.value.trim();
    const loc = locationInput.value.trim();

    if (!code || !loc) return;

    btnSave.disabled = true;

    const ok = await saveUpdateToSupabase(code, loc);

    if (ok) {
      resetForm();
      loadSummaryList();
    } else {
      alert("Failed to save. Check Supabase.");
      btnSave.disabled = false;
    }
  });


  /* ============================================================
     LANGUAGE CHANGE
     ============================================================ */
  langSelect.addEventListener("change", () => {
    window.currentLang = langSelect.value;
    applyTranslations();
    loadSummaryList();
  });


  /* ============================================================
     RESET FORM AFTER SAVE
     ============================================================ */
  function resetForm() {
    // stop any scanners
    stopScannerForCode();
    stopScannerForLocation();

    // reset input
    codeInput.value = "";
    locationInput.value = "";

    codeInput.disabled = false;
    locationInput.disabled = true;

    codeInput.classList.remove("locked-input");
    locationInput.classList.remove("locked-input");

    // reset step labels
    step1Label.classList.remove("locked");
    step2Label.classList.remove("locked");

    // disable step 2 controls
    btnScanLocation.disabled = true;
    btnLockLocation.disabled = true;

    // disable save
    btnSave.disabled = true;
  }


  /* ============================================================
     APPLY TRANSLATIONS
     ============================================================ */
  function applyTranslations() {
    const dict = translations[currentLang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

});
