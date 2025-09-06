"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import { postsAtom, featuredPostsAtom } from "@/lib/store/post-atoms";
import { Post } from "@/lib/types/post-data";

const supabase = createClient();

export const subscribePostsAtom = atom(null, (get, set) => {
  const subscription = supabase
    .channel("posts-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        const currentPosts = [...get(postsAtom)];
        const currentFeaturedPosts = [...get(featuredPostsAtom)];

        if (payload.eventType === "INSERT") {
          const newPost = payload.new as Post;
          set(postsAtom, [newPost, ...currentPosts]);
          if (newPost.isFeatured) {
            set(featuredPostsAtom, [newPost, ...currentFeaturedPosts]);
          }
        } else if (payload.eventType === "UPDATE") {
          const updatedPost = payload.new as Post;
          set(
            postsAtom,
            currentPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
          );

          if (updatedPost.isFeatured) {
            const postExists = currentFeaturedPosts.some(
              (p) => p.id === updatedPost.id
            );
            if (postExists) {
              set(
                featuredPostsAtom,
                currentFeaturedPosts.map((p) =>
                  p.id === updatedPost.id ? updatedPost : p
                )
              );
            } else {
              set(featuredPostsAtom, [updatedPost, ...currentFeaturedPosts]);
            }
          } else {
            set(
              featuredPostsAtom,
              currentFeaturedPosts.filter((p) => p.id !== updatedPost.id)
            );
          }
        } else if (payload.eventType === "DELETE") {
          const deletedId = payload.old.id;
          set(
            postsAtom,
            currentPosts.filter((p) => p.id !== deletedId)
          );
          set(
            featuredPostsAtom,
            currentFeaturedPosts.filter((p) => p.id !== deletedId)
          );
        }
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
});
