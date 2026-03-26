"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import {
  SparseGridPattern,
  DenseGradientPattern,
  ScatteredPattern,
  MosaicDivider,
} from "@/components/TrianglePatterns";
import TrainRoute from "@/components/TrainRoute";
import TrainTicker from "@/components/TrainTicker";
import { useI18n } from "@/lib/i18n";

const TriangleSphere = dynamic(() => import("@/components/TriangleSphere"), {
  ssr: false,
});

const ABOUT_ICONS = [
  <svg key="i1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
  <svg key="i2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>,
  <svg key="i3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>,
];

export default function Home() {
  const { t } = useI18n();
  const [heroLocked, setHeroLocked] = useState(true);

  // Lock body scroll while hero is active
  useEffect(() => {
    if (heroLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [heroLocked]);

  // Unlock if page loads with a hash (e.g. /#about from navbar)
  useEffect(() => {
    if (window.location.hash) {
      setHeroLocked(false);
    }
  }, []);

  // Listen for hash changes (navbar clicks while on home page)
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) setHeroLocked(false);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Re-lock when user scrolls back to top
  useEffect(() => {
    if (heroLocked) return;
    const onScroll = () => {
      if (window.scrollY === 0) {
        // Clear hash so hero can lock cleanly
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
        setHeroLocked(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroLocked]);

  const handleScrollDown = useCallback(() => {
    setHeroLocked(false);
    // Small delay so overflow is unlocked before scrolling
    requestAnimationFrame(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tam-blue">
        {/* Radial gradient glow behind sphere */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70vmin] h-[70vmin] rounded-full bg-white/[0.06] blur-[80px]" />
        </div>

        {/* Vertical text — left side */}
        <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40"
             style={{ writingMode: "vertical-lr" }}>
            {t("hero.vertical_left")}
          </p>
        </div>

        {/* Vertical text — right side */}
        <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40"
             style={{ writingMode: "vertical-rl" }}>
            {t("hero.vertical_right")}
          </p>
        </div>

        {/* Geometric accent lines */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {/* Top-left corner */}
          <div className="absolute top-20 left-10">
            <div className="h-px w-16 bg-white/35" />
            <div className="mt-0 h-16 w-px bg-white/35" />
          </div>
          {/* Bottom-right corner */}
          <div className="absolute bottom-12 right-10 flex flex-col items-end">
            <div className="mb-0 h-16 w-px bg-white/35" />
            <div className="h-px w-16 bg-white/35" />
          </div>
          {/* Thin horizontal accent — top */}
          <div className="absolute top-[18%] left-[8%] h-px w-24 bg-white/25" />
          {/* Thin horizontal accent — bottom */}
          <div className="absolute bottom-[18%] right-[8%] h-px w-24 bg-white/25" />
        </div>

        {/* Triangle cluster accents + gradient fade triangles */}
        <svg className="pointer-events-none absolute inset-0 w-full h-full hidden md:block" xmlns="http://www.w3.org/2000/svg">
          {/* ── Cluster: top-left corner ── */}
          <polygon points="60,80 78,80 60,98" fill="white" opacity="0.18" />
          <polygon points="82,72 94,72 82,84" fill="white" opacity="0.12" />
          <polygon points="55,105 67,105 55,117" fill="white" opacity="0.08" />
          <polygon points="90,90 98,90 90,98" fill="white" opacity="0.14" />

          {/* ── Cluster: bottom-right corner ── */}
          <polygon points="calc(100% - 80) calc(100% - 90)" fill="white" opacity="0" />
          <g style={{ transform: "translate(calc(100% - 120px), calc(100% - 140px))" } as React.CSSProperties}>
            <polygon points="0,0 18,0 0,18" fill="white" opacity="0.18" />
            <polygon points="24,10 36,10 24,22" fill="white" opacity="0.12" />
            <polygon points="-5,25 7,25 -5,37" fill="white" opacity="0.08" />
            <polygon points="30,30 38,30 30,38" fill="white" opacity="0.14" />
          </g>

          {/* ── Cluster: top-right ── */}
          <g style={{ transform: "translate(calc(100% - 110px), 70px)" } as React.CSSProperties}>
            <polygon points="0,0 14,0 0,14" fill="white" opacity="0.10" />
            <polygon points="20,8 30,8 20,18" fill="white" opacity="0.07" />
            <polygon points="5,20 13,20 5,28" fill="white" opacity="0.05" />
          </g>

          {/* ── Cluster: bottom-left ── */}
          <g style={{ transform: "translate(70px, calc(100% - 120px))" } as React.CSSProperties}>
            <polygon points="0,0 14,0 0,14" fill="white" opacity="0.10" />
            <polygon points="18,12 28,12 18,22" fill="white" opacity="0.07" />
            <polygon points="2,22 10,22 2,30" fill="white" opacity="0.05" />
          </g>

          {/* ── Gradient fade: left edge — triangles shrink & fade toward center ── */}
          <polygon points="0,200 20,200 0,220" fill="white" opacity="0.15" />
          <polygon points="30,240 46,240 30,256" fill="white" opacity="0.10" />
          <polygon points="55,270 67,270 55,282" fill="white" opacity="0.06" />
          <polygon points="80,290 88,290 80,298" fill="white" opacity="0.03" />

          <polygon points="0,400 18,400 0,418" fill="white" opacity="0.14" />
          <polygon points="28,430 42,430 28,444" fill="white" opacity="0.09" />
          <polygon points="52,455 62,455 52,465" fill="white" opacity="0.05" />
          <polygon points="75,470 81,470 75,476" fill="white" opacity="0.02" />

          {/* ── Gradient fade: right edge ── */}
          <g style={{ transform: "translate(calc(100% - 100px), 0)" } as React.CSSProperties}>
            <polygon points="100,220 80,220 100,200" fill="white" opacity="0.15" />
            <polygon points="70,260 54,260 70,244" fill="white" opacity="0.10" />
            <polygon points="45,280 33,280 45,268" fill="white" opacity="0.06" />
            <polygon points="20,295 12,295 20,287" fill="white" opacity="0.03" />

            <polygon points="100,420 82,420 100,402" fill="white" opacity="0.14" />
            <polygon points="72,450 58,450 72,436" fill="white" opacity="0.09" />
            <polygon points="48,470 38,470 48,460" fill="white" opacity="0.05" />
            <polygon points="25,480 19,480 25,474" fill="white" opacity="0.02" />
          </g>
        </svg>

        <div className="absolute inset-x-0 top-1/2 h-[90vh] -translate-y-1/2 sm:h-[90vh] max-sm:h-auto max-sm:aspect-square max-sm:w-full">
          <TriangleSphere />
        </div>

        {/* Scroll down button */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 group"
          aria-label="Scroll down"
        >
          <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-white/80 transition-all group-hover:text-white group-hover:tracking-[0.4em]">{t("hero.next")}</span>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-gradient-to-b from-transparent to-white/60" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce-slow">
              <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
          </div>
        </button>

        {/* Contact icons — bottom right */}
        <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-3">
          {/* Phone */}
          <a href="tel:+77717003053" className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20" aria-label="Call">
            <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
          {/* Telegram */}
          <a href="https://t.me/+77717003053" target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20" aria-label="Telegram">
            <svg className="h-6 w-6 text-white/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          {/* WhatsApp */}
          <a href="https://wa.me/77717003053" target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20" aria-label="WhatsApp">
            <svg className="h-6 w-6 text-white/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </div>

      </section>

      {/* About */}
      <section id="about" className="relative bg-white py-24 overflow-hidden">
        {/* Sparse grid background pattern */}
        <div className="pointer-events-none absolute inset-0">
          <SparseGridPattern color="#1422D2" opacity={0.04} size={5} gap={32} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal direction="left">
            <div className="mb-16 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-tam-mint">
                {t("about.label")}
              </p>
              <h2 className="mb-6 text-4xl font-semibold tracking-tight text-tam-black sm:text-5xl">
                {t("about.title")}
              </h2>
              <div className="mb-0 h-1 w-16 rounded-full bg-tam-blue" />
            </div>
          </ScrollReveal>

          {/* Description */}
          <div className="mb-16">
            <ScrollReveal direction="left" delay={100}>
              <p className="text-lg leading-relaxed text-tam-black/70 max-w-3xl">
                {t("about.description")}
              </p>
            </ScrollReveal>
          </div>

          {/* Points */}
          <div className="grid gap-8 sm:grid-cols-3">
            {([
              { icon: ABOUT_ICONS[0], titleKey: "about.item1.title" as const, textKey: "about.item1.text" as const },
              { icon: ABOUT_ICONS[1], titleKey: "about.item2.title" as const, textKey: "about.item2.text" as const },
              { icon: ABOUT_ICONS[2], titleKey: "about.item3.title" as const, textKey: "about.item3.text" as const },
            ]).map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 150}>
                <div className="group flex flex-col gap-4 px-8 py-8 first:pl-0 last:pr-0 max-sm:px-0 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tam-blue/10 text-tam-blue transition-colors group-hover:bg-tam-blue group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-tam-black">{t(item.titleKey)}</h3>
                  <p className="text-base leading-relaxed text-tam-black/60">{t(item.textKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animated train route */}
      <TrainRoute />

      {/* Mosaic divider */}
      <MosaicDivider color="#1422D2" height={40} className="block" />

      {/* Contact Form */}
      <section id="contact-form" className="relative bg-tam-grey/30 py-24 overflow-hidden">
        {/* Sparse grid background for the whole section */}
        <div className="pointer-events-none absolute inset-0">
          <SparseGridPattern color="#1D90F9" opacity={0.05} size={4} gap={28} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left side - text */}
            <ScrollReveal direction="left">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-tam-mint">
                  {t("form.label")}
                </p>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-tam-black sm:text-4xl">
                  {t("form.title")}
                </h2>
                <p className="mb-8 max-w-md text-base leading-relaxed text-tam-black/70">
                  {t("form.description")}
                </p>
              </div>
            </ScrollReveal>

            {/* Right side - form */}
            <ScrollReveal direction="right" delay={150}>
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-tam-black/5 sm:p-10">
              {/* Corner gradient pattern */}
              <div className="pointer-events-none absolute -bottom-2 -right-2 opacity-60">
                <DenseGradientPattern color="#1D90F9" rows={10} cols={10} />
              </div>
              <form className="relative flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-tam-black">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={t("form.name_placeholder")}
                    className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-tam-black">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-tam-black">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-tam-black">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t("form.message_placeholder")}
                    className="w-full resize-none rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-tam-blue py-4 text-base font-semibold text-white transition-all hover:bg-tam-blue/90 hover:shadow-lg hover:shadow-tam-blue/25 active:scale-[0.98]"
                >
                  {t("form.submit")}
                </button>
              </form>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Train ticker */}
      <div className="bg-tam-blue">
        <TrainTicker variant="white" />
      </div>

      <Footer />
    </>
  );
}
