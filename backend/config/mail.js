/**
 * EMAIL (Nodemailer)
 *
 * Sends simple text emails. If SMTP settings are missing, we do not crash —
 * we just log and skip (good for local learning without real email).
 */

import nodemailer from "nodemailer";

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Send a plain-text email. Returns true if sent, false if email is disabled.
 * @param {{ to: string, subject: string, text: string }} options
 */
export async function sendMail({ to, subject, text }) {
  const transport = buildTransport();
  const from = process.env.EMAIL_FROM || "noreply@plectrum.music";

  if (!transport) {
    console.log("[email skipped — no SMTP] Would send to:", to, subject);
    return false;
  }

  await transport.sendMail({ from, to, subject, text });
  return true;
}
