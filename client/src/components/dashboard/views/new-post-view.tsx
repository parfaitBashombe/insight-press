/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaFeatherAlt } from "react-icons/fa";
import { FaFloppyDisk, FaPaperPlane, FaImage, FaXmark } from "react-icons/fa6";
import { quillFormats } from "@/components/dashboard/mock-data";
import { createArticle, updateArticle, publishArticle } from "@/lib/api/writer";
import { ImageUploadModal } from "@/components/dashboard/image-upload-modal";
import type { Article } from "@/types/writer";

interface Props {
  editingArticle?: Article | null;
  onPublish: () => void;
  onSaveDraft: () => void;
}

type ModalTarget = "cover" | "content";

export const NewPostView = ({
  editingArticle,
  onPublish,
  onSaveDraft,
}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverPreviewError, setCoverPreviewError] = useState(false);
  const [savedArticleId, setSavedArticleId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalTarget, setImageModalTarget] =
    useState<ModalTarget>("cover");
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title);
      setContent(editingArticle.content);
      setSavedArticleId(editingArticle.article_id);
      setCoverImage(editingArticle.cover_image ?? "");
      setCoverPreviewError(false);
    } else {
      setTitle("");
      setContent("");
      setCoverImage("");
      setSavedArticleId(null);
      setCoverPreviewError(false);
    }
    setError(null);
  }, [editingArticle?.article_id]);

  const openModal = (target: ModalTarget) => {
    setImageModalTarget(target);
    setImageModalOpen(true);
  };

  const handleModalApply = (url: string) => {
    if (imageModalTarget === "cover") {
      setCoverImage(url);
      setCoverPreviewError(false);
    } else {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1, 0);
      }
    }
  };

  // Custom quill modules with image handler bound to component state
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: () => openModal("content"),
        },
      },
    }),
    [],
  );

  const wordCount = content
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const persistDraft = async (): Promise<string | null> => {
    const payload = {
      title,
      content,
      ...(coverImage ? { cover_image: coverImage } : {}),
    };
    const articleId = savedArticleId;
    if (articleId) {
      await updateArticle(articleId, payload);
      return articleId;
    }
    const res = await createArticle(payload);
    const newId = res.data.article_id;
    setSavedArticleId(newId);
    return newId;
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await persistDraft();
      onSaveDraft();
    } catch {
      setError("Failed to save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return;
    setPublishing(true);
    setError(null);
    try {
      const articleId = await persistDraft();
      if (articleId) {
        await publishArticle(articleId);
        onPublish();
      }
    } catch {
      setError("Failed to publish. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {imageModalOpen && (
        <ImageUploadModal
          onApply={handleModalApply}
          onClose={() => setImageModalOpen(false)}
        />
      )}

      {/* Cover image preview */}
      {coverImage && !coverPreviewError && (
        <div className="relative group rounded-2xl overflow-hidden h-48">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={() => setCoverPreviewError(true)}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => openModal("cover")}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              <FaImage size={10} /> Change
            </button>
            <button
              onClick={() => {
                setCoverImage("");
                setCoverPreviewError(false);
              }}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-red-500/60 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              <FaXmark size={10} /> Remove
            </button>
          </div>
        </div>
      )}

      {/* Add cover button (when no cover set or preview errored) */}
      {(!coverImage || coverPreviewError) && (
        <button
          onClick={() => openModal("cover")}
          className="inline-flex items-center gap-2 text-white/25 hover:text-white/50 text-xs font-medium transition-colors"
        >
          <FaImage size={11} /> Add cover image
        </button>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title…"
        className="w-full bg-transparent border-none outline-none text-white text-2xl sm:text-3xl font-bold placeholder-white/15 font-playfair"
      />

      <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/3">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Begin writing your story…"
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-white/25 text-xs">
          <FaFeatherAlt size={10} className="text-amber-400/50" />
          <span>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          {wordCount > 0 && (
            <>
              <span>·</span>
              <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving || !title.trim()}
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 disabled:opacity-40 disabled:cursor-not-allowed font-medium px-4 py-2.5 rounded-full text-xs transition-all duration-200"
          >
            <FaFloppyDisk size={11} />
            <span className="hidden sm:inline">
              {saving ? "Saving…" : "Save draft"}
            </span>
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing || !title.trim() || !content.trim()}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
          >
            <FaPaperPlane size={11} />
            {publishing ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};
