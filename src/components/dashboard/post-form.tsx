"use client";

import { useState } from "react";
import {
  Send,
  Tag,
  Check,
  ChevronsUpDown,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/store/user-store";

type Category = {
  value: string;
  label: string;
};

const categories: Category[] = [
  { value: "web-development", label: "Web Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "productivity", label: "Productivity" },
  { value: "blockchain", label: "Blockchain" },
  { value: "open-source", label: "Open Source" },
];

export default function PostForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(``);
  const [category, setCategory] = useState<Category | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const author = useAtomValue(userAtom);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let coverUrl = null;

      if (coverImage) {
        const fileName = `${Date.now()}-${coverImage.name}`;
        const { error: uploadError } = await supabase.storage
          .from("cover_images")
          .upload(fileName, coverImage);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("cover_images")
          .getPublicUrl(fileName);

        coverUrl = data.publicUrl;
      }

      const { error: dbError } = await supabase.from("posts").insert({
        author_id: author?.id,
        title,
        content,
        category: category?.value,
        tags,
        cover_img: coverUrl,
      });

      if (dbError) throw dbError;

      setSuccessMessage("✅ Post published successfully!");
      setTitle("");
      setContent("");
      setCategory(null);
      setTags([]);
      setTagInput("");
      setCoverImage(null);
      setPreviewUrl(null);

      // Reset success message after 7 seconds
      setTimeout(() => setSuccessMessage(""), 7000);
    } catch (error: any) {
      console.error(error);
      setErrorMessage("❌ Error: " + error.message);

      // Reset error message after 7 seconds
      setTimeout(() => setErrorMessage(""), 7000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100 sticky top-8 h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a Post</h2>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 rounded-lg border border-green-200">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your amazing post content here..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            required
          ></textarea>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Cover Image
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700"
            >
              <ImageIcon className="w-5 h-5" />
              {coverImage ? "Change Image" : "Upload Image"}
            </label>
            {coverImage && (
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setPreviewUrl(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="Cover Preview"
                className="rounded-xl border border-gray-200 max-h-60 object-cover"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full h-12 justify-between border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {category ? category.label : "Select category..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] md:w-[450px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat.value}
                        value={cat.value}
                        onSelect={() => {
                          setCategory(cat);
                          setOpen(false);
                        }}
                      >
                        {cat.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            category?.value === cat.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag and press Enter or click Add"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <Tag className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Display tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
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
            "w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            loading ? "opacity-70 cursor-not-allowed" : ""
          )}
        >
          {loading ? (
            "Publishing..."
          ) : (
            <>
              <Send className="w-5 h-5" /> Publish Post
            </>
          )}
        </button>
      </form>
    </div>
  );
}
