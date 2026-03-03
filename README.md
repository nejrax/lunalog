# LunaLog

Anonymous symptom tracking and community-driven, data-based insights for **PCOS** and **endometriosis**.

This is a graduation project prototype: users can log weekly symptom updates and lifestyle factors, explore aggregated “insight previews” (correlations + symptom heatmap), and access a simple chat assistant. The long-term goal is to support both:
- **User support** through anonymous sharing and evidence-style summaries.
- **Real-world research data** by collecting de-identified, structured logs for statistical/ML analysis.

## Medical disclaimer (mandatory)

**This project provides no medical advice.** It displays anonymized, aggregated community analysis and descriptive statistics. Correlations shown in the UI do **not** imply causation and may be biased, incomplete, or confounded. For diagnosis and treatment, consult a licensed clinician.

## Privacy & anonymity

The prototype supports anonymous usage. In the current version:

- An anonymous user id is created and stored **locally in your browser**.
- Symptom logs are stored **locally (localStorage)**.

When you add a real backend/database, logs should be de-identified server-side and stored as an anonymized dataset.

---

## Features

- **Hero + quick actions**
  - Mission statement: ML-powered pattern discovery for PCOS/endometriosis symptoms
  - Anonymous registration/login CTA
  - “Log today’s symptoms” CTA

- **Data-driven insights dashboard (preview)**
  - Correlation widgets (mock data)
  - Symptom heatmap visualization (mock data)
  - Impact counters (“experiences → statistical insights”)

- **Community & support (prototype UI)**
  - Moderated blog highlights (mock data)
  - Forum sneak-peek (mock data)

- **Simple AI chat widget (prototype)**
  - Embedded floating chat
  - Safety guardrails: refuses medical advice

- **Transparency & trust**
  - Prominent disclaimer + privacy section in the footer

## Pages

- **Home**: `/`
- **Login (anonymous)**: `/login`
- **Log symptoms**: `/log`
- **Admin**: `/admin`

> Admin is gated by an admin-only login. Use:
>
> - Email: `graduationproject@ius.edu.ba`
> - Password: `gradproj2026`

---

## Tech stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**

---

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run locally (dev)

```bash
npm run dev
```

Open:

- http://localhost:3000

### Production build

```bash
npm run build
npm start
```


---

## Prototype limitations (current)

- **No real database**: insight widgets, forum topics, and blog highlights are mocked.
- **Local-only data**: anonymous user id and symptom logs are stored in the browser (localStorage).
- **No real moderation**: admin actions are placeholders for future workflows.
- **No ML pipeline yet**: the UI is prepared for correlation/clustering/predictive signals but isn’t connected to training/inference.

---

## Roadmap (next steps)

- **Backend + DB** (Flask or Node)
  - store anonymized logs (PostgreSQL or MongoDB)
  - add moderated blog + forum models

- **Analytics + ML**
  - baseline descriptive stats + correlation analysis
  - clustering of symptom/lifestyle profiles
  - optional predictive modeling (carefully framed, non-diagnostic)
  - scheduled retraining (and later, online learning)

- **Safety & governance**
  - clearer data consent UX
  - moderation tools and abuse reporting
  - bias/confounder disclosures on insights

---

## Repository structure (high level)

- `src/app/` — Next.js routes (`/`, `/login`, `/log`, `/admin`)
- `src/components/` — UI components (navbar, chat widget, search bar, footer)
- `src/lib/` — prototype session helpers and mock data

## License

Add a license file if you plan to open-source this project.
