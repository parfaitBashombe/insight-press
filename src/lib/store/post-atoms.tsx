"use client";

import { atom } from "jotai";
import { Post } from "../types/post-data";

// ---------- Base Atoms ----------
export const postsAtom = atom<Post[]>([]);
export const featuredPostsAtom = atom<Post[]>([]);
export const regularPostsAtom = atom((get) =>
  get(postsAtom).filter((post) => !post.isFeatured)
);

// Pagination & search
export const queryAtom = atom<string>("");
export const categoryAtom = atom<string>("");
export const tagsAtom = atom<string[]>([]);
export const featuredOnlyAtom = atom<boolean>(false);
export const pageAtom = atom<number>(1);
export const hasMoreAtom = atom<boolean>(true);
export const loadingAtom = atom<boolean>(false);

// Derived atoms for filtered posts (client-side filtering alternative)
export const filteredPostsAtom = atom((get) => {
  const posts = get(postsAtom);
  const query = get(queryAtom);
  const category = get(categoryAtom);
  const tags = get(tagsAtom);
  const featuredOnly = get(featuredOnlyAtom);

  return posts.filter((post) => {
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author_name.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = !category || post.category === category;
    const matchesTags =
      tags.length === 0 || tags.some((tag) => post.tags?.includes(tag));
    const matchesFeatured = !featuredOnly || post.isFeatured;

    return matchesSearch && matchesCategory && matchesTags && matchesFeatured;
  });
});

export const filteredFeaturedPostsAtom = atom((get) =>
  get(filteredPostsAtom).filter((post) => post.isFeatured)
);

export const filteredRegularPostsAtom = atom((get) =>
  get(filteredPostsAtom).filter((post) => !post.isFeatured)
);
