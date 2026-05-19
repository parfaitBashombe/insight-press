import { FaEye } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { MEDIA } from "@/components/dashboard/mock-data";

export const MediaView = () => (
  <div className="max-w-6xl mx-auto space-y-6">
    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-bold text-lg font-playfair">Media Library</h3>
        <button className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-4 py-2 rounded-full text-xs transition-all duration-200">
          <FaPlus size={10} /> Upload File
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {MEDIA.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#1a1a1a] border border-white/8 rounded-xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 shadow-lg"
          >
            <div className="aspect-square bg-white/5 relative overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#0C0C0C] text-white flex items-center justify-center transition-colors">
                  <FaEye size={12} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500/80 hover:text-white text-white flex items-center justify-center transition-colors">
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
            <div className="p-3 border-t border-white/8 bg-white/2">
              <p className="text-white/90 text-sm font-semibold truncate mb-0.5" title={item.name}>
                {item.name}
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">
                {item.size} • {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
