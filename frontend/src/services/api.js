/**
 * API helper — one Axios instance for all HTTP calls to the Express server.
 *
 * Development: base URL is /api (Vite proxies to the backend — avoids CORS).
 * Production: set VITE_API_URL at build time to your deployed API, e.g. https://api.example.com/api
 */
import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }
  return config;
});
