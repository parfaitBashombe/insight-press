"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/user-data-store";
import {
  submitPostSchema,
  SubmitPostSchema,
} from "../validators/post-validator-schemas";
import { toast } from "sonner";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type Category = {
  value: string;
  label: string;
};

export const useAddPostActions = (
  initialValues?: Partial<SubmitPostSchema>
) => {
  const [values, setValues] = useState<SubmitPostSchema>({
    title: initialValues?.title || "",
    content: initialValues?.content || "",
    coverImage: initialValues?.coverImage || null,
    tags: initialValues?.tags || [],
    category: initialValues?.category || null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const author = useAtomValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = createClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setValues((prev) => ({
      ...prev,
      [name]: name === "coverImage" ? files?.[0] ?? null : value,
    }));

    // Only create object URL if we have a File object, not a string
    if (name === "coverImage" && files && files[0] instanceof File) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleReset = () => {
    setValues({
      title: initialValues?.title || "",
      content: initialValues?.content || "",
      coverImage: initialValues?.coverImage || null,
      tags: initialValues?.tags || [],
      category: initialValues?.category || null,
    });
    handleResetImage();
  };

  const handleSetTags = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleDeleteTag = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSetCategory = (category: string) => {
    setValues((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleResetImage = () => {
    setValues((prev) => ({
      ...prev,
      coverImage: null,
    }));
    setPreviewUrl(null);
  };

  const validate = () => {
    const result = submitPostSchema.safeParse(values);

    if (!result.success) {
      Object.values(result.error.flatten().fieldErrors).map((item, i) =>
        toast.error(item, { id: i })
      );

      return false;
    }

    return true;
  };

  const uploadCoverImage = async (file: File | string): Promise<string> => {
    if (typeof file === "string") {
      return file;
    }

    const sanitizedFileName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.\-_]/g, "");

    const fileName = `${Date.now()}-${sanitizedFileName}`;
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

  const submitPost = async (
    { title, content, category, tags, coverImage }: SubmitPostSchema,
    post_id?: string
  ): Promise<void> => {
    if (!author) {
      toast.warning("You must be logged in to publish a post.");
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

      const upsertData = {
        id: post_id,
        author_id: author.id,
        author_name: author.user_metadata?.name ?? "",
        author_avatar: author.user_metadata?.avatar_url ?? "",
        title,
        content,
        category,
        tags,
        ...(coverUrl ? { cover_img: coverUrl } : {}),
      };

      const { error } = await supabase
        .from("posts")
        .upsert(upsertData, { onConflict: "id" })
        .select()
        .single();

      if (error) throw toast.error(error.message);

      toast.success(
        post_id ? "Post updated successfully!" : "Post published successfully!"
      );
      handleReset();
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }

      setTimeout(() => setErrorMessage(""), 7000);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    successMessage,
    errorMessage,
    submitPost,
    handleChange,
    values,
    validate,
    previewUrl,
    handleResetImage,
    handleSetTags,
    handleDeleteTag,
    handleSetCategory,
  };
};
