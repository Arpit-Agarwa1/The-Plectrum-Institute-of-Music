/**
 * THEME — `plectrum-theme` in localStorage: `"light"` = light, otherwise default **dark**.
 * `class="dark"` on `<html>`. Keep in sync with the inline script in `index.html`
 * (runs before first paint so Tailwind `dark:` works).
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const THEME_STORAGE_KEY = "plectrum-theme";
const CREAM = "#F5F0E6";
const INK = "#2B1A12";

const ThemeContext = createContext(undefined);

/**
 * @returns {boolean} initial dark (matches `index.html` boot script)
 * Default: dark. Stored `"light"` opts out; otherwise dark (including first visit / unset key).
 */
function readInitialDark() {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "light") return false;
    if (v === "dark") return true;
  } catch {
    return true;
  }
  return true;
}

/** Class + metadata only (localStorage is set when the user toggles). */
function applyToDocument(dark) {
  const root = document.documentElement;
  if (dark) root.classList.add("dark");
  else root.classList.remove("dark");
  root.dataset.theme = dark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", dark ? INK : CREAM);
  }
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(readInitialDark);

  useEffect(() => {
    applyToDocument(dark);
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
