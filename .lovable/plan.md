# College Food Choices Analytics Project

## Goal

Build a standalone web-based analytics dashboard that showcases college dietary habits, plus a Tableau embed page so the project can also integrate external Tableau dashboards. All data will be synthetic, read-only sample data.

## Deliverables

1. **Synthetic dataset** — realistic college food choices data (breakfast habits, calorie awareness, stress eating, cuisine preferences, health ratings, eating out, cooking frequency, etc.).
2. **Home / Overview page** — project intro, use-case scenarios, and navigation to dashboard/story/Tableau sections.
3. **Dashboard page** — interactive Recharts visualizations covering:
   - Breakfast habits vs academic focus / concentration
   - Stress/comfort food reasons (bubble or bar chart)
   - Eating out vs cooking frequency
   - Health self-rating vs cuisine preferences
   - Cafeteria insights (vegetable/fruit vs fast food consumption)
   - Calorie awareness distribution
4. **Story page** — narrative walkthrough of the three scenarios (Rahul, Priya, cafeteria manager).
5. **Tableau embed page** — page that embeds an external Tableau dashboard/story with a placeholder URL, plus instructions for replacing it.
6. **Navigation + shell** — clean header, footer, and responsive layout using the existing TanStack root layout.
7. **SEO & metadata** — real app title/description, sitemap, robots.txt.

## Technical approach

- Use **Recharts** (already installed) for all charts.
- Keep data in static JSON generated in `src/lib/data/food-choices.ts`.
- Build components under `src/components/` for chart cards, layout, and the Tableau embed.
- Create routes:
  - `src/routes/index.tsx` (home/overview)
  - `src/routes/dashboard.tsx` (analytics dashboard)
  - `src/routes/story.tsx` (scenario story)
  - `src/routes/tableau.tsx` (Tableau embed)
- Update `src/styles.css` for a cohesive dashboard color palette (data-driven accents, clean light theme, no dark toggle).
- Update `src/routes/__root.tsx` head metadata with project-specific title/description.
- Add `sitemap.xml` and `public/robots.txt`.
- No backend or auth needed — read-only showcase.

## Out of scope

- User authentication / roles
- Real-time data updates
- Backend data persistence
- Actual Tableau dashboard files (we provide a web embed placeholder and a standalone dashboard replacement)

## Dependencies

No new runtime dependencies needed. Recharts, shadcn/Radix primitives, and Tailwind are already available.
