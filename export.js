// export.js - Export-Funktionen
import { buchungen } from './storage.js';

const exportBtn = document.getElementById('export-btn');
const exportFormat = document.getElementById('export-format');

export function erstelleCSV() {
    let csvString = "Strukturebene,Kategorie,Beschreibung,Betrag (EUR)\n";

    let gesamt = 0, summeEinnahmen = 0, summeAusgaben = 0;
    const gruppen = { Einnahmen: {}, Ausgaben: {} };

    buchungen.forEach(b => {
        gesamt += b.wert;
        if (b.wert > 0) summeEinnahmen += b.wert;
        else summeAusgaben += b.wert;

        const typ = b.wert > 0 ? "Einnahmen" : "Ausgaben";
        if (!gruppen[typ][b.unterkategorie]) {
            gruppen[typ][b.unterkategorie] = { summe: 0, eintraege: [] };
        }

        gruppen[typ][b.unterkategorie].summe += b.wert;
        gruppen[typ][b.unterkategorie].eintraege.push(b);
    });

    csvString += `GESAMTSALDO,,,${gesamt.toFixed(2)}\n\n`;

    Object.keys(gruppen).forEach(typ => {
        if (Object.keys(gruppen[typ]).length === 0) return;

        const typSumme = typ === "Einnahmen" ? summeEinnahmen : summeAusgaben;
        csvString += `HAUPTKATEGORIE,${typ},,${typSumme.toFixed(2)}\n`;

        Object.keys(gruppen[typ]).forEach(unterKat => {
            const katDaten = gruppen[typ][unterKat];
            csvString += `Unterkategorie,,${unterKat},${katDaten.summe.toFixed(2)}\n`;

            katDaten.eintraege.forEach(b => {
                csvString += `Eintrag,, "${b.beschreibung}",${b.wert.toFixed(2)}\n`;
            });
        });
        csvString += "\n";
    });

    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Haushaltsbuch_Export.csv";
    link.click();

    URL.revokeObjectURL(url);
}

// Event-Listener in DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    exportBtn.addEventListener('click', function() {
        if (exportFormat.value === 'pdf') {
            window.print();
        } else {
            erstelleCSV();
        }
    });
});