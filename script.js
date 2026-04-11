// ==========================================
// 1. HTML-ELEMENTE IN VARIABLEN SPEICHERN
// ==========================================
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
// NEU: Wir greifen jetzt den Container ab, nicht mehr das <ul>
const transactionListContainer = document.getElementById('transaction-list-container');

const totalBalanceDisplay = document.getElementById('total-balance');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');

let buchungen = [];

// ==========================================
// 2. LOGIK FÜR DIE UNTERKATEGORIEN
// ==========================================
const einnahmeKategorien = ["Gehälter", "Staatl. Unterstützung", "Sonstige Einnahmen"];
const ausgabeKategorien = ["Wohnen", "Mobilität", "Medien", "Sport", "Gesundheit", "Versicherungen", "Haushaltseinkauf", "Auswärts essen", "Investitionen", "Haustiere", "Spaß", "Sonstige"];

function updateSubcategories() {
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
categorySelect.addEventListener("change", updateSubcategories);
updateSubcategories();

// ==========================================
// 3. BENUTZEROBERFLÄCHE AKTUALISIEREN (UI) - NEU GESCHRIEBEN
// ==========================================
function updateUI() {
    transactionListContainer.innerHTML = ''; // Alles leeren

    let total = 0;
    let income = 0;
    let expense = 0;

    // --- SCHRITT A: DATEN GRUPPIEREN ---
    // Wir erstellen ein leeres Objekt als unser "Ordnersystem"
    const gruppen = {}; 

    buchungen.forEach(function(buchung) {
        // Gesamtsummen fürs Dashboard berechnen
        total += buchung.wert;
        if (buchung.wert > 0) { income += buchung.wert; } 
        else { expense += buchung.wert; }

        // Entscheiden, in welchen "Hauptordner" es kommt (anhand des Werts)
        const hauptKat = buchung.wert > 0 ? "Einnahmen" : "Ausgaben";
        const unterKat = buchung.unterkategorie;

        // Wenn der Ordner noch nicht existiert, erstelle ihn
        if (!gruppen[hauptKat]) { gruppen[hauptKat] = {}; }
        if (!gruppen[hauptKat][unterKat]) { 
            gruppen[hauptKat][unterKat] = { eintraege: [], summe: 0 }; 
        }

        // Buchung in den richtigen Ordner ablegen und Zwischensumme aktualisieren
        gruppen[hauptKat][unterKat].eintraege.push(buchung);
        gruppen[hauptKat][unterKat].summe += buchung.wert;
    });

    // --- SCHRITT B: HTML AUS DEN GRUPPEN GENERIEREN ---
    // Wir gehen durch unsere erstellten Ordner ("Einnahmen", "Ausgaben")
    Object.keys(gruppen).forEach(function(hauptKat) {
        
        // Wir gehen durch die Unterordner (z.B. "Wohnen", "Mobilität")
        Object.keys(gruppen[hauptKat]).forEach(function(unterKat) {
            const gruppenDaten = gruppen[hauptKat][unterKat];

            // 1. Zwischenüberschrift erstellen (z.B. "Wohnen (Zwischensumme: -500€)")
            const titelElement = document.createElement('h4');
            titelElement.classList.add('gruppen-titel');
            titelElement.innerHTML = `<span>${unterKat}</span> <span>${gruppenDaten.summe.toFixed(2)}€</span>`;
            transactionListContainer.appendChild(titelElement);

            // 2. Eine neue <ul> Liste für diese spezifische Gruppe erstellen
            const ul = document.createElement('ul');

            // 3. Alle Einträge aus diesem Ordner als <li> in die neue Liste packen
            gruppenDaten.eintraege.forEach(function(buchung) {
                const li = document.createElement('li');
                li.innerText = buchung.beschreibung + ": " + buchung.wert.toFixed(2) + "€";
                li.classList.add(buchung.wert > 0 ? 'plus' : 'minus');
                ul.appendChild(li);
            });

            // 4. Die fertige Liste unter die Überschrift ins HTML schieben
            transactionListContainer.appendChild(ul);
        });
    });

    // Dashboard-Werte updaten
    totalBalanceDisplay.innerText = total.toFixed(2);
    incomeDisplay.innerText = income.toFixed(2);
    expenseDisplay.innerText = expense.toFixed(2); 
}

// ==========================================
// 4. FORMULAR ABSENDEN 
// ==========================================
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const text = descriptionInput.value;
    let betrag = parseFloat(amountInput.value);
    const kategorie = categorySelect.value;
    const unterkategorieWert = subcategorySelect.value;

    if (kategorie === "ausgabe") { betrag = betrag * -1; }
    
    const neueBuchung = {
        beschreibung: text,
        wert: betrag,
        unterkategorie: unterkategorieWert
    };

    buchungen.push(neueBuchung);
    
    descriptionInput.value = '';
    amountInput.value = '';

    updateUI(); 
});