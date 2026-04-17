/**
 * VIEW layer (API) — shapes JSON we send to the browser.
 *
 * In classic MVC, "View" = presentation. For a REST API, that means the JSON shape.
 * Controllers call these helpers so responses stay consistent.
 */

/**
 * Generic success with a `data` payload
 */
export function jsonData(res, data, status = 200) {
  res.status(status).json({ success: true, data });
}

/**
 * Success with only a message (e.g. deleted, subscribed)
 */
export function jsonMessage(res, message, status = 200) {
  res.status(status).json({ success: true, message });
}

/**
 * Login / register response
 */
export function jsonAuth(res, token, userDoc, status = 200) {
  res.status(status).json({
    success: true,
    token,
    user: userDoc,
  });
}

/**
 * Current user profile (no password)
 */
export function jsonUser(res, userDoc) {
  res.json({ success: true, user: userDoc });
}

/**
 * Single URL (e.g. Cloudinary or Stripe checkout)
 */
export function jsonUrl(res, url) {
  res.json({ success: true, url });
}
