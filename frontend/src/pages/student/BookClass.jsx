import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { api } from "../../services/api.js";

const empty = {
  name: "",
  email: "",
  phone: "",
  course: "",
  instructor: "",
  date: "",
  time: "",
  message: "",
};

export function BookingPage() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.course.trim() ||
      !form.date.trim() ||
      !form.time.trim()
    ) {
      toast.error("Please fill name, email, phone, course, date, and time.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/appointments", form);
      toast.success("Booking request sent! Check your email for confirmation.");
      setForm(empty);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Book a class | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Book a trial or class
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Tell us a little about you — we’ll confirm by email.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle
          title="Appointment form"
          subtitle="We’ll review your request and reply with availability."
        />
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50"
        >
          {["name", "email", "phone"].map((field) => (
            <label key={field} className="mt-4 block text-sm first:mt-0">
              <span className="font-medium capitalize text-brown-dark dark:text-sand">
                {field === "phone" ? "Phone" : field}
              </span>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
          ))}
          <label className="mt-4 block text-sm">
            <span className="font-medium text-brown-dark dark:text-sand">
              Course
            </span>
            <input
              name="course"
              placeholder="e.g. Guitar, Piano"
              value={form.course}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="font-medium text-brown-dark dark:text-sand">
              Preferred instructor (optional)
            </span>
            <input
              name="instructor"
              value={form.instructor}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-brown-dark dark:text-sand">
                Date
              </span>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brown-dark dark:text-sand">
                Time
              </span>
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="font-medium text-brown-dark dark:text-sand">
              Message (optional)
            </span>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 text-ink dark:border-brown-dark dark:bg-ink dark:text-sand"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-brown py-3 font-medium text-cream transition hover:bg-brown-dark disabled:opacity-60"
          >
            {loading ? "Sending…" : "Submit request"}
          </button>
        </form>
      </Container>
    </>
  );
}
