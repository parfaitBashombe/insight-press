import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the Terms and Conditions for InsightPress, including rules for publishing content, updating/deleting posts, and using the platform responsibly.",
};

export default function TermsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to InsightPress! By using this platform, you agree to follow
          these terms and conditions. Please read them carefully before
          publishing content or interacting with the site.
        </p>

        {/* User Responsibilities */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            1. User Responsibilities
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Users can publish posts on InsightPress, and they have the ability
            to update or delete their own content at any time. All posts must be
            original, respectful, and relevant to web development, design, or
            technology. Content outside the supported topics or categories is
            not allowed. Please be mindful of the rules to maintain a respectful
            and valuable platform for everyone.
          </p>
        </section>

        {/* Content Ownership */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            2. Content Ownership
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You retain ownership of your content, but by publishing, you grant
            InsightPress a non-exclusive license to display, share, and promote
            your posts. InsightPress does not claim ownership of your content.
          </p>
        </section>

        {/* Prohibited Actions */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            3. Prohibited Actions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Users may not post content that violates laws, infringes on
            intellectual property, spreads misinformation, or harasses others.
            InsightPress reserves the right to remove any post that contains
            misinformation, harmful content, or violates platform rules.
            Violations may result in content removal, account suspension, or
            permanent bans.
          </p>
        </section>

        {/* Account Termination */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            4. Account Termination
          </h2>
          <p className="text-gray-600 leading-relaxed">
            InsightPress reserves the right to terminate or suspend accounts
            that violate these terms, without prior notice. Users are
            responsible for ensuring compliance with the rules.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            5. Disclaimers
          </h2>
          <p className="text-gray-600 leading-relaxed">
            InsightPress is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee accuracy, reliability, or suitability of
            content. Users access the platform at their own risk.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            InsightPress, its owners, or affiliates are not liable for any
            damages, losses, or issues arising from the use of the platform or
            content published by users.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            7. Modifications
          </h2>
          <p className="text-gray-600 leading-relaxed">
            InsightPress reserves the right to modify or update these terms at
            any time. Users are responsible for reviewing the terms
            periodically.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            8. Governing Law
          </h2>
          <p className="text-gray-600 leading-relaxed">
            These terms are governed by the laws of the country where
            InsightPress operates. Any disputes will be resolved according to
            local legal regulations.
          </p>
        </section>

        <p className="text-gray-600 mt-8">
          For questions or clarifications, visit our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
