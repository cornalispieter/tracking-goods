// app.js - Main Application Logic
// Requires: db.js, lang.js, ui.js

// ==========================
// Load All Data (Unique Latest)
// ==========================
async function loadData() {
    const { data, error } = await db.from("tracking").select("*");
    if (error) {
        console.error("Error loading data:", error);
        return;
    }

    // Get latest record per kodebarang
    const unique = {};
    data.forEach(r => {
        if (!unique[r.kodebarang]) unique[r.kodebarang] = r;
        else {
            if (new Date(r.updated_at) > new Date(unique[r.kodebarang].updated_at)) {
                unique[r.kodebarang] = r;
            }
        }
    });

    const result = Object.values(unique);
    renderMainTable(result);
}

// ==========================
// Save New Record
// ==========================
document.getElementById("saveBtn").onclick = async () => {
    const kode = document.getElementById("kodeInput").value.trim();
    const lokasi = document.getElementById("lokasiInput").value.trim();

    if (!kode || !lokasi) return;

    await db.from("tracking").insert({ kodebarang: kode, lokasi: lokasi });

    document.getElementById("kodeInput").value = "";
    document.getElementById("lokasiInput").value = "";

    loadData();
};

// ==========================
// Load History of Selected Item
// ==========================
async function loadHistory(kode) {
    const { data, error } = await db
        .from("tracking")
        .select("*")
        .eq("kodebarang", kode)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error loading history:", error);
        return;
    }

    renderHistoryTable(data);
}

window.loadHistory = loadHistory;

// ==========================
// Search Bar Listener
// ==========================
document.getElementById("searchInput").addEventListener("input", () => {
    filterSearch(document.getElementById("searchInput").value);
});

// ==========================
// Export CSV Listener
// ==========================
document.getElementById("exportCSV").onclick = () => {
    exportCSV();
};

// ==========================
// Initial Load
// ==========================
window.addEventListener("load", () => {
    loadData();
});