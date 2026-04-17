/**
 * USER VIEW — turn a Mongoose user document into safe JSON (no password).
 */

/**
 * @param {import("mongoose").Document} userDoc
 */
export function toPublicUser(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role,
  };
}

/** Same shape for /me — works with `.lean()` query results */
export function toPublicProfile(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
