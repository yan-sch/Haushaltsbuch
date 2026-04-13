// ==========================================
// 1. HTML-ELEMENTE IN VARIABLEN SPEICHERN
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

let buchungen = [];

function speichereDaten() {
    localStorage.setItem('haushaltsbuch_buchungen', JSON.stringify(buchungen));
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
categorySelect.addEventListener("change", () => {
    updateSubcategories();
    speichereDaten();
});
updateSubcategories();
ladeDaten();
updateUI();

// ==========================================
// 3. DIE LÖSCH-FUNKTION
// ==========================================
function loescheBuchung(idZumLoeschen) {
    buchungen = buchungen.filter(function(buchung) {
        return buchung.id !== idZumLoeschen;
    });
    speichereDaten();
    updateUI(); 
}

// ==========================================
// 4. BENUTZEROBERFLÄCHE AKTUALISIEREN (UI)
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

// ==========================================
// 5. FORMULAR ABSENDEN 
// ==========================================
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

// ==========================================
// 6. EXPORT-FUNKTIONEN (PDF & EXCEL/CSV)
// ==========================================
const exportBtn = document.getElementById('export-btn');
const exportFormat = document.getElementById('export-format');

exportBtn.addEventListener('click', function() {
    if (exportFormat.value === 'pdf') {
        window.print();
    } else {
        erstelleCSV();
    }
});

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

// ==========================================
// 7. KI-FINANZBERATUNG (GEMINI API)
// ==========================================
const dashboardPage = document.getElementById('main-dashboard');
const consultationPage = document.getElementById('consultation-page');
const showConsultationBtn = document.getElementById('show-consultation-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
const apiKeyInput = document.getElementById('api-key-input');
const aiContextInput = document.getElementById('ai-context');
const startConsultationBtn = document.getElementById('start-consultation-btn');
const aiResponseContainer = document.getElementById('ai-response-container');

[descriptionInput, amountInput, categorySelect, subcategorySelect, aiContextInput].forEach(element => {
    element.addEventListener('input', speichereDaten);
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

// API-Key lokal speichern und laden
if (localStorage.getItem('gemini_api_key')) {
    apiKeyInput.value = localStorage.getItem('gemini_api_key');
}

apiKeyInput.addEventListener('change', () => {
    localStorage.setItem('gemini_api_key', apiKeyInput.value);
});

// KI Anfrage
async function frageGeminiAn() {
    const key = apiKeyInput.value;
    if (!key) {
        alert("Bitte gib zuerst einen API Key ein!");
        return;
    }

    aiResponseContainer.innerText = "Die KI analysiert deine Finanzen... bitte warten...";
    
    const buchungsListeText = buchungen.map(b => 
        `- ${b.wert > 0 ? 'Einnahme' : 'Ausgabe'}: ${b.unterkategorie} (${b.beschreibung}) -> ${b.wert}€`
    ).join('\n');

    const prompt = `
        Du bist ein professioneller Finanzberater. 
        Hier ist der Hintergrund des Nutzers: ${aiContextInput.value}
        
        Hier sind die aktuellen Buchungen:
        ${buchungsListeText}
        
        Bitte erstelle eine strukturierte Analyse:
        1. Kurze Zusammenfassung der aktuellen Lage.
        2. Identifiziere die 3 größten Sparpotenziale.
        3. Gib konkrete Tipps zur Verbesserung der Liquidität basierend auf den Hintergrundinfos.
        Halte dich kurz und präzise.
    `;

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
            aiResponseContainer.innerText = data.candidates[0].content.parts[0].text;
        } else if (data.error && data.error.message) {
            aiResponseContainer.innerText = "Google API-Fehler: " + data.error.message;
            console.error("API Error:", data.error);
        } else {
            aiResponseContainer.innerText = "Unbekannter Fehler. Schau in die Browser-Konsole (F12) für mehr Details.";
            console.log("Gesamte Antwort:", data);
        }
    } catch (error) {
        aiResponseContainer.innerText = "Verbindungsfehler: " + error.message;
    }
}

startConsultationBtn.addEventListener('click', frageGeminiAn);