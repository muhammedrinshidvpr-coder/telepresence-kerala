"use client";

import { useState } from "react";
import { Eye, EyeOff, PlugZap, BellRing, Fingerprint, History, Ban, MapPinOff, KeyRound } from "lucide-react";
import { COPY } from "@/lib/copy";

type S = "available" | "privacy" | "docked";

const DETAIL: Record<S, { title: string; points: string[] }> = {
  available: {
    title: "Available — present with permission",
    points: ["Camera and microphone active.", "Status light visible.", "Robot announces the incoming family member."],
  },
  privacy: {
    title: "Privacy mode — clearly off",
    points: ["Camera disabled.", "Microphone disabled.", "Robot stays still or moves to a safe position."],
  },
  docked: {
    title: "Docked — resting, facing privacy position",
    points: ["Faces a wall or privacy position.", "Charging begins.", "No remote movement unless permitted."],
  },
};

const TRUST = [
  { icon: Eye, t: "Visible active/inactive indicator" },
  { icon: BellRing, t: "Audible announcement when someone connects" },
  { icon: Fingerprint, t: "Elder-controlled privacy button" },
  { icon: KeyRound, t: "Approved family-member access + login security" },
  { icon: History, t: "Activity history, no hidden recording by default" },
  { icon: Ban, t: "Clear consent before remote access" },
  { icon: MapPinOff, t: "Privacy zones the robot cannot enter" },
  { icon: EyeOff, t: "Physical privacy cover position" },
  { icon: PlugZap, t: "Safe docked posture while charging" },
];

export default function PrivacyStates() {
  const [s, setS] = useState<S>("available");
  return (
    <section id="privacy" data-testid="privacy" aria-labelledby="privacy-h" className="bg-gradient-to-b from-[#faf4e8] to-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-3.5 py-1 rounded-full mb-3">
            Privacy & Dignity First
          </span>
          <h2 id="privacy-h" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy text-balance">
            Respectful by design, not by promise
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/70 text-balance">{COPY.privacyNote}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Privacy states">
          {(["available", "privacy", "docked"] as S[]).map((k) => (
            <button
              key={k}
              data-testid={`privacy-${k}`}
              aria-pressed={s === k}
              onClick={() => setS(k)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border min-h-[44px] capitalize transition-all cursor-pointer active:scale-95 shadow-sm ${
                s === k
                  ? "bg-navy text-cream border-navy shadow-md ring-2 ring-navy/20"
                  : "border-navy/15 bg-white text-navy hover:bg-cream"
              }`}
            >
              {k === "available" ? "🟢 Available" : k === "privacy" ? "🛡️ Privacy mode" : "⚡ Docked"}
            </button>
          ))}
        </div>

        <div className="mt-6 card-warm p-6 md:p-8 max-w-3xl mx-auto shadow-xl border border-navy/10 bg-white" data-testid="privacy-detail" aria-live="polite">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${s === "available" ? "bg-green-500" : s === "privacy" ? "bg-warm" : "bg-blue-500"}`} />
            <p className="font-bold text-lg md:text-xl text-navy">{DETAIL[s].title}</p>
          </div>
          <ul className="mt-4 space-y-2 text-xs md:text-sm text-navy/80">
            {DETAIL[s].points.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span className="text-kerala font-bold">✓</span> {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-wider text-navy/85 text-center mb-6">Built-in Trust Architecture</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TRUST.map((f) => (
              <li key={f.t} className="card-warm card-warm-hover p-4 md:p-5 flex items-center gap-3.5 text-xs md:text-sm font-semibold text-navy border border-navy/10 shadow-xs">
                <span className="w-10 h-10 rounded-xl bg-kerala-light text-kerala grid place-items-center shrink-0 shadow-inner" aria-hidden>
                  <f.icon size={20} />
                </span>
                <span className="leading-snug">{f.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
