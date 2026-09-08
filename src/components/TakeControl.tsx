"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Phone, Video, ShieldCheck, Dock, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useCity } from "./CityContext";

type Phase = "docked" | "notified" | "waking" | "live" | "talking" | "privacy" | "returning" | "ended";
type Room = "Living Room" | "Dining area" | "Bedroom entrance" | "Front door";

const ROOMS: Room[] = ["Living Room", "Dining area", "Bedroom entrance", "Front door"];
const ROOM_POS = [
  { x: 25, y: 25 },
  { x: 72, y: 25 },
  { x: 25, y: 72 },
  { x: 72, y: 72 },
];

export default function TakeControl() {
  const { city } = useCity();
  const greetingMl = `അമ്മേ, ${city.ml} നിന്ന് മകൻ വിളിക്കുന്നു.`;
  const greetingEn = `Amma, your son is calling from ${city.label}.`;

  const [phase, setPhase] = useState<Phase>("docked");
  const [roomIdx, setRoomIdx] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [log, setLog] = useState<string[]>(["Robot docked and charging."]);
  const [fast] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demoFast")
  );
  const timers = useRef<number[]>([]);
  const prevPhase = useRef<Phase>("live");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const push = useCallback((m: string) => setLog((l) => [...l.slice(-5), m]), []);
  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  const later = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, fast ? Math.min(ms, 400) : ms);
    timers.current.push(t);
  }, [fast]);

  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);

  const speak = useCallback((text: string) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ml-IN";
      u.rate = 0.95;
      synth.speak(u);
    } catch { /* no-op */ }
  }, []);

  const startCheckin = useCallback(() => {
    clearTimers();
    setPrivacy(false);
    setPhase("notified");
    push("Call notification on family device…");
    later(() => { setPhase("waking"); push("Robot wakes from charging mode."); }, 900);
    later(() => { setPhase("live"); push("Camera view open — drive through the living room."); }, 1800);
  }, [clearTimers, later, push]);

  const talk = useCallback(() => {
    setPhase((p) => {
      if (p !== "live") return p;
      push("Talk pressed — parent appears on screen.");
      speak(greetingMl);
      later(() => push(`Malayalam greeting played: “${greetingMl}”`), 600);
      return "talking";
    });
  }, [greetingMl, later, push, speak]);

  const endCheckin = useCallback(() => {
    clearTimers();
    try { window.speechSynthesis?.cancel(); } catch { /* no-op */ }
    setPrivacy(false);
    setPhase("returning");
    push("Check-in ended — returning to dock…");
    later(() => {
      setPhase("ended");
      setPos({ x: 50, y: 50 });
      setRoomIdx(0);
      push("Docked. Charging begins. No remote movement unless permitted.");
    }, 1400);
  }, [clearTimers, later, push]);

  const move = useCallback((dx: number, dy: number) => {
    if (phase !== "live" && phase !== "talking") return;
    setPos((p) => ({ x: Math.min(92, Math.max(8, p.x + dx)), y: Math.min(88, Math.max(12, p.y + dy)) }));
  }, [phase]);

  const live = phase === "live" || phase === "talking";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      if (!live) return;
      e.preventDefault();
      if (e.key === "ArrowUp") move(0, -6);
      if (e.key === "ArrowDown") move(0, 6);
      if (e.key === "ArrowLeft") move(-6, 0);
      if (e.key === "ArrowRight") move(6, 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [live, move]);

  const setRoom = useCallback((i: number) => {
    setRoomIdx(i);
    setPos(ROOM_POS[i]);
    push(`Moved view to ${ROOMS[i]}.`);
  }, [push]);

  const togglePrivacy = useCallback(() => {
    if (!privacy) {
      prevPhase.current = phase === "talking" || phase === "live" ? phase : "live";
      setPrivacy(true);
      setPhase("privacy");
      push("Privacy mode on — video unavailable.");
    } else {
      setPrivacy(false);
      setPhase(prevPhase.current);
      push("Privacy mode off — available again.");
    }
  }, [phase, privacy, push]);

  const posFromEvent = useCallback((clientX: number, clientY: number) => {
    const el = mapRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100));
    const y = Math.min(88, Math.max(12, ((clientY - r.top) / r.height) * 100));
    return { x, y };
  }, []);

  const room = ROOMS[roomIdx];

  return (
    <section id="control" data-testid="control" aria-labelledby="control-h" className="bg-navy text-cream py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-warm">Take control — the main demo</p>
        <h2 id="control-h" className="mt-2 text-3xl md:text-4xl font-bold">Drive, see, talk — in under a minute</h2>
        <p className="mt-2 text-cream/75">No instructions needed. Press Start check-in and follow the gentle prompts.</p>

        <div className="mt-6 card-warm bg-white! text-navy overflow-hidden">
          <div className="bg-navy-deep text-cream px-5 py-3 flex items-center justify-between gap-3">
            <p className="font-semibold" data-testid="control-room-label">[ Parent&apos;s Home — {room} ]</p>
            <p className="text-xs flex items-center gap-2 shrink-0" data-testid="control-phase">
              <span className={`w-2.5 h-2.5 rounded-full ${live ? "bg-green-400" : phase === "privacy" ? "bg-warm" : "bg-cream/40"}`} aria-hidden />
              {phase === "docked" ? "Docked • charging" : phase === "notified" ? "Ringing family device…" : phase === "waking" ? "Waking…" : phase === "live" ? "Live video" : phase === "talking" ? "Talking" : phase === "privacy" ? "Privacy mode" : phase === "returning" ? "Returning to dock…" : "Visit complete"}
            </p>
          </div>

          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="p-4">
              <div
                ref={mapRef}
                className="relative rounded-2xl overflow-hidden border border-navy/10 bg-cream touch-none select-none"
                data-testid="home-map"
                role="application"
                aria-label={`Simulated Kerala home, robot in ${room}. Drag the robot dot or use drive buttons.`}
                onPointerDown={(e) => {
                  if (!live || privacy) return;
                  const p = posFromEvent(e.clientX, e.clientY);
                  if (!p) return;
                  dragging.current = true;
                  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                  setPos(p);
                }}
                onPointerMove={(e) => {
                  if (!dragging.current || !live || privacy) return;
                  const p = posFromEvent(e.clientX, e.clientY);
                  if (p) setPos(p);
                }}
                onPointerUp={() => { dragging.current = false; }}
                onPointerCancel={() => { dragging.current = false; }}
              >
                <svg viewBox="0 0 400 300" className="w-full h-auto pointer-events-none">
                  <rect x="10" y="10" width="180" height="130" rx="10" fill="#fff" stroke="#14243e" strokeOpacity="0.2" />
                  <text x="22" y="32" fontSize="12" fill="#14243e">Living room</text>
                  <rect x="200" y="10" width="190" height="130" rx="10" fill="#fff" stroke="#14243e" strokeOpacity="0.2" />
                  <text x="212" y="32" fontSize="12" fill="#14243e">Dining area</text>
                  <rect x="10" y="150" width="180" height="140" rx="10" fill="#fff" stroke="#14243e" strokeOpacity="0.2" />
                  <text x="22" y="172" fontSize="12" fill="#14243e">Bedroom entrance</text>
                  <rect x="200" y="150" width="190" height="140" rx="10" fill="#e3f2e9" stroke="#1b7a4d" strokeOpacity="0.4" />
                  <text x="212" y="172" fontSize="12" fill="#1b7a4d">Front door + dock 🔋</text>
                  <rect x="185" y="60" width="20" height="40" fill="#faf4e8" stroke="#14243e" strokeOpacity="0.3" />
                  <rect x="90" y="140" width="60" height="12" fill="#faf4e8" stroke="#14243e" strokeOpacity="0.3" />
                  {/* robot */}
                  <g transform={`translate(${(pos.x / 100) * 400},${(pos.y / 100) * 300})`}>
                    <circle r="16" fill="#14243e" />
                    <circle r="10" fill={privacy ? "#666" : "#c93f20"} data-testid="robot-dot" />
                    <circle r="4" fill="#ffc75f" />
                  </g>
                </svg>
                <div className="absolute top-3 left-3 right-3 flex gap-2 justify-center flex-wrap">
                  {ROOMS.map((r, i) => (
                    <button key={r} data-testid={`room-${i}`} onClick={() => setRoom(i)}
                      className={`text-xs px-2.5 py-1.5 rounded-full font-semibold border min-h-11 ${i === roomIdx ? "bg-navy text-cream" : "bg-white/90"}`}>
                      {r}
                    </button>
                  ))}
                </div>
                {phase === "talking" && (
                  <div className="absolute bottom-3 left-3 right-3 bg-navy/90 text-cream rounded-xl p-3 flex items-center gap-3" data-testid="parent-card">
                    <span className="text-3xl" aria-hidden>👵</span>
                    <div><p className="font-semibold text-sm">Amma is here</p><p className="text-xs text-cream/75">{greetingMl}</p><p className="text-xs text-cream/70">{greetingEn}</p></div>
                  </div>
                )}
                {privacy && (
                  <div className="absolute inset-0 bg-navy/70 text-cream grid place-items-center text-center p-6" data-testid="privacy-overlay">
                    <p className="font-bold">Privacy mode — camera and microphone off. Robot stays still.</p>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Call controls">
                <button data-testid="btn-mic" aria-pressed={mic} onClick={() => setMic((v) => !v)} className="px-3 py-2 rounded-full border text-sm font-semibold min-h-11">[Mic {mic ? "on" : "off"}]</button>
                <button data-testid="btn-talk" onClick={talk} disabled={!live} className="px-4 py-2 rounded-full bg-coral text-white text-sm font-semibold min-h-11 disabled:opacity-40"><Phone size={15} className="inline mr-1" aria-hidden /> Talk</button>
                <button data-testid="btn-camera" aria-pressed={camera} onClick={() => setCamera((v) => !v)} className="px-3 py-2 rounded-full border text-sm font-semibold min-h-11"><Video size={15} className="inline mr-1" aria-hidden /> Camera {camera ? "on" : "off"}</button>
                <button data-testid="btn-privacy" aria-pressed={privacy} onClick={togglePrivacy} className="px-3 py-2 rounded-full border text-sm font-semibold min-h-11"><ShieldCheck size={15} className="inline mr-1" aria-hidden /> Privacy</button>
              </div>
            </div>

            <div className="p-4 border-t md:border-t-0 md:border-l border-navy/10">
              <div className="grid grid-cols-3 gap-2 w-44 mx-auto touch-none" role="group" aria-label="Drive controls" data-testid="joystick">
                <span />
                <button data-testid="move-up" aria-label="Move forward" onClick={() => move(0, -8)} className="p-3 rounded-xl bg-navy text-cream grid place-items-center min-h-12"><ArrowUp aria-hidden /></button>
                <span />
                <button data-testid="move-left" aria-label="Move left" onClick={() => move(-8, 0)} className="p-3 rounded-xl bg-navy text-cream grid place-items-center min-h-12"><ArrowLeft aria-hidden /></button>
                <button data-testid="move-center" aria-label="Stop" onClick={() => push("Paused.")} className="p-3 rounded-xl bg-cream-dark grid place-items-center font-bold min-h-12">●</button>
                <button data-testid="move-right" aria-label="Move right" onClick={() => move(8, 0)} className="p-3 rounded-xl bg-navy text-cream grid place-items-center min-h-12"><ArrowRight aria-hidden /></button>
                <span />
                <button data-testid="move-down" aria-label="Move back" onClick={() => move(0, 8)} className="p-3 rounded-xl bg-navy text-cream grid place-items-center min-h-12"><ArrowDown aria-hidden /></button>
                <span />
              </div>
              <p className="text-center text-xs text-navy/70 mt-2">Drive with buttons, arrow keys, or drag the robot dot. Elder needs no controls.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button data-testid="btn-checkin" onClick={startCheckin} disabled={live || phase === "notified" || phase === "waking"} className="btn-coral px-3! text-sm disabled:opacity-40"><Play size={15} aria-hidden className="mr-1" /> {phase === "docked" || phase === "ended" ? "Start check-in" : "Check in"}</button>
                <button data-testid="btn-dock" onClick={endCheckin} disabled={phase === "docked"} className="btn-outline px-3! text-sm disabled:opacity-40"><Dock size={15} aria-hidden className="mr-1" /> Return to dock</button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Mic size={15} aria-hidden className={mic ? "text-kerala" : "text-navy/30"} />
                <span data-testid="mic-state">{privacy ? "Microphone off (privacy)" : mic ? "Microphone live" : "Microphone muted"}</span>
              </div>
              <ol className="mt-3 text-xs space-y-1 bg-cream rounded-xl p-3 max-h-28 overflow-auto" data-testid="control-log" aria-live="polite">
                {log.map((m, i) => <li key={i}>• {m}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
