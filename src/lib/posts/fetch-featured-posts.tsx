"use client";

import { atom } from "jotai";
import { createClient } from "@/lib/supabase/client";
import { featuredPostsAtom } from "@/lib/store/post-atoms";

const supabase = createClient();

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
