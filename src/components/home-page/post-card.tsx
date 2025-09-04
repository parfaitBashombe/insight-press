"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Post } from "@/lib/types/post-data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatPostDate = (dateString: string) => {
    const date = dayjs(dateString);
    const now = dayjs();

    if (now.diff(date, "day") < 1) {
      return date.fromNow();
    } else {
      return date.format("MMM D, YYYY");
    }
  };

  return (
    <Link
      href={`/news/${post.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
    >
      {/* Post Image */}
      {post.cover_img ? (
        <div className="relative">
          <Image
            src={post.cover_img}
            alt={post.title}
            width={1200}
            height={560}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {post.category || "General"}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Post Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-gray-600 text-base mb-3 flex-grow line-clamp-2">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Read More */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Image
              src={
                post.author_avatar ||
                "https://ik.imagekit.io/zzot6yvyh/Profile_avatar.png?updatedAt=1744066805592"
              }
              alt={post.author_name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-white shadow"
            />
            <div>
              <p className="font-semibold text-gray-800">{post.author_name}</p>
              <p className="text-sm text-gray-500">
                {formatPostDate(post.updated_at || post.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-sm font-medium mr-1">Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
