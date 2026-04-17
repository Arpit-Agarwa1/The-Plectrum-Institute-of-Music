/**
 * HOME — hero, about, courses, teachers, reviews, gallery preview, events, CTA
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { CourseCard } from "../../components/music/CourseCard.jsx";
import { TeacherCard } from "../../components/music/TeacherCard.jsx";
import { StarRating } from "../../components/StarRating.jsx";
import { api } from "../../services/api.js";
import {
  addressLines,
  phoneDisplay,
  phoneTel,
  email as contactEmail,
  instituteName,
  tagline,
  heroBannerImageUrl,
} from "../../config/siteInfo.js";

function formatEventDate(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "Date TBA";
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [c, t, te, ev, g] = await Promise.all([
          api.get("/courses").catch(() => ({ data: { data: [] } })),
          api.get("/teachers").catch(() => ({ data: { data: [] } })),
          api.get("/testimonials").catch(() => ({ data: { data: [] } })),
          api.get("/events").catch(() => ({ data: { data: [] } })),
          api.get("/gallery").catch(() => ({ data: { data: [] } })),
        ]);
        if (!cancelled) {
          setCourses(c.data.data || []);
          setTeachers((t.data.data || []).slice(0, 4));
          setTestimonials((te.data.data || []).slice(0, 3));
          setEvents((ev.data.data || []).slice(0, 2));
          setGallery((g.data.data || []).filter((x) => x.type !== "video" || x.image).slice(0, 6));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{instituteName} | Music lessons in Jaipur</title>
        <meta name="description" content={tagline} />
        <link rel="preload" as="image" href={heroBannerImageUrl} />
      </Helmet>

      {/* Hero — img + cover fills section; gradient keeps headline readable (lighter than before so photo shows) */}
      <section className="relative isolate min-h-[min(85vh,720px)] w-full max-w-none overflow-hidden">
        <img
          src={heroBannerImageUrl}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="absolute inset-0 z-0 block h-full min-h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/70 via-ink/40 to-transparent dark:from-ink/80 dark:via-ink/50 dark:to-ink/20"
          aria-hidden
        />
        <Container className="relative z-10 flex min-h-[min(85vh,720px)] w-full flex-col justify-center py-20 text-cream">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.7 }
            }
            className="max-w-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-sand/95">
              {instituteName}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-display-tight md:text-5xl lg:text-[3.5rem]">
              Serious instruction. A welcoming studio.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-sand/95 md:text-lg">
              Structured lessons in guitar, piano, and voice — taught by
              experienced faculty in Shyam Nagar, Jaipur. Beginners welcome;
              performance pathways for those who want to grow.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-sand"
              >
                Book a trial class
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-cream/55 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:border-cream/80 hover:bg-cream/10"
              >
                View programmes
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        {/* About */}
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brown dark:text-sand/90">
              About us
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-display-tight text-brown-dark dark:text-sand md:text-4xl">
              A calm place to build real skill
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-sand/80">
              Clear curriculum, attentive teaching, and small groups so feedback
              stays personal — musicianship first, not only exercises.
            </p>
            <p className="mt-6 leading-relaxed text-ink/85 dark:text-sand/85">
              Students of all ages join us to learn with structure and care:
              regular performance opportunities, a supportive peer group, and
              faculty who invest in your progress. New to an instrument or
              returning after years away — we will map a path that fits you.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brown transition-colors hover:text-brown-dark dark:text-sand dark:hover:text-cream"
            >
              Our story
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-sand/80 dark:ring-brown-dark/50">
            <img
              src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80"
              alt="Piano keys in warm light at the music institute"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto"
            />
          </div>
        </section>

        {/* Featured courses */}
        <section className="mt-24">
          <SectionTitle
            eyebrow="Programmes"
            title="Featured courses"
            subtitle="From foundations to performance — choose a track that matches your goals."
          />
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
                />
              ))}
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sand/80 bg-sand/20 px-8 py-14 text-center dark:border-brown-dark/50 dark:bg-brown-dark/15">
              <p className="text-ink/80 dark:text-sand/80">
                Programme listings will appear here once the catalogue is live.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-flex rounded-full bg-brown px-4 py-2 text-sm font-semibold text-cream"
              >
                Browse courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course, i) => (
                <CourseCard key={course._id || course.slug} course={course} index={i} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className="inline-flex rounded-full border border-brown px-6 py-2.5 text-sm font-medium text-brown-dark transition hover:bg-sand dark:border-sand dark:text-sand dark:hover:bg-brown-dark"
            >
              View all courses
            </Link>
          </div>
        </section>

        {/* Teachers */}
        <section className="mt-24">
          <SectionTitle
            eyebrow="Faculty"
            title="Our teachers"
            subtitle="Working musicians with a passion for clear, patient instruction."
          />
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-sand/40 p-4 dark:bg-brown-dark/30"
                >
                  <div className="mx-auto h-32 w-32 rounded-full bg-sand/60 dark:bg-brown-dark/50" />
                  <div className="mx-auto mt-4 h-4 w-3/4 rounded bg-sand/60 dark:bg-brown-dark/50" />
                  <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-sand/50 dark:bg-brown-dark/40" />
                </div>
              ))}
            </div>
          ) : teachers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sand/80 bg-sand/20 px-8 py-12 text-center dark:border-brown-dark/50 dark:bg-brown-dark/15">
              <p className="text-ink/80 dark:text-sand/80">
                Faculty profiles are being added. Check back soon or get in touch.
              </p>
              <Link
                to="/teachers"
                className="mt-4 inline-flex text-sm font-semibold text-brown underline-offset-4 hover:underline dark:text-sand"
              >
                Teachers page
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((t, i) => (
                <TeacherCard key={t._id} teacher={t} index={i} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              to="/teachers"
              className="text-sm font-medium text-brown underline-offset-4 hover:underline dark:text-sand"
            >
              Meet the full faculty
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-24 rounded-3xl bg-sand/50 px-6 py-14 dark:bg-brown-dark/25">
          <SectionTitle
            eyebrow="Testimonials"
            title="What students say"
            subtitle="Feedback from learners and families who study with us."
          />
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl bg-cream/80 dark:bg-ink/50"
                />
              ))
            ) : testimonials.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-sand/80 bg-cream/80 px-6 py-10 text-center text-sm text-ink/75 dark:border-brown-dark/50 dark:bg-ink/40 dark:text-sand/75">
                Student stories will show here as reviews come in.
              </p>
            ) : (
              testimonials.map((t, i) => (
                <motion.blockquote
                  key={t._id || i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { duration: 0.45 }
                  }
                  className="rounded-2xl bg-cream p-6 shadow-card dark:bg-ink/60"
                >
                  <StarRating value={t.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-ink/85 dark:text-sand/85">
                    “{t.review}”
                  </p>
                  <footer className="mt-4 text-sm font-medium text-brown-dark dark:text-cream">
                    {t.studentName}
                    <span className="block text-xs font-normal text-ink/60 dark:text-sand/60">
                      {t.course}
                    </span>
                  </footer>
                </motion.blockquote>
              ))
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/testimonials"
              className="text-sm font-medium text-brown dark:text-sand"
            >
              Read all reviews →
            </Link>
          </div>
        </section>

        {/* Gallery preview */}
        <section className="mt-24">
          <SectionTitle
            eyebrow="Studio life"
            title="Gallery"
            subtitle="Lessons, performances, and day-to-day moments at the institute."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
                />
              ))
            ) : gallery.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-sand/80 bg-sand/20 py-12 text-center text-sm text-ink/75 dark:border-brown-dark/50 dark:bg-brown-dark/15 dark:text-sand/75">
                Gallery photos will appear here soon.
              </p>
            ) : (
              gallery.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }
                  }
                  className="aspect-square overflow-hidden rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={
                        item.caption?.trim() ||
                        "Photo from the music institute gallery"
                      }
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex rounded-full bg-brown px-4 py-2 text-sm font-medium text-cream"
            >
              Open gallery
            </Link>
          </div>
        </section>

        {/* Events */}
        <section className="mt-24">
          <SectionTitle
            eyebrow="Calendar"
            title="Upcoming events"
            subtitle="Recitals, workshops, and community evenings — open to enrolled students and guests where noted."
          />
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex animate-pulse gap-4 rounded-2xl border border-sand/60 bg-cream p-4 dark:border-brown-dark/40 dark:bg-brown-dark/20"
                >
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-sand/50 dark:bg-brown-dark/40" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-5 w-2/3 rounded bg-sand/50 dark:bg-brown-dark/40" />
                    <div className="h-3 w-1/3 rounded bg-sand/40 dark:bg-brown-dark/30" />
                    <div className="h-3 w-full rounded bg-sand/40 dark:bg-brown-dark/30" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-sand/80 bg-sand/20 px-6 py-12 text-center text-sm text-ink/75 dark:border-brown-dark/50 dark:bg-brown-dark/15 dark:text-sand/75">
              New recitals and workshops are announced here — follow us or check
              back for dates.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((ev) => (
                <div
                  key={ev._id}
                  className="flex gap-4 rounded-2xl border border-sand/80 bg-cream p-4 dark:border-brown-dark/50 dark:bg-brown-dark/20"
                >
                  {ev.image ? (
                    <img
                      src={ev.image}
                      alt={ev.title ? `Event: ${ev.title}` : "Event"}
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-sand dark:bg-brown-dark">
                      <Calendar className="h-8 w-8 text-brown" aria-hidden />
                    </div>
                  )}
                  <div>
                    <p className="font-display text-lg text-brown-dark dark:text-cream">
                      {ev.title}
                    </p>
                    <p className="text-xs text-brown">
                      {formatEventDate(ev.date)}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/75 dark:text-sand/75">
                      {ev.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Visit us — same details as siteInfo.js (footer + contact page) */}
        <section className="mt-24 rounded-3xl border border-sand/80 bg-cream p-8 shadow-card ring-1 ring-sand/50 dark:border-brown-dark/50 dark:bg-brown-dark/20 dark:ring-brown-dark/50 md:p-10">
          <SectionTitle
            eyebrow="Location"
            title="Visit us in Jaipur"
            subtitle="We are in Shyam Nagar — call or write before you visit if you would like to schedule a tour."
          />
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-center text-ink dark:text-sand">
            <p className="flex items-start justify-center gap-2 text-left text-base">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brown" />
              <span>
                {addressLines.map((line, i) => (
                  <span key={`home-addr-${i}`}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center gap-2 font-semibold text-brown-dark dark:text-cream"
              >
                <Phone className="h-5 w-5" />
                {phoneDisplay}
              </a>
              <span className="text-ink/40 dark:text-sand/40">·</span>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 font-medium text-brown underline-offset-2 hover:underline dark:text-sand"
              >
                <Mail className="h-5 w-5" />
                {contactEmail}
              </a>
            </p>
            <Link
              to="/contact"
              className="mt-2 inline-flex justify-center rounded-full bg-brown px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-brown-dark"
            >
              Contact & directions
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-3xl bg-gradient-to-br from-brown to-brown-dark px-8 py-16 text-center text-cream shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-sand/90">
            Next step
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-display-tight md:text-4xl">
            Start with a trial lesson
          </h2>
          <p className="mx-auto mt-3 max-w-lg leading-relaxed text-sand/95">
            Meet a teacher, see the studio, and discuss your goals — before you
            commit to a term.
          </p>
          <Link
            to="/booking"
            className="mt-8 inline-flex rounded-full bg-cream px-8 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-sand"
          >
            Book a trial class
          </Link>
        </section>
      </Container>
    </>
  );
}
