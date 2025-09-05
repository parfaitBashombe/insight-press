"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import { Post } from "../types/post-data";

const supabase = createClient();
const POSTS_PER_PAGE = 6;

// ---------- Atoms ----------

// Global posts
export const postsAtom = atom<Post[]>([]);
export const featuredPostsAtom = atom<Post[]>([]);
export const regularPostsAtom = atom((get) =>
  get(postsAtom).filter((post) => !post.isFeatured)
);

// Pagination & search
export const queryAtom = atom<string>("");
export const pageAtom = atom<number>(1);
export const hasMoreAtom = atom<boolean>(true);
export const loadingAtom = atom<boolean>(false);

// ---------- Fetch paginated posts ----------
export const fetchPostsAtom = atom(
  null,
  async (get, set, reset: boolean = false) => {
    set(loadingAtom, true);

    const query = get(queryAtom);
    const page = get(pageAtom);

    const rangeStart = (page - 1) * POSTS_PER_PAGE;
    const rangeEnd = page * POSTS_PER_PAGE - 1;

    let data: Post[] = [];
    let error = null;

    if (query.trim() === "") {
      // No search → fetch paginated posts
      const { data: allPosts, error: allError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(rangeStart, rangeEnd);

      data = allPosts || [];
      error = allError;
    } else {
      // Search by title/content/author
      const [titleRes, contentRes, authorRes] = await Promise.all([
        supabase
          .from("posts")
          .select("*")
          .ilike("title", `%${query}%`)
          .order("created_at", { ascending: false })
          .range(rangeStart, rangeEnd),

        supabase
          .from("posts")
          .select("*")
          .ilike("content", `%${query}%`)
          .order("created_at", { ascending: false })
          .range(rangeStart, rangeEnd),

        supabase
          .from("posts")
          .select("*")
          .ilike("author_name", `%${query}%`)
          .order("created_at", { ascending: false })
          .range(rangeStart, rangeEnd),
      ]);

      error = titleRes.error || contentRes.error || authorRes.error;
      data = [
        ...(titleRes.data || []),
        ...(contentRes.data || []),
        ...(authorRes.data || []),
      ];

      // Deduplicate
      data = Array.from(new Map(data.map((item) => [item.id, item])).values());
    }

    if (error) {
      console.error(error);
    } else {
      if (reset) {
        set(postsAtom, data);
      } else {
        set(postsAtom, [...get(postsAtom), ...data]);
      }

      set(hasMoreAtom, data.length === POSTS_PER_PAGE);
    }

    set(loadingAtom, false);
  }
);

// ---------- Fetch all featured posts ----------
export const fetchFeaturedPostsAtom = atom(null, async (_get, set) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("isFeatured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured posts:", error);
  } else {
    set(featuredPostsAtom, data || []);
  }
});

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

          // Update featured posts separately
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
            // Remove from featured if updated to non-featured
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
