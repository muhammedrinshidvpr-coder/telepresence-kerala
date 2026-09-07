"use client";

import { useState } from "react";
import { TriangleAlert, RotateCcw, Undo2, Dock } from "lucide-react";
import { COPY, OBSTACLES } from "@/lib/copy";

export default function MobilityLab() {
  const [sel, setSel] = useState<string>("threshold");
  const [blocked, setBlocked] = useState(false);
  const active = OBSTACLES.find((o) => o.id === sel);

  return (
    <section data-testid="mobility" aria-labelledby="mobility-h" className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">Mobility lab</p>
        <h2 id="mobility-h" className="mt-2 text-3xl md:text-4xl font-bold">Built for real Kerala floors — honestly tested</h2>
        <p className="mt-2 text-navy/70">{COPY.mobilityNote}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-wrap gap-2 content-start" role="group" aria-label="Obstacles">
            {OBSTACLES.map((o) => (
              <button key={o.id} data-testid={`obstacle-${o.id}`} aria-pressed={sel === o.id}
                onClick={() => { setSel(o.id); setBlocked(o.status === "fail-safe"); }}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold border min-h-11 text-left ${sel === o.id ? "bg-navy text-cream border-navy" : "border-navy/20 bg-cream"}`}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="card-warm p-5" data-testid="obstacle-detail" aria-live="polite">
            <svg viewBox="0 0 400 140" className="w-full h-auto rounded-xl bg-cream" role="img" aria-label={`${active?.label} demonstration`}>
              <rect x="0" y="90" width="400" height="50" fill="#eadfc8" />
              <rect x="185" y="70" width="60" height="22" rx="4" fill="#c9b globalization892" opacity="0.0" />
              <rect x="185" y="78" width="60" height="14" rx="4" fill="#14243e" opacity="0.55" />
              <circle cx={blocked ? 150 : 245} cy="72" r="20" fill="#14243e" />
              <circle cx={blocked ? 150 : 245} cy="72" r="8" fill="#ff6b4a" />
              <circle cx={blocked ? 150 : 245} cy="100" r="10" fill="#0c1729" />
              {blocked && (
                <g>
                  <rect x="270" y="30" width="110" height="30" rx="8" fill="#fff" stroke="#ff6b4a" />
                  <text x="325" y="50" textAnchor="middle" fontSize="12" fill="#e04e2d" fontWeight="700">Path blocked</text>
                </g>
              )}
            </svg>
            <p className="mt-3 font-bold">{active?.label}</p>
            <p className="text-sm text-navy/70">{active?.note}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest" data-testid="obstacle-status">
              Status: {active?.status === "pass" ? "Pass — within validated design" : "Fail-safe — stops safely, never forces through"}
            </p>
            {blocked ? (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 flex flex-wrap items-center gap-2" data-testid="blocked-panel">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-700"><TriangleAlert size={16} aria-hidden /> Path blocked — robot slowed and stopped safely.</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button data-testid="btn-retry" onClick={() => setBlocked(false)} className="px-3 py-2 rounded-full bg-navy text-cream text-xs font-bold min-h-10"><RotateCcw size={14} className="inline mr-1" aria-hidden />Retry</button>
                  <button data-testid="btn-reverse" onClick={() => setBlocked(false)} className="px-3 py-2 rounded-full border text-xs font-bold min-h-10"><Undo2 size={14} className="inline mr-1" aria-hidden />Reverse</button>
                  <a href="#control" data-testid="btn-mobility-dock" className="px-3 py-2 rounded-full border text-xs font-bold min-h-10 inline-flex items-center"><Dock size={14} className="mr-1" aria-hidden />Return to dock</a>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-kerala font-semibold">Wheel close-up: slow, steady crossing at safe speed.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
