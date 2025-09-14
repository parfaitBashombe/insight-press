"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/lib/store/user-data-store";
import { toast } from "sonner";
import {
  contactFormSchema,
  ContactFormData,
} from "@/lib/validators/contact-form";

export default function ContactForm() {
  const userData = useAtomValue(userDataAtom);

  const [formData, setFormData] = useState<ContactFormData>({
    title: "",
    name: "",
    message: "",
    email: userData?.email || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const result = contactFormSchema.safeParse({
      ...formData,
      email: userData?.email || "",
    });

    if (!result.success) {
      const flattened = result.error.flatten().fieldErrors;
      Object.values(flattened).forEach((messages) => {
        messages?.forEach((msg) => toast.error(msg));
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email: userData?.email || "" }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({
          title: "",
          name: "",
          message: "",
          email: userData?.email || "",
        });
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "There was an error sending your message."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Message Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          readOnly
          className="p-3 border rounded-lg bg-gray-100 cursor-not-allowed w-full"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 w-full"
        />

        <button
          type="submit"
          disabled={isSubmitting || !userData?.email}
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {!userData?.email && (
          <p className="text-sm text-red-500 text-center">
            Please log in to use the contact form.
          </p>
        )}
      </form>
    </div>
  );
}
