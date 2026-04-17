import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Container } from "../../components/Container.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Could not register — try another email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Register | The Plectrum Institute of Music</title>
      </Helmet>
      <Container className="py-20">
        <div className="mx-auto max-w-md rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50">
          <h1 className="font-display text-3xl text-brown-dark dark:text-cream">
            Create account
          </h1>
          <p className="mt-2 text-sm text-ink/70 dark:text-sand/70">
            Already have one?{" "}
            <Link to="/login" className="font-medium text-brown">
              Log in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block text-sm">
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
            <label className="block text-sm">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
            <label className="block text-sm">
              Password (min 6 characters)
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sand bg-cream px-4 py-2.5 dark:border-brown-dark dark:bg-ink dark:text-sand"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brown py-3 font-medium text-cream disabled:opacity-60"
            >
              {loading ? "…" : "Register"}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
