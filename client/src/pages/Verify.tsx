import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  FaPen,
  FaFeatherAlt,
  FaCheckCircle,
  FaArrowRight,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";

const verifySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  reason: z
    .string()
    .min(1, "Please provide a reason")
    .min(20, "Please provide a bit more detail (min 20 chars)"),
});

type VerifyForm = z.infer<typeof verifySchema>;
type FormErrors = Partial<Record<keyof VerifyForm, string>>;
type Status = "idle" | "submitting" | "success";

const VERIFICATION_BENEFITS = [
  "Blue checkmark badge on your profile",
  "Higher visibility in the 'Blogs' feed",
  "Priority editorial review for submissions",
  "Access to advanced reader analytics",
];

const VerifyPage = () => {
  const [form, setForm] = useState<VerifyForm>({
    fullName: "",
    email: "",
    reason: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const result = verifySchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof VerifyForm;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof VerifyForm])
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

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] flex flex-col lg:flex-row"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] shrink-0 flex-col justify-between p-10 xl:p-14 relative overflow-hidden border-r border-white/6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-100 h-100 rounded-full bg-amber-500/5 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

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

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 mb-8">
            <FaFeatherAlt size={11} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase">
              Trust & Authority
            </span>
          </div>
          <h2
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Build trust with
            <br />
            your readers.
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-10 max-w-sm">
            Verification helps distinguish original voices and ensures Insight
            Press remains a community of high-quality journalism.
          </p>

          <ul className="space-y-4">
            {VERIFICATION_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0">
                  <FaCheck size={9} className="text-amber-400" />
                </div>
                <span className="text-white/60 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/20 text-xs relative z-10">
          © {new Date().getFullYear()} Insight Press. Trusted by 2,000+ authors.
        </p>
      </div>

      <div className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-10 lg:py-12 lg:overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-md">
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

          <div className="lg:hidden mb-6 p-4 bg-white/3 border border-white/[0.07] rounded-2xl">
            <div className="inline-flex items-center gap-1.5 mb-3">
              <FaFeatherAlt size={9} className="text-amber-400" />
              <span className="text-amber-400 text-[10px] font-semibold tracking-widest uppercase">
                Trust & Authority
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {VERIFICATION_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-1.5">
                  <FaCheck
                    size={8}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <span className="text-white/45 text-[11px] leading-snug">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
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
                className="text-white text-2xl sm:text-3xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Request Sent!
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-7 sm:mb-8 max-w-xs mx-auto">
                Our editorial team will review your application. You will
                receive an email at{" "}
                <span className="text-white/70 break-all">{form.email}</span>{" "}
                within 48 hours.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 text-sm touch-manipulation"
              >
                Back to Home
                <FaArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <h1
                  className="text-white text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Apply for Verification
                </h1>
                <p className="text-white/40 text-sm">
                  Tell us a bit about yourself and your work.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    className={errors.fullName ? inputError : inputNormal}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Account Email
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

                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 tracking-wide uppercase">
                    Why should you be verified?
                  </label>
                  <textarea
                    name="reason"
                    rows={4}
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="Describe your background, expertise, or why readers should trust your voice..."
                    className={`${errors.reason ? inputError : inputNormal} resize-none`}
                  />
                  {errors.reason && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.reason}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 bg-white/3 border border-white/6 rounded-xl p-4">
                  <FaInfoCircle
                    size={14}
                    className="text-white/30 shrink-0 mt-0.5"
                  />
                  <p className="text-white/30 text-[11px] leading-relaxed">
                    By submitting, you agree to our Content Guidelines.
                    Misleading information will result in immediate rejection
                    and potential account suspension.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:opacity-60 text-[#0C0C0C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm touch-manipulation"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0C0C0C]/30 border-t-[#0C0C0C] rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
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

export default VerifyPage;
