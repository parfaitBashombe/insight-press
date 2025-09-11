"use client";

import { formatPostDate } from "@/lib/format-date-function";
import { Post } from "@/lib/types/post-data";
import { ArrowRight, Edit2, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AdminPostCardProps {
  isAdmin: boolean;
  post: Post;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PostCard({
  isAdmin,
  post,
  onEdit,
  onDelete,
}: AdminPostCardProps) {
  const router = useRouter();

  const handleOpen = () => {
    router.push(`/news/${post.id}`);
  };

  return (
    <div
      // href={`/news/${post.id}`}
      className="group bg-white cursor-pointer rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="h-56 w-full relative overflow-hidden">
        <Image
          fill
          src={post.cover_img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Category Tag */}
        {post.category && (
          <span
            title={post.category}
            className="absolute top-4 left-4 z-20 px-4 py-2 text-sm font-medium rounded-2xl backdrop-blur-md bg-white/90 text-slate-800 shadow-lg border border-white/50 hover:bg-white transition-colors duration-300"
          >
            <span>{post.category}</span>
          </span>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex space-x-2 z-50">
            <button
              title={post.isFeatured ? "Unfeature Post" : "Feature Post"}
              className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
                post.isFeatured
                  ? "bg-amber-500/90 text-white border-amber-400/50 shadow-lg shadow-amber-500/30"
                  : "bg-white/90 text-slate-600 border-white/50 hover:bg-white hover:text-amber-500"
              }`}
            >
              <Star className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit?.(post.id)}
              title="Edit Post"
              className="p-2.5 rounded-2xl backdrop-blur-md bg-white/90 text-slate-600 border border-white/50 hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(post.id)}
              title="Delete Post"
              className="p-2.5 rounded-2xl backdrop-blur-md bg-white/90 text-slate-600 border border-white/50 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content + Author Section */}
      <div
        onClick={handleOpen}
        className="p-8 flex flex-col justify-between flex-1 relative"
      >
        {/* Post Title & Excerpt */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors duration-200 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Author & Read More - Always at bottom */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={
                  post.author_avatar ||
                  "https://ik.imagekit.io/zzot6yvyh/Profile_avatar.png?updatedAt=1744066805592"
                }
                alt={post.author_name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 shadow-sm group-hover:border-blue-300 transition-colors duration-300"
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-800 text-sm leading-none">
                {post.author_name}
              </p>
              <p className="text-xs text-slate-500 leading-none">
                {formatPostDate(post.updated_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-3 group-hover:translate-x-0">
            <span className="text-sm font-semibold mr-2">Read More</span>
            <div className="p-1.5 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
