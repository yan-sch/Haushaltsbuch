# Schuldenaufstellung & KI-gestützte Rückzahlungsplanung (Web-App)

## 1. Überblick

Dieses Feature erweitert eine bestehende Haushaltsbuch-Web-App um eine
Schuldenverwaltung inklusive intelligenter Rückzahlungsplanung.

Die Anwendung besteht aus: - Landingpage - Haushaltsbuch (bereits
vorhanden) - Schuldenaufstellung + KI-Rückzahlungsplan (neu)

------------------------------------------------------------------------

## 2. Ziel

Ziel ist es, Nutzern eine strukturierte Übersicht ihrer Schulden zu
geben und automatisch optimierte Rückzahlungspläne zu generieren,
basierend auf: - Zinssätzen - Fälligkeiten - monatlich verfügbarem
Budget

------------------------------------------------------------------------

## 3. Architektur (Frontend)

Technologien: - HTML - CSS - JavaScript

Struktur: - Modulare Komponenten - Trennung von UI, Logik und API

### Module

-   UI-Modul (Form + Liste)
-   Daten-Modul (State Management)
-   Export-Modul (CSV, PDF)
-   KI-Modul (API-Anbindung)

------------------------------------------------------------------------

## 4. Features

### 4.1 Eingabemaske

Erfassung von: - Schuldner - Betrag - Zinssatz - Fälligkeit - optional:
Beschreibung

### 4.2 Schuldenliste

-   Dynamische Anzeige (rechts neben Formular)
-   Bearbeiten / Löschen möglich
-   Echtzeit-Update

### 4.3 Exportfunktionen

-   CSV (Excel-kompatibel)
-   PDF (Liste der Schulden)

Use Case: - Weiterverarbeitung in Liquiditätsplanung (Außerhalb unserer App)

------------------------------------------------------------------------

## 5. Haushaltsbuch Integration in Rückzahlungsplan

Bestehende Daten: - Einkommen - Fixkosten - Verfügbares monatliches
Budget

Berechnung: Monatlicher Überschuss = Einkommen - Fixkosten

Dieser Wert wird an die KI übergeben.

------------------------------------------------------------------------

## 6. KI-gestützte Rückzahlungsplanung

### 6.1 Ziel

Automatische Erstellung eines optimalen Rückzahlungsplans.

### 6.2 Logik (durch KI)

Berücksichtigung von: - Zinssätzen (höchste zuerst) - Fälligkeiten -
verfügbarem Budget - Priorität (A= termingetreue Rückzahlung unumgänglich, B= Termingetreue Rückzahlung empfehlenswert, C= flexible Rückzahlung)

### 6.3 API

-   Integration über externe KI-API (z. B. Gemini)

### 6.4 Output

-   Priorisierte Schuldenliste
-   Monatlicher Tilgungsplan
-   Dauer bis Schuldenfreiheit

------------------------------------------------------------------------

## 7. User Flow

1.  Nutzer öffnet Haushaltsbuch
2.  Navigation zur Schuldenseite
3.  Eingabe von Schulden
4.  Anzeige der Liste
5.  Export möglich
6.  Wechsel zur KI-Analyse
7.  Generierung Rückzahlungsplan

------------------------------------------------------------------------

## 8. UI/UX Konzept

Layout: - Links: Eingabemaske - Rechts: Schuldenliste (Wie im Haushaltsbuch)

Navigation: - Button zur KI-Auswertung - Integration in bestehende
App-Struktur (Wie im Haushaltsbuch)

------------------------------------------------------------------------

## 9. Erweiterungsideen (nicht für aktuelle Umsetzung zu berücksichtigen)

-   Visualisierung (Charts)
-   Fortschrittsanzeige
-   Erinnerungen für Fälligkeiten
-   Automatische Aktualisierung des Plans
-   Multi-User / Cloud Sync

------------------------------------------------------------------------

## 10. Fazit

Das Feature erweitert das Haushaltsbuch zu einem umfassenden
Finanzmanagement-Tool mit starkem Fokus auf Schuldenabbau und
intelligente Planung.
