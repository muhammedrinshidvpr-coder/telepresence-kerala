"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RobotErrorBoundary } from "./RobotCanvas";

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
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("nogl")) return;
    const t = window.setTimeout(() => setWebglOk(false), 0);
    return () => window.clearTimeout(t);
  }, []);

  const { ref: wrapRef, inView } = useInView<HTMLDivElement>();

  return (
    <section id="robot" data-testid="robot" aria-labelledby="robot-h" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 inline-block px-3.5 py-1.5 rounded-full">
            EVE Rover 3D Inspection
          </p>
          <h2 id="robot-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-navy">
            EVE Rover: Explore • Assist • Together
          </h2>
        </div>

        {/* Centered 3D Canvas Box */}
        <div className="mt-10 max-w-3xl mx-auto">
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
                      <RobotCanvas mode="day" view="iso" onNoWebGL={() => setWebglOk(false)} />
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
                  ✨ Auto-Rotating EVE Rover • Touch to Inspect
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
            <div className="px-5 py-3.5 bg-white border-t border-navy/10 text-center text-xs md:text-sm text-navy/85">
              <p className="font-medium">Drag to rotate freely • Scroll to zoom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
