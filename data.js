// Export current items to CSV (Excel / Google Sheets friendly)
// versi baru: langsung baca dari Supabase, tidak tergantung summaryRows di UI
async function exportSummaryToCsv() {
  try {
    const dict = window.translations[window.currentLang];

    // Ambil semua data dari Supabase
    const { data, error } = await supabaseClient
      .from("goods_updates")
      .select("code, location, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase export select error:", error);
      alert(dict.toastErrorLoad || "Failed to load data for export.");
      return;
    }

    if (!data || data.length === 0) {
      alert(dict.toastExportNoData);
      return;
    }

    // Group per code, ambil update terbaru
    const byCode = new Map();
    (data || []).forEach((row) => {
      if (!row.code) return;
      const existing = byCode.get(row.code);
      if (!existing) {
        byCode.set(row.code, row);
      } else {
        const a = new Date(existing.updated_at).getTime();
        const b = new Date(row.updated_at).getTime();
        if (b > a) byCode.set(row.code, row);
      }
    });

    const summaryArray = Array.from(byCode.values()).sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    });

    if (!summaryArray.length) {
      alert(dict.toastExportNoData);
      return;
    }

    // Header CSV pakai translate aktif
    const header = [
      '"' + (dict.colCode || "Code") + '"',
      '"' + (dict.colLocation || "Location") + '"',
      '"' + (dict.colTime || "Updated") + '"'
    ];

    const rows = summaryArray.map((row) => {
      const code = String(row.code || "").replace(/"/g, '""');
      const loc = String(row.location || "").replace(/"/g, '""');
      const ts = row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : "";

      return [
        '"' + code + '"',
        '"' + loc + '"',
        '"' + ts.replace(/"/g, '""') + '"'
      ].join(",");
    });

    const csvContent = [header.join(","), ...rows].join("\n");

    // Tambah UTF-8 BOM biar Excel baca dengan benar
    const blob = new Blob(["\ufeff" + csvContent], {
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
