import { useState, useRef, useCallback } from "react";
import { FaXmark, FaCloudArrowUp, FaLink } from "react-icons/fa6";
import { uploadToImageKit } from "@/lib/api/media";

type Tab = "upload" | "url";

interface Props {
  onApply: (url: string) => void;
  onClose: () => void;
}

export const ImageUploadModal = ({ onApply, onClose }: Props) => {
  const [tab, setTab] = useState<Tab>("upload");
  const [urlValue, setUrlValue] = useState("");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadToImageKit(selectedFile);
      onApply(url);
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = () => {
    const url = urlValue.trim();
    if (!url) return;
    onApply(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h3 className="text-white/80 text-sm font-semibold">Insert Image</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
            <FaXmark size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/8">
          {(["upload", "url"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); }}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                tab === t
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {t === "upload" ? (
                <span className="flex items-center justify-center gap-1.5"><FaCloudArrowUp size={11} /> Upload File</span>
              ) : (
                <span className="flex items-center justify-center gap-1.5"><FaLink size={10} /> Paste URL</span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {tab === "upload" && (
            <>
              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  dragging
                    ? "border-amber-400/60 bg-amber-400/5"
                    : selectedFile
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-white/10 hover:border-white/20 bg-white/3"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                {selectedFile ? (
                  <div className="space-y-1">
                    <p className="text-green-400 text-xs font-medium">{selectedFile.name}</p>
                    <p className="text-white/30 text-xs">{(selectedFile.size / 1024).toFixed(1)} KB · Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FaCloudArrowUp className="mx-auto text-white/20" size={24} />
                    <p className="text-white/40 text-xs">Drop an image here or <span className="text-amber-400">browse</span></p>
                    <p className="text-white/20 text-xs">PNG, JPG, GIF, WEBP</p>
                  </div>
                )}
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0C0C] font-bold rounded-xl text-xs transition-colors"
              >
                {uploading ? "Uploading…" : "Upload & Insert"}
              </button>
            </>
          )}

          {tab === "url" && (
            <>
              <div className="space-y-2">
                <label className="text-white/40 text-xs font-medium">Image URL</label>
                <input
                  type="url"
                  autoFocus
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleApplyUrl(); if (e.key === "Escape") onClose(); }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-xs placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
                />
              </div>

              {/* URL preview */}
              {urlValue.trim() && (
                <div className="rounded-xl overflow-hidden bg-white/3 border border-white/8 h-32">
                  <img
                    src={urlValue.trim()}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={handleApplyUrl}
                disabled={!urlValue.trim()}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0C0C] font-bold rounded-xl text-xs transition-colors"
              >
                Insert Image
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
