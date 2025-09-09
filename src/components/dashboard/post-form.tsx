"use client";

import { useState } from "react";
import { Send, Tag, Image as ImageIcon, X } from "lucide-react";

import { useAddPostActions, Category } from "@/lib/hooks/add-post-action";
import Image from "next/image";
import SelectCategory from "./select-category";
import { cn } from "@/lib/utils";

export const categories: Category[] = [
  { value: "Web Development", label: "Web Development" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Productivity", label: "Productivity" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Open Source", label: "Open Source" },
];

export default function PostForm() {
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

  const handleAddTag = () => {
    if (tagInput.trim() && !values.tags.includes(tagInput.trim())) {
      handleSetTags(tagInput.trim());
      setTagInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await submitPost(values);
      setTagInput("");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-8 h-fit">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Add a Post
      </h2>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 rounded-lg border border-green-200 text-sm md:text-base">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 rounded-lg border border-red-200 text-sm md:text-base">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 md:mb-2 font-semibold text-gray-700 text-sm md:text-base">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Enter a catchy title"
            className="w-full h-10 md:h-12 border border-gray-300 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 md:mb-2 font-semibold text-gray-700 text-sm md:text-base">
            Content (min 100)
          </label>
          <textarea
            value={values.content}
            onChange={handleChange}
            name="content"
            rows={6}
            placeholder="Write your amazing post content here..."
            className="w-full border border-gray-300 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-1 md:mb-2 font-semibold text-gray-700 text-sm md:text-base">
            Cover Image
          </label>
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="file"
              accept="image/*"
              name="coverImage"
              onChange={handleChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="cursor-pointer inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700 text-sm md:text-base"
            >
              <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
              {values.coverImage ? "Change Image" : "Upload Image"}
            </label>
            {previewUrl && (
              <button
                type="button"
                onClick={handleResetImage}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>
          {previewUrl && (
            <div className="min-h-40 md:min-h-60 relative mt-2 md:mt-3">
              <Image
                fill
                src={previewUrl}
                alt="Cover Preview"
                className="rounded-xl border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 md:mb-2 font-semibold text-gray-700 text-sm md:text-base">
            Category
          </label>
          <SelectCategory
            categories={categories}
            value={values.category}
            setValue={handleSetCategory}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 md:mb-2 font-semibold text-gray-700 text-sm md:text-base">
            Tags (min 2)
          </label>
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag and press Enter or click Add"
              className="flex-1 border border-gray-300 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center justify-center gap-1 bg-blue-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
            >
              <Tag className="w-3 h-3 md:w-4 md:h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1 md:gap-2">
            {values.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs md:text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full inline-flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base",
            loading ? "opacity-70 cursor-not-allowed" : ""
          )}
        >
          {loading ? (
            "Publishing..."
          ) : (
            <>
              <Send className="w-4 h-4 md:w-5 md:h-5" /> Publish Post
            </>
          )}
        </button>
      </form>
    </div>
  );
}
