import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Instagram,
  Youtube,
} from "lucide-react";
import {
  addressLines,
  phoneDisplay,
  phoneTel,
  email as contactEmail,
  mapEmbedUrl,
  googleMapsOpenUrl,
  youtubeChannelUrl,
  instagramUrl,
} from "../../config/siteInfo.js";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields.");
      return;
    }
    setSending(true);
    // Demo: no contact endpoint yet — feels like a real submit
    setTimeout(() => {
      toast.success("Thanks! We’ll reply within 1–2 business days.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 600);
  }

  return (
    <>
      <Helmet>
        <title>Contact | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Contact
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Visit us, call, or send a message — we’d love to hear from you.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title="Get in touch" />
            <ul className="mt-8 space-y-4 text-base text-ink dark:text-sand">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                <span>
                  {addressLines.map((line, i) => (
                    <span key={`addr-${i}`}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                <a href={`tel:${phoneTel}`} className="hover:text-brown">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-brown"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex gap-3">
                <Youtube className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-brown"
                >
                  YouTube
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                </a>
              </li>
              <li className="flex gap-3">
                <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-brown"
                >
                  Instagram
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm font-medium text-brown dark:text-sand">
              Google Maps
            </p>
            <div className="mt-2 aspect-video overflow-hidden rounded-2xl ring-1 ring-sand dark:ring-brown-dark">
              <iframe
                title="Map — The Plectrum Institute of Music, Jaipur"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={googleMapsOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brown transition hover:text-brown-dark dark:text-sand dark:hover:text-cream"
            >
              Open in Google Maps
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50"
            >
              <label className="block text-sm font-medium text-brown-dark dark:text-sand">
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-brown-dark dark:text-sand">
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-brown-dark dark:text-sand">
                Message
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 w-full rounded-xl bg-brown py-3 font-medium text-cream transition hover:bg-brown-dark disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
