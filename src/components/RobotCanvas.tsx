"use client";

import { Component, useEffect, useRef, useMemo, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type RobotMode = "day" | "night" | "charging";
export type RobotView = "front" | "side" | "rear" | "iso";

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
  iso: [3.4, 2.4, 4.2],
  front: [0, 1.8, 4.5],
  side: [4.6, 1.6, 0],
  rear: [0, 2.0, -4.6],
};

function CameraRig({ view }: { view: RobotView }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...CAM_POS[view]);
    camera.lookAt(0, 0.9, 0);
  }, [camera, view]);
  return null;
}

/**
 * Chunky All-Terrain Rover Wheel with deep transverse treads matching reference images
 */
function RuggedTire({ position, isRightSide }: { position: [number, number, number]; isRightSide: boolean }) {
  // Create 16 chunky outer tread lugs around the tire circumference
  const lugs = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 0.44,
        y: Math.sin(angle) * 0.44,
        rot: angle,
      };
    });
  }, []);

  return (
    <group position={position}>
      {/* Main rubber tire cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.32, 28]} />
        <meshStandardMaterial color="#181a1f" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Chunky transverse tread lugs for all-terrain grip */}
      {lugs.map((lug, idx) => (
        <mesh
          key={idx}
          position={[0, lug.y, lug.x]}
          rotation={[lug.rot, 0, 0]}
        >
          <boxGeometry args={[0.34, 0.045, 0.08]} />
          <meshStandardMaterial color="#131418" roughness={0.95} metalness={0.05} />
        </mesh>
      ))}

      {/* Recessed hubcap and center axle bolt */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.14 : -0.14, 0, 0]}
      >
        <cylinderGeometry args={[0.26, 0.22, 0.06, 24]} />
        <meshStandardMaterial color="#212732" roughness={0.4} metalness={0.65} />
      </mesh>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.17 : -0.17, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
        <meshStandardMaterial color="#0f141d" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Realistic 4-Wheel Telepresence Rover matching user specifications:
 * - Dark navy industrial chassis with side hatches
 * - 4 rugged chunky tires
 * - Total height from base ~20cm scale ratio
 * - Significantly bigger optical camera
 * - Noticeably bigger companion screen
 * - Status LEDs (green prototype heritage)
 */
function RealisticRover({ mode }: { mode: RobotMode }) {
  const roverGroup = useRef<THREE.Group>(null);
  const statusLedRef = useRef<THREE.MeshStandardMaterial>(null);
  const screenGlowRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (!roverGroup.current) return;
    const t = state.clock.elapsedTime;

    // Smooth continuous realistic 360-degree auto-rotation
    roverGroup.current.rotation.y += delta * 0.45;

    // Subtle natural suspension breathing vibration
    roverGroup.current.position.y = Math.sin(t * 1.5) * 0.015;

    // Pulsing status LED and screen illumination
    if (statusLedRef.current) {
      statusLedRef.current.emissiveIntensity = 1.4 + Math.sin(t * 3) * 0.4;
    }
    if (screenGlowRef.current) {
      screenGlowRef.current.emissiveIntensity = mode === "charging"
        ? 0.5 + Math.sin(t * 1.8) * 0.2
        : 1.1 + Math.sin(t * 2.2) * 0.15;
    }
  });

  // Dark navy/slate chassis color directly inspired by reference image 2
  const chassisColor = mode === "night" ? "#131b26" : mode === "charging" ? "#1e2b3c" : "#1c2b3e";
  const accentNavy = "#131d2b";
  const screenColor = mode === "charging" ? "#064e3b" : mode === "night" ? "#0f233f" : "#0d1b2a";
  const screenEmissive = mode === "charging" ? "#10b981" : mode === "night" ? "#38bdf8" : "#60a5fa";

  return (
    <group ref={roverGroup} data-testid="robot-3d">
      {/* ── GROUND CONTACT SHADOW ── */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial color="#000000" opacity={0.38} transparent depthWrite={false} />
      </mesh>

      {/* ── 4 CHUNKY OFF-ROAD TIRES ── */}
      {/* Front-Left Wheel */}
      <RuggedTire position={[-0.98, 0.42, 0.72]} isRightSide={false} />
      {/* Rear-Left Wheel */}
      <RuggedTire position={[-0.98, 0.42, -0.72]} isRightSide={false} />
      {/* Front-Right Wheel */}
      <RuggedTire position={[0.98, 0.42, 0.72]} isRightSide={true} />
      {/* Rear-Right Wheel */}
      <RuggedTire position={[0.98, 0.42, -0.72]} isRightSide={true} />

      {/* ── LOW-PROFILE STABLE ROVER CHASSIS ── */}
      <group position={[0, 0.48, 0]}>
        {/* Main curved navy chassis block */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.56, 0.38, 2.05]} />
          <meshStandardMaterial color={chassisColor} metalness={0.25} roughness={0.42} />
        </mesh>

        {/* Rounded top deck lid */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.5, 0.06, 1.98]} />
          <meshStandardMaterial color="#23354d" metalness={0.3} roughness={0.35} />
        </mesh>

        {/* Lower heavy bumper frame */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[1.44, 0.12, 1.95]} />
          <meshStandardMaterial color={accentNavy} metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Side service hatch recesses (matching reference image) */}
        {/* Left hatch */}
        <mesh position={[-0.79, 0, 0]}>
          <boxGeometry args={[0.02, 0.22, 0.7]} />
          <meshStandardMaterial color={accentNavy} metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Right hatch */}
        <mesh position={[0.79, 0, 0]}>
          <boxGeometry args={[0.02, 0.22, 0.7]} />
          <meshStandardMaterial color={accentNavy} metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Front bumper cutouts and Dual Green Status LEDs (prototype heritage) */}
        <mesh position={[0, -0.04, 1.03]}>
          <boxGeometry args={[0.85, 0.18, 0.02]} />
          <meshStandardMaterial color="#101824" metalness={0.6} roughness={0.3} />
        </mesh>
        <group position={[0.42, -0.04, 1.04]}>
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial
              ref={statusLedRef}
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={1.8}
            />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.8} />
          </mesh>
        </group>
      </group>

      {/* ── CENTRAL NECK POLE (20cm proportional height from base) ── */}
      <group position={[0, 0.72, 0]}>
        {/* Base collar mounting ring */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.18, 0.24, 0.1, 24]} />
          <meshStandardMaterial color={accentNavy} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Sleek vertical riser column */}
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.11, 0.12, 0.74, 24]} />
          <meshStandardMaterial color="#1e2c3e" metalness={0.45} roughness={0.35} />
        </mesh>
        {/* Neck articulation tilt joint */}
        <mesh position={[0, 0.82, 0]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color="#0f1622" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* ── ENLARGED HEAD UNIT (BIGGER CAMERA & BIGGER SCREEN) ── */}
      <group position={[0, 1.76, 0]}>
        {/* Rounded head casing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.96, 0.48]} />
          <meshStandardMaterial color={chassisColor} metalness={0.35} roughness={0.38} />
        </mesh>

        {/* Front dark bezel faceplate */}
        <mesh position={[0, 0, 0.245]}>
          <boxGeometry args={[0.82, 0.9, 0.02]} />
          <meshStandardMaterial color="#0b111a" roughness={0.15} metalness={0.8} />
        </mesh>

        {/* ── ENLARGED OPTICAL CAMERA (Prominent at top of head) ── */}
        <group position={[0, 0.25, 0.26]}>
          {/* Heavy outer camera ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.03, 32]} />
            <meshStandardMaterial color="#1c2430" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Aperture accent rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.012]}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 32]} />
            <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Convex optical glass lens with deep blue anti-reflective reflection */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.088, 24, 24]} />
            <meshStandardMaterial
              color="#0a192f"
              roughness={0.04}
              metalness={0.92}
              emissive="#1e3a8a"
              emissiveIntensity={0.35}
            />
          </mesh>
          {/* Lens catchlight specular gleam */}
          <mesh position={[0.03, 0.03, 0.09]}>
            <circleGeometry args={[0.018, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Microphone pinhole beside camera */}
          <mesh position={[0.22, 0, 0.01]}>
            <circleGeometry args={[0.012, 12]} />
            <meshBasicMaterial color="#05080e" />
          </mesh>
        </group>

        {/* ── NOTICEABLY BIGGER LANDSCAPE SCREEN (Below Camera) ── */}
        <group position={[0, -0.19, 0.26]}>
          {/* Screen outer border frame */}
          <mesh>
            <planeGeometry args={[0.72, 0.44]} />
            <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.6} />
          </mesh>
          {/* Vibrant active OLED screen display panel */}
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.68, 0.4]} />
            <meshStandardMaterial
              ref={screenGlowRef}
              color={screenColor}
              emissive={screenEmissive}
              emissiveIntensity={1.0}
              roughness={0.1}
            />
          </mesh>
          {/* Screen UI elements: Family waveform and status dot */}
          <group position={[0, 0, 0.01]}>
            {/* Connection status indicator */}
            <mesh position={[-0.26, 0.14, 0]}>
              <circleGeometry args={[0.016, 16]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            {/* Friendly audio waveform bars on screen */}
            {[-0.14, -0.07, 0, 0.07, 0.14].map((x, i) => (
              <mesh key={i} position={[x, -0.02, 0]}>
                <planeGeometry args={[0.022, 0.12 + (i % 2 === 0 ? 0.08 : 0.03)]} />
                <meshBasicMaterial color="#ffffff" opacity={0.85} transparent />
              </mesh>
            ))}
          </group>
        </group>

        {/* Ambient Top Light Bar */}
        <mesh position={[0, 0.49, 0]}>
          <boxGeometry args={[0.56, 0.035, 0.2]} />
          <meshStandardMaterial
            color={mode === "charging" ? "#10b981" : "#38bdf8"}
            emissive={mode === "charging" ? "#10b981" : "#0284c7"}
            emissiveIntensity={1.5}
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
      camera={{ position: CAM_POS[view], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) onNoWebGL();
      }}
      data-testid="robot-canvas"
      style={{ touchAction: "pan-y" }}
    >
      <CameraRig view={view} />

      {/* Cinematic Studio Lighting Rig */}
      <ambientLight intensity={mode === "night" ? 0.7 : 1.1} />
      <directionalLight position={[6, 9, 6]} intensity={1.8} castShadow color="#ffffff" />
      <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#93c5fd" />
      <directionalLight position={[0, 6, -6]} intensity={0.6} color="#ffd470" />
      <pointLight position={[0, 3.5, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0.2, 0]} intensity={0.8} color="#38bdf8" />

      {/* Realistic 4-Wheel Rover Model */}
      <RealisticRover mode={mode} />

      {/* Circular Inspection Turntable Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial
          color={mode === "charging" ? "#11221b" : mode === "night" ? "#0b121e" : "#eef3f8"}
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[2.7, 2.76, 64]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Drag, Zoom, and Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.8}
        maxDistance={7.5}
        maxPolarAngle={Math.PI / 2 + 0.02}
      />
    </Canvas>
  );
}
