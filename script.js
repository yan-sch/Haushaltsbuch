// ==========================================
// 1. HTML-ELEMENTE IN VARIABLEN SPEICHERN
// ==========================================
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory'); // Das neue Unterkategorie-Feld
const transactionList = document.getElementById('transaction-list');

const totalBalanceDisplay = document.getElementById('total-balance');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');

// ==========================================
// 2. UNSER DATENSPEICHER
// ==========================================
// Hier landen alle Buchungen als Objekte
let buchungen = [];

// ==========================================
// 3. LOGIK FÜR DIE UNTERKATEGORIEN
// ==========================================
// Unsere Listen (Arrays) mit den Auswahlmöglichkeiten
const einnahmeKategorien = ["Gehälter", "Staatl. Unterstützung", "Sonstige Einnahmen"];
const ausgabeKategorien = ["Wohnen", "Mobilität", "Medien", "Sport", "Gesundheit", "Versicherungen", "Haushaltseinkauf", "Auswärts essen", "Investitionen", "Haustiere", "Spaß", "Sonstige"];

// Funktion zum Füllen des zweiten Dropdowns
function updateSubcategories() {
    // 1. Zuerst das untere Dropdown komplett leeren
    subcategorySelect.innerHTML = "";
    
    // 2. Prüfen, was oben gerade ausgewählt ist
    const gewaehlteKategorie = categorySelect.value;
    let optionen = [];

    if (gewaehlteKategorie === "einnahme") {
        optionen = einnahmeKategorien;
    } else {
        optionen = ausgabeKategorien;
    }

    // 3. Für jedes Wort in unserer Liste eine neue <option> erstellen
    optionen.forEach(function(kategorieName) {
        const neueOption = document.createElement("option");
        neueOption.value = kategorieName;
        neueOption.innerText = kategorieName;
        subcategorySelect.appendChild(neueOption); // Ins HTML einfügen
    });
}

// Wenn sich das obere Dropdown ändert, fülle das untere neu
categorySelect.addEventListener("change", updateSubcategories);

// Die Funktion einmal sofort beim Laden der Seite aufrufen!
updateSubcategories();

// ==========================================
// 4. BENUTZEROBERFLÄCHE AKTUALISIEREN (UI)
// ==========================================
function updateUI() {
    // Liste im HTML leeren, um doppelte Einträge zu vermeiden
    transactionList.innerHTML = '';

    // Startwerte für Berechnungen
    let total = 0;
    let income = 0;
    let expense = 0;

    // Einträge durchgehen und rechnen
    buchungen.forEach(function(buchung) {
        
        // Mathematik
        total = total + buchung.wert;
        
        if (buchung.wert > 0) {
            income = income + buchung.wert;
        } else {
            expense = expense + buchung.wert;
        }

        // HTML-Element für die Liste erstellen
        const li = document.createElement('li');
        
        // Text zusammensetzen (mit Unterkategorie in Klammern)
        li.innerText = buchung.beschreibung + " (" + buchung.unterkategorie + "): " + buchung.wert.toFixed(2) + "€"; 
        
        // CSS Farbe (Grün oder Rot) zuweisen
        if (buchung.wert > 0) {
            li.classList.add('plus');
        } else {
            li.classList.add('minus');
        }

        // In die HTML-Liste einfügen
        transactionList.appendChild(li);
    });

    // Dashboard-Werte im HTML aktualisieren (auf 2 Nachkommastellen gerundet)
    totalBalanceDisplay.innerText = total.toFixed(2);
    incomeDisplay.innerText = income.toFixed(2);
    expenseDisplay.innerText = expense.toFixed(2); 
}

// ==========================================
// 5. FORMULAR ABSENDEN & DATEN SPEICHERN
// ==========================================
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // Daten aus den Eingabefeldern holen
    const text = descriptionInput.value;
    let betrag = parseFloat(amountInput.value);
    const kategorie = categorySelect.value;
    const unterkategorieWert = subcategorySelect.value; // Wert der Unterkategorie holen

    // Ausgaben in negative Zahlen umwandeln
    if (kategorie === "ausgabe") {
        betrag = betrag * -1;
    }
    
    // Neues Objekt für die Buchung erstellen
    const neueBuchung = {
        beschreibung: text,
        wert: betrag,
        unterkategorie: unterkategorieWert // Unterkategorie speichern
    };

    // 1. Objekt in unser Array packen
    buchungen.push(neueBuchung);
    
    // 2. Eingabefelder wieder leeren für die nächste Eingabe
    descriptionInput.value = '';
    amountInput.value = '';

    // 3. Die Anzeige aktualisieren!
    updateUI(); 
});