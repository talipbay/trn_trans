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
  const worldUp = new THREE.Vector3(0, 1, 0);
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
      // Build consistent tangent frame so all triangles face the same way
      let tangent = new THREE.Vector3().crossVectors(worldUp, normal);
      if (tangent.lengthSq() < 0.001) {
        // At poles, worldUp is parallel to normal — use a fallback
        tangent.crossVectors(new THREE.Vector3(1, 0, 0), normal);
      }
      tangent.normalize();
      const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
      // Rotation matrix: tangent=X, bitangent=Y, normal=Z
      const rotMat = new THREE.Matrix4().makeBasis(tangent, bitangent, normal);
      const quat = new THREE.Quaternion().setFromRotationMatrix(rotMat);
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

/* ── floating dust particles ── */
function FloatingParticles({ count, radius }: { count: number; radius: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.6 + Math.random() * 1.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      spd[i * 3] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, speeds: spd };
  }, [count, radius]);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += speeds[i * 3];
      posArr[i * 3 + 1] += speeds[i * 3 + 1];
      posArr[i * 3 + 2] += speeds[i * 3 + 2];
      // wrap back if too far
      const dist = Math.sqrt(posArr[i * 3] ** 2 + posArr[i * 3 + 1] ** 2 + posArr[i * 3 + 2] ** 2);
      if (dist > radius * 2.2) {
        const r = radius * 0.8;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        posArr[i * 3] = r * Math.sin(p) * Math.cos(t);
        posArr[i * 3 + 1] = r * Math.cos(p);
        posArr[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFFFFF" size={0.02} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── connecting line from sphere surface to label dot ── */
function ConnectingLine({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const ref = useRef<THREE.Line>(null);
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([from, to]);
  }, [from, to]);
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: 0.25 });
  }, []);

  return <primitive ref={ref} object={new THREE.Line(geometry, material)} />;
}

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
    const mat = new THREE.MeshBasicMaterial({ color: "#FFFFFF", side: THREE.FrontSide, transparent: true, opacity: 0.5 });
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

  const idleBaseX = useRef(0);
  const idleBaseY = useRef(0);
  const settled = useRef(true);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Chaotic idle oscillation on X, gentle on Y
    const idleX = Math.sin(t * 0.1) * 0.15 + Math.sin(t * 0.17) * 0.08;
    const idleY = Math.sin(t * 0.13) * 0.1;

    // Apply drag velocity
    if (dragging.current || Math.abs(dragVelocity.current.x) > 0.0005 || Math.abs(dragVelocity.current.y) > 0.0005) {
      groupRef.current.rotation.x += dragVelocity.current.x;
      groupRef.current.rotation.y += dragVelocity.current.y;
      settled.current = false;
    }

    if (!dragging.current) {
      dragVelocity.current.x *= 0.92;
      dragVelocity.current.y *= 0.92;

      // Once velocity is negligible, capture base minus current idle offset so there's no jump
      if (!settled.current && Math.abs(dragVelocity.current.x) <= 0.0005 && Math.abs(dragVelocity.current.y) <= 0.0005) {
        idleBaseX.current = groupRef.current.rotation.x - idleX;
        idleBaseY.current = groupRef.current.rotation.y - idleY;
        dragVelocity.current.x = 0;
        dragVelocity.current.y = 0;
        settled.current = true;
      }
    }

    // Apply idle oscillation when settled
    if (settled.current && !dragging.current) {
      groupRef.current.rotation.x = idleBaseX.current + idleX;
      groupRef.current.rotation.y = idleBaseY.current + idleY;
    }
  });

  const particleCount = device === "mobile" ? 40 : device === "tablet" ? 60 : 100;

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[geo, material, matrices.length]} />

      {/* Floating dust particles */}
      <FloatingParticles count={particleCount} radius={radius} />

      {LABELS.map((label, i) => {
        const dotPos = labelPosition(label.phi, label.theta, radius + 0.15);
        const htmlPos = labelPosition(label.phi, label.theta, radius + 0.15);
        const surfacePos = labelPosition(label.phi, label.theta, radius);
        return (
          <group key={`label-${i}`}>
            {/* Connecting line from sphere surface to dot */}
            <ConnectingLine from={surfacePos} to={dotPos} />
            <mesh position={dotPos}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            {/* Outer sphere ring */}
            <mesh position={dotPos}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
            </mesh>
            {/* Label text — Html placed at dot position, text shifted up via CSS */}
            <group position={htmlPos}>
              <Html
                center
                distanceFactor={7}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: "translateY(-100%)",
                  paddingBottom: "2px",
                }}>
                  <div style={{
                    fontSize: cfg.labelSize,
                    lineHeight: "1.4",
                    color: "#FFFFFF",
                    fontFamily: "Cygre, sans-serif",
                    fontWeight: 600,
                    minWidth: cfg.labelMin,
                    textAlign: "center",
                    whiteSpace: "pre-line",
                  }}>
                    {label.text}
                  </div>
                </div>
              </Html>
            </group>
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
