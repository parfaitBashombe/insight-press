"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import PostCardCreate from "./post-card-create";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/user-data-store";
import { Post } from "@/lib/types/post-data";
import PostCardSkeleton from "../skeletons/post-card-dashboard";
import { toast } from "sonner";

export default function PostList() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const author = useAtomValue(userAtom);

  useEffect(() => {
    if (!author?.id) return;

    setLoading(true);

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", author.id)
          .order("created_at", { ascending: false });

        if (error) {
          toast.error(`Error fetching posts: ${error.message}`);
          setPosts([]);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(`Unexpected error fetching posts: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Set up real-time subscription
    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          filter: `author_id=eq.${author.id}`,
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setPosts((currentPosts) => [
                payload.new as Post,
                ...currentPosts,
              ]);
              toast.success("New post created!");
              break;
            case "UPDATE":
              setPosts((currentPosts) =>
                currentPosts.map((post) =>
                  post.id === payload.new.id ? (payload.new as Post) : post
                )
              );
              toast.info("Post updated!");
              break;
            case "DELETE":
              setPosts((currentPosts) =>
                currentPosts.filter((post) => post.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [author?.id, supabase]);

  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <PostCardSkeleton key={i} />
  ));

  if (loading)
    return (
      <div className="space-y-4 overflow-y-auto max-h-[60vh] p-2">
        {skeletons}
      </div>
    );

  if (!posts.length)
    return (
      <div className="flex flex-col justify-center items-center h-[40vh] md:h-[60vh] text-gray-500 p-4 text-center">
        <p className="text-base md:text-lg">No posts found 😔</p>
        <p className="mt-2 text-sm md:text-base">
          Start by creating your first post!
        </p>
      </div>
    );

  return (
    <div className="space-y-4 overflow-y-auto max-h-full p-2 bg-gray-50 rounded-lg">
      {posts.map((post) => (
        <PostCardCreate key={post.id} post={post} />
      ))}
    </div>
  );
}
