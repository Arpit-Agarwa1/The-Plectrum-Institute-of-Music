/**
 * Catches render errors so a blank screen is replaced with a recovery UI.
 */
import { Component } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary:", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-brown-dark dark:text-cream">
            Something went wrong
          </h1>
          <p className="mt-3 max-w-md text-sm text-ink/75 dark:text-sand/75">
            Please refresh the page or go back to the home page. If this keeps
            happening, contact the institute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-brown px-6 py-2.5 text-sm font-semibold text-cream"
            >
              Refresh
            </button>
            <Link
              to="/"
              className="rounded-full border border-sand px-6 py-2.5 text-sm font-semibold text-brown-dark dark:border-brown-dark dark:text-sand"
            >
              Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
