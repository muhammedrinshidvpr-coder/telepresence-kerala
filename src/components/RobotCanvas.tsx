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
  iso: [3.4, 2.3, 3.8],
  front: [0, 1.7, 4.4],
  side: [4.6, 1.6, 0],
  rear: [0, 1.8, -4.6],
};

function CameraRig({ view }: { view: RobotView }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...CAM_POS[view]);
    camera.lookAt(0, 0.95, 0);
  }, [camera, view]);
  return null;
}

/**
 * Heavy-Duty All-Terrain Chevron Tractor Wheel
 * Features deep V-shaped herringbone tractor lugs, recessed black steel rim,
 * center axle hub cap and 6 chrome lug bolts
 */
function ChevronTire({
  position,
  isRightSide,
}: {
  position: [number, number, number];
  isRightSide: boolean;
}) {
  const lugCount = 14;
  const lugs = useMemo(() => {
    return Array.from({ length: lugCount }).map((_, i) => {
      const angle = (i / lugCount) * Math.PI * 2;
      return {
        angle,
        x: Math.cos(angle) * 0.44,
        y: Math.sin(angle) * 0.44,
      };
    });
  }, [lugCount]);

  // 6 Wheel Lug Bolts in a circle
  const lugBolts = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        x: Math.cos(angle) * 0.16,
        y: Math.sin(angle) * 0.16,
      };
    });
  }, []);

  return (
    <group position={position}>
      {/* Heavy Rubber Tire Base Cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.43, 0.43, 0.38, 36]} />
        <meshStandardMaterial color="#12151a" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Deep V-Shaped Chevron Tractor Tread Lugs (Herringbone pattern) */}
      {lugs.map((lug, idx) => (
        <group
          key={idx}
          position={[0, lug.y, lug.x]}
          rotation={[lug.angle, 0, 0]}
        >
          {/* Left Chevron Blade (angled inward at +32 degrees) */}
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0.55, 0]}>
            <boxGeometry args={[0.18, 0.052, 0.075]} />
            <meshStandardMaterial color="#0c0e12" roughness={0.96} metalness={0.04} />
          </mesh>

          {/* Right Chevron Blade (angled inward at -32 degrees) */}
          <mesh position={[0.09, 0, 0]} rotation={[0, -0.55, 0]}>
            <boxGeometry args={[0.18, 0.052, 0.075]} />
            <meshStandardMaterial color="#0c0e12" roughness={0.96} metalness={0.04} />
          </mesh>
        </group>
      ))}

      {/* Deep-Dish Black Steel Wheel Rim */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.14 : -0.14, 0, 0]}
      >
        <cylinderGeometry args={[0.28, 0.24, 0.11, 32]} />
        <meshStandardMaterial color="#171c24" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* Rim Outer Lip Flange */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.192 : -0.192, 0, 0]}
      >
        <cylinderGeometry args={[0.27, 0.27, 0.015, 32]} />
        <meshStandardMaterial color="#2d3748" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Center Wheel Hub Cap */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.198 : -0.198, 0, 0]}
      >
        <cylinderGeometry args={[0.095, 0.095, 0.032, 24]} />
        <meshStandardMaterial color="#0b0e14" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Center Heavy Steel Axle Nut */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? 0.216 : -0.216, 0, 0]}
      >
        <cylinderGeometry args={[0.034, 0.034, 0.02, 12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.95} />
      </mesh>

      {/* 6 Perimeter Chrome Wheel Lug Bolts */}
      {lugBolts.map((bolt, bIdx) => (
        <mesh
          key={bIdx}
          position={[isRightSide ? 0.195 : -0.195, bolt.y, bolt.x]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.014, 0.014, 0.016, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.92} />
        </mesh>
      ))}

      {/* Inboard Heavy Axle Mount connecting to chassis */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[isRightSide ? -0.19 : 0.19, 0, 0]}
      >
        <cylinderGeometry args={[0.065, 0.065, 0.22, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Front "EVE ROVER" Nose Plate
 * High-definition typography, glowing horizontal cyan lightbar, top sensor notch, and corner hex bolts
 */
function FrontNosePlate({
  lightbarRef,
}: {
  lightbarRef: React.RefObject<THREE.MeshStandardMaterial | null>;
}) {
  const badgeTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Metal powder-coat matching off-white chassis
    ctx.fillStyle = "#edf1f5";
    ctx.fillRect(0, 0, 512, 140);

    // "EVE ROVER" Typography matching technical design drawings
    ctx.fillStyle = "#1e293b";
    ctx.font = "900 52px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("EVE ROVER", 256, 70);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <group position={[0, 0.24, 0.94]} rotation={[-0.46, 0, 0]}>
      {/* Front Beveled Metal Faceplate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.24, 0.44, 0.04]} />
        <meshStandardMaterial color="#edf1f5" roughness={0.32} metalness={0.25} />
      </mesh>

      {/* Typography Decal Plate */}
      {badgeTexture && (
        <mesh position={[0, 0.04, 0.022]}>
          <planeGeometry args={[0.92, 0.24]} />
          <meshStandardMaterial
            map={badgeTexture}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      )}

      {/* Glowing Horizontal Cyan LED Light Bar Strip */}
      <mesh position={[0, -0.12, 0.028]}>
        <boxGeometry args={[0.52, 0.04, 0.02]} />
        <meshStandardMaterial
          ref={lightbarRef}
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={4.2}
          roughness={0.05}
        />
      </mesh>

      {/* 4 Corner Hex Screws */}
      {[
        [-0.56, 0.17],
        [0.56, 0.17],
        [-0.56, -0.17],
        [0.56, -0.17],
      ].map(([x, y], idx) => (
        <mesh key={idx} position={[x, y, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.014, 6]} />
          <meshStandardMaterial color="#64748b" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Top Front Sensor Notch (Camera / Proximity Sensor) */}
      <group position={[0, 0.23, 0.01]}>
        <mesh>
          <boxGeometry args={[0.26, 0.05, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.026]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.012, 16]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Upper Robot Body - EVE Companion Unit
 * Features sculpted glossy white pearlescent ceramic torso, floating side arms with cyan LED slits,
 * and an articulated oval head with curved dark visor and expressive glowing cyan pill eyes.
 */
function EveCompanionUnit({
  headRef,
  eyesGroupRef,
  eyesMatRef,
  haloRingMatRef,
  armLedsMatRef,
}: {
  headRef: React.RefObject<THREE.Group | null>;
  eyesGroupRef: React.RefObject<THREE.Group | null>;
  eyesMatRef: React.RefObject<THREE.MeshStandardMaterial | null>;
  haloRingMatRef: React.RefObject<THREE.MeshStandardMaterial | null>;
  armLedsMatRef: React.RefObject<THREE.MeshStandardMaterial | null>;
}) {
  return (
    <group position={[0, 0.54, 0]}>
      {/* ── MOTORIZED TURNTABLE SWIVEL BASE COLLAR ── */}
      <group position={[0, 0, 0]}>
        {/* Lower Stepped Collar Ring */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.04, 40]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.7} />
        </mesh>

        {/* Recessed Glowing Cyan LED Halo Ring */}
        <mesh position={[0, 0.048, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.31, 0.022, 16, 48]} />
          <meshStandardMaterial
            ref={haloRingMatRef}
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3.6}
            roughness={0.1}
          />
        </mesh>

        {/* Upper Turntable Plate */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.27, 0.30, 0.03, 36]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.4} />
        </mesh>
      </group>

      {/* ── SCULPTED EVE TORSO ── */}
      <group position={[0, 0.52, 0]}>
        {/* Upper Chest (Smooth Aerodynamic Dome) */}
        <mesh position={[0, 0.12, 0]} scale={[1.0, 1.12, 0.92]}>
          <sphereGeometry args={[0.37, 40, 36]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.08}
            metalness={0.16}
          />
        </mesh>

        {/* Lower Torso Taper (Inverted cone gracefully tapering into turntable base) */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.35, 0.14, 0.44, 40]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.08}
            metalness={0.16}
          />
        </mesh>

        {/* Bottom Rounded Joint Cap */}
        <mesh position={[0, -0.37, 0]}>
          <sphereGeometry args={[0.14, 24, 20]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.15}
            metalness={0.3}
          />
        </mesh>

        {/* ── FLOATING AERODYNAMIC SIDE ARMS ── */}
        {/* Left Arm Pod */}
        <group position={[-0.41, 0.02, 0]} rotation={[0, 0, -0.05]}>
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.07, 0.42, 16, 28]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.08}
              metalness={0.16}
            />
          </mesh>
          {/* Vertical Cyan LED Slit on Outer Flank */}
          <mesh position={[-0.072, 0.02, 0]}>
            <boxGeometry args={[0.012, 0.29, 0.028]} />
            <meshStandardMaterial
              ref={armLedsMatRef}
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={3.2}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Right Arm Pod */}
        <group position={[0.41, 0.02, 0]} rotation={[0, 0, 0.05]}>
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.07, 0.42, 16, 28]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.08}
              metalness={0.16}
            />
          </mesh>
          {/* Vertical Cyan LED Slit on Outer Flank */}
          <mesh position={[0.072, 0.02, 0]}>
            <boxGeometry args={[0.012, 0.29, 0.028]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={3.2}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* ── ARTICULATED HEAD UNIT ── */}
        <group ref={headRef} position={[0, 0.54, 0]}>
          {/* Recessed Dark Neck Socket */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.14, 0.17, 0.08, 28]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Oval Head Dome (Glossy White Ceramic) */}
          <mesh position={[0, 0, 0]} scale={[1.2, 0.94, 1.08]}>
            <sphereGeometry args={[0.36, 48, 40]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.08}
              metalness={0.15}
            />
          </mesh>

          {/* Curved Glossy Black Visor Faceplate */}
          <mesh
            position={[0, -0.01, 0.23]}
            rotation={[0.08, 0, 0]}
            scale={[1.1, 0.74, 0.56]}
          >
            <sphereGeometry args={[0.31, 48, 36]} />
            <meshStandardMaterial
              color="#050811"
              roughness={0.04}
              metalness={0.92}
              polygonOffset
              polygonOffsetFactor={-3}
              polygonOffsetUnits={-3}
            />
          </mesh>

          {/* ── DUAL EXPRESSIVE CYAN GLOWING PILL EYES ── */}
          <group ref={eyesGroupRef} position={[0, 0.02, 0.415]}>
            {/* Left Eye (Tilted outward, friendly digital pill shape) */}
            <mesh position={[-0.12, 0, 0]} rotation={[0, 0, -0.14]}>
              <capsuleGeometry args={[0.042, 0.09, 16, 24]} />
              <meshStandardMaterial
                ref={eyesMatRef}
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={4.8}
                roughness={0.05}
              />
            </mesh>

            {/* Right Eye (Tilted outward, friendly digital pill shape) */}
            <mesh position={[0.12, 0, 0]} rotation={[0, 0, 0.14]}>
              <capsuleGeometry args={[0.042, 0.09, 16, 24]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={4.8}
                roughness={0.05}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/**
 * Full EVE Rover Assembly
 */
function EveRover({ mode }: { mode: RobotMode }) {
  const roverGroup = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  const eyesMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const haloRingMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const armLedsMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightbarRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (!roverGroup.current) return;
    const t = state.clock.elapsedTime;

    // Smooth continuous realistic 360-degree auto-rotation
    roverGroup.current.rotation.y += delta * 0.22;

    // Natural suspension breathing vibration
    roverGroup.current.position.y = Math.sin(t * 1.5) * 0.012;

    // Lifelike Eve head articulation: gentle curious room scan
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.65) * 0.24 + Math.sin(t * 1.5) * 0.06;
      headRef.current.rotation.x = Math.sin(t * 0.95) * 0.06 - 0.03;
    }

    // Lifelike eye blink cycle: quick natural blink every ~3.5 seconds
    if (eyesGroupRef.current) {
      const cycle = t % 3.5;
      if (cycle > 3.34 && cycle < 3.48) {
        // Closed blink
        eyesGroupRef.current.scale.y = 0.08;
      } else {
        // Open
        eyesGroupRef.current.scale.y = 1.0;
      }
    }

    // Expressive glowing pulses on cyan LEDs
    const pulse = 3.2 + Math.sin(t * 2.8) * 0.6;
    if (eyesMatRef.current) eyesMatRef.current.emissiveIntensity = pulse;
    if (haloRingMatRef.current) haloRingMatRef.current.emissiveIntensity = 2.8 + Math.sin(t * 2.2) * 0.5;
    if (armLedsMatRef.current) armLedsMatRef.current.emissiveIntensity = 2.6 + Math.sin(t * 2.5) * 0.4;
    if (lightbarRef.current) lightbarRef.current.emissiveIntensity = 2.8 + Math.sin(t * 3.0) * 0.5;
  });

  return (
    <group ref={roverGroup} data-testid="robot-3d">
      {/* ── GROUND CONTACT SHADOW ── */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshBasicMaterial color="#000000" opacity={0.42} transparent depthWrite={false} />
      </mesh>

      {/* ── 4 HEAVY-DUTY CHEVRON TRACTOR WHEELS ── */}
      {/* Front-Left Wheel */}
      <ChevronTire position={[-0.96, 0.43, 0.78]} isRightSide={false} />
      {/* Rear-Left Wheel */}
      <ChevronTire position={[-0.96, 0.43, -0.78]} isRightSide={false} />
      {/* Front-Right Wheel */}
      <ChevronTire position={[0.96, 0.43, 0.78]} isRightSide={true} />
      {/* Rear-Right Wheel */}
      <ChevronTire position={[0.96, 0.43, -0.78]} isRightSide={true} />

      {/* ── OFF-WHITE POWDER-COATED METAL CHASSIS BASE ── */}
      <group position={[0, 0.44, 0]}>
        {/* Main Central Chassis Block */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[1.36, 0.32, 1.68]} />
          <meshStandardMaterial
            color="#edf1f5"
            roughness={0.32}
            metalness={0.25}
          />
        </mesh>

        {/* Top Deck Surface Plate */}
        <mesh position={[0, 0.205, 0]}>
          <boxGeometry args={[1.34, 0.02, 1.66]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.26}
            metalness={0.4}
          />
        </mesh>

        {/* Top Deck Perimeter Rails with Fasteners */}
        {/* Left Deck Rail */}
        <mesh position={[-0.64, 0.23, 0]}>
          <boxGeometry args={[0.04, 0.035, 1.62]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.7} />
        </mesh>
        {/* Right Deck Rail */}
        <mesh position={[0.64, 0.23, 0]}>
          <boxGeometry args={[0.04, 0.035, 1.62]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.7} />
        </mesh>

        {/* Front Beveled Nose Plate with "EVE ROVER" Badge & Lightbar */}
        <FrontNosePlate lightbarRef={lightbarRef} />

        {/* Rear Beveled Bumper Plate */}
        <group position={[0, 0.24, -0.94]} rotation={[0.46, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.24, 0.44, 0.04]} />
            <meshStandardMaterial color="#edf1f5" roughness={0.32} metalness={0.25} />
          </mesh>
          {/* 4 Corner Hex Fasteners */}
          {[
            [-0.56, 0.17],
            [0.56, 0.17],
            [-0.56, -0.17],
            [0.56, -0.17],
          ].map(([x, y], idx) => (
            <mesh key={idx} position={[x, y, -0.024]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.014, 6]} />
              <meshStandardMaterial color="#64748b" roughness={0.2} metalness={0.9} />
            </mesh>
          ))}
        </group>

        {/* Heavy Underbody Skid Plate */}
        <mesh position={[0, -0.14, 0]}>
          <boxGeometry args={[1.2, 0.06, 1.58]} />
          <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.5} />
        </mesh>
      </group>

      {/* ── EVE COMPANION ROBOT (UPPER UNIT) ── */}
      <EveCompanionUnit
        headRef={headRef}
        eyesGroupRef={eyesGroupRef}
        eyesMatRef={eyesMatRef}
        haloRingMatRef={haloRingMatRef}
        armLedsMatRef={armLedsMatRef}
      />
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
      camera={{ position: CAM_POS[view], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) onNoWebGL();
      }}
      data-testid="robot-canvas"
      style={{ touchAction: "pan-y" }}
    >
      <CameraRig view={view} />

      {/* ── SCI-FI STUDIO LIGHTING RIG ── */}
      <ambientLight intensity={0.9} />

      {/* Key Crisp Directional Light from Top-Front */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.4}
        castShadow
        color="#ffffff"
      />

      {/* Cool Blue Sci-Fi Rim Backlight */}
      <directionalLight
        position={[-5, 6, -5]}
        intensity={2.2}
        color="#38bdf8"
      />

      {/* Soft Warm Side Fill Light */}
      <directionalLight
        position={[4, 3, -3]}
        intensity={0.8}
        color="#fef3c7"
      />

      {/* Turntable Ground Underglow Point Light */}
      <pointLight
        position={[0, 0.35, 0]}
        intensity={2.0}
        distance={4.5}
        color="#00f0ff"
      />

      {/* Eye & Head Accent Spotlight */}
      <pointLight
        position={[0, 2.3, 1.6]}
        intensity={1.4}
        distance={3.2}
        color="#e0f2fe"
      />

      {/* ── EVE ROVER 3D MODEL ── */}
      <EveRover mode={mode} />

      {/* ── DARK SCI-FI TURNTABLE STAGE ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[2.9, 64]} />
        <meshStandardMaterial
          color="#0b111a"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Outer Glowing Cyan Halo Ring on Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[2.78, 2.84, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          metalness={0.8}
          roughness={0.2}
          emissive="#00f0ff"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Inner Subtle Accent Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[1.9, 1.93, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.8}
          roughness={0.3}
          emissive="#0284c7"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Smooth Drag, Zoom, and Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.5}
        maxDistance={7.5}
        maxPolarAngle={Math.PI / 2 + 0.02}
      />
    </Canvas>
  );
}
