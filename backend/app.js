/**
 * EXPRESS APP SETUP
 *
 * "Express" is a library that turns incoming HTTP requests into JavaScript function calls.
 * Example: GET /api/courses → run the "list courses" function.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { stripeWebhook } from "./controllers/stripeController.js";
import apiRoutes from "./routes/index.js";

const app = express();

// --- Security headers (API must allow browser calls from Vite on another port) ---
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// --- Logging: print each request in the terminal (useful while learning) ---
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// --- CORS: Vite can be on 5173, 5176, etc. — allow any local dev origin ---
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

function isAllowedDevOrigin(origin) {
  if (!origin) return true;
  return (
    /^http:\/\/localhost(:\d+)?$/.test(origin) ||
    /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (process.env.NODE_ENV === "production") {
        if (!origin || origin === clientUrl) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      }
      // Development: any localhost / 127.0.0.1 port (Vite may use 5173, 5176, …)
      if (!origin || isAllowedDevOrigin(origin) || origin === clientUrl) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- Stripe webhook: needs raw body (must be before express.json) ---
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// --- Parse JSON bodies (most routes) ---
app.use(express.json({ limit: "10mb" }));

// --- API routes (all our /api/... URLs) ---
app.use("/api", apiRoutes);

// --- Swagger API documentation (read-only in browser) ---
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plectrum Institute API",
      version: "1.0.0",
      description: "REST API for courses, bookings, and admin.",
    },
    servers: [{ url: "/api" }],
  },
  apis: ["./routes/*.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- If no route matched, send 404 ---
app.use(notFound);

// --- Last: turn errors into JSON responses ---
app.use(errorHandler);

export default app;
