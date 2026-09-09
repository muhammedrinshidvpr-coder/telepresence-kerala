"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Radio, EyeOff, PlugZap, CheckCircle2 } from "lucide-react";
import { COPY } from "@/lib/copy";

type StateMode = "available" | "privacy" | "docked";

const STATE_DETAILS: Record<StateMode, { title: string; desc: string; points: string[] }> = {
  available: {
    title: "Active Telepresence — Present with Mutual Permission",
    desc: "Active connection between authorized family members. Clear status light and spoken Malayalam greeting ensure zero surprises.",
    points: [
      "Camera & microphone active with live LED status indicator.",
      "Gentle spoken Malayalam arrival announcement plays upon entry.",
      "Direct encrypted peer-to-peer WebRTC connection.",
    ],
  },
  privacy: {
    title: "Privacy Shield — Completely Disconnected",
    desc: "Elder or relative can engage privacy mode at any moment. Optical feed is physically unpowered.",
    points: [
      "Camera & microphone hardware physically cut off.",
      "Rover comes to an immediate halt and locks remote drive.",
      "Zero telemetry broadcast while in privacy mode.",
    ],
  },
  docked: {
    title: "Docked & Resting — Facing Privacy Position",
    desc: "Autonomous return to charging station when not in use, facing inward toward the wall.",
    points: [
      "Camera automatically turned toward the charging wall.",
      "Battery recharges safely through magnetic dock contacts.",
      "No remote movement permitted unless explicitly requested.",
    ],
  },
};

export default function PrivacyStates() {
  const [mode, setMode] = useState<StateMode>("available");
  const current = STATE_DETAILS[mode];

  return (
    <section id="privacy" data-testid="privacy" aria-labelledby="privacy-h" className="bg-gradient-to-b from-[#faf4e8] to-cream py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-kerala bg-kerala-light px-3.5 py-1.5 rounded-full mb-3">
            Dignity & Privacy First
          </span>
          <h2 id="privacy-h" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy text-balance">
            Complete WebRTC Privacy — Zero System Intrusion
          </h2>
          <p className="mt-3 text-base md:text-lg text-navy/75 text-balance">{COPY.privacyNote}</p>
        </div>

        {/* State Toggle Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Rover privacy states">
          {(["available", "privacy", "docked"] as StateMode[]).map((k) => (
            <button
              key={k}
              data-testid={`privacy-${k}`}
              aria-pressed={mode === k}
              onClick={() => setMode(k)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border min-h-[44px] capitalize transition-all cursor-pointer active:scale-95 shadow-sm ${
                mode === k
                  ? "bg-navy text-cream border-navy shadow-md ring-2 ring-navy/20"
                  : "border-navy/15 bg-white text-navy hover:bg-cream"
              }`}
            >
              {k === "available" ? "🟢 Active Presence" : k === "privacy" ? "🛡️ Privacy Mode" : "⚡ Docked / Charging"}
            </button>
          ))}
        </div>

        {/* Active State Card */}
        <div className="mt-8 card-warm p-6 md:p-8 max-w-3xl mx-auto shadow-xl border border-navy/10 bg-white rounded-3xl" data-testid="privacy-detail" aria-live="polite">
          <div className="flex items-center gap-3">
            <span className={`w-3.5 h-3.5 rounded-full ${mode === "available" ? "bg-green-500 animate-pulse" : mode === "privacy" ? "bg-warm" : "bg-blue-500"}`} />
            <h3 className="font-bold text-lg md:text-xl text-navy">{current.title}</h3>
          </div>
          <p className="mt-2 text-sm text-navy/75">{current.desc}</p>
          <ul className="mt-5 space-y-2.5 text-xs md:text-sm text-navy/85 border-t border-navy/5 pt-4">
            {current.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-kerala shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WebRTC Zero Intrusion Focus (Replacing Built-in Trust Architecture) */}
        <div className="mt-14 max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="card-warm p-6 bg-white rounded-2xl border border-navy/10 shadow-md flex flex-col justify-between">
            <div>
              <span className="w-12 h-12 rounded-xl bg-kerala-light text-kerala grid place-items-center mb-4 shadow-inner">
                <Lock size={22} />
              </span>
              <h4 className="font-extrabold text-base text-navy">Direct P2P WebRTC</h4>
              <p className="mt-2 text-xs md:text-sm text-navy/75 leading-relaxed">
                Encrypted point-to-point data transport between your phone and the Kerala rover with zero intermediary servers buffering your private family moments.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy/5 text-[11px] font-bold text-kerala uppercase tracking-wide">
              End-to-End Encrypted
            </div>
          </div>

          <div className="card-warm p-6 bg-white rounded-2xl border border-navy/10 shadow-md flex flex-col justify-between">
            <div>
              <span className="w-12 h-12 rounded-xl bg-coral/10 text-coral-deep grid place-items-center mb-4 shadow-inner">
                <EyeOff size={22} />
              </span>
              <h4 className="font-extrabold text-base text-navy">Zero Intrusion Guarantee</h4>
              <p className="mt-2 text-xs md:text-sm text-navy/75 leading-relaxed">
                No footage is ever recorded, stored in the cloud, or analyzed. We build physical companion presence, never intrusive surveillance or telemetry snooping.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy/5 text-[11px] font-bold text-coral-deep uppercase tracking-wide">
              Zero Cloud Recordings
            </div>
          </div>

          <div className="card-warm p-6 bg-white rounded-2xl border border-navy/10 shadow-md flex flex-col justify-between">
            <div>
              <span className="w-12 h-12 rounded-xl bg-navy/10 text-navy grid place-items-center mb-4 shadow-inner">
                <Radio size={22} />
              </span>
              <h4 className="font-extrabold text-base text-navy">Never Silent, Always Kind</h4>
              <p className="mt-2 text-xs md:text-sm text-navy/75 leading-relaxed">
                The rover lights up visibly and speaks aloud in Malayalam when a family member enters. Your parents retain physical privacy with complete peace of mind.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy/5 text-[11px] font-bold text-navy uppercase tracking-wide">
              100% Transparent Presence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
