// ui.js - UI-Aktualisierung und DOM-Elemente
import { buchungen } from './storage.js';
import { loescheBuchung } from './transactions.js';

export const form = document.getElementById('transaction-form');
export const descriptionInput = document.getElementById('description');
export const amountInput = document.getElementById('amount');
export const categorySelect = document.getElementById('category');
export const subcategorySelect = document.getElementById('subcategory');
export const transactionListContainer = document.getElementById('transaction-list-container');

export const totalBalanceDisplay = document.getElementById('total-balance');
export const incomeDisplay = document.getElementById('total-income');
export const expenseDisplay = document.getElementById('total-expense');
export const aiContextInput = document.getElementById('ai-context');

export function updateUI() {
    transactionListContainer.innerHTML = '';

    let total = 0;
    let income = 0;
    let expense = 0;

    const gruppen = {};

    buchungen.forEach(function(buchung) {
        total += buchung.wert;
        if (buchung.wert > 0) { income += buchung.wert; }
        else { expense += buchung.wert; }

        const hauptKat = buchung.wert > 0 ? "Einnahmen" : "Ausgaben";
        const unterKat = buchung.unterkategorie;

        if (!gruppen[hauptKat]) { gruppen[hauptKat] = {}; }
        if (!gruppen[hauptKat][unterKat]) {
            gruppen[hauptKat][unterKat] = { eintraege: [], summe: 0 };
        }

        gruppen[hauptKat][unterKat].eintraege.push(buchung);
        gruppen[hauptKat][unterKat].summe += buchung.wert;
    });

    if (buchungen.length > 0) {
        const saldoElement = document.createElement('div');
        saldoElement.classList.add('saldo-titel');
        saldoElement.innerHTML = `<span>Gesamtsaldo</span> <span>${total.toFixed(2)}€</span>`;
        transactionListContainer.appendChild(saldoElement);
    }

    Object.keys(gruppen).forEach(function(hauptKat) {
        let hauptKatSumme = 0;
        Object.keys(gruppen[hauptKat]).forEach(function(unterKat) {
            hauptKatSumme += gruppen[hauptKat][unterKat].summe;
        });

        const hauptTitelElement = document.createElement('h3');
        hauptTitelElement.classList.add('haupt-titel');
        const farbe = hauptKat === "Einnahmen" ? "green" : "red";
        hauptTitelElement.innerHTML = `<span style="color: ${farbe};">${hauptKat}</span> <span style="color: ${farbe};">${hauptKatSumme.toFixed(2)}€</span>`;
        transactionListContainer.appendChild(hauptTitelElement);

        Object.keys(gruppen[hauptKat]).forEach(function(unterKat) {
            const gruppenDaten = gruppen[hauptKat][unterKat];

            const titelElement = document.createElement('h4');
            titelElement.classList.add('gruppen-titel');
            titelElement.innerHTML = `<span>${unterKat}</span> <span>${gruppenDaten.summe.toFixed(2)}€</span>`;
            transactionListContainer.appendChild(titelElement);

            const ul = document.createElement('ul');

            gruppenDaten.eintraege.forEach(function(buchung) {
                const li = document.createElement('li');
                li.classList.add(buchung.wert > 0 ? 'plus' : 'minus');

                const textSpan = document.createElement('span');
                textSpan.innerText = buchung.beschreibung + ": " + buchung.wert.toFixed(2) + "€";

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = "✖";
                deleteBtn.classList.add('delete-btn');

                deleteBtn.addEventListener('click', function() {
                    loescheBuchung(buchung.id);
                });

                li.appendChild(textSpan);
                li.appendChild(deleteBtn);
                ul.appendChild(li);
            });

            transactionListContainer.appendChild(ul);
        });
    });

    totalBalanceDisplay.innerText = total.toFixed(2);
    incomeDisplay.innerText = income.toFixed(2);
    expenseDisplay.innerText = expense.toFixed(2);
}