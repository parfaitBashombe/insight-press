import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/data/posts";
import { ArrowRight, Calendar } from "lucide-react";

type Props = {
  featured: IPost;
};

const FeaturedArticle = ({ featured }: Props) => {
  return (
    <section className="w-full h-full">
      <Link
        href={`/news/${featured.id}`}
        className="group block w-full h-full overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Image */}
          <div className="relative w-full h-56 sm:h-72 md:h-full">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-4">
                {featured.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-snug sm:leading-tight tracking-tight">
                {featured.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-6 max-w-2xl leading-relaxed line-clamp-3">
                {featured.content}
              </p>

              {/* Author & Date */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
                {/* Author */}
                <div className="flex items-center gap-2">
                  {featured.author.avatar && (
                    <div className="w-6 h-6 relative rounded-full overflow-hidden">
                      <Image
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{featured.author.name}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{featured.date}</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                Read Full Story
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FeaturedArticle;
