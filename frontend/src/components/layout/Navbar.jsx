/**
 * SITE NAVIGATION — refined sticky header: clear hierarchy, underline active states, integrated phone & CTA.
 */
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  Phone,
  LogIn,
  Music2,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  brandShort,
  instituteName,
  phoneDisplay,
  phoneTel,
} from "../../config/siteInfo.js";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/teachers", label: "Teachers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

/** Desktop nav link — bottom border indicates active (no layout shift) */
function desktopNavClass({ isActive }) {
  const base =
    "relative shrink-0 whitespace-nowrap border-b-2 px-1.5 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-200 xl:px-2 xl:text-sm";
  if (isActive) {
    return `${base} border-brown text-brown-dark dark:border-sand dark:text-cream`;
  }
  return `${base} border-transparent text-ink/65 hover:border-sand hover:text-brown-dark dark:text-sand/75 dark:hover:border-brown-dark/60 dark:hover:text-cream`;
}

/**
 * Slide-in panel for small screens.
 */
function MobileMenuDrawer({ open, onClose }) {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-shell"
          role="presentation"
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm dark:bg-black/60"
            aria-label="Close menu"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ type: "spring", damping: 32, stiffness: 360 }}
            className="absolute inset-y-0 right-0 flex w-[min(100vw-2rem,21rem)] flex-col bg-cream shadow-[0_0_0_1px_rgba(43,26,18,0.06),0_25px_50px_-12px_rgba(43,26,18,0.25)] dark:bg-ink dark:shadow-black/40"
          >
            <div className="flex items-center justify-between border-b border-sand/80 px-5 py-5 dark:border-brown-dark/50">
              <span className="font-display text-lg font-semibold text-brown-dark dark:text-cream">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-brown-dark transition hover:bg-sand/80 dark:text-sand dark:hover:bg-brown-dark/50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-3" aria-label="Primary">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `mb-0.5 block rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${isActive ? "bg-sand/90 text-brown-dark dark:bg-brown-dark/70 dark:text-cream" : "text-ink/90 dark:text-sand/90"}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-sand/80 bg-sand/30 px-4 py-4 dark:border-brown-dark/50 dark:bg-brown-dark/25">
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink/80 dark:text-sand/85"
              >
                <MapPin className="h-4 w-4 shrink-0 text-brown" aria-hidden />
                Address &amp; directions
              </Link>
              <a
                href={`tel:${phoneTel}`}
                className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-brown-dark tabular-nums dark:text-cream"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {phoneDisplay}
              </a>
            </div>
            <div className="border-t border-sand/80 p-4 dark:border-brown-dark/50">
              <Link
                to="/booking"
                onClick={onClose}
                className="block rounded-xl bg-brown py-3.5 text-center text-sm font-semibold text-cream shadow-md transition hover:bg-brown-dark"
              >
                Book a trial class
              </Link>
              <div className="mt-4 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={toggle}
                  className="rounded-full p-2.5 text-brown-dark transition hover:bg-sand/80 dark:text-sand dark:hover:bg-brown-dark/50"
                  aria-label={dark ? "Light mode" : "Dark mode"}
                >
                  {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="text-sm font-medium text-ink dark:text-sand"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="text-sm font-semibold text-brown dark:text-sand"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-sand/45 bg-cream/85 shadow-header backdrop-blur-xl dark:border-brown-dark/35 dark:bg-ink/90">
        <div className="mx-auto flex h-16 w-full max-w-none items-center justify-between gap-3 px-4 sm:px-5 md:h-[4.5rem] md:gap-4 lg:gap-6 lg:px-8 xl:px-12 2xl:px-16">
          <Link
            to="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 text-brown-dark dark:text-cream md:gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brown/10 ring-1 ring-brown/15 transition group-hover:bg-brown/15 dark:bg-sand/10 dark:ring-sand/20">
              <Music2 className="h-5 w-5 text-brown dark:text-sand" aria-hidden />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-[1.05rem] font-semibold tracking-display-tight sm:text-lg md:text-xl">
                <span className="lg:hidden">{brandShort}</span>
                <span className="hidden lg:inline">{instituteName}</span>
              </span>
              <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-eyebrow text-brown/70 dark:text-sand/60 sm:block">
                Jaipur
              </span>
            </span>
          </Link>

          <nav
            className="mx-2 hidden min-w-0 flex-1 items-center justify-between gap-1 overflow-x-auto lg:mx-4 lg:flex xl:mx-8 xl:gap-2 2xl:mx-12"
            aria-label="Primary"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"} className={desktopNavClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={`tel:${phoneTel}`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-brown-dark transition hover:bg-sand/60 md:hidden dark:text-cream dark:hover:bg-brown-dark/50"
              aria-label={`Call ${phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="hidden items-center gap-2 rounded-full bg-sand/60 px-3 py-2 text-xs font-semibold tabular-nums text-brown-dark ring-1 ring-sand/80 transition hover:bg-sand hover:ring-sand md:inline-flex dark:bg-brown-dark/40 dark:text-cream dark:ring-brown-dark/50 dark:hover:bg-brown-dark/60"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              {phoneDisplay}
            </a>

            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 text-brown-dark transition hover:bg-sand/70 dark:text-sand dark:hover:bg-brown-dark/50"
              aria-label={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <Sun className="h-[1.35rem] w-[1.35rem]" /> : <Moon className="h-[1.35rem] w-[1.35rem]" />}
            </button>

            {user ? (
              <div className="hidden items-center gap-2 lg:flex">
                <span className="max-w-[7rem] truncate text-xs text-ink/65 dark:text-sand/65">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-brown-dark ring-1 ring-sand/90 transition hover:bg-sand/50 dark:text-sand dark:ring-brown-dark"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-brown-dark ring-1 ring-sand/90 transition hover:bg-sand/50 sm:inline-flex dark:text-sand dark:ring-brown-dark dark:hover:bg-brown-dark/40"
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden />
                Log in
              </Link>
            )}

            <Link
              to="/booking"
              className="hidden rounded-full bg-brown px-4 py-2.5 text-xs font-semibold text-cream shadow-md transition hover:bg-brown-dark hover:shadow-lg sm:inline-flex md:px-5 md:text-sm"
            >
              Book a trial
            </Link>

            <button
              type="button"
              className="-mr-1 rounded-xl p-2.5 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-brown-dark dark:text-cream" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
