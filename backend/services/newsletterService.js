/**
 * NEWSLETTER SERVICE
 */

import { Newsletter } from "../models/Newsletter.js";
import { badRequest } from "../utils/httpError.js";

export async function subscribeEmail(email) {
  if (!email) throw badRequest("Email is required");
  const normalized = email.toLowerCase();

  await Newsletter.findOneAndUpdate(
    { email: normalized },
    { email: normalized },
    { upsert: true, new: true }
  );

  return true;
}
