"use client";

import { Post } from "@/lib/types/post-data";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useAtom, useAtomValue } from "jotai";
import { postsAtom } from "@/lib/store/post-atoms";
import { subscribePostsAtom } from "@/lib/posts/suscribe-posts";

interface Props {
  post: Post;
}

export default function PostCardCreate({ post }: Props) {
  const supabase = createClient();

  useAtom(subscribePostsAtom);

  useAtomValue(postsAtom);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Article deleted successfully!");
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100">
      {/* Cover image */}
      <Link
        href={`/news/${post.id}`}
        className="relative w-full h-40 p-2 sm:w-48 sm:h-48 flex-shrink-0"
      >
        <Image
          src={post.cover_img}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 128px, 128px"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
        {/* Title */}
        <Link href={`/news/${post.id}`}>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Content snippet */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mt-1">
          {post.content}
        </p>

        {/* Author */}
        <div className="flex items-center space-x-2 mt-3">
          <div className="relative w-6 h-6 md:w-7 md:h-7">
            <Image
              fill
              src={
                post.author_avatar ||
                "https://ik.imagekit.io/zzot6yvyh/Profile_avatar.png?updatedAt=1744066805592"
              }
              alt="Author"
              className="rounded-full object-cover border border-gray-200"
              sizes="24px"
            />
          </div>
          <span className="text-gray-500 text-xs sm:text-sm font-medium truncate max-w-[120px]">
            By {post.author_name}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 sm:static sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-2 p-2">
        {/* Edit button */}
        {/* <div href={`/create-post?edit=${post.id}`}> */}
        <button
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors shadow-sm"
          aria-label="Edit post"
        >
          <Link href={`/dashboard/${post.id}`}>
            <Edit className="w-5 h-5" />
          </Link>
        </button>
        {/* </Link> */}

        {/* Delete button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base">
                This action cannot be undone. Are you sure you want to
                permanently delete{" "}
                <span className="font-semibold">{post.title}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
              <AlertDialogCancel className="m-0 flex-1 sm:flex-initial">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(post.id)}
                className="bg-red-600 text-white hover:bg-red-700 m-0 flex-1 sm:flex-initial"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
