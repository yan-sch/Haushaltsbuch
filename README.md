# Haushaltsbuch

Eine browserbasierte Haushaltsbuch-App zum Erfassen von Einnahmen, Ausgaben und Schulden, Anzeigen von Kontostand und Kategorien, sowie zum Exportieren der Daten als CSV oder PDF. Zusätzlich gibt es eine KI-gestützte Finanzberatung über die Google Gemini API, die Schulden in die Analyse einbezieht.

## Funktionen

- Einfache Erfassung von Einnahmen und Ausgaben
- Auswahl von Hauptkategorie (`Einnahme` / `Ausgabe`) und passender Unterkategorie
- Anzeige von Kontostand, Gesamteinnahmen und Gesamtausgaben
- Gruppierte Buchungsübersicht nach Kategorie und Unterkategorie
- Löschen einzelner Buchungen
- Schuldenverwaltung mit Prioritäten (hoch, mittel, niedrig) und Zinsberechnung
- Integration von Schulden in die Gesamtfinanzübersicht
- Export als CSV-Datei oder Drucken als PDF
- KI-Finanzberatung: Analyse der aktuellen Buchungen und Schulden mit Tipps basierend auf persönlichem Hintergrund
- API-Schlüssel wird lokal im Browser gespeichert
- Responsive Design für Desktop und Mobile
- PWA-Fähigkeiten für Installation als Web-App

## Dateien

- `index.html` – Hauptseite der App mit Dashboard und Beratung
- `main.js` – Logik für Buchungen, Schulden, Export und KI-Beratung
- `layout.css` – Grundlegendes Layout und responsive Design
- `components.css` – Styling für Formulare, Buttons und UI-Komponenten
- `features.css` – Spezifisches Styling für Buchungslisten und Schulden
- `base.css` – Basis-Styles und Farbschema
- `manifest.json` – Web-App-Metadaten für mobile Installationen

## Installation und Nutzung

1. Kopiere den gesamten Ordner auf deinen Rechner.
2. Öffne `index.html` im Browser.
3. Erfasse neue Buchungen mit Beschreibung, Betrag und Kategorie.
4. Füge Schulden mit Betrag, Zins und Priorität hinzu.
5. Verwende den Export-Button für CSV oder PDF.
6. Klicke auf `Zur KI-Finanzberatung`, um persönliche Hinweise von der KI zu erhalten (Schulden werden automatisch berücksichtigt).

## Schuldenverwaltung

- Erfasse Schulden mit Beschreibung, Gesamtbetrag, Zinssatz und Priorität
- Die App berechnet automatisch monatliche Tilgungsraten
- Schulden werden in der Gesamtübersicht und KI-Analyse berücksichtigt
- Prioritäten helfen bei der strategischen Tilgungsplanung

## KI-Finanzberatung

- Trage deinen Google API Key in das Feld `Google API Key hier einfügen` ein.
- Gib im Textfeld einen kurzen Hintergrund zu deiner Lebenssituation ein (Job, Familie, Sparziele, etc.).
- Starte die Beratung mit dem Button `✨ Finanzberatung starten`.
- Die KI berücksichtigt automatisch deine aktuellen Buchungen und Schulden.

Hinweis: Die App sendet die Anfrage an die Google Gemini API. Ohne gültigen Key funktioniert die Beratung nicht.

## Anpassung

- In `main.js` kannst du die Kategorien für `Einnahme` und `Ausgabe` unter `einnahmeKategorien` und `ausgabeKategorien` ändern.
- In den CSS-Dateien kannst du Farben, Layout und Design anpassen.
- Schuldenkategorien können in `main.js` erweitert werden.

## Hinweise

- Die App speichert Buchungen und Schulden lokal im Browser (localStorage).
- Daten bleiben nach einem Seiten-Reload erhalten.
- Der API-Key bleibt lokal im Browser gespeichert und wird nicht an einen eigenen Server gesendet.
- Die App funktioniert offline für alle Kernfunktionen außer der KI-Beratung.

## Lizenz

Dieses Projekt ist frei nutzbar und kann nach Bedarf erweitert werden.
