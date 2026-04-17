/**
 * Top contact strip — address + phone; uses Container to align with nav and pages.
 */
import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { Container } from "./Container.jsx";
import {
  addressLines,
  phoneDisplay,
  phoneTel,
} from "../config/siteInfo.js";

export function ContactStrip() {
  const oneLine = addressLines.join(" · ");

  return (
    <div className="relative z-30 border-b border-sand/80 bg-sand/70 dark:border-brown-dark/50 dark:bg-brown-dark/35">
      <Container className="flex flex-col gap-2.5 py-2.5 text-sm text-ink dark:text-sand sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="flex items-start gap-2 text-ink/90 dark:text-cream">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-brown dark:text-sand/90"
            aria-hidden
          />
          <span className="leading-snug">
            <span className="sr-only">Address: </span>
            {oneLine}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:justify-end">
          <a
            href={`tel:${phoneTel}`}
            className="inline-flex items-center gap-1.5 font-semibold text-brown-dark transition-colors hover:text-brown dark:text-cream dark:hover:text-sand"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="tabular-nums">{phoneDisplay}</span>
          </a>
          <Link
            to="/contact"
            className="text-sm font-medium text-brown underline-offset-4 transition-colors hover:text-brown-dark hover:underline dark:text-sand dark:hover:text-cream"
          >
            Contact &amp; directions
          </Link>
        </div>
      </Container>
    </div>
  );
}
