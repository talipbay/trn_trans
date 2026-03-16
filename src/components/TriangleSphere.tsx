"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/* ── detect device type ── */
function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setDevice("mobile");
      else if (w < 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return device;
}

/* ── single triangle shape ── */
function createTriangleGeometry(size: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(size, 0);
  shape.lineTo(0, -size);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

/* ── build instance matrices (baked once, never changes) ── */
function buildSphereMatrices(latCount: number, lonCount: number, radius: number) {
  const matrices: THREE.Matrix4[] = [];
  const up = new THREE.Vector3(0, 0, 1);
  for (let lat = 1; lat < latCount; lat++) {
    const phi = (lat / latCount) * Math.PI;
    for (let lon = 0; lon < lonCount; lon++) {
      const theta = (lon / lonCount) * Math.PI * 2;
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
      const normal = pos.clone().normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
      const mat = new THREE.Matrix4();
      mat.compose(pos, quat, new THREE.Vector3(1, 1, 1));
      matrices.push(mat);
    }
  }
  return matrices;
}

const LABELS = [
  { text: "200 крытых вагонов\nв оперировании", phi: Math.PI * 0.35, theta: Math.PI * 0.25 },
  { text: "Организация\nконтейнерных поездов", phi: Math.PI * 0.5, theta: Math.PI * 1.15 },
  { text: "Проектная логистика\nдля нефтегазовой\nи энергетической отрасли", phi: Math.PI * 0.7, theta: Math.PI * 0.6 },
];

function labelPosition(phi: number, theta: number, radius: number) {
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const DEVICE_CONFIG = {
  mobile:  { lat: 16, lon: 24, triSize: 0.05, dpr: 1,   labelSize: "11px", labelMin: "120px" },
  tablet:  { lat: 22, lon: 32, triSize: 0.055, dpr: 1.5, labelSize: "12px", labelMin: "140px" },
  desktop: { lat: 30, lon: 45, triSize: 0.06, dpr: 2,   labelSize: "13px", labelMin: "160px" },
};

function TriangleSphereInner({ device }: { device: "mobile" | "tablet" | "desktop" }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const { gl, size } = useThree();

  const cfg = DEVICE_CONFIG[device];
  const radius = 2.8;

  const { geo, matrices, material } = useMemo(() => {
    const g = createTriangleGeometry(cfg.triSize);
    const m = buildSphereMatrices(cfg.lat, cfg.lon, radius);
    const mat = new THREE.MeshBasicMaterial({ color: "#FFFFFF", side: THREE.FrontSide });
    return { geo: g, matrices: m, material: mat };
  }, [cfg.triSize, cfg.lat, cfg.lon]);

  /* bake matrices into the instanced mesh once */
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < matrices.length; i++) {
      meshRef.current.setMatrixAt(i, matrices[i]);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  const onPointerDown = useCallback((e: PointerEvent) => {
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = { x: 0, y: 0 };
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = (e.clientX - lastPointer.current.x) / size.width;
    const dy = (e.clientY - lastPointer.current.y) / size.height;
    dragVelocity.current = { x: dy * 1, y: dx * 1 };
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [size]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.touchAction = "pan-y";
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [gl, onPointerDown, onPointerMove, onPointerUp]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const idleY = Math.cos(t * 0.05) * 0.0005 + Math.cos(t * 0.02) * 0.0003;
    groupRef.current.rotation.x += dragVelocity.current.x;
    groupRef.current.rotation.y += dragVelocity.current.y + idleY;
    if (!dragging.current) {
      dragVelocity.current.x *= 0.92;
      dragVelocity.current.y *= 0.92;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[geo, material, matrices.length]} />

      {LABELS.map((label, i) => {
        const pos = labelPosition(label.phi, label.theta, radius + 0.35);
        return (
          <group key={`label-${i}`} position={pos}>
            <Html
              center
              distanceFactor={7}
              style={{ pointerEvents: "none", whiteSpace: "pre-line", userSelect: "none" }}
            >
              <div style={{
                padding: "4px 0",
                fontSize: cfg.labelSize,
                lineHeight: "1.4",
                color: "#FFFFFF",
                fontFamily: "Cygre, sans-serif",
                fontWeight: 600,
                minWidth: cfg.labelMin,
                textAlign: "center",
              }}>
                {label.text}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function TriangleSphere() {
  const [mounted, setMounted] = useState(false);
  const device = useDeviceType();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: "100%", height: "100%", cursor: "grab", touchAction: "pan-y" }}
      gl={{ alpha: true, antialias: device === "desktop", powerPreference: "high-performance" }}
      dpr={DEVICE_CONFIG[device].dpr}
      frameloop="always"
    >
      <TriangleSphereInner device={device} />
    </Canvas>
  );
}
