"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Check the console for submitted data!");
    setFormData({ title: "", name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>

        <p className="text-gray-600 mb-6 text-center">
          Want to get in touch? Fill out the form below and I will get back to
          you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title / Subject */}
          <input
            type="text"
            name="title"
            placeholder="Message Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
