/**
 * MAIN LAYOUT — nav, main, footer. Shell uses warm light gradient or deep “night”
 * stack with a subtle radial highlight (brand brown) in both themes.
 */
import { Outlet } from "react-router-dom";
import { SiteNavigation } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollToTop } from "../ScrollToTop.jsx";
import { WhatsAppButton } from "../WhatsAppButton.jsx";

export function MainLayout() {
  return (
    <div
      className="relative flex min-h-dvh min-h-screen flex-col overflow-x-hidden text-ink transition-[background-color,color] duration-[320ms] ease-smooth dark:text-sand/95"
      data-layout="app-shell"
    >
      {/* Base wash — light: cream → sand; dark: night + depth */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-cream via-cream to-sand/30 dark:from-[#18100c] dark:via-ink dark:to-[#0f0a08]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(139,94,60,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,94,60,0.18),transparent_50%)]"
        aria-hidden
      />

      <ScrollToTop />
      <a
        href="#main-content"
        className="skip-link"
        onClick={() => {
          requestAnimationFrame(() => {
            document.getElementById("main-content")?.focus({ preventScroll: false });
          });
        }}
      >
        Skip to main content
      </a>
      <SiteNavigation />
      <main
        id="main-content"
        className="relative flex-1 outline-none"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
