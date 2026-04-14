// ai.js - KI-Finanzberatung
import { buchungen } from './storage.js';
import { aiContextInput } from './ui.js';

const dashboardPage = document.getElementById('main-dashboard');
const consultationPage = document.getElementById('consultation-page');
const showConsultationBtn = document.getElementById('show-consultation-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
const apiKeyInput = document.getElementById('api-key-input');
const startConsultationBtn = document.getElementById('start-consultation-btn');
const aiResponseContainer = document.getElementById('ai-response-container');

// Event-Listener in DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
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

    startConsultationBtn.addEventListener('click', frageGeminiAn);
});
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

    // Alternative Gemini-Modelle: gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash-exp, gemini-pro, gemini-pro-vision
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
});