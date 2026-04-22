/**
 * Toasts that respect light / dark; must render inside {@link ThemeProvider}.
 */
import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext.jsx";

export function ToasterThemed() {
  const { dark } = useTheme();

  return (
    <Toaster
      key={dark ? "dark" : "light"}
      position="bottom-center"
      toastOptions={{
        duration: 4000,
        className: dark
          ? "!bg-ink !text-cream !text-sm !shadow-header-dark"
          : "!bg-cream !text-ink !text-sm !shadow-header",
        style: {
          border: dark
            ? "1px solid rgba(232,220,203,0.12)"
            : "1px solid rgba(43,26,18,0.08)",
        },
      }}
    />
  );
}
