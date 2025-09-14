import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 py-6 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p className="mb-2">
          © {new Date().getFullYear()} InsightPress. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/news"
            className="text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            News
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
