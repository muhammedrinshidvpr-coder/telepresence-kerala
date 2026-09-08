"use client";

import { Component, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type RobotMode = "day" | "night" | "charging";
export type RobotView = "front" | "side" | "rear";

/** Catches WebGL failures (disabled GPU, headless shell) so the page
 *  degrades to the static fallback instead of unmounting entirely. */
export class RobotErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export const CAM_POS: Record<RobotView, [number, number, number]> = {
  front: [0, 2, 5.2],
  side: [5.2, 2, 0.6],
  rear: [0, 2.4, -5.2],
};

function CameraRig({ view }: { view: RobotView }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...CAM_POS[view]);
    camera.lookAt(0, 1.4, 0);
  }, [camera, view]);
  return null;
}

function RealisticRobot({ mode }: { mode: RobotMode }) {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Gentle floating idle breathing
    group.current.position.y = Math.sin(t * 1.2) * 0.025;

    // Natural eye blink animation (every ~3.5 seconds)
    const blinkCycle = t % 3.5;
    const isBlinking = blinkCycle > 3.35;
    const eyeScaleY = isBlinking ? 0.1 : 1.0;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    // Light pulsing based on mode
    const active = mode !== "charging";
    if (lightRef.current) {
      lightRef.current.emissiveIntensity = active
        ? 1.5 + Math.sin(t * 2.8) * 0.4
        : 0.8 + Math.sin(t * 1.5) * 0.3;
    }
    if (haloRef.current) {
      haloRef.current.emissiveIntensity = mode === "charging"
        ? 1.8 + Math.sin(t * 2) * 0.5
        : mode === "night"
          ? 0.4
          : 0.9;
    }
  });

  // Dynamic theme colors
  const bodyColor = mode === "night" ? "#14243e" : mode === "charging" ? "#f2f5f3" : "#fdfbf7";
  const bodyMetal = mode === "night" ? 0.3 : 0.15;
  const bodyRough = mode === "night" ? 0.4 : 0.25;

  const eyeColor = mode === "charging" ? "#1b7a4d" : mode === "night" ? "#5a9fe6" : "#ffc75f";
  const lightColor = mode === "charging" ? "#1b7a4d" : mode === "night" ? "#3b82f6" : "#c93f20";
  const haloColor = mode === "charging" ? "#1b7a4d" : mode === "night" ? "#2563eb" : "#ffc75f";

  return (
    <group ref={group} data-testid="robot-3d">
      {/* ── GROUND CONTACT SHADOW ── */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1.4, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.35} transparent depthWrite={false} />
      </mesh>

      {/* ── BASE & CHASSIS ── */}
      {/* Main contoured base hull */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.62, 0.72, 0.32, 32]} />
        <meshStandardMaterial color={bodyColor} metalness={bodyMetal} roughness={bodyRough} />
      </mesh>
      {/* Lower chassis bumper ring */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.12, 32]} />
        <meshStandardMaterial color="#0c1729" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Ambient LED underglow halo */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.02, 16, 40]} />
        <meshStandardMaterial
          ref={haloRef}
          color={haloColor}
          emissive={haloColor}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* ── WHEELS & SUSPENSION ── */}
      {/* Left Drive Wheel */}
      <group position={[-0.64, 0.28, 0]}>
        {/* Rubber tire tread */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.27, 0.27, 0.14, 28]} />
          <meshStandardMaterial color="#1a202c" roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Kerala-gold rim hubcap */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.075, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
          <meshStandardMaterial color="#ffc75f" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Right Drive Wheel */}
      <group position={[0.64, 0.28, 0]}>
        {/* Rubber tire tread */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.27, 0.27, 0.14, 28]} />
          <meshStandardMaterial color="#1a202c" roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Kerala-gold rim hubcap */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.075, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
          <meshStandardMaterial color="#ffc75f" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Front & Rear Caster Stabilizers */}
      <mesh position={[0, 0.14, 0.52]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#0c1729" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.14, -0.52]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#0c1729" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front Charging Dock Contacts */}
      <group position={[0, 0.22, 0.68]}>
        <mesh>
          <boxGeometry args={[0.34, 0.06, 0.04]} />
          <meshStandardMaterial color="#0c1729" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[-0.08, 0, 0.015]}>
          <boxGeometry args={[0.08, 0.035, 0.02]} />
          <meshStandardMaterial color="#ffd470" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.08, 0, 0.015]}>
          <boxGeometry args={[0.08, 0.035, 0.02]} />
          <meshStandardMaterial color="#ffd470" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ── TELESCOPIC ALUMINUM COLUMN ── */}
      {/* Base collar with gold trim */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.12, 24]} />
        <meshStandardMaterial color="#ffc75f" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Lower brushed aluminum column */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.8, 24]} />
        <meshStandardMaterial color="#d1d8e0" metalness={0.88} roughness={0.22} />
      </mesh>
      {/* Articulation ring */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.125, 0.125, 0.06, 24]} />
        <meshStandardMaterial color="#0c1729" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Upper brushed aluminum column */}
      <mesh position={[0, 1.68, 0]}>
        <cylinderGeometry args={[0.085, 0.095, 0.5, 24]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* ── HEAD UNIT & EXPRESSIVE OLED SCREEN ── */}
      <group position={[0, 2.16, 0]}>
        {/* Head Shell */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.92, 0.72, 0.42]} />
          <meshStandardMaterial color={bodyColor} metalness={bodyMetal} roughness={bodyRough} />
        </mesh>
        {/* Curved side ears / accent trim */}
        <mesh position={[-0.47, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 24]} />
          <meshStandardMaterial color="#0c1729" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.47, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 24]} />
          <meshStandardMaterial color="#0c1729" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Front OLED Screen Panel (Dark Glass Bezel) */}
        <mesh position={[0, 0, 0.215]}>
          <planeGeometry args={[0.82, 0.6]} />
          <meshStandardMaterial color="#060a12" roughness={0.12} metalness={0.25} />
        </mesh>

        {/* ── EXPRESSIVE OLED EYES ── */}
        <group position={[0, -0.04, 0.222]}>
          {/* Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.18, 0, 0]}>
            <capsuleGeometry args={[0.048, 0.09, 8, 16]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>
          {/* Right Eye */}
          <mesh ref={rightEyeRef} position={[0.18, 0, 0]}>
            <capsuleGeometry args={[0.048, 0.09, 8, 16]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* ── OPTICAL CAMERA LENS ── */}
        <group position={[0, 0.19, 0.22]}>
          {/* Outer Lens Bezel */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.02, 24]} />
            <meshStandardMaterial color="#1a202c" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Gold Aperture Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.008]}>
            <cylinderGeometry args={[0.06, 0.06, 0.015, 24]} />
            <meshStandardMaterial color="#ffc75f" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Inner Optical Glass Lens Element */}
          <mesh position={[0, 0, 0.014]}>
            <sphereGeometry args={[0.042, 20, 20]} />
            <meshStandardMaterial
              color="#091b29"
              roughness={0.05}
              metalness={0.9}
              emissive="#1e40af"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Pupil Center / Reflection Catchlight */}
          <mesh position={[0.012, 0.012, 0.038]}>
            <circleGeometry args={[0.012, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* ── MICROPHONE & SPEAKER GRILLE ── */}
        <group position={[0, -0.22, 0.22]}>
          {[-0.12, -0.06, 0, 0.06, 0.12].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <circleGeometry args={[0.008, 12]} />
              <meshStandardMaterial color="#1f293d" metalness={0.5} roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* ── STATUS LIGHT BAR (Top Crown) ── */}
        <mesh position={[0, 0.37, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.16]} />
          <meshStandardMaterial
            ref={lightRef}
            color={lightColor}
            emissive={lightColor}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function RobotCanvas({
  mode,
  view,
  onNoWebGL,
}: {
  mode: RobotMode;
  view: RobotView;
  onNoWebGL: () => void;
}) {
  return (
    <Canvas
      camera={{ position: CAM_POS[view], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) onNoWebGL();
      }}
      data-testid="robot-canvas"
      style={{ touchAction: "pan-y" }}
    >
      <CameraRig view={view} />
      {/* Studio Lighting Rig */}
      <ambientLight intensity={mode === "night" ? 0.6 : 0.9} />
      <directionalLight position={[5, 8, 5]} intensity={mode === "night" ? 0.8 : 1.5} castShadow />
      <directionalLight position={[-4, 4, -4]} intensity={mode === "night" ? 0.4 : 0.8} color="#93c5fd" />
      <pointLight
        position={[0, 3.2, 2.5]}
        intensity={mode === "charging" ? 0.6 : 1.2}
        color={mode === "charging" ? "#10b981" : "#ffd470"}
      />
      <pointLight position={[0, 0.3, 0]} intensity={mode === "charging" ? 1.2 : 0.5} color="#10b981" />

      {/* Realistic Companion Robot */}
      <RealisticRobot mode={mode} />

      {/* Dock Platform with concentric design */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[2.5, 48]} />
        <meshStandardMaterial
          color={mode === "charging" ? "#d1fae5" : mode === "night" ? "#0f172a" : "#f1e7d2"}
          roughness={0.6}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[2.3, 2.4, 48]} />
        <meshStandardMaterial color="#ffc75f" metalness={0.7} roughness={0.3} />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={8.5}
        maxPolarAngle={Math.PI / 2 + 0.05}
      />
    </Canvas>
  );
}

