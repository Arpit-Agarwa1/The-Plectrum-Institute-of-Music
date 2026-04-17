import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container.jsx";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Container className="py-32 text-center">
        <p className="font-display text-6xl text-brown-dark dark:text-cream">
          404
        </p>
        <h1 className="mt-4 text-xl text-ink/80 dark:text-sand/80">
          This page doesn’t exist.
        </h1>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-brown px-6 py-2.5 text-cream"
        >
          Go home
        </Link>
      </Container>
    </>
  );
}
