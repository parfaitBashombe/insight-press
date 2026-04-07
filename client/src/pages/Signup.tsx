import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  FaPen,
  FaFeatherAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { signup } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "At least 8 characters required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreed: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success";

const getStrength = (pw: string): { level: number; label: string; color: string } => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  if (score <= 1) return { level: score, label: "Weak", color: "#EF4444" };
  if (score <= 3) return { level: score, label: "Fair", color: "#F59E0B" };
  return { level: score, label: "Strong", color: "#10B981" };
};

const PERKS = [
  "Verified author badge on every post",
  "Built-in audience discovery tools",
  "Personal analytics dashboard",
  "Direct editorial support",
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const strength = getStrength(form.password);

  const validate = (): boolean => {
    const result = signUpSchema.safeParse(form);
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
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerError(null);

    try {
      const res = await signup({
        fullname: form.fullName,
        email: form.email,
        password: form.password,
      });
      setUser(res.data);
      setStatus("success");
      
      const role = res.data.role?.name || "READER";
      const target = role === "ADMIN" ? "/admin" : role === "WRITER" ? "/dashboard" : "/";
      
      setTimeout(() => navigate(target), 1200);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
    }
  };

  const inputBase =
    "w-full bg-white/[0.06] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-white/[0.1] focus:border-amber-400/60 focus:bg-white/[0.09] focus:ring-1 focus:ring-amber-400/20`;
  const inputError = `${inputBase} border-red-400/50 bg-red-500/5 focus:border-red-400/70`;

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] flex flex-col lg:flex-row"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left panel (desktop only) ──────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] shrink-0 flex-col justify-between p-10 xl:p-14 relative overflow-hidden border-r border-white/6">
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
            Insight Press
          </span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          {/* Badge — FaFeatherAlt replaces FaShieldAlt */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 mb-8">
            <FaFeatherAlt size={11} className="text-amber-400" />
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

          {/* Testimonial */}
          <div className="mt-10 xl:mt-12 bg-white/4 border border-white/8 rounded-2xl p-5 xl:p-6">
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              "Getting verified took less than a day. My first post got more
              engagement than anything I'd published elsewhere."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
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

        {/* Footer */}
        <p className="text-white/20 text-xs relative z-10">
          © {new Date().getFullYear()} Insight Press. All rights reserved.
        </p>
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

          {/* Mobile perks strip */}
          <div className="lg:hidden mb-6 p-4 bg-white/3 border border-white/[0.07] rounded-2xl">
            <div className="inline-flex items-center gap-1.5 mb-3">
              <FaFeatherAlt size={9} className="text-amber-400" />
              <span className="text-amber-400 text-[10px] font-semibold tracking-widest uppercase">
                Verified Authors Platform
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-1.5">
                  <FaCheck
                    size={8}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <span className="text-white/45 text-[11px] leading-snug">
                    {perk}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {status === "success" ? (
            /* ── Success ── */
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
                Account created!
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-3 max-w-xs mx-auto">
                We've sent a confirmation email to{" "}
                <span className="text-white/70 break-all">{form.email}</span>.
              </p>
              <p className="text-white/40 text-sm max-w-xs mx-auto mb-8 sm:mb-10">
                Once confirmed, our team will begin reviewing your verification
                application. You'll hear back within 24 hours.
              </p>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 text-sm"
              >
                Go to Sign In
                <FaArrowRight size={12} />
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <div className="mb-6 sm:mb-8">
                <h1
                  className="text-white text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Create your account
                </h1>
                <p className="text-white/40 text-sm mb-4">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
                {serverError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {serverError}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >
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
                      aria-label={showCPw ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1 touch-manipulation"
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
                    <span className="text-white/40 text-sm leading-relaxed select-none">
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

                {/* Verification notice — FaFeatherAlt replaces FaShieldAlt */}
                <div className="flex items-start gap-3 bg-amber-400/8 border border-amber-400/15 rounded-xl px-4 py-3.5">
                  <FaFeatherAlt
                    size={12}
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
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:opacity-60 text-[#0C0C0C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm mt-1 touch-manipulation"
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
