# Product Requirements Document (PRD) - Haushaltsbuch App

## 1. Executive Summary

### Product Name
Haushaltsbuch

### Product Vision
Eine benutzerfreundliche, browserbasierte Haushaltsbuch-Anwendung, die Privatpersonen hilft, ihre Finanzen einfach zu verwalten, Schulden zu tracken und durch KI-gestützte Analyse fundierte Entscheidungen zu treffen.

### Business Objectives
- Bereitstellung eines kostenlosen, einfach zu bedienenden Tools für persönliches Finanzmanagement
- Integration von KI zur Verbesserung der finanziellen Entscheidungsfindung
- Offline-fähige Lösung ohne Backend-Abhängigkeiten

### Success Metrics
- Benutzer können Transaktionen effizient erfassen und analysieren
- Positive Nutzerfeedback zur KI-Beratung
- Hohe Nutzungsrate der Exportfunktionen

## 2. Product Overview

### Problem Statement
Viele Menschen haben Schwierigkeiten, ihre persönlichen Finanzen zu überblicken, Schulden zu verwalten und fundierte Spar- oder Investitionsentscheidungen zu treffen. Bestehende Tools sind oft komplex, kostenpflichtig oder erfordern Backend-Infrastruktur.

### Solution
Eine Progressive Web App (PWA), die:
- Einfache Erfassung von Einnahmen, Ausgaben und Schulden ermöglicht
- Automatische Berechnung von Kontoständen und Kategorienübersichten
- KI-gestützte Finanzberatung basierend auf Google Gemini API
- Exportfunktionen für Datenanalyse und Archivierung
- Vollständig offline-fähig für Kernfunktionen

### Key Differentiators
- Keine Backend-Abhängigkeit - funktioniert komplett im Browser
- Integrierte KI-Beratung mit Schuldenberücksichtigung
- Responsive Design für Desktop und Mobile
- PWA-Fähigkeiten für native App-Erfahrung

## 3. Target Audience

### Primary Users
- Privatpersonen im Alter von 18-65 Jahren
- Menschen mit regelmäßigem Einkommen und Ausgaben
- Personen mit Schulden, die diese besser verwalten möchten

### User Personas
1. **Max Mustermann** - 35 Jahre, Angestellter, Familie, möchte Budget überwachen
2. **Anna Beispiel** - 28 Jahre, Studentin, hat Kreditkartenschulden, braucht Sparhilfe
3. **Familie Schmidt** - Eltern mit Kindern, wollen Haushaltsbudget planen

### Use Cases
- Tägliche Erfassung von Einnahmen und Ausgaben
- Monatliche Budgetplanung
- Schuldenabbau-Strategien entwickeln
- Finanzielle Entscheidungen mit KI-Unterstützung treffen

## 4. Features and Requirements

### 4.1 Core Features

#### Transaction Management
- **Einnahmen/Ausgaben erfassen**
  - Beschreibung, Betrag, Kategorie, Unterkategorie
  - Automatische Berechnung von Kontostand
  - Gruppierte Anzeige nach Kategorien

- **Schuldenverwaltung**
  - Erfassung von Schulden mit Betrag, Zins, Priorität
  - Automatische Berechnung von monatlichen Tilgungsraten
  - Integration in Gesamtfinanzübersicht

#### Data Export
- CSV-Export für alle Transaktionen
- PDF-Export für Berichte und Analysen
- Druckfunktion für physische Archivierung

#### AI Financial Analysis
- Integration mit Google Gemini API
- Personalisierte Finanzberatung
- Berücksichtigung von Schulden in Analysen
- Lokale Speicherung des API-Keys

### 4.2 Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-001 | Transaction Entry | High | Users can add income and expense transactions with description, amount, and category |
| FR-002 | Debt Tracking | High | Users can add and manage debts with amount, interest rate, and priority |
| FR-003 | Balance Calculation | High | Automatic calculation of current balance, total income, and total expenses |
| FR-004 | Category Grouping | Medium | Transactions grouped by main and sub-categories |
| FR-005 | Transaction Deletion | Medium | Users can delete individual transactions |
| FR-006 | Data Persistence | High | Data stored locally in browser using localStorage |
| FR-007 | CSV Export | Medium | Export all transactions as CSV file |
| FR-008 | PDF Export | Medium | Print functionality for PDF generation |
| FR-009 | AI Consultation | High | AI-powered financial advice using Google Gemini API |
| FR-010 | Responsive Design | High | Works on desktop and mobile devices |
| FR-011 | PWA Features | Low | Installable as web app with offline capabilities |

### 4.3 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-001 | Performance | Page loads in <2 seconds, UI updates in <500ms |
| NFR-002 | Usability | Intuitive interface, no training required |
| NFR-003 | Accessibility | WCAG 2.1 AA compliance |
| NFR-004 | Security | API keys stored locally, no data transmission to external servers |
| NFR-005 | Browser Support | Modern browsers: Chrome, Firefox, Safari, Edge |
| NFR-006 | Offline Capability | Core functions work without internet connection |

## 5. User Stories

### Epic: Transaction Management
- **As a user**, I want to add income transactions so that I can track my earnings
- **As a user**, I want to add expense transactions so that I can monitor my spending
- **As a user**, I want to see my current balance so that I know my financial status
- **As a user**, I want to categorize transactions so that I can analyze spending patterns
- **As a user**, I want to delete transactions so that I can correct errors

### Epic: Debt Management
- **As a user**, I want to add debts with interest rates so that I can track my liabilities
- **As a user**, I want to prioritize debts so that I can plan repayment strategies
- **As a user**, I want to see debt impact on my finances so that I can make informed decisions

### Epic: Data Export
- **As a user**, I want to export data as CSV so that I can analyze in Excel
- **As a user**, I want to print reports as PDF so that I can archive physically

### Epic: AI Analysis
- **As a user**, I want AI financial advice so that I can improve my money management
- **As a user**, I want debt-aware analysis so that my advice considers all obligations
- **As a user**, I want personalized recommendations so that advice fits my situation

## 6. Technical Requirements

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data Storage**: Browser localStorage
- **External APIs**: Google Gemini API
- **Build Tools**: None (static files)
- **Deployment**: Static file hosting

### Architecture
- Single Page Application (SPA)
- Client-side rendering
- Event-driven UI updates
- Progressive Web App (PWA) capabilities

### Data Model
```javascript
// Transaction
{
  id: number,
  description: string,
  amount: number,
  subcategory: string,
  type: 'income' | 'expense'
}

// Debt
{
  id: number,
  description: string,
  amount: number,
  interestRate: number,
  priority: 'high' | 'medium' | 'low'
}
```

### API Integration
- Google Gemini API for AI analysis
- RESTful API calls using fetch()
- JSON request/response format

## 7. Design Requirements

### UI/UX Principles
- Clean, minimalistic design
- Intuitive navigation
- Consistent color scheme
- Mobile-first responsive design
- Clear visual hierarchy

### Wireframes (Text-based)
```
Main Dashboard:
+-------------------+-------------------+
| Transaction Form  | Balance Summary   |
| [Description]     | Current: €X,XXX  |
| [Amount] [Type]   | Income: €X,XXX   |
| [Category]        | Expenses: €X,XXX |
+-------------------+-------------------+
| Transaction List                  |
| Category 1                        |
|   - Item 1 €XXX [Delete]          |
|   - Item 2 €XXX [Delete]          |
| Category 2                        |
|   ...                             |
+-------------------+-------------------+

AI Consultation Page:
+-------------------+
| Background Info   |
| [Textarea]        |
| API Key [Input]   |
| [Generate Advice] |
+-------------------+
| AI Response       |
| [Response text]   |
| [Export PDF]      |
+-------------------+
```

### Branding
- Color Scheme: Professional blues and greens
- Typography: Clean sans-serif fonts
- Icons: Simple, recognizable symbols

## 8. Acceptance Criteria

### Minimum Viable Product (MVP)
- [ ] Transaction entry and display
- [ ] Balance calculation
- [ ] Basic categorization
- [ ] Data persistence
- [ ] CSV export
- [ ] Responsive design

### Full Product
- [ ] All MVP features
- [ ] Debt management
- [ ] AI consultation
- [ ] PDF export
- [ ] PWA features
- [ ] Comprehensive testing

## 9. Timeline and Milestones

### Phase 1: Core Functionality (Week 1-2)
- Transaction management
- Basic UI and styling
- Data persistence

### Phase 2: Enhanced Features (Week 3-4)
- Debt tracking
- Export functions
- Responsive design improvements

### Phase 3: AI Integration (Week 5-6)
- Google Gemini API integration
- AI consultation interface
- Debt-aware analysis

### Phase 4: Polish and Testing (Week 7-8)
- PWA features
- Comprehensive testing
- Documentation

## 10. Success Metrics

### Quantitative Metrics
- Daily Active Users (DAU)
- Transaction entry frequency
- Export usage rate
- AI consultation usage

### Qualitative Metrics
- User satisfaction surveys
- Feature usage analytics
- Error rates and bug reports

### Business Metrics
- User retention rate
- Feature adoption rate
- Time to complete common tasks

## 11. Risks and Assumptions

### Technical Risks
- **API Dependency**: Google Gemini API changes could break integration
- **Browser Compatibility**: Older browsers may not support required features
- **Data Loss**: localStorage limitations could cause data loss

### Business Risks
- **Privacy Concerns**: Users may be hesitant to use AI features
- **Competition**: Many free finance apps exist
- **Adoption**: Users may prefer native mobile apps

### Assumptions
- Users have modern browsers with JavaScript enabled
- Google Gemini API remains accessible and affordable
- Users are comfortable with basic computer literacy
- No backend infrastructure will be needed

### Mitigation Strategies
- Graceful degradation for older browsers
- Clear privacy policy and local data storage
- Regular API monitoring and fallback options
- User education and onboarding

## 12. Dependencies

### External Dependencies
- Google Gemini API (for AI features)
- Modern web browsers with ES6+ support
- Internet connection (for AI features only)

### Internal Dependencies
- None (solo development project)

## 13. Support and Maintenance

### Documentation
- User manual in README.md
- Technical documentation in TDD.md
- API integration guides

### Testing Strategy
- Manual testing across browsers
- User acceptance testing
- Performance testing

### Maintenance Plan
- Regular browser compatibility checks
- API integration monitoring
- Security updates as needed

## 14. Conclusion

This PRD outlines a comprehensive plan for building a modern, user-friendly household budget application with AI-powered financial analysis. The focus on simplicity, offline capability, and intelligent features positions this app as a valuable tool for personal finance management.

The phased approach ensures steady progress while maintaining quality and user experience. Regular validation against acceptance criteria will ensure the final product meets user needs and business objectives.