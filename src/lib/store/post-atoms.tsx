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
export const pageAtom = atom<number>(1);
export const hasMoreAtom = atom<boolean>(true);
export const loadingAtom = atom<boolean>(false);
