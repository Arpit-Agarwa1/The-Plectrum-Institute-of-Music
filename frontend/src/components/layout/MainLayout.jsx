/**
 * MAIN LAYOUT — top navigation, page content, footer.
 */
import { Outlet } from "react-router-dom";
import { SiteNavigation } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollToTop } from "../ScrollToTop.jsx";
import { WhatsAppButton } from "../WhatsAppButton.jsx";

export function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream via-cream to-sand/20 text-ink dark:from-ink dark:via-ink dark:to-brown-dark/30">
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
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
