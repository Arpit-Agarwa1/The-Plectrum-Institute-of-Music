import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to top when the URL changes (normal website behavior) */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
