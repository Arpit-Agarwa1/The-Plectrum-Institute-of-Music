/**
 * Institute mark — brown (light) / cream (dark) PNGs. **No frame** so transparent
 * “extracted” assets sit directly on the page. Use `logo-brown.png` / `logo-cream.png`
 * with alpha in `public/branding/` for best results; opaque art will show its own edge.
 */
import { brandLogoAlt, brandLogoBrown, brandLogoCream } from "../config/siteInfo.js";
import { clsx } from "clsx";

/** Layout only — no background, border, or shadow */
const wrap = "inline-flex shrink-0 items-center justify-center leading-none";

const imgBase = "w-auto object-contain [image-rendering:auto] select-none";

/**
 * Brown mark on cream/sand: deepen + shadow so the logo stays legible in “day” UI.
 * (Applies to forced light and to the default light-side image; not to cream-on-dark assets.)
 */
const imgBrownOnLight =
  "contrast-120 brightness-[0.68] saturate-115 " +
  "drop-shadow-[0_1px_0_rgba(43,26,18,0.12),0_2px_5px_rgba(43,26,18,0.22)] " +
  "relative z-[1]";

/**
 * @param {object} props
 * @param {"auto" | "light" | "dark"} [props.appearance]
 * @param {"default" | "onDarkBar"} [props.variant]
 * @param {boolean} [props.decorative]
 */
export function BrandingLogo({
  size = "md",
  className = "",
  variant = "default",
  priority = false,
  decorative = false,
  appearance = "auto",
}) {
  const h =
    size === "sm"
      ? "h-7 max-h-7"
      : size === "lockupNav"
        ? "h-9 max-h-9 sm:h-10 sm:max-h-10 md:h-11 md:max-h-11"
        : size === "nav"
          ? "h-8 max-h-8 sm:h-9 sm:max-h-9 md:h-10 md:max-h-10"
          : size === "footer"
            ? "h-14 max-h-14 sm:h-[4.5rem] sm:max-h-[4.5rem]"
            : size === "onDarkBar"
              ? "h-10 max-h-10 sm:h-11 sm:max-h-11"
              : "h-9 max-h-9 sm:h-10 sm:max-h-10";

  const maxW = {
    sm: "max-w-[min(9.5rem,55vw)]",
    lockupNav: "max-w-[min(10.5rem,50vw)] sm:max-w-[10.5rem] md:max-w-[11rem] lg:max-w-[11.5rem]",
    nav: "max-w-[min(260px,72vw)] sm:max-w-[min(300px,50vw)] lg:max-w-[min(320px,28vw)]",
    md: "max-w-[min(280px,78vw)] sm:max-w-[min(300px,60vw)]",
    footer: "max-w-[min(380px,90vw)] sm:max-w-[min(460px,80vw)]",
    onDarkBar: "max-w-[min(340px,90vw)] sm:max-w-[min(380px,82vw)]",
  };

  const imgSizeMap =
    size === "sm"
      ? "sm"
      : size === "lockupNav"
        ? "lockupNav"
        : size === "nav"
          ? "nav"
          : size === "footer"
            ? "footer"
            : size === "onDarkBar"
              ? "onDarkBar"
              : "md";
  const maxWClass = maxW[imgSizeMap] ?? maxW.md;

  const a11y = decorative
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": brandLogoAlt };

  if (variant === "onDarkBar") {
    return (
      <span {...a11y} className={clsx(wrap, className)}>
        <img
          src={brandLogoCream}
          alt=""
          width={400}
          height={160}
          className={clsx(imgBase, "object-center", maxWClass, h)}
          decoding="async"
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </span>
    );
  }

  if (appearance === "light") {
    return (
      <span
        {...a11y}
        className={clsx(
          wrap,
          "min-h-8 min-w-8 [isolation:isolate] sm:min-h-9 sm:min-w-9",
          className
        )}
      >
        <img
          src={brandLogoBrown}
          alt=""
          width={400}
          height={160}
          className={clsx(imgBase, "object-left", imgBrownOnLight, maxWClass, h)}
          decoding="async"
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </span>
    );
  }
  if (appearance === "dark") {
    return (
      <span {...a11y} className={clsx(wrap, className)}>
        <img
          src={brandLogoCream}
          alt=""
          width={400}
          height={160}
          className={clsx(imgBase, "object-left", maxWClass, h)}
          decoding="async"
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </span>
    );
  }

  return (
    <span {...a11y} className={clsx(wrap, className)}>
      <img
        src={brandLogoBrown}
        alt=""
        width={400}
        height={160}
        className={clsx(
          imgBase,
          "object-left",
          imgBrownOnLight,
          maxWClass,
          h,
          "dark:hidden"
        )}
        decoding="async"
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <img
        src={brandLogoCream}
        alt=""
        width={400}
        height={160}
        className={clsx(imgBase, "hidden object-left", maxWClass, h, "dark:block")}
        decoding="async"
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        aria-hidden
      />
    </span>
  );
}
