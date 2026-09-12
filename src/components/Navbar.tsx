"use client";

import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Navbar() {
  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-navy/10 shadow-xs"
    >
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <Link href="#top" className="flex items-center gap-2.5 font-extrabold text-lg text-navy tracking-tight" data-testid="brand">
          <span className="w-9 h-9 rounded-xl bg-navy text-cream grid place-items-center shadow-sm">
            <HeartHandshake size={20} aria-hidden />
          </span>
          <span>Be There <span className="text-xs font-semibold text-coral-deep bg-coral/10 px-2 py-0.5 rounded-full ml-1">Kerala</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-navy/80">
          <a href="#problem" className="hover:text-coral transition-colors">The Reality</a>
          <a href="#robot" className="hover:text-coral transition-colors">The Rover</a>
          <a href="#health" className="hover:text-coral transition-colors">Health & Safety</a>
          <a href="#founder" className="hover:text-coral transition-colors">Founder</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#cta"
            data-testid="nav-cta"
            className="btn-coral py-2! px-5! text-xs font-bold shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95"
          >
            Request Demo →
          </a>
        </div>
      </nav>
    </header>
  );
}
