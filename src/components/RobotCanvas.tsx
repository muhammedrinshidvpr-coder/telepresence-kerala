"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type RobotMode = "day" | "night" | "charging";
export type RobotView = "front" | "side" | "rear";

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

function ProceduralRobot({ mode }: { mode: RobotMode }) {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    const active = mode !== "charging";
    if (lightRef.current) {
      lightRef.current.emissiveIntensity = active
        ? 1.6 + Math.sin(state.clock.elapsedTime * 3) * 0.4
        : 0.15;
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
      <mesh position={[0, 2.32, 0.2]}><circleGeometry args={[0.05, 16]} /><meshStandardMaterial color="#ffc75f" emissive="#ffc75f" emissiveIntensity={1.2} /></mesh>
      {/* status light */}
      <mesh position={[0, 2.5, 0]}><sphereGeometry args={[0.09, 16, 16]} /><meshStandardMaterial ref={lightRef} color={mode === "charging" ? "#1b7a4d" : "#ff6b4a"} emissive={mode === "charging" ? "#1b7a4d" : "#ff6b4a"} emissiveIntensity={1.6} /></mesh>
      {/* charging contacts */}
      <mesh position={[0, 0.22, 0.42]}><boxGeometry args={[0.4, 0.08, 0.05]} /><meshStandardMaterial color="#ffc75f" metalness={0.6} roughness={0.3} /></mesh>
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
      dpr={1}
      gl={{ antialias: false, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) onNoWebGL();
      }}
      data-testid="robot-canvas"
    >
      <CameraRig view={view} />
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
  );
}
