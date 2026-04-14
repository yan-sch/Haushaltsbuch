// transactions.js - Buchungslogik, Kategorien, Form-Submit, Löschen
import { buchungen, speichereDaten } from './storage.js';
import { updateUI, form, descriptionInput, amountInput, categorySelect, subcategorySelect } from './ui.js';

export const einnahmeKategorien = ["Gehälter", "Staatl. Unterstützung", "Sonstige Einnahmen"];
export const ausgabeKategorien = ["Wohnen", "Mobilität", "Medien", "Sport", "Gesundheit", "Versicherungen", "Haushaltseinkauf", "Auswärts essen", "Investitionen", "Haustiere", "Spaß", "Sonstige"];

export function updateSubcategories() {
    subcategorySelect.innerHTML = "";
    const gewaehlteKategorie = categorySelect.value;
    let optionen = gewaehlteKategorie === "einnahme" ? einnahmeKategorien : ausgabeKategorien;

    optionen.forEach(function(kategorieName) {
        const neueOption = document.createElement("option");
        neueOption.value = kategorieName;
        neueOption.innerText = kategorieName;
        subcategorySelect.appendChild(neueOption);
    });
}

export function loescheBuchung(idZumLoeschen) {
    buchungen.splice(buchungen.findIndex(b => b.id === idZumLoeschen), 1);
    speichereDaten();
    updateUI();
}

// Form-Submit Handler und Event-Listener in DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const text = descriptionInput.value;
        let betrag = parseFloat(amountInput.value);
        const kategorie = categorySelect.value;
        const unterkategorieWert = subcategorySelect.value;

        if (kategorie === "ausgabe") { betrag = betrag * -1; }

        const neueBuchung = {
            id: Date.now(),
            beschreibung: text,
            wert: betrag,
            unterkategorie: unterkategorieWert
        };

        buchungen.push(neueBuchung);

        descriptionInput.value = '';
        amountInput.value = '';

        speichereDaten();
        updateUI();
    });

    // Event-Listener für Kategorien
    categorySelect.addEventListener("change", () => {
        updateSubcategories();
        speichereDaten();
    });
});