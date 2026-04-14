// main.js - Hauptinitialisierung
import { ladeDaten, speichereDaten } from './storage.js';
import { updateUI, descriptionInput, amountInput, categorySelect, subcategorySelect, aiContextInput } from './ui.js';
import { updateSubcategories } from './transactions.js';
import './export.js';
import './ai.js';

window.addEventListener('DOMContentLoaded', () => {
    updateSubcategories();
    ladeDaten();
    updateSubcategories(); // erneut nach laden, um Unterkategorien zu aktualisieren
    updateUI();

    // Event-Listener für Speicherung bei Änderungen
    [descriptionInput, amountInput, categorySelect, subcategorySelect, aiContextInput].forEach(element => {
        element.addEventListener('input', speichereDaten);
    });
});