import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { TeacherCard } from "../../components/music/TeacherCard.jsx";
import { api } from "../../services/api.js";

export function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/teachers")
      .then((res) => setTeachers(res.data.data || []))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Teachers | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Our faculty
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Performers, educators, and mentors — here to guide your musical
            journey.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle title="Meet our instructors" />
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((t, i) => (
              <TeacherCard key={t._id} teacher={t} index={i} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
