"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { formatPostDate } from "@/lib/format-date-function";
import PostDetailSkeleton from "@/components/skeletons/post-details";
import { Post } from "@/lib/types/post-data";

interface Props {
  postId: string;
}

export default function PostDetail({ postId }: Props) {
  const supabase = createClient();
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
    <>
      <Head>
        <title>{post.title} | InsightPress</title>
        <meta name="description" content={post.content.slice(0, 160)} />
      </Head>

      <article className="max-w-3xl mx-auto py-10 px-4">
        <div className="h-96 w-full relative">
          <Image
            src={post.cover_img}
            alt={post.title}
            fill
            className="object-cover rounded-lg mb-6"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

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

        <div className="prose prose-gray max-w-none mb-8 whitespace-pre-line">
          {post.content}
        </div>

        <Link
          href="/news"
          className="text-blue-600 font-medium hover:underline"
        >
          ← Back to News
        </Link>
      </article>
    </>
  );
}
