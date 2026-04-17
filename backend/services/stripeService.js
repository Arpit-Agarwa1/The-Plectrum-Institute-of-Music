/**
 * STRIPE SERVICE — optional payments
 */

import Stripe from "stripe";
import { badRequest } from "../utils/httpError.js";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export function isStripeConfigured() {
  return Boolean(stripeSecret);
}

export async function createDepositCheckoutSession() {
  if (!stripeSecret) {
    throw badRequest("Stripe is not configured");
  }
  const stripe = new Stripe(stripeSecret);
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Music course deposit" },
          unit_amount: 2500,
        },
        quantity: 1,
      },
    ],
    success_url: `${clientUrl}/booking?paid=1`,
    cancel_url: `${clientUrl}/booking?canceled=1`,
  });

  return session.url;
}

/**
 * Verify Stripe webhook (raw body required)
 */
export function constructStripeEvent(rawBody, signature) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret || !whSecret) {
    throw new Error("Stripe not configured");
  }
  const sig = Array.isArray(signature) ? signature[0] : signature;
  const stripe = new Stripe(stripeSecret);
  return stripe.webhooks.constructEvent(rawBody, sig, whSecret);
}
