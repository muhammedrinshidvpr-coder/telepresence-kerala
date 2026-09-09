"use client";

import { useEffect, useState } from "react";
import { MapPin, Radio, Plane, Sparkles, Navigation } from "lucide-react";
import { COPY, GCC_CITIES } from "@/lib/copy";
import { useCity } from "./CityContext";

// City map coordinates on our regional map projection (viewBox 0 0 700 360)
const CITY_COORDS: Record<string, { x: number; y: number }> = {
  kuwait: { x: 120, y: 110 },
  manama: { x: 170, y: 138 },
  doha: { x: 195, y: 155 },
  riyadh: { x: 140, y: 175 },
  abudhabi: { x: 235, y: 168 },
  dubai: { x: 255, y: 152 },
  muscat: { x: 290, y: 185 },
};

// Kerala destination coordinates
const KERALA_COORD = { x: 540, y: 265 };

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
  const origin = CITY_COORDS[currentCity.id] || { x: 255, y: 152 };

  // Generate quadratic Bezier curved arc across the Arabian Sea
  const midX = (origin.x + KERALA_COORD.x) / 2;
  const midY = Math.min(origin.y, KERALA_COORD.y) - 65;
  const arcPath = `M ${origin.x} ${origin.y} Q ${midX} ${midY} ${KERALA_COORD.x} ${KERALA_COORD.y}`;

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

        {/* Auto-replay World/Regional Map Animation */}
        <div className="mt-8 card-warm p-6 md:p-8 overflow-hidden shadow-2xl border border-navy/10 bg-gradient-to-br from-white via-[#fcfaf6] to-[#f5eee2] rounded-3xl" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-bold text-navy mb-4 pb-3 border-b border-navy/10">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-coral animate-pulse" />
              <span>Direct Telepresence Link: <strong className="text-coral-deep">{currentCity.label} ({currentCity.ml})</strong> → <strong className="text-kerala">Kerala Home</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs text-navy/85">
              <span className="bg-kerala/10 text-kerala px-3 py-1 rounded-full font-bold">~{currentCity.km.toLocaleString()} km distance</span>
              <span className="bg-navy/10 text-navy px-3 py-1 rounded-full font-semibold">Ultra-low ~45ms latency</span>
            </div>
          </div>

          {/* Regional Map Vector Graphic */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#e8f1f8] via-[#e2eef7] to-[#d6e7f3] p-2 border border-navy/10 shadow-inner">
            <svg viewBox="0 0 700 360" className="w-full h-auto select-none">
              <defs>
                {/* Gradient for trajectory arc */}
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14243e" />
                  <stop offset="50%" stopColor="#c93f20" />
                  <stop offset="100%" stopColor="#1b7a4d" />
                </linearGradient>

                {/* Pulse animation filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Water background texture ripples */}
              <path d="M 0 120 Q 175 100 350 120 T 700 120" fill="none" stroke="#bfd8ec" strokeWidth="1" strokeDasharray="6 6" />
              <path d="M 0 180 Q 175 160 350 180 T 700 180" fill="none" stroke="#bfd8ec" strokeWidth="1" strokeDasharray="6 6" />
              <path d="M 0 240 Q 175 220 350 240 T 700 240" fill="none" stroke="#bfd8ec" strokeWidth="1" strokeDasharray="6 6" />

              {/* Arabian Peninsula Landmass Outline (Stylized Vector) */}
              <path
                d="M 50 40 L 170 30 L 250 80 L 290 120 L 320 180 L 300 240 L 210 260 L 130 230 L 80 150 Z"
                fill="#ece4d4"
                stroke="#d3c7b2"
                strokeWidth="1.5"
              />
              <text x="180" y="95" fill="#a89a84" fontSize="13" fontWeight="800" letterSpacing="3">ARABIAN GULF</text>

              {/* Indian Subcontinent Landmass Outline (Stylized Vector) */}
              <path
                d="M 460 30 L 620 40 L 650 120 L 610 200 L 560 310 L 520 280 L 490 200 L 470 110 Z"
                fill="#e4eedd"
                stroke="#c9dbc0"
                strokeWidth="1.5"
              />
              <text x="565" y="110" fill="#9db893" fontSize="13" fontWeight="800" letterSpacing="3">INDIA</text>

              {/* Arabian Sea Label */}
              <text x="380" y="270" fill="#96b7ce" fontSize="14" fontWeight="700" letterSpacing="2" textAnchor="middle">
                ARABIAN SEA
              </text>

              {/* Dotted Straight Ground-Track */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={KERALA_COORD.x}
                y2={KERALA_COORD.y}
                stroke="#14243e"
                strokeOpacity="0.15"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Curved Active Flight/Signal Arc */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                className="animate-pulse"
                filter="url(#glow)"
              />

              {/* Moving Pulse Packet along Arc */}
              <circle r="5" fill="#ffc75f">
                <animateMotion path={arcPath} dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* All GCC City markers */}
              {GCC_CITIES.map((c) => {
                const coord = CITY_COORDS[c.id];
                if (!coord) return null;
                const isSelected = c.id === currentCity.id;
                return (
                  <g key={c.id}>
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? 8 : 4}
                      fill={isSelected ? "#c93f20" : "#14243e"}
                      opacity={isSelected ? 1 : 0.4}
                    />
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="14"
                        fill="none"
                        stroke="#c93f20"
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={coord.x}
                      y={coord.y - 12}
                      textAnchor="middle"
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "800" : "600"}
                      fill={isSelected ? "#14243e" : "#55647a"}
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}

              {/* Kerala Destination Hub */}
              <g>
                <circle cx={KERALA_COORD.x} cy={KERALA_COORD.y} r="18" fill="#1b7a4d" fillOpacity="0.2" />
                <circle cx={KERALA_COORD.x} cy={KERALA_COORD.y} r="10" fill="#1b7a4d" />
                <circle cx={KERALA_COORD.x} cy={KERALA_COORD.y} r="4" fill="#ffd470" />
                <circle
                  cx={KERALA_COORD.x}
                  cy={KERALA_COORD.y}
                  r="22"
                  fill="none"
                  stroke="#1b7a4d"
                  strokeWidth="2"
                  opacity="0.75"
                  className="animate-ping"
                />
                <text x={KERALA_COORD.x + 16} y={KERALA_COORD.y - 6} fontSize="13" fontWeight="800" fill="#1b7a4d">
                  Kerala Home 🌴
                </text>
                <text x={KERALA_COORD.x + 16} y={KERALA_COORD.y + 10} fontSize="10" fontWeight="600" fill="#14243e">
                  Rover Standing By
                </text>
              </g>
            </svg>

            {/* Live Telemetry Pill Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-navy shadow-md border border-navy/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Auto-cycling GCC routes: <strong className="text-coral-deep">{currentCity.label}</strong> active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
