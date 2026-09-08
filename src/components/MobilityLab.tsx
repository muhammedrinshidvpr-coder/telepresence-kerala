"use client";

import { useState } from "react";
import { TriangleAlert, RotateCcw, Undo2, Dock } from "lucide-react";
import { COPY, OBSTACLES } from "@/lib/copy";

export default function MobilityLab() {
  const [sel, setSel] = useState<string>("threshold");
  const [blocked, setBlocked] = useState(false);
  const active = OBSTACLES.find((o) => o.id === sel);

  return (
    <section data-testid="mobility" aria-labelledby="mobility-h" className="bg-gradient-to-b from-white to-cream/40 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 inline-block px-3.5 py-1.5 rounded-full">
            Engineering Validation
          </p>
          <h2 id="mobility-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-navy">
            Built for real Kerala floors — honestly tested
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/85 text-balance">{COPY.mobilityNote}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy/85 mb-3">Select Floor Type or Obstacle</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Obstacles">
              {OBSTACLES.map((o) => (
                <button
                  key={o.id}
                  data-testid={`obstacle-${o.id}`}
                  aria-pressed={sel === o.id}
                  onClick={() => { setSel(o.id); setBlocked(o.status === "fail-safe"); }}
                  className={`px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold border min-h-[44px] text-left transition-all duration-200 cursor-pointer active:scale-95 shadow-sm ${
                    sel === o.id
                      ? "bg-navy text-cream border-navy shadow-md ring-2 ring-navy/20"
                      : "border-navy/15 bg-cream/60 text-navy hover:bg-cream"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card-warm p-6 md:p-8 shadow-xl border border-navy/10 bg-white" data-testid="obstacle-detail" aria-live="polite">
            {/* Visual Floor & Wheel Simulation */}
            <svg viewBox="0 0 400 150" className="w-full h-auto rounded-2xl bg-gradient-to-b from-[#fbf8f2] to-[#ede3d1] border border-navy/10 p-2 shadow-inner" role="img" aria-label={`${active?.label} demonstration`}>
              {/* Floor base (Tile or Wood texture) */}
              <rect x="0" y="96" width="400" height="54" fill="#dfd4c0" />
              {/* Floor joint line */}
              <line x1="0" y1="96" x2="400" y2="96" stroke="#c4b59d" strokeWidth="2" />

              {/* Obstacle / Threshold depiction */}
              {sel === "threshold" && (
                <g>
                  {/* Wooden Door Sill / Thara */}
                  <rect x="180" y="82" width="70" height="14" rx="4" fill="#8d5b36" stroke="#684022" strokeWidth="1" />
                  <line x1="184" y1="88" x2="246" y2="88" stroke="#a66e44" strokeWidth="1" />
                  <text x="215" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="#684022">Door Sill (12mm)</text>
                </g>
              )}
              {sel === "tile" && (
                <g>
                  <rect x="195" y="90" width="10" height="6" fill="#1b7a4d" opacity="0.6" />
                  <text x="200" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill="#14243e">Tile Lip</text>
                </g>
              )}
              {sel === "carpet" && (
                <g>
                  <rect x="180" y="88" width="80" height="8" rx="2" fill="#c97c5d" />
                  <text x="220" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#c97c5d">Coir Mat Edge</text>
                </g>
              )}
              {sel === "clutter" && (
                <g>
                  <circle cx="210" cy="86" r="10" fill="#c93f20" />
                  <rect x="225" y="82" width="16" height="14" rx="3" fill="#ffc75f" />
                </g>
              )}

              {/* Robot Wheel Chassis */}
              <g transform={`translate(${blocked ? 140 : 250}, 0)`}>
                {/* Suspension strut */}
                <rect x="-4" y="25" width="8" height="40" rx="3" fill="#cbd5e1" stroke="#94a3b8" />
                <circle cx="0" cy="25" r="7" fill="#ffc75f" />
                {/* Wheel hub */}
                <circle cx="0" cy="65" r="26" fill="#14243e" />
                <circle cx="0" cy="65" r="20" fill="#1e293b" />
                <circle cx="0" cy="65" r="10" fill="#ffc75f" />
                {/* Direction arrow */}
                <path d="M 12 65 L 20 65 M 17 61 L 21 65 L 17 69" stroke="#ffc75f" strokeWidth="2" strokeLinecap="round" />
              </g>

              {blocked && (
                <g>
                  <rect x="250" y="24" width="135" height="34" rx="8" fill="#ffffff" stroke="#c93f20" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                  <text x="317" y="45" textAnchor="middle" fontSize="12" fill="#c93f20" fontWeight="700">⚠️ Obstacle Detected</text>
                </g>
              )}
            </svg>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg text-navy">{active?.label}</p>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    active?.status === "pass" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}
                  data-testid="obstacle-status"
                >
                  {active?.status === "pass" ? "Pass — within validated design" : "Fail-safe — stops safely, never forces through"}
                </span>
              </div>
              <p className="text-sm text-navy/70 mt-1.5 leading-relaxed">{active?.note}</p>
            </div>

            {blocked ? (
              <div className="mt-5 p-4 rounded-xl bg-red-50/90 border border-red-200 flex flex-wrap items-center justify-between gap-3 shadow-xs" data-testid="blocked-panel">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-red-800">
                  <TriangleAlert size={18} aria-hidden className="text-red-600" /> Path blocked — robot slowed and stopped safely.
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    data-testid="btn-retry"
                    onClick={() => setBlocked(false)}
                    className="px-3.5 py-2 rounded-full bg-navy text-cream text-xs font-bold min-h-[40px] shadow-sm active:scale-95 cursor-pointer"
                  >
                    <RotateCcw size={14} className="inline mr-1" aria-hidden /> Retry
                  </button>
                  <button
                    data-testid="btn-reverse"
                    onClick={() => setBlocked(false)}
                    className="px-3.5 py-2 rounded-full border border-navy/20 bg-white text-navy text-xs font-bold min-h-[40px] shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Undo2 size={14} className="inline mr-1" aria-hidden /> Reverse
                  </button>
                  <a
                    href="#control"
                    data-testid="btn-mobility-dock"
                    className="px-3.5 py-2 rounded-full border border-navy/20 bg-white text-navy text-xs font-bold min-h-[40px] shadow-sm inline-flex items-center active:scale-95"
                  >
                    <Dock size={14} className="mr-1" aria-hidden /> Return to dock
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-kerala-light/60 border border-kerala/20 text-xs font-semibold text-kerala flex items-center gap-2">
                <span>✓</span> Raised-wheel clearance allows smooth, safe crossing over thresholds and small tile lips.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
