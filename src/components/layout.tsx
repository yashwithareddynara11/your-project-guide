import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Utensils, BarChart3, BookOpen, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Overview", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/story", label: "Stories", icon: BookOpen },
  { to: "/tableau", label: "Tableau", icon: ExternalLink },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Utensils className="h-6 w-6" />
          <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:inline">
            College Food Choices
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            College Food Choices Analytics — a data visualization case study.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link to="/story" className="hover:text-foreground">
              Stories
            </Link>
            <Link to="/tableau" className="hover:text-foreground">
              Tableau
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageLayout({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {(title || subtitle) && (
          <div className="border-b border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              {title && <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>}
              {subtitle && <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}
