# Haushaltsbuch

Eine browserbasierte Haushaltsbuch-App zum Erfassen von Einnahmen und Ausgaben, Anzeigen von Kontostand und Kategorien, sowie zum Exportieren der Daten als CSV oder PDF. Zusätzlich gibt es eine optionale KI-Finanzberatung über die Google Gemini API.

## Funktionen

- Einfache Erfassung von Einnahmen und Ausgaben
- Auswahl von Hauptkategorie (`Einnahme` / `Ausgabe`) und passender Unterkategorie
- Anzeige von Kontostand, Gesamteinnahmen und Gesamtausgaben
- Gruppierte Buchungsübersicht nach Kategorie und Unterkategorie
- Löschen einzelner Buchungen
- Export als CSV-Datei oder Drucken als PDF
- KI-Finanzberatung: Analyse der aktuellen Buchungen und Tipps basierend auf persönlichem Hintergrund
- API-Schlüssel wird lokal im Browser gespeichert

## Dateien

- `index.html` – Hauptseite der App
- `style.css` – Design und Layout
- `script.js` – Logik für Buchungen, Export und KI-Beratung
- `manifest.json` – Web-App-Metadaten für mobile Installationen

## Installation und Nutzung

1. Kopiere den gesamten Ordner auf deinen Rechner.
2. Öffne `index.html` im Browser.
3. Erfasse neue Buchungen mit Beschreibung, Betrag und Kategorie.
4. Verwende den Export-Button für CSV oder PDF.
5. Klicke auf `Zur KI-Finanzberatung`, um persönliche Hinweise von der KI zu erhalten.

## KI-Finanzberatung

- Trage deinen Google API Key in das Feld `Google API Key hier einfügen` ein.
- Gib im Textfeld einen kurzen Hintergrund zu deiner Lebenssituation ein (Job, Familie, Sparziele, etc.).
- Starte die Beratung mit dem Button `✨ Finanzberatung starten`.

Hinweis: Die App sendet die Anfrage an die Google Gemini API. Ohne gültigen Key funktioniert die Beratung nicht.

## Anpassung

- In `script.js` kannst du die Kategorien für `Einnahme` und `Ausgabe` unter `einnahmeKategorien` und `ausgabeKategorien` ändern.
- In `style.css` kannst du Farben und Layout anpassen.

## Hinweise

- Die App speichert Buchungen aktuell nur während der Sitzung im Arbeitsspeicher. Nach einem Seiten-Reload gehen die Einträge verloren.
- Der API-Key bleibt lokal im Browser gespeichert und wird nicht an einen eigenen Server gesendet.

## Lizenz

Dieses Projekt ist frei nutzbar und kann nach Bedarf erweitert werden.
