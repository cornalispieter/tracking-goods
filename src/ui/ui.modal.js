// src/ui/ui.modal.js
// =====================================================
// History Modal UI Wrapper
// The modal structure only — content filled by history.js
// =====================================================

import { LANG } from "../i18n/lang.js";

export function renderHistoryModal() {
  const currentLang = localStorage.getItem("app-lang") || "en";
  const wrapper = document.getElementById("historyModalWrapper");

  wrapper.innerHTML = `
    <div id="historyModal"
         class="hidden fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex justify-center items-center">

      <div class="bg-[#0f1624] border border-neon-blue shadow-neon rounded-xl p-6 w-[90%] max-w-2xl max-h-[90%] overflow-y-auto">

        <!-- HEADER -->
        <div class="flex justify-between items-center mb-4">
          <h2 id="historyModalTitle"
              class="text-xl font-semibold text-neon-blue">
              ${LANG[currentLang].historyTitle}
          </h2>

          <button id="closeHistory"
            class="text-white text-2xl hover:text-neon-blue transition">
            &times;
          </button>
        </div>

        <!-- CONTENT FROM history.js -->
        <div id="historyContent" class="text-sm text-gray-300">
          <!-- history.js will render content here -->
        </div>
      </div>
    </div>
  `;

  // Close modal action
  document.getElementById("closeHistory").onclick = () => {
    document.getElementById("historyModal").classList.add("hidden");
  };
}
