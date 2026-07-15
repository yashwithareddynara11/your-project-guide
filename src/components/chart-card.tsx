import { type ReactNode } from "react";
import { Info } from "lucide-react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className = "" }: ChartCardProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}>
      <div className="border-b border-border bg-muted/30 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-start gap-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
        </div>
        {description && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <Info className="h-3.5 w-3.5 shrink-0" />
            {description}
          </p>
        )}
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ label, value, suffix = "", trend = "neutral" }: StatCardProps) {
  const trendClass =
    trend === "up" ? "text-healthy" : trend === "down" ? "text-caution" : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">{label}</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`text-2xl font-bold tracking-tight sm:text-3xl ${trendClass}`}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {suffix && <span className="text-sm font-medium text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
