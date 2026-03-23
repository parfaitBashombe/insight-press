"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-md z-50 border-b border-[#e5e0d8]">
      <div className="w-10/12 mx-auto py-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-accent transition-colors">
          Insight Press.
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-sans uppercase tracking-widest text-[#8c857d]">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/news" className="hover:text-foreground transition-colors">Discover</Link>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground p-2 -mr-2 cursor-pointer hover:bg-[#f0ece5] rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-background border-b border-[#e5e0d8] shadow-lg flex flex-col py-6 pb-8 gap-6 text-sm font-sans uppercase tracking-widest text-foreground font-semibold items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors w-10/12 border-b border-[#e5e0d8] pb-4 text-center">Home</Link>
          <Link href="/news" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors w-10/12 border-b border-[#e5e0d8] pb-4 text-center">Discover</Link>
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors w-10/12 text-center pb-2">About</a>
        </nav>
      )}
    </header>
  );
}
