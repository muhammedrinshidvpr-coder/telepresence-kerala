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
    <section id="control" data-testid="control" aria-labelledby="control-h" className="bg-gradient-to-b from-[#0e1b30] via-navy to-[#0c1729] text-cream py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-warm bg-warm/15 inline-block px-3.5 py-1.5 rounded-full">
            Main Interactive Simulation
          </p>
          <h2 id="control-h" className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Drive, see, and talk — in under a minute
          </h2>
          <p className="mt-3 text-base md:text-lg text-cream/80 text-balance">
            No training needed. Press <strong className="text-warm font-semibold">Start check-in</strong> to wake the robot, steer through rooms, and greet your family.
          </p>
        </div>

        <div className="mt-10 card-warm bg-white! text-navy shadow-2xl border border-white/20 overflow-hidden">
          {/* Top Telemetry Header */}
          <div className="bg-navy-deep text-cream px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
              <p className="font-bold text-sm md:text-base tracking-wide" data-testid="control-room-label">
                [ Parent&apos;s Home — {room} ]
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="hidden sm:inline text-cream/85">WiFi: 5GHz • Latency: 42ms</span>
              <p className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold" data-testid="control-phase">
                <span className={`w-2 h-2 rounded-full ${live ? "bg-green-400 animate-ping" : phase === "privacy" ? "bg-warm" : "bg-cream/70"}`} aria-hidden />
                {phase === "docked" ? "Docked • charging" : phase === "notified" ? "Ringing family device…" : phase === "waking" ? "Waking…" : phase === "live" ? "Live video" : phase === "talking" ? "Talking" : phase === "privacy" ? "Privacy mode" : phase === "returning" ? "Returning to dock…" : "Visit complete"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.35fr_1fr] items-start">
            {/* Map Column */}
            <div className="p-4 md:p-6">
              <div
                ref={mapRef}
                className="relative rounded-2xl overflow-hidden border-2 border-navy/15 bg-[#fdfbf7] touch-none select-none shadow-inner"
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
                  {/* Living Room */}
                  <rect x="12" y="12" width="180" height="128" rx="10" fill="#ffffff" stroke="#14243e" strokeWidth="1.5" strokeOpacity="0.25" />
                  <rect x="30" y="45" width="45" height="60" rx="6" fill="#f1e7d2" opacity="0.6" />
                  <text x="24" y="32" fontSize="12" fontWeight="700" fill="#14243e">Living Room</text>
                  <text x="36" y="78" fontSize="9" fill="#14243e" opacity="0.5">Sofa</text>

                  {/* Dining Area */}
                  <rect x="204" y="12" width="184" height="128" rx="10" fill="#ffffff" stroke="#14243e" strokeWidth="1.5" strokeOpacity="0.25" />
                  <ellipse cx="295" cy="76" rx="35" ry="24" fill="#f1e7d2" opacity="0.6" />
                  <text x="216" y="32" fontSize="12" fontWeight="700" fill="#14243e">Dining area</text>
                  <text x="280" y="80" fontSize="9" fill="#14243e" opacity="0.5">Dining Table</text>

                  {/* Bedroom Entrance */}
                  <rect x="12" y="152" width="180" height="136" rx="10" fill="#ffffff" stroke="#14243e" strokeWidth="1.5" strokeOpacity="0.25" />
                  <rect x="25" y="210" width="60" height="65" rx="4" fill="#f1e7d2" opacity="0.6" />
                  <text x="24" y="174" fontSize="12" fontWeight="700" fill="#14243e">Bedroom entrance</text>

                  {/* Front Door + Dock Station */}
                  <rect x="204" y="152" width="184" height="136" rx="10" fill="#e8f5ee" stroke="#1b7a4d" strokeWidth="1.5" strokeOpacity="0.45" />
                  <text x="216" y="174" fontSize="12" fontWeight="700" fill="#1b7a4d">Front door + dock 🔋</text>
                  <rect x="330" y="235" width="40" height="40" rx="8" fill="#1b7a4d" opacity="0.2" />
                  <text x="338" y="260" fontSize="10" fill="#1b7a4d">DOCK</text>

                  {/* Doorways / Corridors */}
                  <rect x="188" y="60" width="20" height="36" fill="#faf4e8" stroke="#14243e" strokeOpacity="0.2" />
                  <rect x="92" y="136" width="48" height="20" fill="#faf4e8" stroke="#14243e" strokeOpacity="0.2" />
                  <rect x="280" y="136" width="48" height="20" fill="#faf4e8" stroke="#14243e" strokeOpacity="0.2" />

                  {/* Robot Avatar on Map */}
                  <g transform={`translate(${(pos.x / 100) * 400},${(pos.y / 100) * 300})`}>
                    <circle r="22" fill="#c93f20" fillOpacity="0.2" className={live ? "animate-ping" : ""} />
                    <circle r="16" fill="#14243e" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                    <circle r="10" fill={privacy ? "#6b7280" : "#c93f20"} data-testid="robot-dot" />
                    <circle r="4" fill="#ffd470" />
                  </g>
                </svg>

                {/* Room Switcher Pills */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex gap-1.5 justify-center flex-wrap">
                  {ROOMS.map((r, i) => (
                    <button
                      key={r}
                      data-testid={`room-${i}`}
                      onClick={() => setRoom(i)}
                      className={`text-[11px] md:text-xs px-3 py-1.5 rounded-full font-bold border min-h-[38px] transition-all cursor-pointer active:scale-95 shadow-sm ${
                        i === roomIdx
                          ? "bg-navy text-cream border-navy ring-1 ring-navy"
                          : "bg-white/95 text-navy border-navy/15 hover:bg-cream"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* Parent Speaking Bubble */}
                {phase === "talking" && (
                  <div className="absolute bottom-3 left-3 right-3 bg-navy/95 backdrop-blur-md text-cream rounded-xl p-3.5 flex items-center gap-3.5 shadow-xl border border-white/20 animate-fadeIn" data-testid="parent-card">
                    <span className="text-3xl bg-white/10 p-1.5 rounded-full" aria-hidden>👵</span>
                    <div>
                      <p className="font-bold text-sm text-warm">Amma is speaking</p>
                      <p className="text-xs text-cream/90 font-medium">{greetingMl}</p>
                      <p className="text-[11px] text-cream/90">{greetingEn}</p>
                    </div>
                  </div>
                )}

                {/* Privacy Mode Overlay */}
                {privacy && (
                  <div className="absolute inset-0 bg-navy/85 backdrop-blur-sm text-cream grid place-items-center text-center p-6" data-testid="privacy-overlay">
                    <div>
                      <ShieldCheck size={40} className="mx-auto text-warm mb-2" />
                      <p className="font-bold text-base">Privacy mode active</p>
                      <p className="text-xs text-cream/90 mt-1 max-w-xs">Camera and microphone physically disabled. Robot stationary.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Control Strip */}
              <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Call controls">
                <button
                  data-testid="btn-mic"
                  aria-pressed={mic}
                  onClick={() => setMic((v) => !v)}
                  className={`px-3.5 py-2 rounded-full border text-xs md:text-sm font-semibold min-h-[42px] cursor-pointer transition-all active:scale-95 ${
                    mic ? "bg-kerala-light text-kerala border-kerala/30" : "bg-gray-100 text-gray-500 border-gray-300"
                  }`}
                >
                  [Mic {mic ? "on" : "off"}]
                </button>
                <button
                  data-testid="btn-talk"
                  onClick={talk}
                  disabled={!live}
                  className="btn-coral py-2! px-4! text-xs md:text-sm font-bold disabled:opacity-40 shadow-sm"
                >
                  <Phone size={15} className="inline mr-1.5" aria-hidden /> Talk to Amma
                </button>
                <button
                  data-testid="btn-camera"
                  aria-pressed={camera}
                  onClick={() => setCamera((v) => !v)}
                  className="px-3.5 py-2 rounded-full border border-navy/20 text-xs md:text-sm font-semibold min-h-[42px] cursor-pointer hover:bg-cream/60 transition-all active:scale-95"
                >
                  <Video size={15} className="inline mr-1.5" aria-hidden /> Camera {camera ? "on" : "off"}
                </button>
                <button
                  data-testid="btn-privacy"
                  aria-pressed={privacy}
                  onClick={togglePrivacy}
                  className={`px-3.5 py-2 rounded-full border text-xs md:text-sm font-semibold min-h-[42px] cursor-pointer transition-all active:scale-95 ${
                    privacy ? "bg-warm text-navy border-warm font-bold" : "border-navy/20 hover:bg-cream/60"
                  }`}
                >
                  <ShieldCheck size={15} className="inline mr-1.5" aria-hidden /> Privacy
                </button>
              </div>
            </div>

            {/* Joystick and Drive Column */}
            <div className="p-4 md:p-6 border-t lg:border-t-0 lg:border-l border-navy/10 bg-[#faf7f0]/60">
              <p className="text-xs font-bold uppercase tracking-wider text-navy/85 text-center mb-3">Steering & Drive Controls</p>

              <div className="grid grid-cols-3 gap-2 w-48 mx-auto touch-none" role="group" aria-label="Drive controls" data-testid="joystick">
                <span />
                <button
                  data-testid="move-up"
                  aria-label="Move forward"
                  onClick={() => move(0, -8)}
                  className="p-3.5 rounded-2xl bg-navy text-cream grid place-items-center min-h-[48px] shadow-md hover:bg-navy-deep active:scale-90 transition-all cursor-pointer"
                >
                  <ArrowUp size={20} aria-hidden />
                </button>
                <span />
                <button
                  data-testid="move-left"
                  aria-label="Move left"
                  onClick={() => move(-8, 0)}
                  className="p-3.5 rounded-2xl bg-navy text-cream grid place-items-center min-h-[48px] shadow-md hover:bg-navy-deep active:scale-90 transition-all cursor-pointer"
                >
                  <ArrowLeft size={20} aria-hidden />
                </button>
                <button
                  data-testid="move-center"
                  aria-label="Stop"
                  onClick={() => push("Paused.")}
                  className="p-3.5 rounded-2xl bg-cream-dark text-navy grid place-items-center font-bold min-h-[48px] shadow-inner active:scale-90 transition-all cursor-pointer"
                >
                  ●
                </button>
                <button
                  data-testid="move-right"
                  aria-label="Move right"
                  onClick={() => move(8, 0)}
                  className="p-3.5 rounded-2xl bg-navy text-cream grid place-items-center min-h-[48px] shadow-md hover:bg-navy-deep active:scale-90 transition-all cursor-pointer"
                >
                  <ArrowRight size={20} aria-hidden />
                </button>
                <span />
                <button
                  data-testid="move-down"
                  aria-label="Move back"
                  onClick={() => move(0, 8)}
                  className="p-3.5 rounded-2xl bg-navy text-cream grid place-items-center min-h-[48px] shadow-md hover:bg-navy-deep active:scale-90 transition-all cursor-pointer"
                >
                  <ArrowDown size={20} aria-hidden />
                </button>
                <span />
              </div>

              <p className="text-center text-xs text-navy/85 mt-3 text-balance">
                Drive using buttons, keyboard arrow keys, or drag the robot dot on the map.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  data-testid="btn-checkin"
                  onClick={startCheckin}
                  disabled={live || phase === "notified" || phase === "waking"}
                  className="btn-coral px-3! text-xs font-bold disabled:opacity-40 shadow-sm"
                >
                  <Play size={15} aria-hidden className="mr-1" /> {phase === "docked" || phase === "ended" ? "Start check-in" : "Check in"}
                </button>
                <button
                  data-testid="btn-dock"
                  onClick={endCheckin}
                  disabled={phase === "docked"}
                  className="btn-outline px-3! text-xs font-bold disabled:opacity-40"
                >
                  <Dock size={15} aria-hidden className="mr-1" /> Return to dock
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-navy/80 bg-white p-2.5 rounded-xl border border-navy/10">
                <Mic size={15} aria-hidden className={mic ? "text-kerala" : "text-navy/30"} />
                <span data-testid="mic-state">{privacy ? "Microphone off (privacy)" : mic ? "Microphone live" : "Microphone muted"}</span>
              </div>

              <ol className="mt-3 text-[11px] font-mono space-y-1 bg-[#f4ebdc] text-navy/80 rounded-xl p-3 max-h-28 overflow-auto border border-navy/10" data-testid="control-log" aria-live="polite">
                {log.map((m, i) => <li key={i}>• {m}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
