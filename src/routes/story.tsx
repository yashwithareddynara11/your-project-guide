import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Section } from "@/components/layout";
import { ChartCard, StatCard } from "@/components/chart-card";
import {
  breakfastConcentrationData,
  comfortFoodReasonsData,
  stressVsHealthData,
  cafeteriaData,
} from "@/lib/data/analysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import { Coffee, Brain, Salad } from "lucide-react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Stories — College Food Choices" },
      {
        name: "description",
        content:
          "Read the data stories: academic focus, stress-related eating, and cafeteria improvements through college food analytics.",
      },
      { property: "og:title", content: "Stories — College Food Choices" },
      {
        property: "og:description",
        content:
          "Read the data stories: academic focus, stress-related eating, and cafeteria improvements through college food analytics.",
      },
    ],
  }),
  component: StoryPage,
});

const COLORS = [
  "hsl(155 55% 45%)",
  "hsl(35 85% 55%)",
  "hsl(220 60% 55%)",
  "hsl(0 70% 55%)",
  "hsl(280 55% 55%)",
];

function StoryPage() {
  return (
    <PageLayout
      title="Data Stories"
      subtitle="Three scenario-driven narratives that turn survey insights into actionable strategies for students, staff, and campus services."
    >
      <Section className="space-y-12 py-10">
        <StoryAcademicFocus />
        <StoryStressEating />
        <StoryCafeteria />
      </Section>
    </PageLayout>
  );
}

function StoryAcademicFocus() {
  const data = breakfastConcentrationData();
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Coffee className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Scenario 1: Improving Academic Focus
          </h2>
          <p className="text-sm text-muted-foreground">Rahul, a second-year engineering student</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-foreground sm:text-base">
          <p>
            Rahul often skips breakfast and relies on fast food between classes. After exploring the
            dashboard, he notices a clear pattern: students who eat breakfast regularly report
            higher concentration scores and higher average GPAs.
          </p>
          <p>
            The data suggests that even a quick morning meal can set the tone for the day. Rahul
            decides to start with a simple breakfast routine and reduce late-night junk food to
            improve both his health and academic productivity.
          </p>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="font-medium text-foreground">Key takeaway</p>
            <p className="mt-1 text-muted-foreground">
              Breakfast frequency shows a positive trend with both concentration and GPA.
            </p>
          </div>
        </div>

        <ChartCard
          title="Breakfast Frequency vs. Concentration & GPA"
          description="Average scores by frequency."
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
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
                <Legend />
                <Bar
                  dataKey="concentration"
                  name="Concentration"
                  fill={COLORS[0]}
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="gpa" name="GPA" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </article>
  );
}

function StoryStressEating() {
  const comfortData = comfortFoodReasonsData();
  const stressData = stressVsHealthData();
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-caution/10 text-caution">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Scenario 2: Managing Stress Eating
          </h2>
          <p className="text-sm text-muted-foreground">Priya, a first-year college student</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-foreground sm:text-base">
          <p>
            During exams, Priya reaches for comfort food to cope with stress. The dashboard shows
            that stress and boredom are the leading reasons students choose comfort food, and that
            students under high stress report lower health scores.
          </p>
          <p>
            Recognizing the pattern, Priya begins choosing healthier alternatives like fruits and
            home-cooked meals, and adds short walks to her routine. The data story reinforces that
            awareness is the first step toward change.
          </p>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="font-medium text-foreground">Key takeaway</p>
            <p className="mt-1 text-muted-foreground">
              High stress correlates with lower self-reported health and a higher reliance on
              comfort food.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <ChartCard
            title="Top Comfort Food Triggers"
            description="Why students choose comfort food."
          >
            <div className="h-48">
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
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Stress Level vs. Health Score"
            description="Lower health scores under high stress."
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stressData} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="stress" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="healthScore" name="Health score" radius={[4, 4, 0, 0]}>
                    {stressData.map((_, i) => (
                      <Cell key={i} fill={i === 2 ? COLORS[3] : COLORS[0]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </article>
  );
}

function StoryCafeteria() {
  const data = cafeteriaData();
  const totalVeg = data.reduce((acc, r) => acc + r.vegetables, 0);
  const totalFruit = data.reduce((acc, r) => acc + r.fruits, 0);
  const totalFastFood = data.reduce((acc, r) => acc + r.fastFood, 0);

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-healthy/10 text-healthy">
          <Salad className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Scenario 3: Improving Cafeteria Choices
          </h2>
          <p className="text-sm text-muted-foreground">University cafeteria manager</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-foreground sm:text-base">
          <p>
            The cafeteria manager reviews the dashboard and finds that vegetable and fruit
            consumption among students is relatively low, while fast food consumption is high. This
            signals an opportunity to reshape the campus menu around healthier options.
          </p>
          <p>
            Based on these insights, the team introduces fresh salad bars, balanced meal combos, and
            more vegetable-forward options. They also track cuisine preferences to rotate popular
            healthy dishes.
          </p>
          <div className="rounded-lg bg-muted/40 p-4">
            <p className="font-medium text-foreground">Key takeaway</p>
            <p className="mt-1 text-muted-foreground">
              Fast food consumption outweighs fresh produce intake in the student sample.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Vegetable servings" value={totalVeg} trend="up" />
            <StatCard label="Fruit servings" value={totalFruit} trend="up" />
            <StatCard label="Fast food meals" value={totalFastFood} trend="down" />
          </div>

          <ChartCard
            title="Daily Servings Distribution"
            description="Students grouped by servings per day."
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="servings" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="vegetables"
                    name="Vegetables"
                    stackId="a"
                    fill={COLORS[0]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="fruits" name="Fruits" stackId="a" fill={COLORS[4]} />
                  <Bar
                    dataKey="fastFood"
                    name="Fast food"
                    stackId="b"
                    fill={COLORS[3]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </article>
  );
}
