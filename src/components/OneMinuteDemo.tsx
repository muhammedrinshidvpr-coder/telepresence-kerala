"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { COPY } from "@/lib/copy";

const STEPS = [
  "0–10 sec: Choose your location",
  "10–20 sec: Connect to the Kerala home",
  "20–35 sec: Drive the robot",
  "35–45 sec: Start a two-way conversation",
  "45–55 sec: Activate privacy mode",
  "55–60 sec: Return to charging dock",
];

export default function OneMinuteDemo() {
  const [running, setRunning] = useState(false);
  const [sec, setSec] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const [fast, setFast] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("demoFast")) setFast(true);
  }, []);

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

  const label = sec <= 10 ? STEPS[0] : sec <= 20 ? STEPS[1] : sec <= 35 ? STEPS[2] : sec <= 45 ? STEPS[3] : sec <= 55 ? STEPS[4] : STEPS[5];

  return (
    <section id="demo" data-testid="demo" aria-labelledby="demo-h" className="bg-cream py-14">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">One-minute demo</p>
        <h2 id="demo-h" className="mt-2 text-3xl md:text-4xl font-bold">Try a 60-second visit</h2>
        <p className="mt-2 text-navy/70">No registration. Just press start.</p>
        <div className="card-warm mt-6 p-6">
          <p className="text-6xl font-bold tabular-nums" data-testid="demo-timer" aria-live="polite">{sec}s</p>
          <div className="mt-2 h-3 rounded-full bg-cream-dark overflow-hidden" role="progressbar" aria-valuenow={sec} aria-valuemin={0} aria-valuemax={60} aria-label="Demo progress">
            <div className="h-full bg-coral transition-all" style={{ width: `${(sec / 60) * 100}%` }} data-testid="demo-progress" />
          </div>
          <p className="mt-3 font-semibold" data-testid="demo-step">{running || done ? label : "Ready when you are."}</p>
          {!done ? (
            <button data-testid="btn-demo-start" onClick={start} disabled={running} className="btn-coral mt-4 disabled:opacity-50">
              <Timer size={17} aria-hidden className="mr-2" /> {running ? "Visiting…" : "Start 60-second visit"}
            </button>
          ) : (
            <div data-testid="demo-done">
              <p className="mt-4 text-xl font-bold">{COPY.demoEnd}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a href="#cta" data-testid="demo-join" className="btn-coral text-sm">Join pilot programme</a>
                <a href="#cta" data-testid="demo-request" className="btn-outline text-sm">Request a family demo</a>
                <a href="#how" data-testid="demo-roadmap" className="btn-outline text-sm">See the product roadmap</a>
              </div>
            </div>
          )}
          <ol className="mt-5 text-left text-xs text-navy/60 space-y-1 max-w-md mx-auto">
            {STEPS.map((s) => <li key={s}>• {s}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
