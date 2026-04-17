/**
 * PASSWORD HELPERS
 *
 * We never save passwords as plain text. bcrypt turns a password into a "hash"
 * that we can compare later without storing the real password.
 */

import bcrypt from "bcryptjs";

const ROUNDS = 10;

export async function hashPassword(plain) {
  return bcrypt.hash(plain, ROUNDS);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
