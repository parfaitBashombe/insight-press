import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Post } from "@/lib/types/post-data";
import { formatPostDate } from "@/lib/format-date-function";

type Props = {
  featured: Post;
};

const FeaturedArticle = ({ featured }: Props) => {
  return (
    <section className="w-full h-full">
      <Link
        href={`/news/${featured.id}`}
        className="group block w-full h-full overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Image Section with Enhanced Effects */}
          <div className="relative w-full h-56 sm:h-72 md:h-full overflow-hidden">
            <Image
              src={featured.cover_img}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />

            {/* Category Tag */}
            <span className="absolute top-4 left-4 z-20 px-4 py-2 text-sm font-medium rounded-2xl backdrop-blur-md bg-white/90 text-slate-800 shadow-lg border border-white/50">
              {featured.category}
            </span>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                {featured.title}
              </h1>
              <p className="text-slate-600 text-base md:text-lg mb-6 max-w-2xl leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
                {featured.content}
              </p>

              {/* Tags */}
              {featured.tags && featured.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author & Date */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={
                        featured.author_avatar ||
                        "https://ik.imagekit.io/zzot6yvyh/Profile_avatar.png?updatedAt=1744066805592"
                      }
                      alt={featured.author_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                    />
                  </div>
                  <span className="font-medium text-slate-800">
                    {featured.author_name}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatPostDate(featured.updated_at || featured.created_at)}
                  </span>
                </div>
              </div>

              {/* Read More CTA */}
              <div className="flex items-center text-blue-600 font-semibold text-base group-hover:text-blue-700 transition-colors duration-300">
                <span className="mr-2">Read Full Story</span>
                <div className="p-1.5 rounded-full bg-blue-50 group-hover:bg-blue-100 group-hover:pr-4 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FeaturedArticle;
