import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
  /** Breadcrumb trail for internal pages. Omit on the home page. */
  crumbs?: Crumb[];
}

export function Layout({ children, crumbs }: LayoutProps) {
  const [location] = useLocation();

  // Scroll to top on route change (SPA navigation).
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#contingut"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:font-semibold"
      >
        Salta al contingut principal
      </a>
      <Header />
      <main id="contingut" className="flex-1 pt-16 md:pt-20">
        {crumbs && (
          <div className="border-b border-border bg-[hsl(var(--surface))]">
            <div className="container-page py-3">
              <Breadcrumbs items={crumbs} />
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
