document.addEventListener("DOMContentLoaded", () => {

  loadData();

  document.getElementById("scan-code-btn").onclick = startCodeScan;
  document.getElementById("scan-location-btn").onclick = startLocationScan;

  document.getElementById("save-btn").onclick = async () => {
    const code = document.getElementById("code-input").value.trim();
    const loc = document.getElementById("location-input").value.trim();

    if (!code || !loc) return alert("Please fill both fields");

    await saveData(code, loc);

    document.getElementById("code-input").value = "";
    document.getElementById("location-input").value = "";
  };

  document.getElementById("search-input").oninput = renderTable;

  document.getElementById("export-btn").onclick = exportCSV;

});
