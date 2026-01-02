import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LayoutShell = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
              A
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Assignment Portal
              </h1>
              <p className="text-xs text-slate-400">{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            {user && (
              <>
                <span className="text-slate-300">
                  {user.name} •{" "}
                  <span className="uppercase text-xs bg-slate-800 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs hover:bg-slate-800 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </main>

      <footer className="border-t border-slate-800 text-xs text-slate-500 py-3">
        <div className="mx-auto max-w-6xl px-4 flex justify-between">
          <span>© {new Date().getFullYear()} Assignment Portal</span>
          <span className="hidden sm:inline">
            Built with React, Tailwind & JWT Auth
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LayoutShell;
