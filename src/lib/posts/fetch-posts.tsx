"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import {
  postsAtom,
  pageAtom,
  hasMoreAtom,
  loadingAtom,
  queryAtom,
} from "@/lib/store/post-atoms";

const supabase = createClient();
const POSTS_PER_PAGE = 6;

export const fetchPostsAtom = atom(null, async (get, set, reset = false) => {
  set(loadingAtom, true);

  let page = get(pageAtom);
  if (reset) {
    page = 1;
    set(pageAtom, 1);
  }

  const rangeStart = (page - 1) * POSTS_PER_PAGE;
  const rangeEnd = page * POSTS_PER_PAGE - 1;

  const query = get(queryAtom).toLowerCase(); // get the search term

  let supabaseQuery = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // Apply search filter if query exists
  if (query) {
    supabaseQuery = supabaseQuery.or(
      `title.ilike.%${query}%,content.ilike.%${query}%,author_name.ilike.%${query}%`
    );
  }

  const { data, error } = await supabaseQuery.range(rangeStart, rangeEnd);

  if (error) {
    console.error(error);
    set(loadingAtom, false);
    return;
  }

  const fetchedPosts = data || [];

  if (reset) {
    set(postsAtom, fetchedPosts);
  } else {
    const existingPosts = get(postsAtom);
    const mergedPosts = [...existingPosts, ...fetchedPosts];
    const uniquePosts = Array.from(
      new Map(mergedPosts.map((p) => [p.id, p])).values()
    );
    set(postsAtom, uniquePosts);
  }

  set(hasMoreAtom, fetchedPosts.length === POSTS_PER_PAGE);
  set(loadingAtom, false);
});
