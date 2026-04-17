import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Container } from "../../components/Container.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | The Plectrum Institute of Music</title>
      </Helmet>
      <Container className="py-20">
        <div className="mx-auto max-w-md rounded-2xl bg-cream p-8 shadow-soft ring-1 ring-sand dark:bg-brown-dark/25 dark:ring-brown-dark/50">
          <h1 className="font-display text-3xl text-brown-dark dark:text-cream">
            Student login
          </h1>
          <p className="mt-2 text-sm text-ink/70 dark:text-sand/70">
            New here?{" "}
            <Link to="/register" className="font-medium text-brown">
              Create an account
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              Password
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
              {loading ? "…" : "Log in"}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
