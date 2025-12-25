"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-800 border-b border-slate-600">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-blue-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                <rect x="3" y="6" width="10" height="12" rx="2" />
              </svg>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-slate-100">
                All-in-One
              </span>
              <span className="text-xs text-slate-400">
                Video Downloader
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={`
              absolute md:static top-16 left-0 w-full md:w-auto
              bg-slate-800 md:bg-transparent border-t md:border-0 border-slate-600
              flex flex-col md:flex-row gap-4 md:gap-8
              px-5 py-6 md:p-0
              transition-all duration-300
              ${isMenuOpen ? "block" : "hidden md:flex"}
            `}
          >
            <Link
              href="/"
              className="text-slate-100 font-medium hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#supported"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Platforms
            </Link>
            <Link
              href="#how-to"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              How to Use
            </Link>
            <Link
              href="#faq"
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="w-6 h-0.5 bg-slate-100"></span>
            <span className="w-6 h-0.5 bg-slate-100"></span>
            <span className="w-6 h-0.5 bg-slate-100"></span>
          </button>

        </div>
      </div>
    </header>
  );
}
