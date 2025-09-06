"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import {
  postsAtom,
  queryAtom,
  pageAtom,
  hasMoreAtom,
  loadingAtom,
} from "@/lib/store/post-atoms";
import { Post } from "@/lib/types/post-data";

const supabase = createClient();
const POSTS_PER_PAGE = 6;

// ---------- Fetch paginated posts ----------
export const fetchPostsAtom = atom(null, async (get, set, reset = false) => {
  set(loadingAtom, true);

  const query = get(queryAtom);
  const page = get(pageAtom);

  const rangeStart = (page - 1) * POSTS_PER_PAGE;
  const rangeEnd = page * POSTS_PER_PAGE - 1;

  let data: Post[] = [];
  let error = null;

  if (query.trim() === "") {
    const { data: allPosts, error: allError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(rangeStart, rangeEnd);

    data = allPosts || [];
    error = allError;
  } else {
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
});
