"use client";

import { motion } from "framer-motion";
import { PhoneMissed, Video, Sparkles } from "lucide-react";
import { COPY } from "@/lib/copy";

export default function Hero() {
  return (
    <section id="top" data-testid="hero" aria-labelledby="hero-h" className="bg-navy text-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase bg-white/10 rounded-full px-3 py-1.5">
            <Sparkles size={14} aria-hidden /> When your loved ones cannot answer, you can still be there
          </p>
          <h1 id="hero-h" className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
            {COPY.heroH1}
          </h1>
          <p className="mt-4 text-lg text-cream/80">{COPY.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#robot" data-testid="btn-how-it-works" className="btn-coral">
              See how it works
            </a>
            <a href="#control" data-testid="btn-virtual-checkin" className="btn-outline border-cream! text-cream! hover:bg-white/10!">
              Experience a virtual check-in
            </a>
          </div>
          <p className="mt-4 text-sm text-cream/75">No registration needed for the demo below.</p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3" role="img" aria-label="Split scene: relative in GCC apartment and elderly parent in Kerala home, robot light turning on">
          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            className="card-warm bg-white/95! text-navy p-4"
            data-testid="hero-gcc"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/70">Dubai • GCC apartment</p>
            <svg viewBox="0 0 200 110" className="mt-2 w-full h-auto rounded-xl" aria-hidden>
              <rect x="0" y="0" width="200" height="110" rx="10" fill="#e8eef6" />
              <rect x="120" y="10" width="65" height="70" rx="6" fill="#bcd3ea" />
              <rect x="126" y="16" width="53" height="44" rx="4" fill="#7fa8d0" />
              <circle cx="55" cy="48" r="14" fill="#f2c9a0" />
              <path d="M35 110 C 35 82, 75 82, 75 110 Z" fill="#14243e" />
              <rect x="78" y="62" width="26" height="38" rx="5" fill="#0c1729" />
              <rect x="82" y="66" width="18" height="24" rx="2" fill="#ff6b4a" />
              <circle cx="152" cy="90" r="3" fill="#ffc75f" />
            </svg>
            <p className="mt-2 text-sm font-medium">Son checks the app, concerned.</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 rounded-full px-2.5 py-1">
              <PhoneMissed size={14} aria-hidden /> Phone rings silently…
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-warm bg-[#fdf3df] border border-warm/60 p-4 text-navy"
            data-testid="hero-kerala"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/70">Kerala home</p>
            <svg viewBox="0 0 200 110" className="mt-2 w-full h-auto rounded-xl" aria-hidden>
              <rect x="0" y="0" width="200" height="110" rx="10" fill="#e3f2e9" />
              <path d="M30 60 L70 28 L110 60 Z" fill="#1b7a4d" />
              <rect x="40" y="60" width="60" height="34" rx="4" fill="#faf4e8" stroke="#1b7a4d" strokeWidth="2" />
              <rect x="62" y="74" width="16" height="20" rx="2" fill="#14243e" />
              <circle cx="150" cy="46" r="12" fill="#f2c9a0" />
              <path d="M134 110 C 134 88, 166 88, 166 110 Z" fill="#7a4a2b" />
              <rect x="120" y="80" width="14" height="24" rx="4" fill="#14243e" />
              <circle cx="127" cy="76" r="5" fill="#ff6b4a" />
              <circle cx="127" cy="76" r="8" fill="none" stroke="#ffc75f" strokeWidth="2" opacity="0.8" />
            </svg>
            <p className="mt-2 text-sm font-medium">Phone in another room. Robot light turns on gently.</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs bg-kerala-light text-kerala rounded-full px-2.5 py-1" data-testid="hero-robot-light">
              <Video size={14} aria-hidden /> Robot active — with announcement
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
