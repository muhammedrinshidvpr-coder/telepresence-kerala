"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { TALLY_CONFIG } from "@/lib/copy";

const LINKS = [
  { href: "#distance", label: "Distance" },
  { href: "#robot", label: "Robot" },
  { href: "#control", label: "Take control" },
  { href: "#demo", label: "60-sec visit" },
  { href: "#stories", label: "Moments" },
  { href: "#privacy", label: "Privacy" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-navy/80">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-coral-deep transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              data-testid="nav-cta"
              data-tally-open={TALLY_CONFIG.formId}
              data-tally-layout="modal"
              data-tally-width={TALLY_CONFIG.modalWidth}
              data-tally-emoji-text={TALLY_CONFIG.emoji}
              className="btn-coral py-2! px-5! text-xs font-bold shadow-sm cursor-pointer"
            >
              Pre-Order Pilot
            </a>
          </li>
        </ul>
        <button
          className="md:hidden p-2 rounded-xl border border-navy/20 text-navy hover:bg-cream-dark transition-colors cursor-pointer"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden px-4 pb-5 pt-2 space-y-2.5 bg-cream/98 backdrop-blur-lg border-t border-navy/10 shadow-lg" data-testid="nav-mobile">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block py-2.5 px-3 rounded-xl font-semibold text-navy hover:bg-cream-dark/60 transition-colors" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#cta"
              data-tally-open={TALLY_CONFIG.formId}
              data-tally-layout="modal"
              data-tally-width={TALLY_CONFIG.modalWidth}
              data-tally-emoji-text={TALLY_CONFIG.emoji}
              className="btn-coral w-full text-center cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Pre-Order Pilot Spot
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
