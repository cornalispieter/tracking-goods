document.addEventListener("DOMContentLoaded", () => {

  loadData();

  document.getElementById("scan-code-btn").onclick = startCodeScan;
  document.getElementById("scan-location-btn").onclick = startLocationScan;

  document.getElementById("save-btn").onclick = async () => {
    let code = document.getElementById("code-input").value.trim();
    let loc = document.getElementById("location-input").value.trim();

    if (!code || !loc) return alert("Fill all fields");

    await saveData(code, loc);

    document.getElementById("code-input").value = "";
    document.getElementById("location-input").value = "";
  };

  document.getElementById("export-btn").onclick = exportCSV;

  document.getElementById("search-input").oninput = renderData;

});
