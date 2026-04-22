/**
 * Official mark + full institute name. Logo is decorative when a visible title
 * is shown so screen readers do not get duplicate “logo” and “The … Institute …”
 */
import { clsx } from "clsx";
import { instituteName } from "../config/siteInfo.js";
import { BrandingLogo } from "./BrandingLogo.jsx";

/**
 * @param {object} props
 * @param {"nav" | "footer" | "drawer"} [props.layout]
 * @param {string} [props.className] — on the outer block
 * @param {string} [props.logoClassName] — passed to {@link BrandingLogo}
 * @param {boolean} [props.priority] — eager load for the header
 * @param {"auto" | "light" | "dark"} [props.appearance] — pass `useTheme().dark` as `light` / `dark` in nav
 */
export function InstituteLockup({
  layout = "nav",
  className = "",
  logoClassName = "",
  priority = false,
  appearance = "auto",
}) {
  const isNav = layout === "nav";
  const isFooter = layout === "footer";
  const isDrawer = layout === "drawer";
  const ap = appearance;
  // Day (nav + drawer in light): ink for crisp contrast; warm cream in forced dark; footer keeps auto
  const titleClass = clsx(
    ap === "auto" && "text-brown-dark dark:text-cream",
    ap === "light" && (isNav ? "text-ink" : "text-brown-dark"),
    ap === "dark" && "text-cream"
  );

  return (
    <div
      className={clsx(
        "min-w-0",
        isNav && "flex max-w-full items-center gap-2.5 sm:gap-2.5 md:gap-3.5",
        isFooter && "mb-1 flex max-w-2xl flex-col gap-3 sm:mb-2 sm:flex-row sm:items-end sm:gap-4",
        isDrawer &&
          "flex w-full min-w-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-2.5",
        className
      )}
    >
      <BrandingLogo
        size={isFooter ? "footer" : isNav ? "lockupNav" : "md"}
        appearance={isFooter ? "auto" : ap}
        decorative
        priority={priority}
        className={clsx(
          "shrink-0",
          isNav && "max-w-[6.5rem] sm:max-w-[7.5rem] md:max-w-[8.25rem] lg:max-w-[8.75rem]",
          isDrawer && "max-w-[8.25rem] sm:max-w-[8.75rem]",
          logoClassName
        )}
      />
      <p
        className={clsx(
          "min-w-0 text-left font-display font-semibold leading-tight",
          titleClass,
          isNav &&
            "self-center text-xs leading-tight sm:text-sm md:max-w-[20rem] md:text-sm lg:max-w-[24rem] lg:text-sm xl:max-w-none xl:text-base",
          isFooter && "text-xl leading-snug sm:text-2xl md:text-title-lg lg:max-w-lg",
          isDrawer && "text-left text-sm leading-tight [overflow-wrap:break-word] sm:pr-2"
        )}
      >
        {instituteName}
      </p>
    </div>
  );
}
