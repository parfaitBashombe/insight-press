import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPen,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

type Status = "idle" | "submitting" | "success";

/* ─────────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────────── */
function getStrength(pw: string): {
  level: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  if (score <= 1) return { level: score, label: "Weak", color: "#EF4444" };
  if (score <= 3) return { level: score, label: "Fair", color: "#F59E0B" };
  return { level: score, label: "Strong", color: "#10B981" };
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const SignUpPage = () => {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");

  const strength = getStrength(form.password);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "At least 8 characters required";
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.agreed) e.agreed = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormState])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2000);
  };

  const inputBase =
    "w-full bg-white/[0.06] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-white/[0.1] focus:border-amber-400/60 focus:bg-white/[0.09] focus:ring-1 focus:ring-amber-400/20`;
  const inputError = `${inputBase} border-red-400/50 bg-red-500/5 focus:border-red-400/70`;

  const PERKS = [
    "Verified author badge on every post",
    "Built-in audience discovery tools",
    "Personal analytics dashboard",
    "Direct editorial support",
  ];

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left panel — brand ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden border-r border-white/6">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-amber-500/8 blur-[100px]" />
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
            Inscribe
          </span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 mb-8">
            <FaShieldAlt size={12} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Verified Authors Platform
            </span>
          </div>
          <h2
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join 2,400+
            <br />
            verified voices.
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-10 max-w-sm">
            Create your account and start the verification process. Most authors
            are approved within 24 hours.
          </p>

          {/* Perks */}
          <ul className="space-y-3.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0">
                  <FaCheck size={9} className="text-amber-400" />
                </div>
                <span className="text-white/60 text-sm">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Testimonial mini */}
          <div className="mt-12 bg-white/4 border border-white/8 rounded-2xl p-6">
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              "Getting verified took less than a day. My first post got more
              engagement than anything I'd published elsewhere."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C]">
                SR
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  Sophie Renault
                </p>
                <p className="text-white/30 text-xs">
                  Tech Blogger & Consultant
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-white/20 text-xs relative z-10">
          © {new Date().getFullYear()} Inscribe. All rights reserved.
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            to="/"
            className="flex lg:hidden items-center gap-2.5 mb-10 group w-fit"
          >
            <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
              <FaPen size={12} className="text-[#0C0C0C]" />
            </span>
            <span
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Inscribe
            </span>
          </Link>

          {status === "success" ? (
            /* ── Success ── */
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle size={36} className="text-green-400" />
              </div>
              <h2
                className="text-white text-3xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Account created!
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-3 max-w-xs mx-auto">
                We've sent a confirmation email to{" "}
                <span className="text-white/70">{form.email}</span>.
              </p>
              <p className="text-white/40 text-sm max-w-xs mx-auto mb-10">
                Once confirmed, our team will begin reviewing your verification
                application. You'll hear back within 24 hours.
              </p>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Go to Sign In
                <FaArrowRight size={12} />
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <div className="mb-8">
                <h1
                  className="text-white text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Create your account
                </h1>
                <p className="text-white/40 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={errors.fullName ? inputError : inputNormal}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.fullName}
                    </p>
                  )}
                </div>

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
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className={`${errors.password ? inputError : inputNormal} pr-11`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.password}
                    </p>
                  )}
                  {/* Strength bar */}
                  {form.password && (
                    <div className="mt-2.5">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor:
                                i <= strength.level
                                  ? strength.color
                                  : "rgba(255,255,255,0.08)",
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strength.color }}>
                        {strength.label} password
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showCPw ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      className={`${errors.confirmPassword ? inputError : inputNormal} pr-11`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCPw(!showCPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showCPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={form.agreed}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          form.agreed
                            ? "bg-amber-400 border-amber-400"
                            : errors.agreed
                              ? "border-red-400/60 bg-red-500/5"
                              : "border-white/20 bg-white/4 group-hover:border-white/40"
                        }`}
                      >
                        {form.agreed && (
                          <FaCheck size={10} className="text-[#0C0C0C]" />
                        )}
                      </div>
                    </div>
                    <span className="text-white/40 text-sm leading-relaxed">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="text-red-400 text-xs mt-1.5 ml-8">
                      {errors.agreed}
                    </p>
                  )}
                </div>

                {/* Verification notice */}
                <div className="flex items-start gap-3 bg-amber-400/8 border border-amber-400/15 rounded-xl px-4 py-3.5">
                  <FaShieldAlt
                    size={13}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <p className="text-white/50 text-xs leading-relaxed">
                    After signup, your account goes through a{" "}
                    <span className="text-white/70 font-medium">
                      brief verification review
                    </span>{" "}
                    before you can publish. This usually takes under 24 hours.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-[#0C0C0C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm mt-2"
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
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
