import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowUpRight } from "lucide-react";
import { api } from "../../services/api.js";
import {
  addressLines,
  phoneDisplay,
  phoneTel,
  email as contactEmail,
  instituteName,
  tagline,
} from "../../config/siteInfo.js";

const footerLinks = [
  { to: "/about", label: "Our story" },
  { to: "/courses", label: "Courses" },
  { to: "/teachers", label: "Teachers" },
  { to: "/booking", label: "Book an appointment" },
  { to: "/contact", label: "Contact & map" },
];

/**
 * Editorial footer — asymmetric bands, not a generic four-column grid above a rule.
 */
export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNewsletter(e) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/newsletter", { email: email.trim() });
      toast.success("You’re on the list!");
      setEmail("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Could not subscribe. Try again later.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="mt-16 lg:mt-24">
      {/* Top band — dark, full-bleed within content column */}
      <div className="bg-brown-dark px-4 py-14 text-cream sm:px-8 md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-sand/80">
            Stay in touch
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-display-tight md:text-4xl">
            Notes from the studio
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sand/85">
            Occasional updates on performances, workshops, and new programmes — no
            spam.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email for newsletter
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-h-[48px] flex-1 rounded-xl border border-cream/20 bg-cream/10 px-4 text-sm text-cream placeholder:text-cream/45 focus:border-cream/50 focus:outline-none focus:ring-1 focus:ring-cream/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="min-h-[48px] rounded-xl bg-cream px-6 text-sm font-semibold text-brown-dark transition hover:bg-sand disabled:opacity-60"
            >
              {loading ? "…" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Middle — large type + links row (wraps like a magazine colophon) */}
      <div className="border-x border-sand/60 bg-sand/30 px-4 py-12 dark:border-brown-dark/40 dark:bg-brown-dark/15 sm:px-8 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <p className="font-display text-2xl font-semibold leading-snug text-brown-dark dark:text-cream md:text-3xl">
              {instituteName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/75 dark:text-sand/80">
              {tagline}
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 lg:max-w-md lg:justify-end"
            aria-label="Footer"
          >
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="group inline-flex items-center gap-1 text-sm font-medium text-brown-dark transition hover:text-brown dark:text-sand dark:hover:text-cream"
              >
                {label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom strip — visit + legal */}
      <div className="border border-t-0 border-sand/60 bg-cream px-4 py-8 dark:border-brown-dark/40 dark:bg-ink/80 sm:px-8 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brown dark:text-sand/90">
              Visit
            </p>
            <address className="mt-3 not-italic text-sm leading-relaxed text-ink/85 dark:text-sand/85">
              {addressLines.map((line, i) => (
                <span key={`ft-addr-${i}`}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-sm">
              <a
                href={`tel:${phoneTel}`}
                className="font-semibold text-brown-dark tabular-nums hover:underline dark:text-cream"
              >
                {phoneDisplay}
              </a>
              <span className="mx-2 text-ink/30 dark:text-sand/30">·</span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-ink/85 underline-offset-2 hover:underline dark:text-sand/85"
              >
                {contactEmail}
              </a>
            </p>
          </div>
          <p className="text-xs leading-relaxed text-ink/50 md:max-w-xs md:text-right dark:text-sand/45">
            © {new Date().getFullYear()} {instituteName}. All rights reserved.
            <span className="mt-1 block md:mt-2">Jaipur, Rajasthan, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
