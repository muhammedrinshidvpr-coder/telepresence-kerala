"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ROBOT_HOTSPOTS } from "@/lib/copy";
import { RobotErrorBoundary, type RobotMode, type RobotView } from "./RobotCanvas";

const RobotCanvas = dynamic(() => import("./RobotCanvas"), {
  ssr: false,
  loading: () => <p className="p-6 text-sm text-navy/80">Loading realistic 3D rover…</p>,
});

function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        setInView(entries.some((e) => e.isIntersecting));
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

export default function RobotReveal() {
  const [mode, setMode] = useState<RobotMode>("day");
  const [view, setView] = useState<RobotView>("iso");
  const [hotspot, setHotspot] = useState<string>("camera");
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("nogl")) return;
    const t = window.setTimeout(() => setWebglOk(false), 0);
    return () => window.clearTimeout(t);
  }, []);

  const { ref: wrapRef, inView } = useInView<HTMLDivElement>();
  const active = ROBOT_HOTSPOTS.find((h) => h.id === hotspot) || ROBOT_HOTSPOTS[0];

  return (
    <section id="robot" data-testid="robot" aria-labelledby="robot-h" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 inline-block px-3.5 py-1.5 rounded-full">
            Realistic 3D Inspection
          </p>
          <h2 id="robot-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-navy">
            Engineered for Stability and Presence
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/70 text-balance">
            20cm riser height with a low center of gravity, 4 chunky off-road tires, and enlarged high-definition camera & companion screen.
          </p>
        </div>

        {/* View and Mode Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Rover viewing angles and modes">
          {(["day", "night", "charging"] as RobotMode[]).map((m) => (
            <button
              key={m}
              data-testid={`mode-${m}`}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border min-h-[40px] capitalize transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                mode === m
                  ? "bg-navy text-cream border-navy shadow-md ring-2 ring-navy/20"
                  : "border-navy/15 bg-cream/50 text-navy hover:bg-cream"
              }`}
            >
              {m === "day" ? "☀️ Daylight" : m === "night" ? "🌙 Night" : "⚡ Docked"}
            </button>
          ))}
          <span className="mx-1 hidden sm:inline text-navy/30">|</span>
          {(["iso", "front", "side", "rear"] as RobotView[]).map((v) => (
            <button
              key={v}
              data-testid={`view-${v}`}
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border min-h-[40px] capitalize transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                view === v
                  ? "bg-kerala text-white border-kerala shadow-md ring-2 ring-kerala/20"
                  : "border-navy/15 bg-cream/50 text-navy hover:bg-cream"
              }`}
            >
              {v === "iso" ? "3D Angle" : `${v} View`}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
          {/* 3D Canvas Box */}
          <div className="card-warm overflow-hidden shadow-2xl border border-navy/10 rounded-3xl" data-testid="robot-viewer">
            {webglOk ? (
              <div
                ref={wrapRef}
                className="relative h-[360px] sm:h-[450px] bg-gradient-to-b from-[#0b1320] via-[#111c2e] to-[#0d1624]"
                data-testid="robot-canvas-wrap"
              >
                {inView ? (
                  <Suspense fallback={<p className="p-6 text-sm text-cream/70">Loading 3D rover…</p>}>
                    <RobotErrorBoundary onError={() => setWebglOk(false)}>
                      <RobotCanvas mode={mode} view={view} onNoWebGL={() => setWebglOk(false)} />
                    </RobotErrorBoundary>
                  </Suspense>
                ) : (
                  <div className="h-full grid place-items-center p-8 text-center" data-testid="robot-poster">
                    <div>
                      <p className="text-6xl animate-bounce" aria-hidden>🤖</p>
                      <p className="mt-3 text-sm font-medium text-cream/80">Scroll to view the realistic 3D rover</p>
                    </div>
                  </div>
                )}
                {/* Overlay Badge */}
                <div className="absolute top-3 right-3 bg-navy-deep/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-warm shadow-md border border-white/10 pointer-events-none">
                  ✨ Auto-Rotating 3D Model • Touch to Inspect
                </div>
              </div>
            ) : (
              <div className="h-[360px] sm:h-[450px] grid place-items-center p-8 text-center bg-navy-deep text-cream" data-testid="robot-fallback">
                <div>
                  <p className="text-6xl" aria-hidden>🤖</p>
                  <p className="mt-3 font-semibold">Interactive 3D Rover (WebGL preview)</p>
                </div>
              </div>
            )}
            <div className="px-5 py-3.5 bg-white border-t border-navy/10 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm text-navy/85">
              <p>
                Mode: <strong className="text-navy font-bold" data-testid="robot-mode-label">{mode}</strong> • View: <strong className="text-navy font-bold" data-testid="robot-view-label">{view}</strong>
              </p>
              <p className="text-navy/85 text-xs">Drag to rotate freely • Scroll to zoom</p>
            </div>
          </div>

          {/* Hotspots & Engineering Details */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy/85 mb-3">Hardware Highlights</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Rover hotspots">
              {ROBOT_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  data-testid={`hotspot-${h.id}`}
                  aria-pressed={hotspot === h.id}
                  onClick={() => setHotspot(h.id)}
                  className={`px-3.5 py-2 rounded-full text-xs md:text-sm font-semibold border min-h-[40px] transition-all duration-200 cursor-pointer active:scale-95 ${
                    hotspot === h.id
                      ? "bg-coral text-white border-coral shadow-md ring-2 ring-coral/20"
                      : "border-navy/15 bg-white text-navy hover:bg-cream/60"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            <div className="card-warm mt-5 p-6 border border-navy/10 shadow-lg bg-gradient-to-br from-white via-cream/20 to-cream/40 rounded-2xl" data-testid="hotspot-detail" aria-live="polite">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-kerala bg-kerala-light px-2.5 py-1 rounded-md">
                {active.title}
              </span>
              <p className="mt-3 text-lg md:text-xl font-bold text-navy leading-snug">{active.text}</p>
              <p className="mt-4 text-xs text-navy/60 border-t border-navy/5 pt-3">
                Tap any component above to inspect its real-world industrial specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
