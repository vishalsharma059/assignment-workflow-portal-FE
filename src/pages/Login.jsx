import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    const path =
      user.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard";
    return <Navigate to={path} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = await loginUser({ email, password });

      const normalizedData = {
        token: data.token,
        user: {
          name: data.name,
          role: data.role,
        },
      };

      login(normalizedData);

      const path =
        data.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard";
      navigate(path, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="grid w-full max-w-6xl gap-12 md:grid-cols-[1.3fr,1fr] items-center">
        <div className="hidden md:flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-4 py-1 text-xs text-slate-400 w-fit">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Assignment Workflow Platform
          </div>

          <h1 className="text-4xl font-semibold tracking-tight leading-tight">
            A unified platform for
            <span className="text-blue-400"> educators </span>
            and
            <span className="text-emerald-400"> learners</span>
          </h1>

          <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
            Manage assignments, submissions, and reviews through a structured,
            role-based workflow designed for modern academic environments.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-7 sm:p-9 w-full">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Sign in to continue to your dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Email address</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                placeholder="name@organization.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">Password</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <p className="text-xs text-slate-500 text-center pt-3">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
