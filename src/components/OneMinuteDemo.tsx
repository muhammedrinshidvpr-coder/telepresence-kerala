"use client";

import { useEffect, useRef, useState } from "react";
import { Timer, RotateCcw } from "lucide-react";
import { COPY, TALLY_CONFIG } from "@/lib/copy";

const STEPS = [
  { label: "0–10 sec: Choose your location", href: "#distance", end: 10 },
  { label: "10–20 sec: Connect to the Kerala home", href: "#control", end: 20 },
  { label: "20–35 sec: Drive the robot", href: "#control", end: 35 },
  { label: "35–45 sec: Start a two-way conversation", href: "#control", end: 45 },
  { label: "45–55 sec: Activate privacy mode", href: "#privacy", end: 55 },
  { label: "55–60 sec: Return to charging dock", href: "#control", end: 60 },
];

export default function OneMinuteDemo() {
  const [running, setRunning] = useState(false);
  const [sec, setSec] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const [fast] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demoFast")
  );

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const start = () => {
    setRunning(true);
    setDone(false);
    setSec(0);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setSec((s) => {
        const n = s + 1;
        if (n >= 60) {
          if (timer.current) window.clearInterval(timer.current);
          setRunning(false);
          setDone(true);
        }
        return Math.min(n, 60);
      });
    }, fast ? 100 : 1000);
  };

  const replay = () => {
    if (timer.current) window.clearInterval(timer.current);
    setRunning(false);
    setDone(false);
    setSec(0);
  };

  const activeIdx = STEPS.findIndex((s) => sec <= s.end);
  const label = activeIdx >= 0 ? STEPS[activeIdx].label : STEPS[STEPS.length - 1].label;

  return (
    <section id="demo" data-testid="demo" aria-labelledby="demo-h" className="bg-gradient-to-b from-[#f4ebdc] to-cream py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-coral-deep bg-coral/10 inline-block px-3.5 py-1.5 rounded-full">
          Guided Walkthrough
        </p>
        <h2 id="demo-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          Try a 60-second virtual visit
        </h2>
        <p className="mt-3 text-base md:text-lg text-navy/70 text-balance">
          No registration or setup needed. Press start and follow the interactive timeline below.
        </p>

        <div className="card-warm mt-8 p-6 md:p-8 shadow-xl border border-navy/10 bg-white">
          <div className="inline-block p-4 rounded-2xl bg-cream border border-navy/5 shadow-inner">
            <p className="text-5xl md:text-6xl font-extrabold tabular-nums text-navy tracking-tight" data-testid="demo-timer" aria-live="polite">
              {sec}s
            </p>
          </div>

          <div className="mt-4 h-3.5 rounded-full bg-cream-dark overflow-hidden max-w-md mx-auto p-0.5 border border-navy/5" role="progressbar" aria-valuenow={sec} aria-valuemin={0} aria-valuemax={60} aria-label="Demo progress">
            <div
              className="h-full bg-gradient-to-r from-coral to-warm rounded-full transition-all duration-300"
              style={{ width: `${(sec / 60) * 100}%` }}
              data-testid="demo-progress"
            />
          </div>

          <p className="mt-4 font-bold text-base md:text-lg text-navy" data-testid="demo-step">
            {running || done ? label : "Ready when you are. Experience the journey."}
          </p>

          {!done ? (
            <button
              data-testid="btn-demo-start"
              onClick={start}
              disabled={running}
              className="btn-coral mt-5 text-sm md:text-base font-bold disabled:opacity-50 shadow-md cursor-pointer"
            >
              <Timer size={18} aria-hidden className="mr-2" /> {running ? "Visiting parent…" : "Start 60-second visit"}
            </button>
          ) : (
            <div data-testid="demo-done" className="mt-6 p-6 rounded-2xl bg-cream/70 border border-kerala/20">
              <p className="text-xl md:text-2xl font-bold text-navy text-balance">{COPY.demoEnd}</p>
              <p className="mt-2 text-sm text-navy/70 max-w-lg mx-auto">
                Bring your presence into their home every single day. Reserve a unit from our first Kerala pilot batch.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <a
                  href="#cta"
                  data-testid="demo-join"
                  data-tally-open={TALLY_CONFIG.formId}
                  data-tally-layout="modal"
                  data-tally-width={TALLY_CONFIG.modalWidth}
                  data-tally-emoji-text={TALLY_CONFIG.emoji}
                  className="btn-coral text-xs md:text-sm shadow-md cursor-pointer"
                >
                  Join pilot programme →
                </a>
                <a
                  href="#cta"
                  data-testid="demo-request"
                  data-tally-open={TALLY_CONFIG.formId}
                  data-tally-layout="modal"
                  data-tally-width={TALLY_CONFIG.modalWidth}
                  data-tally-emoji-text={TALLY_CONFIG.emoji}
                  className="btn-outline text-xs md:text-sm bg-white! cursor-pointer"
                >
                  Request a family demo
                </a>
                <a href="#how" data-testid="demo-roadmap" className="btn-outline text-xs md:text-sm bg-white!">
                  See product roadmap
                </a>
                <button
                  data-testid="btn-demo-replay"
                  onClick={replay}
                  className="btn-outline text-xs md:text-sm bg-white! cursor-pointer"
                >
                  <RotateCcw size={15} aria-hidden className="mr-1.5" /> Replay visit
                </button>
              </div>
            </div>
          )}

          <ol className="mt-7 text-left text-xs md:text-sm space-y-2 max-w-lg mx-auto">
            {STEPS.map((s, i) => {
              const isActive = (running || done) && i === activeIdx;
              const isPast = done || (running && sec > s.end);
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-testid={`demo-step-${i}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`block rounded-xl px-3.5 py-2.5 transition-all duration-200 border ${
                      isActive
                        ? "bg-navy text-cream font-bold border-navy shadow-md scale-[1.02]"
                        : isPast
                          ? "text-navy/70 bg-cream/50 border-transparent line-through"
                          : "text-navy/85 bg-white border-navy/10 hover:bg-cream/60"
                    }`}
                  >
                    • {s.label} →
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
