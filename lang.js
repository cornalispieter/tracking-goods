// lang.js - Multi-language text system

const LANG_DATA = {
    en: {
        title: "Tracking Goods",
        input: "Input",
        search: "Search",
        data: "Data Overview",
        history: "History",
        item: "Item Code",
        loc: "Location",
        updated: "Updated",
        save: "Save"
    },
    nl: {
        title: "Goederen Tracking",
        input: "Invoer",
        search: "Zoeken",
        data: "Gegevensoverzicht",
        history: "Historiek",
        item: "Artikelcode",
        loc: "Locatie",
        updated: "Bijgewerkt",
        save: "Opslaan"
    }
};

function applyLanguage(langCode) {
    const t = LANG_DATA[langCode];
    if (!t) return;

    document.getElementById("titleText").innerText = t.title;
    document.getElementById("sectionInput").innerText = t.input;
    document.getElementById("sectionSearch").innerText = t.search;
    document.getElementById("sectionData").innerText = t.data;
    document.getElementById("sectionHistory").innerText = t.history;

    document.getElementById("thKode").innerText = t.item;
    document.getElementById("thLokasi").innerText = t.loc;
    document.getElementById("thWaktu").innerText = t.updated;

    document.getElementById("thHKode").innerText = t.item;
    document.getElementById("thHLokasi").innerText = t.loc;
    document.getElementById("thHWaktu").innerText = t.updated;

    document.getElementById("saveBtn").innerHTML = `<i class='fa fa-save'></i> ${t.save}`;
}

// Auto apply on load
window.addEventListener("load", () => {
    const langSelect = document.getElementById("languageSelect");
    applyLanguage(langSelect.value);

    langSelect.addEventListener("change", () => {
        applyLanguage(langSelect.value);
    });
});

// Export
window.applyLanguage = applyLanguage;