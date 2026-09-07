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
    <section id="privacy" data-testid="privacy" aria-labelledby="privacy-h" className="bg-cream py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-kerala">Privacy and trust</p>
        <h2 id="privacy-h" className="mt-2 text-3xl md:text-4xl font-bold">Respectful by design, not by promise</h2>
        <p className="mt-2 text-navy/70">{COPY.privacyNote}</p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Privacy states">
          {(["available", "privacy", "docked"] as S[]).map((k) => (
            <button key={k} data-testid={`privacy-${k}`} aria-pressed={s === k} onClick={() => setS(k)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 capitalize ${s === k ? "bg-navy text-cream border-navy" : "border-navy/20 bg-white"}`}>
              {k === "available" ? "Available" : k === "privacy" ? "Privacy mode" : "Docked"}
            </button>
          ))}
        </div>

        <div className="mt-4 card-warm p-5" data-testid="privacy-detail" aria-live="polite">
          <p className="font-bold text-lg">{DETAIL[s].title}</p>
          <ul className="mt-2 space-y-1 text-navy/75">{DETAIL[s].points.map((p) => <li key={p}>• {p}</li>)}</ul>
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRUST.map((f) => (
            <li key={f.t} className="card-warm p-4 flex items-center gap-3 text-sm font-medium">
              <span className="w-9 h-9 rounded-xl bg-kerala-light text-kerala grid place-items-center shrink-0" aria-hidden><f.icon size={18} /></span>
              {f.t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
