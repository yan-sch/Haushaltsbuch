// storage.js - Datenpersistenz und -laden
import { aiContextInput } from './ui.js';

export let buchungen = [];

export function speichereDaten() {
    localStorage.setItem('haushaltsbuch_buchungen', JSON.stringify(buchungen));
    const formData = {
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        aiContext: document.getElementById('ai-context').value
    };
    localStorage.setItem('haushaltsbuch_form', JSON.stringify(formData));
}

export function ladeDaten() {
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
            document.getElementById('description').value = formData.description || '';
            document.getElementById('amount').value = formData.amount || '';
            document.getElementById('category').value = formData.category || 'einnahme';
            updateSubcategories();
            document.getElementById('subcategory').value = formData.subcategory || document.getElementById('subcategory').value;
            document.getElementById('ai-context').value = formData.aiContext || '';
        } catch (error) {
            console.error('Fehler beim Laden der gespeicherten Formulardaten:', error);
        }
    }
}