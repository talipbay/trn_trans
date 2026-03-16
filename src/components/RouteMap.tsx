"use client";

/**
 * OPTION D: Route Map
 * Visual showing key Eurasian routes with dotted lines connecting cities.
 */

const CITIES = [
  { name: "Алматы", x: 72, y: 62 },
  { name: "Астана", x: 68, y: 48 },
  { name: "Актау", x: 52, y: 55 },
  { name: "Москва", x: 38, y: 35 },
  { name: "Минск", x: 30, y: 32 },
  { name: "Ташкент", x: 66, y: 58 },
  { name: "Бишкек", x: 74, y: 58 },
];

const ROUTES: [number, number][] = [
  [0, 1], // Алматы - Астана
  [1, 3], // Астана - Москва
  [3, 4], // Москва - Минск
  [2, 3], // Актау - Москва
  [0, 5], // Алматы - Ташкент
  [0, 6], // Алматы - Бишкек
  [5, 2], // Ташкент - Актау
];

export default function RouteMap() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Label */}
      <div className="mx-auto max-w-6xl px-6 mb-6">
        <span className="inline-block rounded-full bg-tam-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-tam-blue">
          Опция D — Карта маршрутов
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-tam-mint">
            География
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-tam-black sm:text-4xl">
            Наши маршруты
          </h2>
        </div>

        <div className="relative rounded-3xl bg-tam-blue/3 border border-tam-grey/40 p-4 sm:p-8">
          <svg
            viewBox="0 0 100 80"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Routes */}
            {ROUTES.map(([from, to], i) => (
              <line
                key={`route-${i}`}
                x1={CITIES[from].x}
                y1={CITIES[from].y}
                x2={CITIES[to].x}
                y2={CITIES[to].y}
                stroke="#1422D2"
                strokeWidth="0.3"
                strokeDasharray="1 0.8"
                opacity="0.3"
              />
            ))}

            {/* Cities */}
            {CITIES.map((city, i) => (
              <g key={city.name}>
                {/* Pulse ring */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="1.8"
                  fill="none"
                  stroke="#1D90F9"
                  strokeWidth="0.2"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="1"
                    to="3"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.4"
                    to="0"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Triangle marker */}
                <polygon
                  points={`${city.x},${city.y - 1.2} ${city.x + 1},${city.y + 0.5} ${city.x - 1},${city.y + 0.5}`}
                  fill="#1422D2"
                />

                {/* City name */}
                <text
                  x={city.x}
                  y={city.y + 3.5}
                  textAnchor="middle"
                  fill="#333333"
                  fontSize="2.2"
                  fontFamily="Cygre, sans-serif"
                  fontWeight="500"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
