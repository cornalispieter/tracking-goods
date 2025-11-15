// script.js
import {
  saveMovement,
  fetchLatestMovements,
  fetchHistoryByCode,
} from "./db.js";

let html5QrCode = null;
let isScanning = false;

document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("code");
  const locationInput = document.getElementById("location");
  const form = document.getElementById("scan-form");
  const saveBtn = document.getElementById("save-btn");
  const startScanBtn = document.getElementById("start-scan-btn");
  const stopScanBtn = document.getElementById("stop-scan-btn");
  const statusEl = document.getElementById("status");
  const scannerContainer = document.getElementById("scanner-container");
  const historyDialog = document.getElementById("history-dialog");
  const historyTitle = document.getElementById("history-title");
  const historyList = document.getElementById("history-list");
  const closeHistoryBtn = document.getElementById("close-history-btn");

  // Load initial data
  loadLatest();

  // Handle save movement
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = codeInput.value.trim();
    const location = locationInput.value.trim();

    if (!code || !location) {
      setStatus("Please fill production code and location.", true);
      return;
    }

    saveBtn.disabled = true;
    setStatus("Saving movement...");

    try {
      await saveMovement({ code, location });
      setStatus("Movement saved successfully.");
      codeInput.value = "";
      locationInput.value = "";
      loadLatest();
    } catch (err) {
      console.error(err);
      setStatus("Error saving movement: " + (err.message || "Unknown error"), true);
    } finally {
      saveBtn.disabled = false;
    }
  });

  // Start scanner
  startScanBtn.addEventListener("click", async () => {
    if (isScanning) return;
    if (!window.Html5Qrcode) {
      setStatus("Scanner library not loaded.", true);
      return;
    }

    scannerContainer.style.display = "block";
    startScanBtn.disabled = true;
    stopScanBtn.disabled = false;
    setStatus("Starting camera scanner...");

    const qrRegionId = "reader";
    html5QrCode = new Html5Qrcode(qrRegionId);

    const config = { fps: 10, qrbox: 250 }; // basic

    const onScanSuccess = (decodedText) => {
      // isi ke input code, tidak langsung save biar bisa dikoreksi
      codeInput.value = decodedText;
      setStatus(`Scanned: ${decodedText}`);
    };

    const onScanError = () => {
      // bisa diabaikan, dipanggil berkali-kali saat tidak ada kode
    };

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        setStatus("No camera found.", true);
        stopScanner();
        return;
      }

      // pakai camera pertama
      await html5QrCode.start(
        { deviceId: { exact: cameras[0].id } },
        config,
        onScanSuccess,
        onScanError
      );

      isScanning = true;
      setStatus("Scanner is running. Point camera to a barcode/QR.");
    } catch (err) {
      console.error(err);
      setStatus("Failed to start scanner: " + (err.message || "Unknown error"), true);
      stopScanner();
    }
  });

  // Stop scanner
  stopScanBtn.addEventListener("click", () => {
    stopScanner();
    setStatus("Scanner stopped.");
  });

  // Close history dialog
  closeHistoryBtn.addEventListener("click", () => {
    historyDialog.close();
  });

  // If user clicks backdrop on some browsers
  historyDialog.addEventListener("click", (e) => {
    const rect = historyDialog.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!inDialog) {
      historyDialog.close();
    }
  });

  /**
   * Load latest records and render table
   */
  async function loadLatest() {
    setStatus("Loading latest movements...");
    const tbody = document.getElementById("records-body");
    tbody.innerHTML = `<tr><td colspan="4">Loading...</td></tr>`;

    try {
      const rows = await fetchLatestMovements();
      if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="4">No data yet.</td></tr>`;
        setStatus("No data yet.");
        return;
      }

      tbody.innerHTML = "";
      for (const row of rows) {
        const tr = document.createElement("tr");

        const codeTd = document.createElement("td");
        codeTd.textContent = row.code;

        const locTd = document.createElement("td");
        locTd.textContent = row.location;

        const timeTd = document.createElement("td");
        const createdAt = row.created_at ? new Date(row.created_at) : null;
        timeTd.textContent = createdAt
          ? createdAt.toLocaleString()
          : "-";

        const historyTd = document.createElement("td");
        const historyBtn = document.createElement("button");
        historyBtn.textContent = "History";
        historyBtn.className = "secondary";
        historyBtn.type = "button";
        historyBtn.addEventListener("click", () => openHistory(row.code));
        historyTd.appendChild(historyBtn);

        tr.appendChild(codeTd);
        tr.appendChild(locTd);
        tr.appendChild(timeTd);
        tr.appendChild(historyTd);
        tbody.appendChild(tr);
      }

      setStatus("Latest movements loaded.");
    } catch (err) {
      console.error(err);
      setStatus("Error loading data: " + (err.message || "Unknown error"), true);
    }
  }

  /**
   * Open history dialog for a specific code
   */
  async function openHistory(code) {
    historyTitle.textContent = `History – ${code}`;
    historyList.innerHTML = "<li>Loading...</li>";
    historyDialog.showModal();

    try {
      const items = await fetchHistoryByCode(code);
      if (!items.length) {
        historyList.innerHTML = "<li>No history yet.</li>";
        return;
      }

      historyList.innerHTML = "";
      for (const item of items) {
        const li = document.createElement("li");
        const ts = item.created_at ? new Date(item.created_at).toLocaleString() : "-";
        li.textContent = `${ts} → ${item.location}`;
        historyList.appendChild(li);
      }
    } catch (err) {
      console.error(err);
      historyList.innerHTML = `<li>Error loading history: ${err.message || "Unknown error"}</li>`;
    }
  }

  /**
   * Stop scanner if running
   */
  async function stopScanner() {
    const startScanBtn = document.getElementById("start-scan-btn");
    const stopScanBtn = document.getElementById("stop-scan-btn");
    const scannerContainer = document.getElementById("scanner-container");

    if (html5QrCode && isScanning) {
      try {
        await html5QrCode.stop();
        await html5QrCode.clear();
      } catch (err) {
        console.error("Error stopping scanner", err);
      }
    }

    html5QrCode = null;
    isScanning = false;
    startScanBtn.disabled = false;
    stopScanBtn.disabled = true;
    scannerContainer.style.display = "none";
  }

  /**
   * Status helper
   */
  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? "#dc2626" : "#4b5563";
  }
});
