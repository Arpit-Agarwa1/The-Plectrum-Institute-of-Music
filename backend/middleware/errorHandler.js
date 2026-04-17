/**
 * ERROR HANDLING
 *
 * When something goes wrong in a route, we "throw" or call next(err).
 * This middleware turns that into a clean JSON response for the frontend.
 */

export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Prefer explicit status from HttpError (used in services)
  const fromError = typeof err.statusCode === "number" ? err.statusCode : null;
  const fromRes =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : null;
  const status = fromError || fromRes || 500;
  const message = err.message || "Server error";

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
  });
}
