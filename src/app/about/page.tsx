import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          About InsightPress
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
          InsightPress is my personal project, built entirely by me using{" "}
          <span className="font-semibold text-white bg-black px-1 rounded">
            Next.js
          </span>
          ,{" "}
          <span className="font-semibold text-blue-600 bg-blue-100 px-1 rounded">
            Tailwind CSS
          </span>
          , and{" "}
          <span className="font-semibold text-green-600 bg-green-100 px-1 rounded">
            Supabase
          </span>
          . My goal is to share insightful articles on web development, design,
          and technology trends.
        </p>

        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">My Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            I created InsightPress to provide a simple, clean, and informative
            platform where readers can learn about the latest trends in tech
            without distractions. Every article is written and curated with care
            to provide maximum value.
          </p>
        </section>

        {/* About the Creator */}
        <section className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
            <Image
              src="https://ik.imagekit.io/zzot6yvyh/face.jpeg?updatedAt=1756580263607"
              alt="Me"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold">Parfait MB</h3>
            <p className="text-gray-600 text-sm">Founder & Developer</p>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Me</h2>
          <p className="text-gray-600 mb-2">
            Have questions or suggestions? Reach out to me via{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Page
            </Link>
            .
          </p>
          <p className="text-gray-600">
            Follow me on social media for updates and more tech articles.
          </p>
        </section>
      </div>
    </div>
  );
}
