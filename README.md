# College Food Choices — Analytics Dashboard

An interactive analytics web app that explores dietary habits of college students and how they relate to academics, stress, health and lifestyle. Built as a read-only showcase using a synthetic dataset of 300 students.

## Live demo

Published URL: https://id-preview--7ee9768a-e97c-4d96-8b1a-bd0a6be50c9d.lovable.app

> Note: this is the preview link. After clicking **Publish** in Lovable, the app will also be live at its `.lovable.app` production URL.

## Features

- **Overview / Home** — project intro, key stats and highlight charts.
- **Dashboard** — interactive Recharts visualizations:
  - Breakfast habits vs academic focus (concentration & GPA)
  - Comfort food reasons (stress, boredom, sadness, happiness, habit, social)
  - Eating out vs cooking frequency
  - Health rating vs favorite cuisine
  - Cafeteria insights: vegetables, fruits and fast food consumption
  - Calorie awareness distribution
  - Stress level vs self-reported health
- **Stories** — narrative walkthroughs of three scenarios (Rahul, Priya, and a cafeteria manager).
- **Tableau** — page to embed an external Tableau Public dashboard (replace the placeholder URL in `src/routes/tableau.tsx`).

## Dataset

Synthetic data generated in `src/lib/data/food-choices.ts` — 300 student records with fields for demographics, breakfast habits, calorie awareness, comfort food, stress, health, exercise, eating out, cooking, cuisine preference, concentration and GPA. Aggregations for the charts live in `src/lib/data/analysis.ts`.

## Tech stack

- TanStack Start (React 19 + Vite 7)
- Recharts for visualizations
- Tailwind CSS v4 + shadcn/Radix UI primitives
- TypeScript (strict)

## Local development

```bash
bun install
bun run dev
```

Then open http://localhost:8080.

## Project structure

```
src/
  routes/           # File-based routes (index, dashboard, story, tableau)
  components/       # Chart cards, layout, shared UI
  lib/data/         # Synthetic dataset + aggregation helpers
  styles.css        # Design system (Tailwind v4 tokens)
```

## Deploy

Deployed with **Lovable** — open the project and click **Publish** (top right) to ship changes. Custom domains can be connected from Project Settings → Domains.
