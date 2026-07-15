import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Section } from "@/components/layout";
import { ChartCard, StatCard } from "@/components/chart-card";
import { keyStats, breakfastConcentrationData, comfortFoodReasonsData } from "@/lib/data/analysis";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "College Food Choices Analytics" },
      {
        name: "description",
        content:
          "Explore dietary habits, academic focus, and wellness patterns among college students through interactive data visualizations.",
      },
      { property: "og:title", content: "College Food Choices Analytics" },
      {
        property: "og:description",
        content:
          "Explore dietary habits, academic focus, and wellness patterns among college students through interactive data visualizations.",
      },
    ],
  }),
  component: HomePage,
});

const CHART_COLORS = ["hsl(155 55% 45%)", "hsl(35 85% 55%)", "hsl(220 60% 55%)", "hsl(0 70% 55%)", "hsl(280 55% 55%)"];

function HomePage() {
  const stats = keyStats();
  const breakfastData = breakfastConcentrationData();
  const comfortData = comfortFoodReasonsData();

  return (
    <PageLayout>
      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <Section className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              College Food Choices
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              A data-driven case study exploring how dietary habits, stress, and lifestyle choices shape
              academic focus and wellness among college students.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Explore Dashboard
              </Link>
              <Link
                to="/story"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Read the Stories
              </Link>
            </div>
          </div>
        </Section>
      </div>

      {/* Stats */}
      <Section className="py-10">
        <h2 className="mb-5 text-xl font-semibold text-foreground">At a glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
          ))}
        </div>
      </Section>

      {/* Preview charts */}
      <Section className="py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Breakfast & Concentration"
            description="Students who eat breakfast regularly report higher concentration levels."
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakfastData} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="frequency" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="concentration" radius={[4, 4, 0, 0]}>
                    {breakfastData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Comfort Food Triggers"
            description="Stress and boredom are the most common reasons students reach for comfort food."
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comfortData}
                  layout="vertical"
                  margin={{ top: 8, right: 16, bottom: 8, left: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {comfortData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </Section>

      {/* Scenario cards */}
      <Section className="py-10">
        <h2 className="mb-5 text-xl font-semibold text-foreground">Featured scenarios</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ScenarioCard
            title="Academic Focus"
            description="How breakfast and balanced meals correlate with concentration and GPA."
            to="/story"
          />
          <ScenarioCard
            title="Stress Eating"
            description="Understanding comfort food triggers and finding healthier alternatives."
            to="/story"
          />
          <ScenarioCard
            title="Cafeteria Choices"
            description="Insights to help campus dining offer healthier, student-friendly options."
            to="/story"
          />
        </div>
      </Section>
    </PageLayout>
  );
}

function ScenarioCard({
  title,
  description,
  to,
}: {
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <span className="mt-4 text-sm font-medium text-primary">Read more →</span>
    </Link>
  );
}
