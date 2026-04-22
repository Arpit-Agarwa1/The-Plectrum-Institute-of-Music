/**
 * FLOATING WHATSAPP BUTTON — set VITE_WHATSAPP_NUMBER in .env
 */
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER || "";
  const number = raw.replace(/\D/g, "");
  if (!number) return null;

  const text = encodeURIComponent(
    "Hi! I would like to book an appointment / ask about classes at Plectrum Institute."
  );
  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft ring-2 ring-ink/10 transition duration-200 ease-smooth hover:scale-105 dark:ring-white/15"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
