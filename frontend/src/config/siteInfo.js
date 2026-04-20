/**
 * Institute contact details — edit this file to change phone, address, and email sitewide.
 * (Also set VITE_MAP_EMBED_URL in .env for the Google Map on the Contact page.)
 */

/** Lines shown for the street / area (each string is one line) */
export const addressLines = [
  "F-226, Jan Path",
  "Kishan Nagar, Shyam Nagar",
  "Jaipur, Rajasthan 302019",
];

/** Shown to visitors (tap-to-call uses phoneTel) */
export const phoneDisplay = "082099 09885";

/**
 * Used in tel: links — India mobile +91, digits only after country code
 */
export const phoneTel = "+918209909885";

/** Public contact email — change if you use a different inbox */
export const email = "hello@plectruminstitute.music";

/** Institute legal / marketing name */
export const instituteName = "The Plectrum Institute of Music";

/**
 * Short brand for tight layouts (mobile nav, favicon text).
 * Full `instituteName` is preferred in headers and legal lines.
 */
export const brandShort = "Plectrum Institute";

/** One-line positioning statement for footer and hero-adjacent copy */
export const tagline =
  "Structured music education in Jaipur — guitar, piano, voice, and more for every age and level.";

/**
 * Home hero banner — wide Unsplash URL (auto=format works reliably across browsers).
 * Override with VITE_HERO_IMAGE_URL in frontend/.env if you host your own asset.
 */
export const heroBannerImageUrl =
  import.meta.env.VITE_HERO_IMAGE_URL ||
  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1920&q=80";

/**
 * Google Maps embed (no API key). Update if you move.
 * Override with VITE_MAP_EMBED_URL in .env for a custom embed.
 */
export const mapEmbedUrl =
  import.meta.env.VITE_MAP_EMBED_URL ||
  "https://www.google.com/maps?q=F-226+Jan+Path+Kishan+Nagar+Shyam+Nagar+Jaipur+Rajasthan+302019&hl=en&z=16&output=embed";

/** Same location: open in Google Maps (directions / full place page). */
export const googleMapsOpenUrl =
  import.meta.env.VITE_GOOGLE_MAPS_OPEN_URL ||
  "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "F-226, Jan Path, Kishan Nagar, Shyam Nagar, Jaipur, Rajasthan 302019"
    );

/**
 * Google Business / Maps reviews — use your Place URL from Google Business Profile for best results.
 * Fallback opens Maps search at the address (Reviews tab on the listing when available).
 */
export const googleReviewsUrl =
  import.meta.env.VITE_GOOGLE_REVIEWS_URL ||
  "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "The Plectrum Institute of Music F-226 Jan Path Kishan Nagar Jaipur 302019"
    );
