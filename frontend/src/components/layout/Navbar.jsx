/**
 * SITE NAVIGATION — Sticky bar uses `useTheme().dark` (not only Tailwind `dark:`) so
 * the header always matches the theme with readable text.
 */
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { Menu, X, Phone, LogIn, MapPin, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { phoneDisplay, phoneTel } from "../../config/siteInfo.js";
import { InstituteLockup } from "../InstituteLockup.jsx";

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

/**
 * @param {object} props
 * @param {boolean} [props.isActive]
 * @param {boolean} [props.dark]
 */
function desktopNavClass({ isActive, dark }) {
  const base =
    "relative shrink-0 whitespace-nowrap border-b-2 px-1.5 py-2.5 text-nav-bar font-medium tracking-wide transition-colors duration-200 xl:px-2 xl:text-sm";
  if (isActive) {
    return dark
      ? clsx(base, "border-cream/90 text-cream")
      : clsx(base, "border-brown text-brown-dark");
  }
  return dark
    ? clsx(
        base,
        "border-transparent text-sand/80 hover:border-white/20 hover:text-cream"
      )
    : clsx(
        base,
        "border-transparent text-ink/70 hover:border-sand hover:text-brown-dark"
      );
}

/**
 * Slide-in panel for small screens.
 */
function MobileMenuDrawer({ open, onClose }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const lockAp = dark ? "dark" : "light";

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
            className={clsx(
              "absolute inset-y-0 right-0 flex w-[min(100vw-2rem,21rem)] flex-col shadow-lg",
              dark
                ? "bg-ink text-cream [box-shadow:0_0_0_1px_rgba(255,255,255,0.08)]"
                : "bg-cream text-ink [box-shadow:0_0_0_1px_rgba(43,26,18,0.06),0_25px_50px_-12px_rgba(43,26,18,0.25)]"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-between gap-2 border-b px-4 py-4",
                dark ? "border-white/10" : "border-sand/80"
              )}
            >
              <div className="min-w-0 flex-1 pr-1">
                <InstituteLockup layout="drawer" appearance={lockAp} />
              </div>
              <button
                type="button"
                onClick={onClose}
                className={clsx(
                  "shrink-0 rounded-full p-2 transition",
                  dark
                    ? "text-cream hover:bg-white/10"
                    : "text-brown-dark hover:bg-sand/80"
                )}
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
                    clsx(
                      "mb-0.5 block rounded-xl px-4 py-3.5 text-body-sm font-medium transition-colors",
                      dark
                        ? isActive
                          ? "bg-white/10 text-cream"
                          : "text-sand/90 hover:bg-white/5"
                        : isActive
                          ? "bg-sand/90 text-brown-dark"
                          : "text-ink/90"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div
              className={clsx(
                "border-t px-4 py-4",
                dark ? "border-white/10 bg-ink/80" : "border-sand/80 bg-sand/30"
              )}
            >
              <Link
                to="/contact"
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm",
                  dark ? "text-sand/90" : "text-ink/80"
                )}
              >
                <MapPin
                  className={clsx("h-4 w-4 shrink-0", dark ? "text-sand" : "text-brown")}
                  aria-hidden
                />
                Address &amp; directions
              </Link>
              <a
                href={`tel:${phoneTel}`}
                className={clsx(
                  "mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold tabular-nums",
                  dark ? "text-cream" : "text-brown-dark"
                )}
              >
                <Phone className="h-4 w-4" aria-hidden />
                {phoneDisplay}
              </a>
            </div>
            <div
              className={clsx("border-t p-4", dark ? "border-white/10" : "border-sand/80")}
            >
              <Link
                to="/booking"
                onClick={onClose}
                className="block rounded-xl bg-brown py-3.5 text-center text-sm font-semibold text-cream shadow-md transition hover:bg-brown-dark"
              >
                Book an appointment
              </Link>
              <div className="mt-4 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={toggle}
                  className={clsx(
                    "rounded-full p-2.5 transition",
                    dark
                      ? "text-cream hover:bg-white/10"
                      : "text-brown-dark hover:bg-sand/80"
                  )}
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
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
                    className={clsx("text-sm font-medium", dark ? "text-sand" : "text-ink")}
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={onClose}
                    className={clsx(
                      "text-sm font-semibold",
                      dark ? "text-cream" : "text-brown"
                    )}
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
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const barAp = dark ? "dark" : "light";

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
      <header
        className={clsx(
          "sticky top-0 z-40 w-full border-b backdrop-blur-md transition-[background-color,box-shadow,border-color,color] duration-200",
          dark
            ? "border-white/10 bg-ink/98 text-cream shadow-header-dark"
            : "border-sand/50 bg-cream/95 text-ink shadow-header"
        )}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-none items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:min-h-[4.5rem] md:gap-4 md:px-5 lg:gap-6 lg:px-8 xl:px-12 2xl:px-16">
          <Link
            to="/"
            className={clsx(
              "group flex min-w-0 max-w-[min(100%,20rem)] shrink-0 items-center outline-none sm:max-w-[min(100%,26rem)] md:max-w-[min(100%,32rem)] focus-visible:ring-2 focus-visible:ring-offset-2 lg:max-w-md xl:max-w-lg",
              dark
                ? "focus-visible:ring-cream/50 focus-visible:ring-offset-ink"
                : "focus-visible:ring-brown/40 focus-visible:ring-offset-cream"
            )}
          >
            <InstituteLockup layout="nav" priority appearance={barAp} />
          </Link>

          <nav
            className="mx-1 hidden min-w-0 flex-1 items-center justify-between gap-1 overflow-x-auto lg:mx-3 lg:flex xl:mx-6 xl:gap-2 2xl:mx-10"
            aria-label="Primary"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={(p) => desktopNavClass({ ...p, dark })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div
            className={clsx("flex shrink-0 items-center gap-1.5 sm:gap-2", dark && "text-cream")}
          >
            <a
              href={`tel:${phoneTel}`}
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full transition md:hidden",
                dark
                  ? "text-cream hover:bg-white/10"
                  : "text-brown-dark hover:bg-sand/60"
              )}
              aria-label={`Call ${phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className={clsx(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tabular-nums ring-1 transition md:inline-flex",
                dark
                  ? "bg-white/10 text-cream ring-white/20 hover:bg-white/15"
                  : "bg-sand/60 text-brown-dark ring-sand/80 hover:bg-sand hover:ring-sand"
              )}
            >
              <Phone className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              {phoneDisplay}
            </a>

            <button
              type="button"
              onClick={toggle}
              className={clsx(
                "rounded-full p-2 transition",
                dark
                  ? "text-cream hover:bg-white/10"
                  : "text-brown-dark hover:bg-sand/70"
              )}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun className="h-[1.35rem] w-[1.35rem]" /> : <Moon className="h-[1.35rem] w-[1.35rem]" />}
            </button>

            {user ? (
              <div className="hidden items-center gap-2 lg:flex">
                <span
                  className={clsx("max-w-[7rem] truncate text-xs", dark ? "text-sand/80" : "text-ink/65")}
                >
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className={clsx(
                    "rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition",
                    dark
                      ? "text-sand ring-white/20 hover:bg-white/10"
                      : "text-brown-dark ring-sand/90 hover:bg-sand/50"
                  )}
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={clsx(
                  "hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ring-1 transition sm:inline-flex",
                  dark
                    ? "text-cream ring-white/20 hover:bg-white/10"
                    : "text-brown-dark ring-sand/90 hover:bg-sand/50"
                )}
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden />
                Log in
              </Link>
            )}

            <Link
              to="/booking"
              className="hidden rounded-full bg-brown px-4 py-2.5 text-xs font-semibold text-cream shadow-md transition hover:bg-brown-dark hover:shadow-lg sm:inline-flex md:px-5 md:text-sm"
            >
              Book appointment
            </Link>

            <button
              type="button"
              className="-mr-1 rounded-xl p-2.5 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu
                className={clsx("h-6 w-6", dark ? "text-cream" : "text-brown-dark")}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
