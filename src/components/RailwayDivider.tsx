"use client";

/**
 * OPTION B: Railway Track Divider
 * Two parallel lines with triangle cross-ties, like a stylized railway track.
 */
export default function RailwayDivider() {
  const tieCount = 40;

  return (
    <div className="relative overflow-hidden bg-white py-4">
      {/* Label */}
      <div className="mx-auto max-w-6xl px-6 mb-3">
        <span className="inline-block rounded-full bg-tam-light-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-tam-light-blue">
          Опция B — Ж/Д разделитель
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <svg width="100%" height="32" viewBox="0 0 1200 32" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Rails */}
          <line x1="0" y1="8" x2="1200" y2="8" stroke="#1422D2" strokeWidth="2" opacity="0.3" />
          <line x1="0" y1="24" x2="1200" y2="24" stroke="#1422D2" strokeWidth="2" opacity="0.3" />

          {/* Triangle cross-ties */}
          {Array.from({ length: tieCount }, (_, i) => {
            const x = (i / (tieCount - 1)) * 1200;
            const opacity = 0.15 + (Math.sin(i * 0.7) * 0.5 + 0.5) * 0.35;
            return (
              <g key={i}>
                {/* Top triangle pointing down */}
                <polygon
                  points={`${x - 4},8 ${x + 4},8 ${x - 4},16`}
                  fill="#1422D2"
                  opacity={opacity}
                />
                {/* Bottom triangle pointing up */}
                <polygon
                  points={`${x + 4},24 ${x - 4},24 ${x + 4},16`}
                  fill="#1422D2"
                  opacity={opacity}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
