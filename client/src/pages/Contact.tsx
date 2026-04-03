import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaXTwitter,
  FaShieldHalved,
  FaPaperPlane,
  FaCircleCheck,
  FaLocationDot,
  FaStopwatch,
  FaHeadset,
  FaHandshake,
  FaNewspaper,
} from "react-icons/fa6";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "submitting" | "success";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
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

  const INFO_CARDS = [
    {
      icon: <FaEnvelope size={16} />,
      title: "Email us",
      lines: ["hello@inscribe.io", "support@inscribe.io"],
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
      lines: ["@inscribeio", "DMs always open"],
      accent: "#E87B5B",
    },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Assuming Navbar and Footer components exist elsewhere */}
      <section className="bg-[#0C0C0C] pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We'd love to
            <br />
            hear from you.
          </h1>
          <p className="text-white/40 text-lg max-w-lg">
            Whether you have a question about verification, a partnership idea,
            or just want to say hello — we read every message.
          </p>
        </div>
      </section>

      <div className="bg-[#0C0C0C] px-6 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.06] transition-colors duration-200"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{
                  backgroundColor: `${card.accent}22`,
                  color: card.accent,
                }}
              >
                {card.icon}
              </div>
              <h3 className="text-white/80 text-sm font-semibold mb-2">
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

      <main className="bg-[#F8F6F1] px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-bold text-[#1A1A1A] mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What can we help you with?
            </h2>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
              Use the form to reach us for any reason. Here are some of the most
              common topics we hear about:
            </p>

            <ul className="space-y-4">
              {[
                {
                  label: "Verification process",
                  desc: "Questions about applying and what's reviewed",
                  icon: <FaShieldHalved size={14} className="text-amber-500" />,
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
              ].map((item) => (
                <li key={item.label} className="flex gap-3">
                  <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[#1A1A1A] text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-[#9B9B9B] text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 bg-[#0C0C0C] rounded-2xl p-6">
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
            <div className="bg-white border border-[#E8E4DC] rounded-3xl p-8 sm:p-10 shadow-sm">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-6">
                    <FaCircleCheck size={28} className="text-green-500" />
                  </div>
                  <h3
                    className="text-[#1A1A1A] text-2xl font-bold mb-3"
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
                    className="mt-8 text-amber-600 text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3
                    className="text-[#1A1A1A] text-2xl font-bold mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Send us a message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${
                        errors.subject ? inputError : inputNormal
                      } appearance-none cursor-pointer`}
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

                  <div className="mb-8">
                    <label className="block text-xs font-semibold text-[#3A3A3A] mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us what's on your mind…"
                      className={`${
                        errors.message ? inputError : inputNormal
                      } resize-none`}
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
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#0C0C0C] hover:bg-[#1A1A1A] disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-px text-sm"
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
