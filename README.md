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

> Admin is prototype-gated using a browser-stored token. On `/login`, enter token: `admin`.

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

