import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  FaEnvelope,
  FaXTwitter,
  FaPaperPlane,
  FaCircleCheck,
  FaLocationDot,
  FaStopwatch,
  FaHeadset,
  FaHandshake,
  FaNewspaper,
} from "react-icons/fa6";
import { FaFeatherAlt } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(20, "Message must be at least 20 characters"),
});

type FormState = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success";

const INFO_CARDS = [
  {
    icon: <FaEnvelope size={16} />,
    title: "Email us",
    lines: ["hello@insightpress.io", "support@insightpress.io"],
    accent: "#E8A838",
  },
  {
    icon: <FaStopwatch size={16} />,
    title: "Response time",
    lines: ["General: within 24h", "Verification: within 12h"],
    accent: "#5B8DEF",
  },
  {
    icon: <FaLocationDot size={16} />,
    title: "Based in",
    lines: ["Nairobi, Kenya", "Remote-first team"],
    accent: "#3DBDA7",
  },
  {
    icon: <FaXTwitter size={16} />,
    title: "Social",
    lines: ["@insightpress", "DMs always open"],
    accent: "#E87B5B",
  },
];

const TOPICS = [
  {
    label: "Verification process",
    desc: "Questions about applying and what's reviewed",
    icon: <FaFeatherAlt size={14} className="text-amber-500" />,
  },
  {
    label: "Technical support",
    desc: "Editor issues, login problems, account access",
    icon: <FaHeadset size={14} className="text-amber-500" />,
  },
  {
    label: "Partnerships",
    desc: "Brand collaborations and sponsored content",
    icon: <FaHandshake size={14} className="text-amber-500" />,
  },
  {
    label: "Press & media",
    desc: "Interviews, press kit, and editorial enquiries",
    icon: <FaNewspaper size={14} className="text-amber-500" />,
  },
];

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const result = contactSchema.safeParse(form);
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1800);
  };

  const inputBase =
    "w-full bg-[#F8F6F1] border rounded-xl px-4 py-3.5 text-sm text-[#1A1A1A] placeholder-[#ABABAB] focus:outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-[#E8E4DC] focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10`;
  const inputError = `${inputBase} border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-400/10`;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="bg-[#0C0C0C] pt-24 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We'd love to
            <br />
            hear from you.
          </h1>
          <p className="text-white/40 text-base sm:text-lg max-w-lg">
            Whether you have a question about verification, a partnership idea,
            or just want to say hello — we read every message.
          </p>
        </div>
      </section>

      <div className="bg-[#0C0C0C] px-5 sm:px-6 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white/4 border border-white/8 rounded-2xl p-4 sm:p-5 hover:bg-white/6 transition-colors duration-200"
            >
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                style={{
                  backgroundColor: `${card.accent}22`,
                  color: card.accent,
                }}
              >
                {card.icon}
              </div>
              <h3 className="text-white/80 text-sm font-semibold mb-1.5 sm:mb-2">
                {card.title}
              </h3>
              {card.lines.map((line) => (
                <p key={line} className="text-white/30 text-xs leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main className="bg-[#F8F6F1] px-5 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4 sm:mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What can we help you with?
            </h2>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-7 sm:mb-8">
              Use the form to reach us for any reason. Here are some of the most
              common topics we hear about:
            </p>

            <ul className="space-y-4">
              {TOPICS.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[#1A1A1A] text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-[#9B9B9B] text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10 bg-[#0C0C0C] rounded-2xl p-5 sm:p-6">
              <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-2">
                Fast track
              </p>
              <p className="text-white text-sm leading-relaxed mb-4">
                Ready to apply for author verification? Skip the form and go
                straight to the application.
              </p>
              <Link
                to="/verify-request"
                className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
              >
                Apply now →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
              {status === "success" ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <FaCircleCheck
                      size={24}
                      className="text-green-500 sm:hidden"
                    />
                    <FaCircleCheck
                      size={28}
                      className="text-green-500 hidden sm:block"
                    />
                  </div>
                  <h3
                    className="text-[#1A1A1A] text-xl sm:text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs mx-auto">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-7 sm:mt-8 text-amber-600 text-sm font-medium hover:underline touch-manipulation"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3
                    className="text-[#1A1A1A] text-xl sm:text-2xl font-bold mb-6 sm:mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Send us a message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={errors.name ? inputError : inputNormal}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={errors.email ? inputError : inputNormal}
                        inputMode="email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${errors.subject ? inputError : inputNormal} appearance-none cursor-pointer`}
                    >
                      <option value="">Select a topic…</option>
                      <option value="verification">Verification Process</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Enquiry</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us what's on your mind…"
                      className={`${errors.message ? inputError : inputNormal} resize-none`}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message ? (
                        <p className="text-red-500 text-xs">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[#ABABAB] text-xs">
                        {form.message.length} / 1000
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#0C0C0C] hover:bg-[#1A1A1A] active:scale-[0.98] disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-px text-sm touch-manipulation"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4 text-white"
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
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane size={13} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
