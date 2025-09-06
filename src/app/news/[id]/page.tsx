"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Post } from "@/lib/types/post-data";
import PostDetailSkeleton from "@/components/skeletons/post-details";
import Image from "next/image";
import { formatPostDate } from "@/lib/format-date-function";

const Page = () => {
  const supabase = createClient();
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [postId, supabase]);

  if (loading) return <PostDetailSkeleton />;

  if (!post)
    return <p className="text-center text-gray-600 mt-10">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      {/* Featured Image */}
      <div className="h-96 w-full relative">
        <Image
          src={post.cover_img}
          alt={post.title}
          fill
          className="object-cover rounded-lg mb-6"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Author + Date */}
      <div className="flex items-center mb-6">
        <Image
          src={post.author_avatar}
          alt={post.author_name}
          height={40}
          width={40}
          className="rounded-full object-cover mr-3"
        />
        <div>
          <p className="font-medium text-gray-700">{post.author_name}</p>
          <p className="text-sm text-gray-400">
            {formatPostDate(post.updated_at)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none mb-8 whitespace-pre-line">
        {post.content}
      </div>

      {/* Back Link */}
      <Link href="/news" className="text-blue-600 font-medium hover:underline">
        ← Back to News
      </Link>
    </article>
  );
};

export default Page;
