import ContactForm from "@/components/contact/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to InsightPress for questions, feedback, or collaboration on web development, design, and technology topics.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <ContactForm />
    </div>
  );
}
