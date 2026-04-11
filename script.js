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

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const text = descriptionInput.value;
    let betrag = parseFloat(amountInput.value);
    const kategorie = categorySelect.value;

    // Deine angepasste Logik:
    if (kategorie === "ausgabe") {
        betrag = betrag * -1;
    }
    
    // Wir erstellen ein Objekt und fügen es dem Array hinzu
    const neueBuchung = {
        beschreibung: text,
        wert: betrag
    };

    buchungen.push(neueBuchung);
    console.log(buchungen); // Zum Testen in der Konsole
    
    // Formular-Felder nach dem Klick wieder leeren
    descriptionInput.value = '';
    amountInput.value = '';
});