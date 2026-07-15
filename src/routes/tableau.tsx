import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Section } from "@/components/layout";
import { ExternalLink, Info } from "lucide-react";

export const Route = createFileRoute("/tableau")({
  head: () => ({
    meta: [
      { title: "Tableau Integration — College Food Choices" },
      {
        name: "description",
        content:
          "Embed the Tableau dashboard and story for the College Food Choices case study, or learn how to connect your own Tableau Public view.",
      },
      { property: "og:title", content: "Tableau Integration — College Food Choices" },
      {
        property: "og:description",
        content:
          "Embed the Tableau dashboard and story for the College Food Choices case study, or learn how to connect your own Tableau Public view.",
      },
    ],
  }),
  component: TableauPage,
});

// Replace this with the Tableau Public embed URL from your project.
const TABLEAU_DASHBOARD_URL =
  "https://public.tableau.com/views/CollegeFoodChoices-Demo/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link";

const TABLEAU_STORY_URL =
  "https://public.tableau.com/views/CollegeFoodChoices-Demo/Story1?:language=en-US&:display_count=n&:origin=viz_share_link";

function TableauPage() {
  return (
    <PageLayout
      title="Tableau Integration"
      subtitle="Embed your published Tableau dashboard and story below, or follow the steps to connect your own Tableau Public view."
    >
      <Section className="space-y-8 py-10">
        {/* Info box */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">How to connect your Tableau dashboard</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Publish your dashboard and story to Tableau Public.</li>
                <li>Click the share button and copy the embed code URL.</li>
                <li>Paste the dashboard URL into the source code at `src/routes/tableau.tsx`.</li>
                <li>Redeploy to see your live Tableau dashboard here.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Dashboard embed */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tableau Dashboard</h2>
              <p className="text-sm text-muted-foreground">Interactive dashboard with filters and drill-downs.</p>
            </div>
            <a
              href={TABLEAU_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Open in Tableau <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <iframe
              title="College Food Choices Tableau Dashboard"
              src={TABLEAU_DASHBOARD_URL}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>

        {/* Story embed */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tableau Story</h2>
              <p className="text-sm text-muted-foreground">Narrative flow of the three scenarios.</p>
            </div>
            <a
              href={TABLEAU_STORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Open in Tableau <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <iframe
              title="College Food Choices Tableau Story"
              src={TABLEAU_STORY_URL}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>

        {/* Placeholder fallback */}
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center">
          <p className="text-sm font-medium text-foreground">No Tableau dashboard published yet?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The standalone dashboard and story pages above are built into this web app. Use them as the project
            deliverables until your Tableau dashboard is ready to embed.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
