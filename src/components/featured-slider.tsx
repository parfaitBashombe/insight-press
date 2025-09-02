"use client";

import { useEffect, useState } from "react";
import FeaturedArticle from "@/components/featured-article";

type Props = {
  featuredArticles: any[];
};

const FeaturedSlider = ({ featuredArticles }: Props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [featuredArticles.length]);

  useEffect(() => {
    if (featuredArticles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const goToSlide = (index: number) => setCurrent(index);

  if (featuredArticles.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-200">
      <div className="flex transition-transform duration-700 ease-out h-full">
        {featuredArticles.map((post) => (
          <div
            key={post.id}
            className="flex-shrink-0 w-full transition-transform duration-700 ease-out min-h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            <FeaturedArticle featured={post} />
          </div>
        ))}
      </div>

      {featuredArticles.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  index === current ? "w-6 bg-blue-600" : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <span className="sr-only" aria-live="polite">
        Slide {current + 1} of {featuredArticles.length}
      </span>
    </section>
  );
};

export default FeaturedSlider;
