export default function Footer() {
  return (
    <footer className="bg-zinc-50 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} InsightPress. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/news" className="hover:text-blue-600">
            News
          </a>
          <a href="/about" className="hover:text-blue-600">
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
