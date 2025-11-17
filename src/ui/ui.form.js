// src/ui/ui.form.js
// =====================================================
// UI generator for input form (kodebarang + lokasi)
// Includes: validation, scan button, toast alert
// =====================================================

import { LANG } from "../i18n/lang.js";
import { saveRecord } from "../modules/db.js";
import { isEmpty } from "../modules/utils.js";
import { startScanner } from "../modules/scan.js";
import { loadSummaryData } from "../app/main.js";

export function renderFormUI() {
  const currentLang = localStorage.getItem("app-lang") || "en";
  const container = document.getElementById("formSection");

  container.innerHTML = `
    <div class="bg-[#0f1624] border border-[#1e2636] shadow-neon rounded-xl p-5">

      <!-- ITEM CODE -->
      <label id="labelKode"
        class="block mb-2 font-medium text-neon-blue">
        ${LANG[currentLang].formItemCode}
      </label>

      <div class="flex gap-2 mb-4">
        <input id="kodebarang"
          class="flex-grow px-4 py-3 bg-[#1a2234] border border-[#1e2636]
                 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          autocomplete="off"
          type="text">

        <button id="scanKodeBtn"
          class="px-3 bg-neon-blue text-black rounded-lg shadow-neon hover:brightness-110 transition">
          📷
        </button>
      </div>

      <!-- LOCATION -->
      <label id="labelLokasi"
        class="block mb-2 font-medium text-neon-blue">
        ${LANG[currentLang].formLocation}
      </label>

      <div class="flex gap-2 mb-5">
        <input id="lokasi"
          class="flex-grow px-4 py-3 bg-[#1a2234] border border-[#1e2636]
                 rounded-lg text-white focus:outline-none focus:border-neon-blue"
          autocomplete="off"
          type="text">

        <button id="scanLokasiBtn"
          class="px-3 bg-neon-blue text-black rounded-lg shadow-neon hover:brightness-110 transition">
          📷
        </button>
      </div>

      <!-- SAVE BUTTON -->
      <button id="saveBtn"
        class="w-full py-3 bg-neon-blue text-black font-semibold rounded-lg
               shadow-neon hover:brightness-110 transition">
        ${LANG[currentLang].formSave}
      </button>
    </div>

    <!-- Toast Message -->
    <div id="toast"
      class="hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-neon-blue
             text-black rounded-xl shadow-neon font-semibold z-[9999]">
      Saved!
    </div>
  `;

  // Attach listeners
  attachFormListeners();
}

// =====================================================
// LISTENERS
// =====================================================
function attachFormListeners() {
  document.getElementById("scanKodeBtn").onclick = () =>
    startScanner("kodebarang");

  document.getElementById("scanLokasiBtn").onclick = () =>
    startScanner("lokasi");

  document.getElementById("saveBtn").onclick = saveFormData;
}

// =====================================================
// SAVE FORM LOGIC
// =====================================================
async function saveFormData() {
  const currentLang = localStorage.getItem("app-lang") || "en";

  const kode = document.getElementById("kodebarang").value.trim();
  const lokasi = document.getElementById("lokasi").value.trim();

  // Validation
  if (isEmpty(kode)) {
    alert(LANG[currentLang].errorKodeEmpty);
    return;
  }
  if (isEmpty(lokasi)) {
    alert(LANG[currentLang].errorLokasiEmpty);
    return;
  }

  // Save to Supabase
  const ok = await saveRecord(kode, lokasi);

  if (ok) {
    showToast(LANG[currentLang].successSave);

    // Reset form
    document.getElementById("kodebarang").value = "";
    document.getElementById("lokasi").value = "";

    // 🔥 REFRESH TABLE LIST
    await loadSummaryData();
  }
}

// =====================================================
// TOAST MESSAGE
// =====================================================
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;

  toast.classList.remove("hidden", "opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 1200);
}
