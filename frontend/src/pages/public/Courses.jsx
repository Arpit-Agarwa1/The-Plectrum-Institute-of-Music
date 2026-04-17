import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { CourseCard } from "../../components/music/CourseCard.jsx";
import { api } from "../../services/api.js";

export function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data.data || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Courses | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Courses
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Guitar, piano, drums, voice, theory, strings — structured paths for
            every level.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle
          title="All programs"
          subtitle="Each course includes guided practice plans and performance goals."
        />
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <CourseCard key={c._id || c.slug} course={c} index={i} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
