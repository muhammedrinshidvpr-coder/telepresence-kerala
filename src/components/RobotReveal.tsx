"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ROBOT_HOTSPOTS } from "@/lib/copy";
import { RobotErrorBoundary, type RobotMode, type RobotView } from "./RobotCanvas";

const RobotCanvas = dynamic(() => import("./RobotCanvas"), {
  ssr: false,
  loading: () => <p className="p-6">Loading 3D robot…</p>,
});

function useInView<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T | null>(null);
  // Always start false so SSR HTML and first client render match.
  // (Reading IntersectionObserver support here would differ per
  // environment and cause a hydration remount.)
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        // Track continuously: unmount the WebGL canvas when scrolled away
        // to save CPU/battery (and keep test environments responsive).
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
  const [view, setView] = useState<RobotView>("front");
  const [hotspot, setHotspot] = useState<string>("camera");
  const [webglOk, setWebglOk] = useState(true);
  // Test hook (?nogl=1): apply after hydration so SSR and first client
  // render match (avoids a hydration remount).
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("nogl")) return;
    const t = window.setTimeout(() => setWebglOk(false), 0);
    return () => window.clearTimeout(t);
  }, []);
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>();
  const active = ROBOT_HOTSPOTS.find((h) => h.id === hotspot);

  return (
    <section id="robot" data-testid="robot" aria-labelledby="robot-h" className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral-deep">Product reveal</p>
        <h2 id="robot-h" className="mt-2 text-3xl md:text-4xl font-bold">One small robot, many ways to be present</h2>
        <p className="mt-2 text-navy/70">Rotate, zoom, tap a part. Switch Day, Night and Charging modes.</p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Robot modes">
          {(["day", "night", "charging"] as RobotMode[]).map((m) => (
            <button key={m} data-testid={`mode-${m}`} aria-pressed={mode === m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 capitalize ${mode === m ? "bg-navy text-cream border-navy" : "border-navy/20"}`}>
              {m === "day" ? "Day mode" : m === "night" ? "Night mode" : "Charging mode"}
            </button>
          ))}
          <span className="mx-2 hidden sm:inline text-navy/30">|</span>
          {(["front", "side", "rear"] as RobotView[]).map((v) => (
            <button key={v} data-testid={`view-${v}`} aria-pressed={view === v} onClick={() => setView(v)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 capitalize ${view === v ? "bg-kerala text-white border-kerala" : "border-navy/20"}`}>
              {v}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="card-warm overflow-hidden" data-testid="robot-viewer">
            {webglOk ? (
              <div ref={wrapRef} className="h-[300px] sm:h-[380px] bg-gradient-to-b from-cream to-cream-dark" data-testid="robot-canvas-wrap">
                {inView ? (
                  <Suspense fallback={<p className="p-6">Loading 3D robot…</p>}>
                    <RobotErrorBoundary onError={() => setWebglOk(false)}>
                      <RobotCanvas mode={mode} view={view} onNoWebGL={() => setWebglOk(false)} />
                    </RobotErrorBoundary>
                  </Suspense>
                ) : (
                  <div className="h-full grid place-items-center p-8 text-center" data-testid="robot-poster">
                    <div><p className="text-6xl" aria-hidden>🤖</p><p className="mt-2 text-sm text-navy/70">Scroll to load the interactive 3D robot</p></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[300px] sm:h-[380px] grid place-items-center p-8 text-center" data-testid="robot-fallback">
                <div><p className="text-6xl" aria-hidden>🤖</p><p className="mt-2 font-semibold">3D unavailable — robot illustration shown instead.</p></div>
              </div>
            )}
            <p className="px-5 py-3 text-sm text-navy/70">Mode: <strong data-testid="robot-mode-label">{mode}</strong> • View: <strong data-testid="robot-view-label">{view}</strong> • Drag to rotate, scroll to zoom.</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Robot hotspots">
              {ROBOT_HOTSPOTS.map((h) => (
                <button key={h.id} data-testid={`hotspot-${h.id}`} aria-pressed={hotspot === h.id} onClick={() => setHotspot(h.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold border min-h-11 ${hotspot === h.id ? "bg-coral text-white border-coral" : "border-navy/20 bg-white"}`}>
                  {h.label}
                </button>
              ))}
            </div>
            <div className="card-warm mt-4 p-5" data-testid="hotspot-detail" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-widest text-kerala">{active?.title}</p>
              <p className="mt-1 text-lg font-medium">{active?.text}</p>
              <p className="mt-2 text-sm text-navy/70">Tap another label to learn more. Technical detail only on request.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
