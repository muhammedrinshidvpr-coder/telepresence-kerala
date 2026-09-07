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
            <a href="#control" data-testid="btn-virtual-checkin" className="btn-outline !border-cream !text-cream hover:!bg-white/10">
              Experience a virtual check-in
            </a>
          </div>
          <p className="mt-4 text-sm text-cream/60">No registration needed for the demo below.</p>
        </div>

        <div className="grid grid-cols-2 gap-3" role="img" aria-label="Split scene: relative in GCC apartment and elderly parent in Kerala home, robot light turning on">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-warm !bg-white/95 text-navy p-4"
            data-testid="hero-gcc"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">Dubai • GCC apartment</p>
            <div className="mt-2 text-5xl" aria-hidden>🧑‍💻</div>
            <p className="mt-2 text-sm font-medium">Son checks the app, concerned.</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 rounded-full px-2.5 py-1">
              <PhoneMissed size={14} aria-hidden /> Phone rings silently…
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-warm !bg-warm/20 border border-warm/60 p-4 text-navy"
            data-testid="hero-kerala"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">Kerala home</p>
            <div className="mt-2 text-5xl" aria-hidden>🏡</div>
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
