import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { ArrowRight } from "lucide-react";
import { api } from "../../services/api.js";

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog")
      .then((res) => setPosts(res.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Practice tips, listening ideas, and performance notes.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle title="Articles" />
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto grid max-w-3xl gap-6">
            {posts.map((p) => (
              <Link
                key={p._id}
                to={`/blog/${p.slug}`}
                className="group flex gap-4 overflow-hidden rounded-2xl border border-sand/80 bg-cream p-4 transition hover:border-brown dark:border-brown-dark/50 dark:bg-brown-dark/20"
              >
                {p.coverImage ? (
                  <img
                    src={p.coverImage}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-sand dark:bg-brown-dark" />
                )}
                <div>
                  <h2 className="font-display text-xl text-brown-dark group-hover:text-brown dark:text-cream">
                    {p.title}
                  </h2>
                  {p.excerpt ? (
                    <p className="mt-1 line-clamp-2 text-sm text-ink/75 dark:text-sand/75">
                      {p.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-brown">
                    Read
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
