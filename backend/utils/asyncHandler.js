/**
 * ASYNC HANDLER
 *
 * Route functions are often `async`. If they throw, Express needs `next(err)`.
 * This wrapper catches promise rejections automatically.
 */

export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
