/**
 * MAIN ENTRY — React mounts <App /> into the div#root in index.html
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToasterThemed } from "./components/ToasterThemed.jsx";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ToasterThemed />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
