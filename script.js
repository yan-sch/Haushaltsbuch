const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const transactionList = document.getElementById('transaction-list');

const totalBalanceDisplay = document.getElementById('total-balance');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');

// Unser Datenspeicher
let buchungen = [];

function updateUI() {
    // 1. Liste im HTML erst einmal leeren, damit wir keine doppelten Einträge bekommen
    transactionList.innerHTML = '';

    // 2. Startwerte für unsere Berechnungen setzen
    let total = 0;
    let income = 0;
    let expense = 0;

    // 3. Wir gehen jeden Eintrag in unserem Array "buchungen" einzeln durch
    buchungen.forEach(function(buchung) {
        
        // --- A) Mathematik ---
        total = total + buchung.wert; // Zum Gesamtkonto addieren
        
        if (buchung.wert > 0) {
            income = income + buchung.wert; // Plus-Beträge zu Einnahmen
        } else {
            expense = expense + buchung.wert; // Minus-Beträge zu Ausgaben
        }

        // --- B) HTML-Element für die Liste erstellen ---
        const li = document.createElement('li'); // Erstellt ein leeres <li> Tag
        li.innerText = buchung.beschreibung + ": " + buchung.wert.toFixed(2) + "€"; 
        
        // Farbe zuweisen (aus unserer CSS-Datei)
        if (buchung.wert > 0) {
            li.classList.add('plus'); // Grüner Rand
        } else {
            li.classList.add('minus'); // Roter Rand
        }

        // Das fertige <li> Element in unsere <ul> Liste im HTML schieben
        transactionList.appendChild(li);
    });

    // 4. Die berechneten Zahlen in die Übersicht (Dashboard) schreiben
    // .toFixed(2) sorgt dafür, dass immer zwei Nachkommastellen (Cent) angezeigt werden
    totalBalanceDisplay.innerText = total.toFixed(2);
    incomeDisplay.innerText = income.toFixed(2);
    expenseDisplay.innerText = expense.toFixed(2);
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const text = descriptionInput.value;
    let betrag = parseFloat(amountInput.value);
    const kategorie = categorySelect.value;

    // Logik: Ausgaben negativ machen
    if (kategorie === "ausgabe") {
        betrag = betrag * -1;
    }
    
    // Objekt erstellen
    const neueBuchung = {
        beschreibung: text,
        wert: betrag
    };

    // 1. Daten in unser Array speichern
    buchungen.push(neueBuchung);
    
    // 2. Formular-Felder wieder leeren
    descriptionInput.value = '';
    amountInput.value = '';

    // 3. HIER IST DER MAGISCHE BEFEHL:
    // Wir rufen die Funktion auf, damit die Webseite neu gezeichnet wird!
    updateUI(); 
});
