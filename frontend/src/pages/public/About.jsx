import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { Music, Heart, Users, Building2 } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Our story
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Founded on a love for acoustic beauty and patient teaching, Plectrum
            grew from a small studio into a full institute — without losing the
            warmth of a family-run school.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <section>
          <SectionTitle
            title="Mission & vision"
            subtitle="We believe everyone deserves access to serious musical training in a supportive environment."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50">
              <Heart className="h-8 w-8 text-brown" />
              <h3 className="mt-4 font-display text-xl text-brown-dark dark:text-cream">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-sand/80">
                To nurture musicianship through structured lessons, performance
                opportunities, and honest encouragement — so students leave
                every week sounding better than before.
              </p>
            </div>
            <div className="rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50">
              <Music className="h-8 w-8 text-brown" />
              <h3 className="mt-4 font-display text-xl text-brown-dark dark:text-cream">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-sand/80">
                A community where classical craft and contemporary repertoire
                coexist — where students of all ages feel proud to share music
                with others.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle
            title="Why choose us"
            subtitle="Thoughtful curriculum, beautiful spaces, and teachers who care."
          />
          <ul className="mx-auto mt-8 max-w-3xl space-y-4 text-ink/85 dark:text-sand/85">
            <li className="flex gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
              <span>
                Small class sizes and one-to-one attention for faster progress.
              </span>
            </li>
            <li className="flex gap-3">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
              <span>
                Sound-treated studios, quality instruments, and a calm reception
                area for parents.
              </span>
            </li>
            <li className="flex gap-3">
              <Music className="mt-0.5 h-5 w-5 shrink-0 text-brown" />
              <span>
                Performance nights, ensemble work, and optional theory labs.
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-20">
          <SectionTitle title="Facilities" />
          <p className="mx-auto max-w-3xl text-center text-ink/80 dark:text-sand/80">
            Multiple lesson rooms, a small recital hall, practice pods, and a
            lending library of sheet music. Ask us for a tour when you book
            your trial.
          </p>
        </section>
      </Container>
    </>
  );
}
