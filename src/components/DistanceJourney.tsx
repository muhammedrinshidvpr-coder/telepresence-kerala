"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { COPY, GCC_CITIES } from "@/lib/copy";
import { useCity } from "./CityContext";

export default function DistanceJourney() {
  const { city, setCityId } = useCity();
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-replay animation: cycle through GCC key cities smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % GCC_CITIES.length;
        setCityId(GCC_CITIES[next].id);
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [setCityId]);

  const currentCity = GCC_CITIES[activeIdx] || city;

  return (
    <section id="distance" data-testid="distance" aria-labelledby="distance-h" className="bg-gradient-to-b from-[#faf4e8] to-[#f4ebdc] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light inline-block px-3.5 py-1.5 rounded-full">
            Autonomous Bridge Across Oceans
          </p>
          <h2 id="distance-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-navy">
            Thousands of kilometres, one familiar presence
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/75 text-balance">{COPY.distanceLine}</p>
        </div>

        {/* City Pills - auto highlighted with manual override option */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {GCC_CITIES.map((c, idx) => {
            const isSelected = c.id === currentCity.id;
            return (
              <button
                key={c.id}
                data-testid={`city-${c.id}`}
                onClick={() => {
                  setActiveIdx(idx);
                  setCityId(c.id);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border min-h-[40px] transition-all duration-300 cursor-pointer active:scale-95 shadow-sm ${
                  isSelected
                    ? "bg-navy text-cream border-navy shadow-md scale-105 ring-2 ring-navy/20"
                    : "border-navy/15 bg-white/80 text-navy hover:bg-white"
                }`}
              >
                <span className="font-bold">{c.label}</span>
                <span className="text-[10px] ml-1.5 opacity-70">({c.km.toLocaleString()} km)</span>
              </button>
            );
          })}
        </div>

        {/* Telepresence Link Info Card */}
        <div className="mt-8 card-warm p-6 md:p-8 overflow-hidden shadow-xl border border-navy/10 bg-gradient-to-br from-white via-[#fcfaf6] to-[#f5eee2] rounded-3xl" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-bold text-navy">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-coral animate-pulse" />
              <span>Direct Telepresence Link: <strong className="text-coral-deep">{currentCity.label} ({currentCity.ml})</strong> → <strong className="text-kerala">Kerala Home</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs text-navy/85">
              <span className="bg-kerala/10 text-kerala px-3 py-1 rounded-full font-bold">~{currentCity.km.toLocaleString()} km distance</span>
              <span className="bg-navy/10 text-navy px-3 py-1 rounded-full font-semibold">Ultra-low ~45ms latency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
