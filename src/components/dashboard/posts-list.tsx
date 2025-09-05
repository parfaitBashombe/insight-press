"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import PostCardCreate from "./post-card-create";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/user-data-store";
import { Post } from "@/lib/types/post-data";
import PostCardSkeleton from "../skeletons/post-card-dashboard";

export default function PostList() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const author = useAtomValue(userAtom);

  useEffect(() => {
    if (!author?.id) return;

    setLoading(true);

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author_id", author.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } else {
        setPosts(data);
      }

      setLoading(false);
    };

    fetchPosts();

    const subscription = supabase
      .channel(`public:posts:author_id=eq.${author.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: `author_id=eq.${author.id}`,
        },
        (payload) => {
          setPosts((prevPosts) => [payload.new as Post, ...prevPosts]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [author?.id, supabase]);

  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <PostCardSkeleton key={i} />
  ));

  if (loading)
    return (
      <div className="space-y-4 overflow-y-auto h-[60vh] p-2">{skeletons}</div>
    );

  if (!posts.length)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-gray-500">
        <p className="text-lg">No posts found 😔</p>
        <p className="mt-2 text-sm">Start by creating your first post!</p>
      </div>
    );

  return (
    <div className="space-y-4 overflow-y-auto p-2 bg-gray-50 rounded-lg">
      {posts.map((post) => (
        <PostCardCreate key={post.id} post={post} />
      ))}
    </div>
  );
}
