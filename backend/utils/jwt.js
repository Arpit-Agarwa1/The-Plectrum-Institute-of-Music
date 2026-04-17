/**
 * JWT HELPERS — create a signed token after successful login.
 */

import jwt from "jsonwebtoken";

export function signToken(userId, role) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing in .env");

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(
    {
      sub: userId,
      role,
    },
    secret,
    { expiresIn }
  );
}
