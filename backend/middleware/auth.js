/**
 * AUTH MIDDLEWARE
 *
 * JWT = JSON Web Token. After login, the client sends:
 *   Authorization: Bearer <token>
 *
 * We verify the token and attach req.user = { id, role } for later handlers.
 */

import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401);
    return next(new Error("Not logged in"));
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing in .env");

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch {
    res.status(401);
    next(new Error("Invalid or expired token"));
  }
}

/** Only users with role "admin" can pass */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    return next(new Error("Admin only"));
  }
  next();
}
