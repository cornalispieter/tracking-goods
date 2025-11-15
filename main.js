/* ============================================================
   main.js — UI Logic
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
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

  /* INIT LANGUAGE LIST */
  Object.keys(translations).forEach((lang) => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang.toUpperCase();
    langSelect.appendChild(opt);
  });
  langSelect.value = currentLang;

  applyTranslations();
  loadSummaryList();


  /* STEP 1: Lock Code */
  btnLockCode.onclick = () => {
    if (!codeInput.value.trim()) return;

    codeInput.disabled = true;
    codeInput.classList.add("locked-input");
    step1Label.classList.add("locked");

    locationInput.disabled = false;
    btnScanLocation.disabled = false;
    btnLockLocation.disabled = false;
  };


  /* STEP 2: Lock Location */
  btnLockLocation.onclick = () => {
    if (!locationInput.value.trim()) return;

    locationInput.disabled = true;
    locationInput.classList.add("locked-input");
    step2Label.classList.add("locked");

    btnSave.disabled = false;
  };


  /* Scanner */
  btnScanCode.onclick = startScannerForCode;
  btnScanLocation.onclick = startScannerForLocation;


  /* SAVE */
  btnSave.onclick = async () => {
    const code = codeInput.value.trim();
    const loc = locationInput.value.trim();

    if (!code || !loc) return;

    btnSave.disabled = true;

    const ok = await saveUpdateToSupabase(code, loc);

    if (ok) {
      resetForm();
      loadSummaryList();
    } else {
      alert("Failed to save");
      btnSave.disabled = false;
    }
  };


  /* LANGUAGE CHANGE */
  langSelect.onchange = () => {
    currentLang = langSelect.value;
    applyTranslations();
    loadSummaryList();
  };


  /* RESET AFTER SAVE */
  function resetForm() {
    stopScannerForCode();
    stopScannerForLocation();

    codeInput.value = "";
    locationInput.value = "";

    codeInput.disabled = false;
    locationInput.disabled = true;

    codeInput.classList.remove("locked-input");
    locationInput.classList.remove("locked-input");

    step1Label.classList.remove("locked");
    step2Label.classList.remove("locked");

    btnScanLocation.disabled = true;
    btnLockLocation.disabled = true;
    btnSave.disabled = true;
  }


  /* APPLY I18N */
  function applyTranslations() {
    const dict = translations[currentLang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

});
