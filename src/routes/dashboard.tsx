import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, Section } from "@/components/layout";
import { ChartCard, StatCard } from "@/components/chart-card";
import {
  keyStats,
  breakfastConcentrationData,
  comfortFoodReasonsData,
  eatingOutVsCookingData,
  healthByCuisineData,
  cafeteriaData,
  calorieAwarenessData,
  stressVsHealthData,
} from "@/lib/data/analysis";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — College Food Choices" },
      {
        name: "description",
        content:
          "Interactive dashboard visualizing breakfast habits, stress eating, cuisine preferences, and cafeteria choices among college students.",
      },
      { property: "og:title", content: "Analytics Dashboard — College Food Choices" },
      {
        property: "og:description",
        content:
          "Interactive dashboard visualizing breakfast habits, stress eating, cuisine preferences, and cafeteria choices among college students.",
      },
    ],
  }),
  component: DashboardPage,
});

const COLORS = [
  "hsl(155 55% 45%)",
  "hsl(35 85% 55%)",
  "hsl(220 60% 55%)",
  "hsl(0 70% 55%)",
  "hsl(280 55% 55%)",
  "hsl(170 55% 45%)",
];

function DashboardPage() {
  const stats = keyStats();

  return (
    <PageLayout
      title="Analytics Dashboard"
      subtitle="Explore dietary patterns, academic correlations, and wellness indicators across the student sample."
    >
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
          ))}
        </div>
      </Section>

      <Section className="py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <BreakfastConcentrationChart />
          <ComfortFoodChart />
          <EatingOutCookingChart />
          <HealthCuisineChart />
          <CafeteriaChart />
          <CalorieAwarenessChart />
          <StressHealthChart />
        </div>
      </Section>
    </PageLayout>
  );
}

function BreakfastConcentrationChart() {
  const data = breakfastConcentrationData();
  return (
    <ChartCard
      title="Breakfast Habits vs. Academic Focus"
      description="Average concentration score and GPA by breakfast frequency."
    >
      <div className="h-72">
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
  );
}

function ComfortFoodChart() {
  const data = comfortFoodReasonsData();
  return (
    <ChartCard
      title="Reasons for Comfort Food"
      description="Bubble view of why students choose comfort food during stressful or emotional moments."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="value" name="Students" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
            <ZAxis type="number" dataKey="value" range={[100, 800]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [value, "Students"]}
            />
            <Scatter data={data} fill={COLORS[2]} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function EatingOutCookingChart() {
  const data = eatingOutVsCookingData();
  return (
    <ChartCard
      title="Eating Out vs. Cooking at Home"
      description="How often students cook at home compared to eating out, by frequency."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="frequency" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="eatingOut"
              name="Eating out"
              stroke={COLORS[3]}
              strokeWidth={3}
              dot
            />
            <Line
              type="monotone"
              dataKey="cooking"
              name="Cooking"
              stroke={COLORS[0]}
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function HealthCuisineChart() {
  const data = healthByCuisineData();
  return (
    <ChartCard
      title="Health Rating by Favorite Cuisine"
      description="Average self-reported health score across preferred cuisines."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 16, bottom: 8, left: 72 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" name="Health score" radius={[0, 4, 4, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function CafeteriaChart() {
  const data = cafeteriaData();
  return (
    <ChartCard
      title="Cafeteria Consumption Patterns"
      description="Distribution of vegetable, fruit, and fast-food servings per student."
    >
      <div className="h-72">
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
  );
}

function CalorieAwarenessChart() {
  const data = calorieAwarenessData();
  return (
    <ChartCard title="Calorie Awareness" description="Student awareness of daily calorie intake.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" name="Students" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function StressHealthChart() {
  const data = stressVsHealthData();
  return (
    <ChartCard
      title="Stress vs. Self-Reported Health"
      description="Average health score declines as perceived stress increases."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
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
              {data.map((_, i) => (
                <Cell key={i} fill={i === 2 ? COLORS[3] : COLORS[0]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
