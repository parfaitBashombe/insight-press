"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import { postsAtom, featuredPostsAtom } from "@/lib/store/post-atoms";
import { Post } from "@/lib/types/post-data";

const supabase = createClient();

// ---------- Real-time subscription ----------
export const subscribePostsAtom = atom(null, (get, set) => {
  const subscription = supabase
    .channel("public:posts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      (payload) => {
        const posts = get(postsAtom);
        const featuredPosts = get(featuredPostsAtom);

        if (payload.eventType === "INSERT") {
          const newPost = payload.new as Post;
          set(postsAtom, [newPost, ...posts]);

          if (newPost.isFeatured) {
            set(featuredPostsAtom, [newPost, ...featuredPosts]);
          }
        } else if (payload.eventType === "UPDATE") {
          const updatedPost = payload.new as Post;

          set(
            postsAtom,
            posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
          );

          if (updatedPost.isFeatured) {
            set(
              featuredPostsAtom,
              featuredPosts.some((p) => p.id === updatedPost.id)
                ? featuredPosts.map((p) =>
                    p.id === updatedPost.id ? updatedPost : p
                  )
                : [updatedPost, ...featuredPosts]
            );
          } else {
            set(
              featuredPostsAtom,
              featuredPosts.filter((p) => p.id !== updatedPost.id)
            );
          }
        } else if (payload.eventType === "DELETE") {
          const deletedId = payload.old.id;
          set(
            postsAtom,
            posts.filter((p) => p.id !== deletedId)
          );
          set(
            featuredPostsAtom,
            featuredPosts.filter((p) => p.id !== deletedId)
          );
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
});
