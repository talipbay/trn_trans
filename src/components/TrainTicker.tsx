"use client";

/**
 * Moving Train Ticker — realistic train silhouettes scrolling infinitely.
 */

function Locomotive() {
  return (
    <svg width="120" height="52" viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <path d="M10 12 H95 Q100 12 102 17 L108 30 Q110 34 110 38 V42 H10 V12Z" fill="currentColor" opacity="0.85" />
      {/* Cabin */}
      <rect x="12" y="14" width="30" height="20" rx="2" fill="currentColor" opacity="0.6" />
      {/* Cabin windows */}
      <rect x="16" y="17" width="10" height="8" rx="1" fill="white" opacity="0.25" />
      <rect x="29" y="17" width="10" height="8" rx="1" fill="white" opacity="0.25" />
      {/* Front nose */}
      <path d="M95 12 Q100 12 105 20 L112 34 Q114 38 114 40 V42 H95 V12Z" fill="currentColor" opacity="0.7" />
      {/* Headlight */}
      <circle cx="112" cy="32" r="2.5" fill="white" opacity="0.4" />
      {/* Roof detail */}
      <rect x="20" y="8" width="40" height="5" rx="2.5" fill="currentColor" opacity="0.5" />
      {/* Undercarriage */}
      <rect x="8" y="42" width="106" height="3" rx="1" fill="currentColor" opacity="0.4" />
      {/* Wheels */}
      <circle cx="24" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="42" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="78" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="78" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="96" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="96" cy="48" r="2" fill="currentColor" opacity="0.3" />
      {/* Coupling */}
      <rect x="0" y="36" width="10" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function BoxCar() {
  return (
    <svg width="100" height="52" viewBox="0 0 100 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="6" y="10" width="88" height="32" rx="2" fill="currentColor" opacity="0.6" />
      {/* Roof ridge */}
      <path d="M8 10 Q50 4 92 10" stroke="currentColor" strokeWidth="2" opacity="0.4" fill="none" />
      {/* Panel lines */}
      <line x1="36" y1="10" x2="36" y2="42" stroke="white" strokeWidth="0.8" opacity="0.12" />
      <line x1="64" y1="10" x2="64" y2="42" stroke="white" strokeWidth="0.8" opacity="0.12" />
      {/* Door */}
      <rect x="40" y="18" width="20" height="24" rx="1" fill="currentColor" opacity="0.45" />
      <line x1="50" y1="18" x2="50" y2="42" stroke="white" strokeWidth="0.6" opacity="0.15" />
      {/* Undercarriage */}
      <rect x="4" y="42" width="92" height="3" rx="1" fill="currentColor" opacity="0.4" />
      {/* Bogies */}
      <rect x="12" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="68" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      {/* Wheels */}
      <circle cx="18" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="72" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="72" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="82" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="82" cy="48" r="2" fill="currentColor" opacity="0.3" />
      {/* Couplings */}
      <rect x="0" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="94" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function ContainerCar() {
  return (
    <svg width="100" height="52" viewBox="0 0 100 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flat bed */}
      <rect x="6" y="32" width="88" height="10" rx="1" fill="currentColor" opacity="0.4" />
      {/* Container 1 */}
      <rect x="10" y="10" width="36" height="22" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="12" y="12" width="32" height="2" rx="0.5" fill="white" opacity="0.1" />
      <line x1="28" y1="10" x2="28" y2="32" stroke="white" strokeWidth="0.6" opacity="0.1" />
      {/* Container 2 */}
      <rect x="50" y="10" width="36" height="22" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="52" y="12" width="32" height="2" rx="0.5" fill="white" opacity="0.1" />
      <line x1="68" y1="10" x2="68" y2="32" stroke="white" strokeWidth="0.6" opacity="0.1" />
      {/* Undercarriage */}
      <rect x="4" y="42" width="92" height="3" rx="1" fill="currentColor" opacity="0.4" />
      {/* Bogies */}
      <rect x="12" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="68" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      {/* Wheels */}
      <circle cx="18" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="72" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="72" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="82" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="82" cy="48" r="2" fill="currentColor" opacity="0.3" />
      {/* Couplings */}
      <rect x="0" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="94" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function TankCar() {
  return (
    <svg width="100" height="52" viewBox="0 0 100 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tank body */}
      <ellipse cx="50" cy="24" rx="42" ry="14" fill="currentColor" opacity="0.6" />
      {/* Tank highlights */}
      <ellipse cx="50" cy="20" rx="38" ry="8" fill="white" opacity="0.06" />
      {/* End caps */}
      <ellipse cx="10" cy="24" rx="4" ry="12" fill="currentColor" opacity="0.5" />
      <ellipse cx="90" cy="24" rx="4" ry="12" fill="currentColor" opacity="0.5" />
      {/* Top hatch */}
      <rect x="45" y="8" width="10" height="4" rx="2" fill="currentColor" opacity="0.5" />
      {/* Support frame */}
      <rect x="6" y="36" width="88" height="6" rx="1" fill="currentColor" opacity="0.4" />
      {/* Undercarriage */}
      <rect x="4" y="42" width="92" height="3" rx="1" fill="currentColor" opacity="0.4" />
      {/* Bogies */}
      <rect x="12" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="68" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      {/* Wheels */}
      <circle cx="18" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="72" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="72" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="82" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="82" cy="48" r="2" fill="currentColor" opacity="0.3" />
      {/* Couplings */}
      <rect x="0" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="94" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function HopperCar() {
  return (
    <svg width="100" height="52" viewBox="0 0 100 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body - tapered bottom */}
      <path d="M8 10 H92 V30 L78 42 H22 L8 30Z" fill="currentColor" opacity="0.6" />
      {/* Top opening */}
      <rect x="12" y="8" width="76" height="4" rx="1" fill="currentColor" opacity="0.45" />
      {/* Panel ribs */}
      <line x1="30" y1="10" x2="26" y2="42" stroke="white" strokeWidth="0.7" opacity="0.1" />
      <line x1="50" y1="10" x2="50" y2="42" stroke="white" strokeWidth="0.7" opacity="0.1" />
      <line x1="70" y1="10" x2="74" y2="42" stroke="white" strokeWidth="0.7" opacity="0.1" />
      {/* Undercarriage */}
      <rect x="4" y="42" width="92" height="3" rx="1" fill="currentColor" opacity="0.4" />
      {/* Bogies */}
      <rect x="12" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="68" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.35" />
      {/* Wheels */}
      <circle cx="18" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="72" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="72" cy="48" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="82" cy="48" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="82" cy="48" r="2" fill="currentColor" opacity="0.3" />
      {/* Couplings */}
      <rect x="0" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="94" y="36" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

const TRAIN_CARS = [
  Locomotive, BoxCar, ContainerCar, TankCar, BoxCar, HopperCar,
  ContainerCar, BoxCar, TankCar, HopperCar, BoxCar, ContainerCar,
];

export default function TrainTicker({ variant = "blue" }: { variant?: "blue" | "white" }) {
  const colorClass = variant === "white" ? "text-white/20" : "text-tam-blue/20";

  return (
    <div className="relative overflow-hidden py-4">
      <div className={`flex ${colorClass}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-end gap-0 animate-train-scroll">
            {TRAIN_CARS.map((Car, i) => (
              <div key={`${copy}-${i}`} className="shrink-0 -mx-[3px]">
                <Car />
              </div>
            ))}
            <div className="w-20 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
