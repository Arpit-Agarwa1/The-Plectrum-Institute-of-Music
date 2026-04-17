/**
 * STRIPE CONTROLLER (MVC) — thin wrapper around stripeService
 */

import * as stripeService from "../services/stripeService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const url = await stripeService.createDepositCheckoutSession();
  jsonResponse.jsonUrl(res, url);
});

/** Webhook stays a plain async function (needs raw body + raw response) */
export async function stripeWebhook(req, res) {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripeService.constructStripeEvent(req.body, sig);

    if (event.type === "checkout.session.completed") {
      console.log("Payment completed:", event.data.object.id);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
