"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";

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
      className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-navy/10"
    >
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <Link href="#top" className="flex items-center gap-2 font-bold text-lg" data-testid="brand">
          <span className="w-9 h-9 rounded-full bg-navy text-cream grid place-items-center">
            <HeartHandshake size={20} aria-hidden />
          </span>
          Be There
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-coral-deep">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#cta" data-testid="nav-cta" className="btn-coral py-2! px-5! text-sm">
              Join pilot
            </a>
          </li>
        </ul>
        <button
          className="md:hidden p-2 rounded-lg border border-navy/20"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-cream border-t border-navy/10" data-testid="nav-mobile">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block py-2 font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#cta" className="btn-coral w-full" onClick={() => setOpen(false)}>
              Join pilot
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
