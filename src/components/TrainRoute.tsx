"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OPTION A: Animated Train Route Line
 * A horizontal SVG line that draws itself on scroll with triangle station markers.
 */

const STATIONS = [
  "Алматы",
  "Астана",
  "Актау",
  "Москва",
  "Минск",
];

export default function TrainRoute() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          setProgress(Math.min(ratio * 2.5, 1));
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(el);

    const onScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (rect.top - viewH * 0.3) / (viewH * 0.5)));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative h-24">
          {/* Track background */}
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-tam-grey/50" />

          {/* Animated progress line */}
          <div
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-tam-blue transition-all duration-700 ease-out"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Train icon on the line */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{ left: `${progress * 100}%` }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tam-blue shadow-lg shadow-tam-blue/30">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m0 0V4.875c0-.621-.504-1.125-1.125-1.125H5.625" />
              </svg>
            </div>
          </div>

          {/* Station markers */}
          {STATIONS.map((name, i) => {
            const x = (i / (STATIONS.length - 1)) * 100;
            const active = progress * 100 >= x;
            return (
              <div
                key={name}
                className="absolute top-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${x}%` }}
              >
                {/* Triangle marker */}
                <div className={`-translate-y-[18px] transition-colors duration-500 ${active ? "text-tam-blue" : "text-tam-grey"}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <polygon points="0,0 12,0 0,12" fill="currentColor" />
                  </svg>
                </div>
                {/* Station name */}
                <span className={`mt-4 text-xs font-medium transition-colors duration-500 ${active ? "text-tam-black" : "text-tam-black/30"}`}>
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
