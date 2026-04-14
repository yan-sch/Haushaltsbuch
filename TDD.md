# Technical Design Document (TDD)

## 1. Projektübersicht

**Projektname:** Haushaltsbuch

**Beschreibung:**
Eine browserbasierte Haushaltsbuch-App zum Erfassen von Einnahmen, Ausgaben und Schulden, Anzeigen von Kontostand und Kategorien, Exportieren der Daten als CSV/PDF und KI-gestützter Finanzberatung über die Google Gemini API mit Schuldenberücksichtigung.

**Zielgruppe:**
Privatnutzer, die ihre persönlichen Finanzen einfach und schnell im Browser verwalten möchten, Schulden tracken und durch KI fundierte Entscheidungen treffen wollen, ohne Backend oder Serverinfrastruktur.

## 2. Ziele und Anforderungen

### Funktionale Anforderungen

- Buchungserfassung von Einnahmen und Ausgaben
- Auswahl von Hauptkategorie (`Einnahme` / `Ausgabe`) und passender Unterkategorie
- Anzeige von Gesamt-Kontostand, Summe Einnahmen und Summe Ausgaben
- Gruppierte Anzeige der Buchungen nach Kategorie und Unterkategorie
- Löschen einzelner Buchungen
- Schuldenverwaltung mit Prioritäten und Zinsberechnung
- Integration von Schulden in Gesamtfinanzübersicht und KI-Analyse
- Exportfunktion als CSV und PDF
- KI-Finanzberatung auf Basis von Google Gemini mit Schuldenberücksichtigung
- Lokale Speicherung von Buchungen, Schulden und Formularzustand im Browser
- Responsive Design für Desktop und Mobile
- PWA-Fähigkeiten für Installation als Web-App

### Nicht-funktionale Anforderungen

- Keine externe Backend-Abhängigkeit
- Funktioniert offline für die Datenverwaltung und Grundfunktionen
- Einfache Installation: Öffnen von `index.html` im Browser
- Responsive Darstellung für Desktop- und mobile Nutzung
- Wartbare und verständliche Code-Struktur
- Moderne Browser-Unterstützung (Chrome, Firefox, Safari, Edge)

## 3. Architekturübersicht

### 3.1 Architekturmodell

Die App verwendet eine einfache **clientseitige Architektur** ohne Backend.

- **Präsentationsschicht:** `index.html`, `layout.css`, `components.css`, `features.css`, `base.css`
- **Domänenlogik / Steuerung:** `main.js`
- **Persistenz:** `localStorage`
- **PWA-Metadaten:** `manifest.json`
- **Externe Integration:** Google Gemini API für KI-Finanzberatung

### 3.2 Architekturtyp

Das Projekt folgt einer **einfachen Single-Page-Application-Architektur (SPA)**, umgesetzt als klassische **DOM-basierte clientseitige Anwendung**:

- Der HTML-Code definiert die statische Struktur und die UI-Elemente.
- Das JavaScript fungiert als Controller/View-Renderer, das User-Events verarbeitet und die Anzeige erneuert.
- Das Datenmodell wird lokal in JavaScript-Variablen (`buchungen`, `schulden`) gehalten und in `localStorage` persistiert.
- Die App setzt auf **eventgetriebene Aktualisierung** statt auf Frameworks.
- Modulare CSS-Struktur für bessere Wartbarkeit.

### 3.3 Architekturdiagramm (textuell)

- Browser / Client
  - `index.html` (UI-Grundgerüst)
  - `base.css` (Basis-Styles)
  - `layout.css` (Layout und responsive Design)
  - `components.css` (UI-Komponenten)
  - `features.css` (Feature-spezifische Styles)
  - `main.js` (Anwendungslogik)
    - DOM-Elemente lesen und schreiben
    - Event-Handler für Formulare, Export, Navigation, Schulden und KI-Anfrage
    - Datenmodell verwalten (Buchungen und Schulden)
    - UI-Aktualisierung
    - localStorage Sync
  - `manifest.json` (PWA-Konfiguration)

- Externe API
  - Google Gemini API für KI-Antworten (mit Schuldenberücksichtigung)

## 4. Komponenten

### 4.1 `index.html`

- Definiert das App-Layout mit drei Hauptbereichen:
  - Hauptdashboard (`main-dashboard`)
  - Schuldenverwaltung (`debts-section`)
  - KI-Finanzberatung (`consultation-page`)
- Enthält Formularelemente für Buchungen und Schulden, Anzeigeelemente, Navigation und Export-Controls
- Bindet alle CSS-Dateien und JavaScript ein

### 4.2 CSS-Dateien

- `base.css`: Grundlegende Styles, Farbschema, Typografie
- `layout.css`: Responsive Layout, Grid-System, Navigation
- `components.css`: Styling für Buttons, Formulare, Cards
- `features.css`: Spezifische Styles für Buchungslisten, Schulden-Items, Export-Buttons

### 4.3 `main.js`

Ist die zentrale Logik und lässt sich in folgende funktionale Bereiche gliedern:

1. **Initialisierung und DOM-Referenzen**
   - HTML-Elemente lesen
   - Daten aus `localStorage` laden
   - initiale UI-Aktualisierung

2. **Kategorien und Unterkategorien**
   - Verwaltung von `einnahmeKategorien` und `ausgabeKategorien`
   - Dynamisches Auffüllen der Unterkategorie-Auswahl

3. **Persistenz**
   - `speichereDaten()` speichert Buchungen, Schulden und Formularzustand in `localStorage`
   - `ladeDaten()` lädt gespeicherte Daten beim Start

4. **UI-Rendering**
   - `updateUI()` erstellt die kategorial gruppierte Buchungsübersicht
   - `updateDebtsUI()` zeigt Schulden mit Prioritäten und Tilgungsraten
   - Aktualisiert Kontostand, Einnahmen, Ausgaben und Schuldenübersicht

5. **Transaktionsverwaltung**
   - Formular-Submit zur Anlage einer neuen Buchung
   - `loescheBuchung()` zum Entfernen einzelner Einträge

6. **Schuldenverwaltung**
   - Erfassung von Schulden mit Betrag, Zins, Priorität
   - Automatische Berechnung monatlicher Tilgungsraten
   - `loescheSchuld()` zum Entfernen von Schulden
   - Integration in Gesamtfinanzübersicht

7. **Export**
   - CSV-Export mit `erstelleCSV()` für Buchungen und Schulden
   - PDF-Ausgabe über `window.print()` für alle Bereiche

8. **KI-Finanzberatung**
   - Navigation zwischen Dashboard und Beratungsansicht
   - Lokale Speicherung des Google API Keys
   - API-Request an Google Gemini mit Buchungs- und Schulden-Daten
   - Darstellung der KI-Antworten mit Schuldenberücksichtigung

### 4.4 `manifest.json`

- Definiert PWA-Metadaten wie App-Name, Start-URL, Anzeige-Modus, Farben und Icon
- Erlaubt dem Browser, die App als installierbare Web-App zu behandeln

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

### 5.2 Schuldeineintrag

Jede Schuld ist ein Objekt mit folgenden Eigenschaften:

- `id`: eindeutiger numerischer Wert (`Date.now()`)
- `beschreibung`: Textbeschreibung der Schuld
- `betrag`: Gesamtbetrag der Schuld
- `zins`: Jahreszinssatz in Prozent
- `prioritaet`: Priorität ('hoch', 'mittel', 'niedrig')

### 5.3 Persistenzmodell

- `buchungen` ist ein Array von Buchungseinträgen
- `schulden` ist ein Array von Schuldeinträgen
- `localStorage` speichert:
  - `haushaltsbuch_buchungen`
  - `haushaltsbuch_schulden`
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

### 6.3 Schuld erfassen

1. Nutzer gibt Beschreibung, Betrag, Zins und Priorität ein.
2. Die Schuld wird dem Schulden-Array hinzugefügt.
3. Monatliche Tilgungsrate wird automatisch berechnet.
4. Gesamtübersicht und KI-Analyse werden aktualisiert.

### 6.4 Schuld löschen

1. Nutzer klickt auf das Lösch-Icon der Schuld.
2. Der Eintrag wird aus dem Schulden-Array entfernt.
3. `localStorage` und UI werden aktualisiert.

### 6.5 Exportieren

- CSV: Die App erstellt eine strukturierte CSV-Datei mit Buchungen und Schulden und initiiert den Download.
- PDF: Die Browserdruckfunktion wird gestartet für alle Bereiche.

### 6.6 KI-Finanzberatung

1. Nutzer wechselt zur Beratungsansicht.
2. Hintergrundinfos und API-Key werden eingegeben.
3. Die App sendet ein Prompt an Google Gemini mit Buchungs- und Schulden-Daten.
4. Antwort wird im UI angezeigt mit Berücksichtigung aller finanziellen Verpflichtungen.

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
- Prompt enthält Buchungs- und Schulden-Daten für umfassende Analyse

### 7.6 Modulare CSS-Struktur

- Aufgeteilte Stylesheets für bessere Wartbarkeit
- `base.css` für globale Styles
- `layout.css` für responsive Layout
- `components.css` für wiederverwendbare UI-Elemente
- `features.css` für spezifische Feature-Styles

### 7.7 Schuldenberechnung

- Automatische Berechnung monatlicher Tilgungsraten basierend auf Zins
- Prioritätssystem für strategische Tilgungsplanung
- Integration in Gesamtfinanzübersicht für ganzheitliche Betrachtung

## 8. Erweiterungsmöglichkeiten

- Persistenz auf `IndexedDB` oder Backend-Datenbank erweitern
- Nutzer-Authentifizierung hinzufügen für Multi-Device-Sync
- Detailliertere Kategoriensysteme und Budgetziele
- Monatsübersichten und Diagramme mit Chart.js
- Schulden-Tilgungsplaner mit visueller Darstellung
- Import von Bankdaten (CSV/XML)
- Budget-Alerts und Sparziele
- Mehrere Währungen unterstützen
- Tests für JavaScript-Funktionen einführen (Jest)
- Offline-Fähigkeit weiter verbessern mit Service Worker
- Dark Mode und Theme-Anpassungen
- Export in weitere Formate (JSON, Excel)
- KI-Features erweitern (automatische Kategorisierung, Ausgabenanalyse)
- Formulardatenvalidierung erweitern

## 9. Zusammenfassung

Dieses Projekt ist als leichtgewichtige Browser-App konzipiert. Die gewählte Architektur ist eine klassische clientseitige SPA mit DOM-basierter Steuerung, lokaler Persistenz und optionaler KI-Integration. Die App bleibt bewusst einfach, um Wartbarkeit und schnelle Nutzung ohne Backend zu gewährleisten.

Die modularisierte CSS-Struktur und die Erweiterung um Schuldenverwaltung machen die App zu einem umfassenden Finanzmanagement-Tool. Die KI-Integration mit Schuldenberücksichtigung bietet echten Mehrwert für fundierte finanzielle Entscheidungen. Die PWA-Fähigkeiten ermöglichen eine native App-ähnliche Erfahrung bei gleichzeitiger Browser-Kompatibilität.
