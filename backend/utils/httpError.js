/**
 * HTTP errors for services — lets us throw without touching `res` directly.
 * The error middleware reads `statusCode`.
 */

export class HttpError extends Error {
  /**
   * @param {number} statusCode - HTTP status (400, 404, 401, ...)
   * @param {string} message - message for the client
   */
  constructor(statusCode, message) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

export function badRequest(message) {
  return new HttpError(400, message);
}

export function unauthorized(message) {
  return new HttpError(401, message);
}

export function forbidden(message) {
  return new HttpError(403, message);
}

export function notFound(message) {
  return new HttpError(404, message);
}
