import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how InsightPress collects, uses, and protects your personal data while using our platform.",
};

export default function PrivacyPage() {
  return (
    <div className="max-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Your privacy is important to us. This policy explains how InsightPress
          collects, uses, and protects your personal information while you use
          the platform.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect personal information such as your name, email
            address, and any content you publish on InsightPress. This
            information helps us provide a better experience and keep the
            platform safe.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your information is used to manage user accounts, display content,
            communicate updates, and improve the platform. We do not sell your
            personal data to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            3. Data Protection
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement reasonable security measures to protect your data.
            However, no method of transmission over the internet is completely
            secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            4. Third-Party Services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            InsightPress may use third-party services (like Supabase) to manage
            data. These services are bound by privacy standards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            5. Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this privacy policy periodically. Users are encouraged
            to review it occasionally for any changes.
          </p>
        </section>

        <p className="text-gray-600 mt-8">
          For any questions, reach out via our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
