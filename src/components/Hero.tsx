"use client";

import { motion } from "framer-motion";
import { PhoneMissed, Video, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { COPY } from "@/lib/copy";

export default function Hero() {
  return (
    <section id="top" data-testid="hero" aria-labelledby="hero-h" className="relative bg-gradient-to-b from-navy-deep via-navy to-[#111f38] text-cream overflow-hidden py-16 md:py-24">
      {/* 3a: Ambient background video container of robot moving through Kerala home controlled from abroad */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen scale-105 filter blur-[1px]"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='700' viewBox='0 0 1200 700'%3E%3Crect width='1200' height='700' fill='%230b1424'/%3E%3Ccircle cx='600' cy='350' r='300' fill='%231b2e4b' opacity='0.3'/%3E%3C/svg%3E"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/80" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kerala/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5 shadow-sm text-warm">
            <Sparkles size={14} aria-hidden /> When loved ones cannot answer, you can still be there
          </div>
          <h1 id="hero-h" className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-balance">
            {COPY.heroH1}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-cream/80 leading-relaxed max-w-xl text-balance">
            {COPY.heroSub}
          </p>

          {/* Action button - removed 'Pre Order Now' & 'Virtual check-in demo' */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#robot" data-testid="btn-how-it-works" className="btn-gold shadow-lg shadow-warm/20 cursor-pointer text-sm font-extrabold">
              <Compass size={18} aria-hidden className="mr-2 inline" /> See the Rover in Action →
            </a>
            <a href="#cta" className="btn-coral text-sm font-bold shadow-md cursor-pointer">
              Join Early Access
            </a>
          </div>
        </div>

        {/* Narrative Split Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="img" aria-label="Split scene: relative in GCC office and elderly parent in Kerala home">
          {/* GCC Card */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="card-warm bg-white/95! text-navy p-5 shadow-2xl border border-white/20 flex flex-col justify-between rounded-2xl"
            data-testid="hero-gcc"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-navy/85">Dubai • GCC Office</span>
                <span className="text-[11px] font-semibold text-coral-deep bg-coral/10 px-2 py-0.5 rounded-full">8:15 PM</span>
              </div>
              <div className="mt-3 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 text-cream">
                <div className="flex justify-between items-center text-xs opacity-80 mb-2">
                  <span>Calling Amma...</span>
                  <span className="animate-pulse text-red-400">No answer</span>
                </div>
                <div className="h-20 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-14 h-24 rounded-2xl border-2 border-white/30 bg-black/40 flex flex-col items-center justify-center p-1 shadow-lg">
                      <div className="w-5 h-1 bg-white/40 rounded-full mb-2" />
                      <PhoneMissed size={20} className="text-red-400 animate-bounce" />
                      <span className="text-[9px] text-white/85 mt-1">Ringing...</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-navy">Son checks the phone with growing worry.</p>
              <p className="text-xs text-navy/85 mt-1">Third unanswered call. Parent may just be in the kitchen or garden.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-red-700 rounded-full px-2.5 py-1">
                <PhoneMissed size={13} aria-hidden /> Phone rings silently…
              </span>
            </div>
          </motion.div>

          {/* Kerala Home Card */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-warm bg-[#fdfbf7]! border-2 border-warm/80 p-5 shadow-2xl flex flex-col justify-between text-navy rounded-2xl"
            data-testid="hero-kerala"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-kerala">Kerala Home</span>
                <span className="text-[11px] font-semibold text-kerala bg-kerala-light px-2 py-0.5 rounded-full">9:45 PM IST</span>
              </div>
              <div className="mt-3 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1b4332] to-[#081c15] p-4 text-cream">
                <div className="flex justify-between items-center text-xs text-warm mb-2">
                  <span>Kerala Living Room</span>
                  <span className="flex items-center gap-1 text-green-400 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" /> Active
                  </span>
                </div>
                <div className="h-20 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <span className="text-3xl" aria-hidden>👵</span>
                    <p className="text-[9px] text-cream/90 mt-1">Resting on sofa</p>
                  </div>
                  <div className="text-center bg-white/10 rounded-xl p-2 border border-white/20">
                    <span className="text-2xl" aria-hidden>🤖</span>
                    <div className="w-2 h-2 rounded-full bg-warm mx-auto mt-1 animate-pulse" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-navy">Phone in another room. Rover gently rolls in.</p>
              <p className="text-xs text-navy/85 mt-1">Announces son’s arrival in warm Malayalam with zero phone fuss.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-kerala-light text-kerala rounded-full px-2.5 py-1" data-testid="hero-robot-light">
                <Video size={13} aria-hidden /> Rover active — Malayalam greeting
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
