"use client";

import { useState } from "react";
import { Sparkles, Send, Tag } from "lucide-react";

const categories = [
  "Web Development",
  "UI/UX Design",
  "Artificial Intelligence",
  "Cybersecurity",
  "Productivity",
  "Blockchain",
  "Open Source",
];

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      category,
      tags,
    };

    console.log("New Post:", newPost);
    setTitle("");
    setContent("");
    setCategory(categories[0]);
    setTags([]);
    setTagInput("");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100 sticky top-8 h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a Post</h2>
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
              className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition"
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
                {tag}{" "}
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
          className="w-full inline-flex items-center justify-center gap-2
            bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold
            px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Send className="w-5 h-5" />
          Publish Post
        </button>
      </form>
    </div>
  );
}
