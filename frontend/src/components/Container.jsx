import { clsx } from "clsx";

/**
 * Max-width page gutter — keeps line length and alignment across routes.
 */
export function Container({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 2xl:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
