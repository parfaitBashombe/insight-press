"use client";

import { atom } from "jotai";
import { Post } from "../types/post-data";

// ---------- General Posts ----------
export const postsAtom = atom<Post[]>([]); // all fetched posts
export const queryAtom = atom<string>(""); // search term
export const pageAtom = atom<number>(1); // current page
export const hasMoreAtom = atom<boolean>(true); // for infinite scroll
export const loadingAtom = atom<boolean>(false); // loading state

// ---------- Featured Posts ----------
export const featuredPostsAtom = atom<Post[]>([]); // posts with isFeatured = true
