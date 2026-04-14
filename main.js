// main.js - Alle Funktionen in einer Datei, um ES6-Module zu vermeiden

// ==========================================
// DOM-Elemente
// ==========================================
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const subcategorySelect = document.getElementById('subcategory');
const transactionListContainer = document.getElementById('transaction-list-container');

const totalBalanceDisplay = document.getElementById('total-balance');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');
const aiContextInput = document.getElementById('ai-context');

const dashboardPage = document.getElementById('main-dashboard');
const consultationPage = document.getElementById('consultation-page');
const debtsPage = document.getElementById('debts-page');
const showConsultationBtn = document.getElementById('show-consultation-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
const showDebtsBtn = document.getElementById('show-debts-btn');
const backToDashboardFromDebtsBtn = document.getElementById('back-to-dashboard-from-debts-btn');
const apiKeyInput = document.getElementById('api-key-input');
const startConsultationBtn = document.getElementById('start-consultation-btn');
const aiResponseContainer = document.getElementById('ai-response-container');
const aiFinancialAnalysis = document.getElementById('ai-financial-analysis');
const aiDebtAnalysis = document.getElementById('ai-debt-analysis');

const exportBtn = document.getElementById('export-btn');
const exportFormat = document.getElementById('export-format');

// Schulden-Elemente
const debtForm = document.getElementById('debt-form');
const debtorInput = document.getElementById('debtor');
const debtAmountInput = document.getElementById('debt-amount');
const interestRateInput = document.getElementById('interest-rate');
const dueDateInput = document.getElementById('due-date');
const debtPriorityInput = document.getElementById('debt-priority');
const debtFixedCostYes = document.getElementById('debt-fixed-cost-yes');
const debtFixedCostNo = document.getElementById('debt-fixed-cost-no');
const debtDescriptionInput = document.getElementById('debt-description');
const debtListContainer = document.getElementById('debt-list-container');
const debtExportBtn = document.getElementById('debt-export-btn');
const debtExportFormat = document.getElementById('debt-export-format');

// ==========================================
// Datenmodell
// ==========================================
let buchungen = [];
let schulden = [];

// ==========================================
// Storage-Funktionen
// ==========================================
function speichereDaten() {
    localStorage.setItem('haushaltsbuch_buchungen', JSON.stringify(buchungen));
    localStorage.setItem('haushaltsbuch_schulden', JSON.stringify(schulden));
    const formData = {
        description: descriptionInput.value,
        amount: amountInput.value,
        category: categorySelect.value,
        subcategory: subcategorySelect.value,
        aiContext: aiContextInput.value
    };
    localStorage.setItem('haushaltsbuch_form', JSON.stringify(formData));
}

function ladeDaten() {
    const gespeicherteBuchungen = localStorage.getItem('haushaltsbuch_buchungen');
    if (gespeicherteBuchungen) {
        try {
            buchungen = JSON.parse(gespeicherteBuchungen);
        } catch (error) {
            console.error('Fehler beim Laden der gespeicherten Buchungen:', error);
            buchungen = [];
        }
    }

    const gespeicherteSchulden = localStorage.getItem('haushaltsbuch_schulden');
    if (gespeicherteSchulden) {
        try {
            schulden = JSON.parse(gespeicherteSchulden);
        } catch (error) {
            console.error('Fehler beim Laden der gespeicherten Schulden:', error);
            schulden = [];
        }
    }

    const gespeichertesFormular = localStorage.getItem('haushaltsbuch_form');
    if (gespeichertesFormular) {
        try {
            const formData = JSON.parse(gespeichertesFormular);
            descriptionInput.value = formData.description || '';
            amountInput.value = formData.amount || '';
            categorySelect.value = formData.category || 'einnahme';
            updateSubcategories();
            subcategorySelect.value = formData.subcategory || subcategorySelect.value;
            aiContextInput.value = formData.aiContext || '';
        } catch (error) {
            console.error('Fehler beim Laden der gespeicherten Formulardaten:', error);
        }
    }
}

// ==========================================
// Kategorien
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

// ==========================================
// UI-Funktionen
// ==========================================
function updateUI() {
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

function updateDebtsUI() {
    debtListContainer.innerHTML = '';

    if (schulden.length === 0) {
        debtListContainer.innerHTML = '<p>Keine Schulden eingetragen.</p>';
        return;
    }

    let totalDebt = 0;
    schulden.forEach(debt => totalDebt += debt.amount);

    const totalElement = document.createElement('div');
    totalElement.classList.add('saldo-titel');
    totalElement.innerHTML = `<span>Gesamtschulden</span> <span>${totalDebt.toFixed(2)}€</span>`;
    debtListContainer.appendChild(totalElement);

    const ul = document.createElement('ul');

    schulden.forEach(function(debt) {
        const li = document.createElement('li');
        li.classList.add('debt-item');

        const textSpan = document.createElement('span');
        textSpan.innerHTML = `
            <strong>${debt.debtor}</strong>: ${debt.amount.toFixed(2)}€
            ${debt.interestRate ? ` (Zins: ${debt.interestRate}%)` : ''}
            ${debt.priority ? ` <strong>[${debt.priority}]</strong>` : ''}
            ${debt.dueDate ? ` Fällig: ${new Date(debt.dueDate).toLocaleDateString('de-DE')}` : ''}
            ${debt.fixedCost ? `<br><small>Fixkosten berücksichtigt: ${debt.fixedCost === 'yes' ? 'Ja' : 'Nein'}</small>` : ''}
            ${debt.description ? `<br><small>${debt.description}</small>` : ''}
        `;

        const editBtn = document.createElement('button');
        editBtn.innerText = "✏️";
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            bearbeiteSchuld(debt.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "✖";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            loescheSchuld(debt.id);
        });

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });

    debtListContainer.appendChild(ul);
}

// ==========================================
// Transaktions-Funktionen
// ==========================================
function loescheBuchung(idZumLoeschen) {
    buchungen.splice(buchungen.findIndex(b => b.id === idZumLoeschen), 1);
    speichereDaten();
    updateUI();
}

// ==========================================
// Schulden-Funktionen
// ==========================================
function fuegeSchuldHinzu(debtor, amount, interestRate, dueDate, priority, fixedCost, description) {
    const neueSchuld = {
        id: Date.now(),
        debtor: debtor,
        amount: parseFloat(amount),
        interestRate: interestRate ? parseFloat(interestRate) : null,
        dueDate: dueDate || null,
        priority: priority || null,
        fixedCost: fixedCost || 'no',
        description: description || ''
    };
    schulden.push(neueSchuld);
    speichereDaten();
    updateDebtsUI();
}

function loescheSchuld(idZumLoeschen) {
    schulden.splice(schulden.findIndex(s => s.id === idZumLoeschen), 1);
    speichereDaten();
    updateDebtsUI();
}

function bearbeiteSchuld(id) {
    const schuld = schulden.find(s => s.id === id);
    if (!schuld) return;

    debtorInput.value = schuld.debtor;
    debtAmountInput.value = schuld.amount;
    interestRateInput.value = schuld.interestRate || '';
    dueDateInput.value = schuld.dueDate || '';
    debtPriorityInput.value = schuld.priority || '';
    debtDescriptionInput.value = schuld.description;
    
    // Setze die Fixkosten-Radio
    if (schuld.fixedCost === 'yes') {
        debtFixedCostYes.checked = true;
    } else {
        debtFixedCostNo.checked = true;
    }

    // Entferne die Schuld temporär
    loescheSchuld(id);

    // Fokussiere das Formular
    debtorInput.focus();
}

// ==========================================
// Export-Funktionen
// ==========================================
function erstelleCSV() {
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

function erstelleSchuldenCSV() {
    let csvString = "Schuldner,Betrag (EUR),Zinssatz (%),Fälligkeit,Beschreibung\n";

    schulden.forEach(schuld => {
        const dueDate = schuld.dueDate ? new Date(schuld.dueDate).toLocaleDateString('de-DE') : '';
        csvString += `"${schuld.debtor}",${schuld.amount.toFixed(2)},${schuld.interestRate || ''},"${dueDate}","${schuld.description}"\n`;
    });

    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Schulden_Export.csv";
    link.click();

    URL.revokeObjectURL(url);
}

// ==========================================
// AI-Funktionen
// ==========================================
async function frageGeminiAn() {
    const key = apiKeyInput.value;
    if (!key) {
        alert("Bitte gib zuerst einen API Key ein!");
        return;
    }

    aiFinancialAnalysis.innerText = "Hier erscheint die Finanzanalyse...";
    aiDebtAnalysis.innerText = "Hier erscheint die Schuldenanalyse...";

    const buchungsListeText = buchungen.map(b =>
        `- ${b.wert > 0 ? 'Einnahme' : 'Ausgabe'}: ${b.unterkategorie} (${b.beschreibung}) -> ${b.wert}€`
    ).join('\n');

    // Schulden für die Analyse vorbereiten
    const schuldenListeText = schulden.map(s =>
        `- ${s.debtor}: ${s.amount}€${s.interestRate ? ` (Zins: ${s.interestRate}%)` : ''}${s.priority ? ` [Priorität: ${s.priority}]` : ''}${s.dueDate ? ` Fällig: ${new Date(s.dueDate).toLocaleDateString('de-DE')}` : ''}${s.fixedCost === 'yes' ? ' (bereits in Fixkosten berücksichtigt)' : ''}`
    ).join('\n');

    // Schulden für Rückzahlungsplan filtern (nur die nicht bereits in Fixkosten)
    const schuldenFuerPlan = schulden.filter(s => s.fixedCost !== 'yes');
    const schuldenPlanText = schuldenFuerPlan.map(s =>
        `- ${s.debtor}: ${s.amount}€${s.interestRate ? ` (Zins: ${s.interestRate}%)` : ''}${s.priority ? ` [Priorität: ${s.priority}]` : ''}${s.dueDate ? ` Fällig: ${new Date(s.dueDate).toLocaleDateString('de-DE')}` : ''}`
    ).join('\n');

    // Monatlichen Überschuss berechnen
    let monatlicheEinnahmen = 0;
    let monatlicheAusgaben = 0;
    buchungen.forEach(b => {
        if (b.wert > 0) monatlicheEinnahmen += b.wert;
        else monatlicheAusgaben += Math.abs(b.wert);
    });
    const monatlicherUeberschuss = monatlicheEinnahmen - monatlicheAusgaben;

    const prompt = `
        Du bist ein professioneller Finanzberater.
        Hier ist der Hintergrund des Nutzers: ${aiContextInput.value}

        Hier sind die aktuellen Buchungen:
        ${buchungsListeText}

        Hier sind die aktuellen Schulden:
        ${schuldenListeText}

        Monatlicher Überschuss: ${monatlicherUeberschuss.toFixed(2)}€

        Bitte erstelle eine strukturierte Analyse in zwei separaten Blöcken:

        === FINANZANALYSE ===
        1. Kurze Zusammenfassung der aktuellen finanziellen Lage (Einnahmen, Ausgaben, Überschuss).
        2. Identifiziere die 3 größten Sparpotenziale.
        3. Gib konkrete Tipps zur Verbesserung der Liquidität basierend auf den Hintergrundinfos.

        === SCHULDENANALYSE UND RÜCKZAHLUNGSPLAN ===
        Basierend auf dem monatlichen Überschuss von ${monatlicherUeberschuss.toFixed(2)}€ erstelle einen optimalen Schuldenabbau-Plan.
        Berücksichtige dabei:
        - Zinssätze (höhere Zinsen zuerst)
        - Prioritäten (A vor B vor C)
        - Fälligkeiten
        - Verfügbaren monatlichen Überschuss

        Schulden, die bereits in den Fixkosten berücksichtigt sind, sollen NICHT im Rückzahlungsplan enthalten sein.

        Schulden für den Plan:
        ${schuldenPlanText || 'Keine Schulden für Rückzahlungsplan vorhanden.'}

        Erstelle:
        1. Übersicht über alle Schulden (inkl. der bereits in Fixkosten berücksichtigten)
        2. Monatlicher Tilgungsplan mit priorisierten Zahlungen
        3. Geschätzte Zeit bis Schuldenfreiheit
        4. Empfehlungen zur Optimierung des Schuldenabbaus

        Halte beide Blöcke präzise und strukturiert.
    `;

    // Alternative Gemini-Modelle: gemini-2.5-pro, gemini-2.0-flash-001, gemini-2.0-flash-lite, gemini-2.0-flash, gemini-2.5-flash
    // Kopiere den gewünschten Modellnamen und ersetze "gemini-2.5-flash" in der nächsten Zeile
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const fullResponse = data.candidates[0].content.parts[0].text;
            
            // Parse die Antwort in zwei Blöcke
            const financialMatch = fullResponse.match(/=== FINANZANALYSE ===([\s\S]*?)(?:=== SCHULDENANALYSE UND RÜCKZAHLUNGSPLAN ===|$)/);
            const debtMatch = fullResponse.match(/=== SCHULDENANALYSE UND RÜCKZAHLUNGSPLAN ===([\s\S]*)/);
            
            const financialAnalysis = financialMatch ? financialMatch[1].trim() : 'Keine Finanzanalyse verfügbar.';
            const debtAnalysis = debtMatch ? debtMatch[1].trim() : 'Keine Schuldenanalyse verfügbar.';
            
            aiFinancialAnalysis.innerText = financialAnalysis;
            aiDebtAnalysis.innerText = debtAnalysis;
        } else if (data.error && data.error.message) {
            aiFinancialAnalysis.innerText = "Google API-Fehler: " + data.error.message;
            aiDebtAnalysis.innerText = "";
            console.error("API Error:", data.error);
        } else {
            aiFinancialAnalysis.innerText = "Unbekannter Fehler. Schau in die Browser-Konsole (F12) für mehr Details.";
            aiDebtAnalysis.innerText = "";
            console.log("Gesamte Antwort:", data);
        }
    } catch (error) {
        aiResponseContainer.innerText = "Verbindungsfehler: " + error.message;
    }
}

// ==========================================
// Initialisierung und Event-Listener
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    updateSubcategories();
    ladeDaten();
    updateSubcategories(); // erneut nach laden
    updateUI();
    updateDebtsUI();

    // Event-Listener für Speicherung bei Änderungen
    [descriptionInput, amountInput, categorySelect, subcategorySelect, aiContextInput].forEach(element => {
        element.addEventListener('input', speichereDaten);
    });

    // Form-Submit
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

    // Kategorien-Change
    categorySelect.addEventListener("change", () => {
        updateSubcategories();
        speichereDaten();
    });

    // Export
    exportBtn.addEventListener('click', function() {
        if (exportFormat.value === 'pdf') {
            window.print();
        } else {
            erstelleCSV();
        }
    });

    // Navigation
    showConsultationBtn.addEventListener('click', () => {
        dashboardPage.style.display = 'none';
        consultationPage.style.display = 'flex';
    });

    backToDashboardBtn.addEventListener('click', () => {
        dashboardPage.style.display = 'flex';
        consultationPage.style.display = 'none';
    });

    // API-Key
    if (localStorage.getItem('gemini_api_key')) {
        apiKeyInput.value = localStorage.getItem('gemini_api_key');
    }

    apiKeyInput.addEventListener('change', () => {
        localStorage.setItem('gemini_api_key', apiKeyInput.value);
    });

    // Start Consultation
    startConsultationBtn.addEventListener('click', frageGeminiAn);

    // Schulden-Form
    debtForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fixedCost = debtFixedCostYes.checked ? 'yes' : 'no';
        fuegeSchuldHinzu(
            debtorInput.value,
            debtAmountInput.value,
            interestRateInput.value,
            dueDateInput.value,
            debtPriorityInput.value,
            fixedCost,
            debtDescriptionInput.value
        );
        debtForm.reset();
        debtFixedCostNo.checked = true; // Reset radio button
    });

    // Schulden-Export
    debtExportBtn.addEventListener('click', function() {
        if (debtExportFormat.value === 'pdf') {
            window.print();
        } else {
            erstelleSchuldenCSV();
        }
    });

    // Navigation Schulden
    showDebtsBtn.addEventListener('click', () => {
        dashboardPage.style.display = 'none';
        debtsPage.style.display = 'flex';
        updateDebtsUI();
    });

    backToDashboardFromDebtsBtn.addEventListener('click', () => {
        dashboardPage.style.display = 'flex';
        debtsPage.style.display = 'none';
    });
});