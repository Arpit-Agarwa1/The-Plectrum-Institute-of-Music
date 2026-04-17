import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { StarRating } from "../../components/StarRating.jsx";
import { api } from "../../services/api.js";

export function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Student Reviews | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Testimonials
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Honest words from students and parents.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle title="Reviews" />
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto grid max-w-3xl gap-6">
            {items.map((t) => (
              <article
                key={t._id}
                className="rounded-2xl border border-sand/80 bg-cream p-6 dark:border-brown-dark/50 dark:bg-brown-dark/20"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <StarRating value={t.rating} />
                      <p className="mt-3 leading-relaxed text-ink/85 dark:text-sand/85">
                        “{t.review}”
                      </p>
                      <p className="mt-3 font-medium text-brown-dark dark:text-cream">
                        {t.studentName}
                      </p>
                      <p className="text-sm text-ink/60 dark:text-sand/60">
                        {t.course}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
