"use client";

import PostCardCreate from "./post-card-create";
import { posts } from "@/data/posts";

export default function PostList() {
  return (
    <div className="space-y-6 overflow-y-scroll h-[60vh]">
      {posts.map((post) => (
        <PostCardCreate key={post.id} post={post} />
      ))}
    </div>
  );
}
