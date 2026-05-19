import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaFeatherAlt } from "react-icons/fa";
import { FaTag, FaXmark, FaFloppyDisk, FaPaperPlane } from "react-icons/fa6";
import { quillModules, quillFormats } from "@/components/dashboard/mock-data";

interface Props {
  onPublish: () => void;
  onSaveDraft: () => void;
}

export const NewPostView = ({ onPublish, onSaveDraft }: Props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const wordCount = postContent
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() && tags.length < 5) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Post title…"
          className="w-full bg-transparent border-none outline-none text-white text-2xl sm:text-3xl font-bold placeholder-white/15 font-playfair"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 bg-white/6 border border-white/10 text-white/50 text-xs px-3 py-1 rounded-full"
          >
            <FaTag size={8} className="text-amber-400" />
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-white/30 hover:text-white/60 ml-0.5"
            >
              <FaXmark size={9} />
            </button>
          </span>
        ))}
        {tags.length < 5 && (
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag… (press Enter)"
            className="bg-transparent outline-none text-white/40 text-xs placeholder-white/20 min-w-32"
          />
        )}
      </div>

      <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/3">
        <ReactQuill
          theme="snow"
          value={postContent}
          onChange={setPostContent}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Begin writing your story…"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-white/25 text-xs">
          <FaFeatherAlt size={10} className="text-amber-400/50" />
          <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
          {wordCount > 0 && (
            <>
              <span>·</span>
              <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSaveDraft}
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 font-medium px-4 py-2.5 rounded-full text-xs transition-all duration-200"
          >
            <FaFloppyDisk size={11} />
            <span className="hidden sm:inline">Save draft</span>
          </button>
          <button
            onClick={onPublish}
            disabled={!postTitle.trim() || !postContent.trim()}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
          >
            <FaPaperPlane size={11} />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
