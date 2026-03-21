"use client";

/**
 * Triangle pattern components matching the brand identity.
 * All patterns use the same right-triangle shape as the 3D sphere.
 */

/* ── Pattern: Sparse Grid ──
   Small evenly-spaced triangles, subtle background texture */
export function SparseGridPattern({
  color = "#1422D2",
  opacity = 0.08,
  size = 4,
  gap = 24,
  className = "",
}: {
  color?: string;
  opacity?: number;
  size?: number;
  gap?: number;
  className?: string;
}) {
  const id = "sparse-grid";
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
          <polygon
            points={`0,0 ${size},0 0,${size}`}
            fill={color}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Pattern: Dense Grid (gradient) ──
   Triangles that grow larger, used as corner accents */
export function DenseGradientPattern({
  color = "#1422D2",
  rows = 12,
  cols = 12,
  className = "",
}: {
  color?: string;
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const gap = 20;
  const triangles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const progress = (r + c) / (rows + cols - 2);
      const size = 3 + progress * 10;
      const opacity = 0.05 + progress * 0.25;
      triangles.push(
        <polygon
          key={`${r}-${c}`}
          points={`${c * gap},${r * gap} ${c * gap + size},${r * gap} ${c * gap},${r * gap + size}`}
          fill={color}
          opacity={opacity}
        />
      );
    }
  }
  return (
    <svg className={className} width={cols * gap} height={rows * gap} xmlns="http://www.w3.org/2000/svg">
      {triangles}
    </svg>
  );
}

/* ── Pattern: Scattered Field ──
   Random-ish triangles with varying sizes, organic feel */
export function ScatteredPattern({
  color = "#FFFFFF",
  opacity = 0.06,
  count = 60,
  width = 800,
  height = 400,
  className = "",
}: {
  color?: string;
  opacity?: number;
  count?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  /* deterministic pseudo-random using simple seed */
  const seed = (i: number) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return Math.round((x - Math.floor(x)) * 10000) / 10000;
  };

  const triangles = Array.from({ length: count }, (_, i) => {
    const x = Math.round(seed(i * 2) * width * 100) / 100;
    const y = Math.round(seed(i * 2 + 1) * height * 100) / 100;
    const size = Math.round((3 + seed(i * 3) * 6) * 100) / 100;
    const o = Math.round(opacity * (0.4 + seed(i * 4) * 0.6) * 10000) / 10000;
    return (
      <polygon
        key={i}
        points={`${x},${y} ${x + size},${y} ${x},${y + size}`}
        fill={color}
        opacity={o}
      />
    );
  });

  return (
    <svg className={className} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {triangles}
    </svg>
  );
}

/* ── Pattern: Dense Mosaic ──
   Tightly packed triangles as a horizontal divider band */
export function MosaicDivider({
  color = "#1422D2",
  height = 48,
  className = "",
}: {
  color?: string;
  height?: number;
  className?: string;
}) {
  const cellSize = 12;
  const cols = 100;
  const rows = Math.ceil(height / cellSize);

  const seed = (i: number) => {
    const x = Math.sin(i * 91.3 + 7.1) * 43758.5453;
    return Math.round((x - Math.floor(x)) * 10000) / 10000;
  };

  const triangles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const show = seed(r * cols + c) > 0.25;
      if (!show) continue;
      const x = c * cellSize;
      const y = r * cellSize;
      const s = cellSize * 0.85;
      const opacity = Math.round((0.15 + seed(r * cols + c + 999) * 0.6) * 10000) / 10000;
      triangles.push(
        <polygon
          key={`${r}-${c}`}
          points={`${x},${y} ${x + s},${y} ${x},${y + s}`}
          fill={color}
          opacity={opacity}
        />
      );
    }
  }

  return (
    <svg className={className} width="100%" height={height} viewBox={`0 0 ${cols * cellSize} ${rows * cellSize}`} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {triangles}
    </svg>
  );
}
