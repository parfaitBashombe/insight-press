import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  FaPen,
  FaFeatherAlt,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { signin } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

// ── Zod schema ──────────────────────────────────────────────────────────────
const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

type FormState = z.infer<typeof signInSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

// ────────────────────────────────────────────────────────────────────────────

const RECENT_POSTS = [
  {
    title: "The Invisible Grid: How Whitespace Shapes Reader Trust",
    author: "Amara Osei",
    initials: "AO",
    color: "#E8A838",
    time: "5 min ago",
  },
  {
    title: "Building for the Long Run: Why Boring Tech Wins",
    author: "James Mwangi",
    initials: "JM",
    color: "#5B8DEF",
    time: "1 hr ago",
  },
  {
    title: "The First Sentence Is Everything",
    author: "Lena Kovač",
    initials: "LK",
    color: "#3DBDA7",
    time: "3 hr ago",
  },
];

const SignInPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    remember: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // ── Validation via Zod ────────────────────────────────────────────────────
  const validate = (): boolean => {
    const result = signInSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormState;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormState])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    
    try {
      const res = await signin({
        email: form.email,
        password: form.password,
      });
      setUser(res.data);
      setStatus("success");

      const role = res.data.role?.name || "READER";
      const target = role === "ADMIN" ? "/admin" : role === "WRITER" ? "/dashboard" : "/";
      
      setTimeout(() => navigate(target), 1200);
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white/[0.06] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-white/[0.1] focus:border-amber-400/60 focus:bg-white/[0.09] focus:ring-1 focus:ring-amber-400/20`;
  const inputError = `${inputBase} border-red-400/50 bg-red-500/5`;

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] flex flex-col lg:flex-row"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left panel (desktop only) ──────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] shrink-0 flex-col justify-between p-10 xl:p-14 relative overflow-hidden border-r border-white/6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-125 h-125 rounded-full bg-blue-500/6 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 relative z-10 w-fit group"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FaPen size={13} className="text-[#0C0C0C]" />
          </span>
          <span
            className="text-white text-xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Insight Press
          </span>
        </Link>

        {/* Recent posts */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-5">
            What you've missed
          </p>
          <h2
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The conversation
            <br />
            never stops.
          </h2>

          <div className="space-y-3">
            {RECENT_POSTS.map((post, i) => (
              <div
                key={post.title}
                className="group bg-white/4 hover:bg-white/[0.07] border border-white/[0.07] rounded-2xl p-4 xl:p-5 transition-all duration-200 cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-3 xl:gap-4">
                  <div
                    className="w-8 h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium leading-snug mb-1.5 line-clamp-2">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <FaFeatherAlt size={9} className="text-amber-400" />
                        <span className="text-white/40 text-xs">
                          {post.author}
                        </span>
                      </div>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/20 text-xs">{post.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2.5">
            <div className="relative w-2.5 h-2.5">
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
              <div className="absolute inset-0 rounded-full bg-green-400" />
            </div>
            <span className="text-white/30 text-xs">
              <span className="text-white/60 font-medium">238 authors</span>{" "}
              online right now
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Insight Press
          </p>
          <Link
            to="/signup"
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            Create account →
          </Link>
        </div>
      </div>

      {/* ── Right panel (form) ───────────────────────────────────────────────── */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-10 lg:py-12 lg:overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile logo */}
          <Link
            to="/"
            className="flex lg:hidden items-center gap-2.5 mb-7 group w-fit"
          >
            <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
              <FaPen size={12} className="text-[#0C0C0C]" />
            </span>
            <span
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Insight Press
            </span>
          </Link>

          {/* ── Mobile recent posts strip ──────────────────────────────────── */}
          <div className="lg:hidden mb-6 p-4 bg-white/3 border border-white/[0.07] rounded-2xl">
            <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase mb-3">
              Latest from the press
            </p>
            <div className="space-y-3">
              {RECENT_POSTS.slice(0, 2).map((post) => (
                <div key={post.title} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/70 text-xs font-medium leading-snug truncate">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FaFeatherAlt
                        size={8}
                        className="text-amber-400 shrink-0"
                      />
                      <span className="text-white/35 text-[10px] truncate">
                        {post.author}
                      </span>
                      <span className="text-white/20 text-[10px] shrink-0">
                        · {post.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FaCheckCircle size={28} className="text-green-400 sm:hidden" />
                <FaCheckCircle
                  size={36}
                  className="text-green-400 hidden sm:block"
                />
              </div>
              <h2
                className="text-white text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Welcome back!
              </h2>
              <p className="text-white/40 text-sm mb-7 sm:mb-8">
                You've signed in as{" "}
                <span className="text-white/70 break-all">{form.email}</span>
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Go to Dashboard
                <FaArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h1
                  className="text-white text-2xl sm:text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sign in to Insight Press
                </h1>
              </div>

              {status === "error" && (
                <div className="mb-5 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3.5">
                  <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <p className="text-red-400 text-sm">
                    Incorrect email or password. Please try again.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? inputError : inputNormal}
                    autoComplete="email"
                    inputMode="email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Your password"
                      className={`${errors.password ? inputError : inputNormal} pr-11`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1 touch-manipulation"
                    >
                      {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                        form.remember
                          ? "bg-amber-400 border-amber-400"
                          : "border-white/20 bg-white/4 group-hover:border-white/40"
                      }`}
                    >
                      {form.remember && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="#0C0C0C"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white/40 text-sm select-none">
                    Keep me signed in for 30 days
                  </span>
                </label>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.07]" />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:opacity-60 text-[#0C0C0C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm touch-manipulation"
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight size={13} />
                    </>
                  )}
                </button>

                <p className="text-center text-white/20 text-xs pt-1">
                  Having trouble?{" "}
                  <Link
                    to="/contact"
                    className="text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
                  >
                    Contact support
                  </Link>
                </p>
              </form>

              {/* Signup CTA */}
              <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-white/6 text-center">
                <p className="text-white/25 text-sm mb-4">
                  New to Insight Press?
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 border border-white/12 hover:border-white/25 text-white/60 hover:text-white font-medium px-6 py-3 rounded-full transition-all duration-200 text-sm hover:bg-white/4 touch-manipulation"
                >
                  Create a free account
                  <FaArrowRight size={11} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
