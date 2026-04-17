/**
 * OPTIONAL AUTH — if a Bearer token is present and valid, set req.user.
 * If missing or invalid, we continue without logging in (no error).
 * Used for public booking: link booking to account only when user is logged in.
 */

import jwt from "jsonwebtoken";

export function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next();
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return next();
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.sub, role: decoded.role };
  } catch {
    // ignore bad token for optional routes
  }
  next();
}
