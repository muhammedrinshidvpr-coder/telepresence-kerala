"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ROBOT_HOTSPOTS } from "@/lib/copy";

type Mode = "day" | "night" | "charging";
type View = "front" | "side" | "rear";

function ProceduralRobot({ mode }: { mode: Mode }) {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    const active = mode !== "charging";
    if (lightRef.current) {
      lightRef.current.emissiveIntensity = active ? 1.6 + Math.sin(state.clock.elapsedTime * 3) * 0.4 : 0.15;
    }
  });
  const body = mode === "night" ? "#1d2f4d" : "#f6f1e5";
  return (
    <group ref={group} data-testid="robot-3d">
      {/* base + wheels */}
      <mesh position={[-0.55, 0.25, 0]}><cylinderGeometry args={[0.28, 0.28, 0.22, 24]} /><meshStandardMaterial color="#14243e" /></mesh>
      <mesh position={[0.55, 0.25, 0]}><cylinderGeometry args={[0.28, 0.28, 0.22, 24]} /><meshStandardMaterial color="#14243e" /></mesh>
      <mesh position={[0, 0.45, 0]}><boxGeometry args={[1.3, 0.35, 0.8]} /><meshStandardMaterial color="#0c1729" /></mesh>
      {/* pole */}
      <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.09, 0.11, 1.3, 20]} /><meshStandardMaterial color={body} /></mesh>
      {/* head */}
      <mesh position={[0, 2.1, 0]}><boxGeometry args={[0.85, 0.7, 0.35]} /><meshStandardMaterial color={body} /></mesh>
      <mesh position={[0, 2.1, 0.19]}><planeGeometry args={[0.6, 0.45]} /><meshStandardMaterial color={mode === "charging" ? "#3a4a63" : "#0c1729"} /></mesh>
      {/* camera dot */}
      <mesh position={[0, 2.32, 0.2]}><circleGeometry args={[0.05, 16]} /><meshStandardMaterial color={mode === "privacy" as unknown as Mode ? "#666" : "#ffc75f"} emissive="#ffc75f" emissiveIntensity={1.2} /></mesh>
      {/* status light */}
      <mesh position={[0, 2.5, 0]}><sphereGeometry args={[0.09, 16, 16]} /><meshStandardMaterial ref={lightRef} color={mode === "charging" ? "#1b7a4d" : "#ff6b4a"} emissive={mode === "charging" ? "#1b7a4d" : "#ff6b4a"} emissiveIntensity={1.6} /></mesh>
      {/* charging contacts */}
      <mesh position={[0, 0.22, 0.42]}><boxGeometry args={[0.4, 0.08, 0.05]} /><meshStandardMaterial color="#ffc75f" metalness={0.6} roughness={0.3} /></mesh>
    </group>
  );
}

export default function RobotReveal() {
  const [mode, setMode] = useState<Mode>("day");
  const [view, setView] = useState<View>("front");
  const [hotspot, setHotspot] = useState<string>("camera");
  const [webglOk, setWebglOk] = useState(true);
  const active = ROBOT_HOTSPOTS.find((h) => h.id === hotspot);

  const camPos: [number, number, number] =
    view === "front" ? [0, 2, 5.2] : view === "side" ? [5.2, 2, 0.6] : [0, 2.4, -5.2];

  return (
    <section id="robot" data-testid="robot" aria-labelledby="robot-h" className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">Product reveal</p>
        <h2 id="robot-h" className="mt-2 text-3xl md:text-4xl font-bold">One small robot, many ways to be present</h2>
        <p className="mt-2 text-navy/70">Rotate, zoom, tap a part. Switch Day, Night and Charging modes.</p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Robot modes">
          {(["day", "night", "charging"] as Mode[]).map((m) => (
            <button key={m} data-testid={`mode-${m}`} aria-pressed={mode === m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 capitalize ${mode === m ? "bg-navy text-cream border-navy" : "border-navy/20"}`}>
              {m === "day" ? "Day mode" : m === "night" ? "Night mode" : "Charging mode"}
            </button>
          ))}
          <span className="mx-2 hidden sm:inline text-navy/30">|</span>
          {(["front", "side", "rear"] as View[]).map((v) => (
            <button key={v} data-testid={`view-${v}`} aria-pressed={view === v} onClick={() => setView(v)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border min-h-11 capitalize ${view === v ? "bg-kerala text-white border-kerala" : "border-navy/20"}`}>
              {v}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="card-warm overflow-hidden" data-testid="robot-viewer">
            {webglOk ? (
              <div className="h-[380px] bg-gradient-to-b from-cream to-cream-dark" data-testid="robot-canvas-wrap">
                <Suspense fallback={<p className="p-6">Loading robot…</p>}>
                  <Canvas
                    camera={{ position: camPos, fov: 45 }}
                    onCreated={({ gl }) => {
                      if (!gl.getContext()) setWebglOk(false);
                    }}
                    data-testid="robot-canvas"
                  >
                    <ambientLight intensity={mode === "night" ? 0.5 : 1.1} />
                    <directionalLight position={[4, 6, 4]} intensity={mode === "night" ? 0.6 : 1.4} />
                    <pointLight position={[0, 3, 2]} intensity={mode === "charging" ? 0.4 : 0.9} color="#ffc75f" />
                    <ProceduralRobot mode={mode} />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                      <circleGeometry args={[2.4, 40]} />
                      <meshStandardMaterial color={mode === "charging" ? "#e3f2e9" : "#eadfc8"} />
                    </mesh>
                    <OrbitControls enablePan={false} minDistance={3} maxDistance={9} />
                  </Canvas>
                </Suspense>
              </div>
            ) : (
              <div className="h-[380px] grid place-items-center p-8 text-center" data-testid="robot-fallback">
                <div><p className="text-6xl" aria-hidden>🤖</p><p className="mt-2 font-semibold">3D unavailable — robot illustration shown instead.</p></div>
              </div>
            )}
            <p className="px-5 py-3 text-sm text-navy/60">Mode: <strong data-testid="robot-mode-label">{mode}</strong> • View: <strong>{view}</strong> • Drag to rotate, scroll to zoom.</p>
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
              <p className="mt-2 text-sm text-navy/60">Tap another label to learn more. Technical detail only on request.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
