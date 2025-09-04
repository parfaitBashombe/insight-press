"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/user-data-store";

export type Category = {
  value: string;
  label: string;
};

export type SubmitPostParams = {
  title: string;
  content: string;
  category: Category | null;
  tags: string[];
  coverImage: File | null;
};

export function useAddPostActions() {
  const supabase = createClient();

  const author = useAtomValue(userAtom);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const uploadCoverImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("cover_images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("cover_images")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) throw new Error("Failed to get public URL");

    return data.publicUrl;
  };

  const submitPost = async ({
    title,
    content,
    category,
    tags,
    coverImage,
  }: SubmitPostParams): Promise<void> => {
    if (!author) {
      setErrorMessage("❌ You must be logged in to publish a post.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let coverUrl: string | null = null;

      if (coverImage) {
        coverUrl = await uploadCoverImage(coverImage);
      }

      const { error: dbError } = await supabase.from("posts").insert({
        author_id: author.id,
        author_name: author.user_metadata?.name ?? "",
        author_avatar: author.user_metadata?.avatar_url ?? "",
        title,
        content,
        category: category?.value ?? null,
        tags,
        cover_img: coverUrl,
      });

      if (dbError) throw dbError;

      setSuccessMessage("✅ Post published successfully!");
      setTimeout(() => setSuccessMessage(""), 7000);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        setErrorMessage("❌ Error: " + error.message);
      } else {
        setErrorMessage("❌ An unknown error occurred");
      }

      setTimeout(() => setErrorMessage(""), 7000);
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, errorMessage, submitPost };
}
