# Technical Design Document (TDD)

## 1. Projektübersicht

**Projektname:** Haushaltsbuch

**Beschreibung:**
Eine browserbasierte Haushaltsbuch-App zum Erfassen von Einnahmen und Ausgaben, Anzeigen von Kontostand und Kategorien, Exportieren der Daten als CSV/PDF und optionaler KI-Finanzberatung über die Google Gemini API.

**Zielgruppe:**
Privatnutzer, die ihre persönlichen Finanzen einfach und schnell im Browser verwalten möchten, ohne Backend oder Serverinfrastruktur.

## 2. Ziele und Anforderungen

### Funktionale Anforderungen

- Buchungserfassung von Einnahmen und Ausgaben
- Auswahl von Hauptkategorie (`Einnahme` / `Ausgabe`) und passender Unterkategorie
- Anzeige von Gesamt-Kontostand, Summe Einnahmen und Summe Ausgaben
- Gruppierte Anzeige der Buchungen nach Kategorie und Unterkategorie
- Löschen einzelner Buchungen
- Exportfunktion als CSV
- Druckbare Ausgabe als PDF
- Optional: KI-Finanzberatung auf Basis von Google Gemini
- Lokale Speicherung von Buchungen und Formularzustand im Browser

### Nicht-funktionale Anforderungen

- Keine externe Backend-Abhängigkeit
- Funktioniert offline für die Datenverwaltung und Grundfunktionen
- Einfache Installation: Öffnen von `index.html` im Browser
- Responsive Darstellung für Desktop- und mobile Nutzung
- Wartbare und verständliche Code-Struktur

## 3. Architekturübersicht

### 3.1 Architekturmodell

Die App verwendet eine einfache **clientseitige Architektur** ohne Backend.

- **Präsentationsschicht:** `index.html` und `style.css`
- **Domänenlogik / Steuerung:** `script.js`
- **Persistenz:** `localStorage`
- **PWA-Metadaten:** `manifest.json`
- **Externe Integration:** Google Gemini API für KI-Finanzberatung

### 3.2 Architekturtyp

Das Projekt folgt einer **einfachen Single-Page-Application-Architektur (SPA)**, umgesetzt als klassische **DOM-basierte clientseitige Anwendung**:

- Der HTML-Code definiert die statische Struktur und die UI-Elemente.
- Das JavaScript fungiert als Controller/View-Renderer, das User-Events verarbeitet und die Anzeige erneuert.
- Das Datenmodell wird lokal in einer JavaScript-Variable (`buchungen`) gehalten und in `localStorage` persistiert.
- Die App setzt auf **eventgetriebene Aktualisierung** statt auf Frameworks.

### 3.3 Architekturdiagramm (textuell)

- Browser / Client
  - `index.html` (UI-Grundgerüst)
  - `style.css` (Darstellung)
  - `script.js` (Anwendungslogik)
    - DOM-Elemente lesen und schreiben
    - Event-Handler für Formular, Export, Navigation und KI-Anfrage
    - Datenmodell verwalten
    - UI-Aktualisierung
    - localStorage Sync
  - `manifest.json` (PWA-Konfiguration)

- Externe API
  - Google Gemini API für KI-Antworten

## 4. Komponenten

### 4.1 `index.html`

- Definiert das App-Layout mit zwei Seitenbereichen:
  - Hauptdashboard (`main-dashboard`)
  - KI-Finanzberatung (`consultation-page`)
- Enthält Formularelemente, Anzeigeelemente, Navigation und Export-Controls
- Bindet CSS und JS ein

### 4.2 `style.css`

- Stellt das Layout im Spaltenformat bereit
- Definiert Farben, Abstände, Buttons und Typografie
- Sorgt für eine klare visuelle Struktur der Buchungsübersicht und Beratung

### 4.3 `script.js`

Ist die zentrale Logik und lässt sich in folgende funktionale Bereiche gliedern:

1. **Initialisierung und DOM-Referenzen**
   - HTML-Elemente lesen
   - Daten aus `localStorage` laden
   - initiale UI-Aktualisierung

2. **Kategorien und Unterkategorien**
   - Verwaltung von `einnahmeKategorien` und `ausgabeKategorien`
   - Dynamisches Auffüllen der Unterkategorie-Auswahl

3. **Persistenz**
   - `speichereDaten()` speichert Buchungen und Formularzustand in `localStorage`
   - `ladeDaten()` lädt gespeicherte Daten beim Start

4. **UI-Rendering**
   - `updateUI()` erstellt die kategorial gruppierte Buchungsübersicht
   - Aktualisiert Kontostand, Einnahmen und Ausgaben

5. **Transaktionsverwaltung**
   - Formular-Submit zur Anlage einer neuen Buchung
   - `loescheBuchung()` zum Entfernen einzelner Einträge

6. **Export**
   - CSV-Export mit `erstelleCSV()`
   - PDF-Ausgabe über `window.print()`

7. **KI-Finanzberatung**
   - Navigation zwischen Dashboard und Beratungsansicht
   - Lokale Speicherung des Google API Keys
   - API-Request an Google Gemini
   - Darstellung der KI-Antworten

### 4.4 `manifest.json`

- Definiert PWA-Metadaten wie App-Name, Start-URL, Anzeige-Modus, Farben und Icon
- Erlaubt dem Browser, die App als installierbare Web-App zu behandeln

## 5. Datenmodell

### 5.1 Buchungseintrag

Jede Buchung ist ein Objekt mit folgenden Eigenschaften:

- `id`: eindeutiger numerischer Wert (`Date.now()`)
- `beschreibung`: Textbeschreibung
- `wert`: numerischer Betrag (positiv für Einnahmen, negativ für Ausgaben)
- `unterkategorie`: Name der ausgewählten Unterkategorie

### 5.2 Persistenzmodell

- `buchungen` ist ein Array von Buchungseinträgen
- `localStorage` speichert:
  - `haushaltsbuch_buchungen`
  - `haushaltsbuch_form`
  - optional: `gemini_api_key`

## 6. Use Cases

### 6.1 Buchung erfassen

1. Nutzer gibt Beschreibung, Betrag und Kategorie ein.
2. Unterkategorie wird dynamisch geladen.
3. Beim Absenden wird der Betrag als Einnahme oder Ausgabe verarbeitet.
4. Die Buchung wird im lokalen Speicher gesichert und das Dashboard aktualisiert.

### 6.2 Buchung löschen

1. Nutzer klickt auf das Lösch-Icon der Buchung.
2. Der Eintrag wird aus dem Array entfernt.
3. `localStorage` und UI werden aktualisiert.

### 6.3 Exportieren

- CSV: Die App erstellt eine strukturierte CSV-Datei und initiiert den Download.
- PDF: Die Browserdruckfunktion wird gestartet.

### 6.4 KI-Finanzberatung

1. Nutzer wechselt zur Beratungsansicht.
2. Hintergrundinfos und API-Key werden eingegeben.
3. Die App sendet ein Prompt an Google Gemini.
4. Antwort wird im UI angezeigt.

## 7. Technische Entscheidungen

### 7.1 Warum keine Backend-Architektur?

- Einfachheit
- Keine Serverkosten
- Offline-Fähigkeit für die Kernfunktionen
- Schnelle Nutzung durch Öffnen der HTML-Datei

### 7.2 Warum `localStorage`?

- Direkte Browser-Persistenz ohne Server
- Einfaches Serialisieren von JavaScript-Objekten
- Gut geeignet für kleine Datenmengen wie persönliche Buchungen

### 7.3 Warum keine Frameworks?

- Projekt ist überschaubar genug für native DOM-Manipulation
- Keine Build-Toolchain notwendig
- Leichtes Deployment durch statische Dateien

### 7.4 Warum PWA-Metadaten?

- Optische Verbesserung für mobile Nutzung
- Ermöglicht Installation auf Gerät
- Standalone-Darstellung für App-Feeling

### 7.5 Google Gemini Integration

- KI-Finanzberatung ist optional und entkoppelt von der Kernapplikation
- Verwendet REST-API-Request mit `fetch`
- API-Key bleibt lokal im Browser

## 8. Erweiterungsmöglichkeiten

- Persistenz auf `IndexedDB` oder Backend-Datenbank erweitern
- Nutzer-Authentifizierung hinzufügen
- Detailliertere Kategoriensysteme und Budgetziele
- Monatsübersichten und Diagramme
- Tests für JavaScript-Funktionen einführen
- Offline-Fähigkeit weiter verbessern mit Service Worker
- Formulardatenvalidierung erweitern

## 9. Zusammenfassung

Dieses Projekt ist als leichtgewichtige Browser-App konzipiert. Die gewählte Architektur ist eine klassische clientseitige SPA mit DOM-basierter Steuerung, lokaler Persistenz und optionaler KI-Integration. Die App bleibt bewusst einfach, um Wartbarkeit und schnelle Nutzung ohne Backend zu gewährleisten.
