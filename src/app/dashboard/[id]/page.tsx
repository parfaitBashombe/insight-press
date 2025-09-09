"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import UpdatePostSkeleton from "@/components/skeletons/update-post";
import { useAddPostActions } from "@/lib/hooks/add-post-action";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, X } from "lucide-react";

const UpdatePostPage = () => {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const postId = params.id;

  const [loadingPost, setLoadingPost] = useState(true);
  const [postNotFound, setPostNotFound] = useState(false);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);

  const {
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
  } = useAddPostActions();

  const [tagInput, setTagInput] = useState("");

  // Fetch existing post data
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoadingPost(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error || !data) {
        console.error("Error fetching post:", error);
        setPostNotFound(true);
      } else {
        // Set the existing image URL for preview
        if (data.cover_img) {
          setExistingCoverUrl(data.cover_img);
          // Set coverImage to the URL string
          handleChange({
            target: {
              name: "coverImage",
              value: data.cover_img,
            },
          } as any);
        }

        // Populate useAddPostActions state
        handleSetCategory(data.category ?? "");
        if (Array.isArray(data.tags)) {
          data.tags.forEach((tag: string) => handleSetTags(tag));
        }

        // Populate other fields
        handleChange({ target: { name: "title", value: data.title } } as any);
        handleChange({
          target: { name: "content", value: data.content },
        } as any);
      }

      setLoadingPost(false);
    };

    fetchPost();
  }, [postId, supabase]);

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !values.tags.includes(t)) {
      handleSetTags(t);
      setTagInput("");
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExistingCoverUrl(null);
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const submitData = {
    //   ...values,
    //   coverImage: previewUrl ? values.coverImage : existingCoverUrl,
    // };

    if (!validate()) return;

    await submitPost(values, postId as string);
    console.dir(values);
  };

  if (loadingPost) return <UpdatePostSkeleton />;
  if (postNotFound)
    return <p className="text-center text-gray-600 mt-10">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Update Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover Image Preview + Upload - Updated to match PostForm */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="file"
              accept="image/*"
              name="coverImage"
              onChange={handleCoverChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-gray-700"
            >
              <ImageIcon className="w-4 h-4" />
              {values.coverImage ? "Change Image" : "Upload Image"}
            </label>
            {(previewUrl || existingCoverUrl) && (
              <button
                type="button"
                onClick={() => {
                  handleResetImage();
                  setExistingCoverUrl(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {(previewUrl || existingCoverUrl) && (
            <div className="h-96 w-full relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={previewUrl || existingCoverUrl || ""}
                alt={values.title || "Cover Image"}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
            rows={9}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={values.category ?? ""}
            onChange={(e) => handleSetCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Tags</label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add a tag and press Enter"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {values.tags.length === 0 && (
              <span className="text-sm text-gray-400">No tags yet.</span>
            )}
            {values.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full inline-flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base",
              loading ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>

        {successMessage && (
          <p className="text-green-600 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UpdatePostPage;
