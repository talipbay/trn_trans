"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import {
  SparseGridPattern,
  DenseGradientPattern,
  ScatteredPattern,
  MosaicDivider,
} from "@/components/TrianglePatterns";
import TrainRoute from "@/components/TrainRoute";
import TrainTicker from "@/components/TrainTicker";

const TriangleSphere = dynamic(() => import("@/components/TriangleSphere"), {
  ssr: false,
});

const ABOUT_ITEMS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Опыт и экспертиза",
    text: "Команда профессионалов, зарекомендовавшая себя на рынке Евразии с опытом работы более 10 лет",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Перевозки «под ключ»",
    text: "Организация перевозок «под ключ» для вашего бизнеса",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Консультации",
    text: "Возможность оказания консультаций по технологическим ж/д процессам",
  },
];

export default function Home() {
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
            TRN Trans — Logistics
          </p>
        </div>

        {/* Vertical text — right side */}
        <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40"
             style={{ writingMode: "vertical-rl" }}>
            Надежный партнер вашего бизнеса
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
                О компании
              </p>
              <h2 className="mb-6 text-4xl font-semibold tracking-tight text-tam-black sm:text-5xl">
                TRN Trans
              </h2>
              <div className="mb-0 h-1 w-16 rounded-full bg-tam-blue" />
            </div>
          </ScrollReveal>

          {/* Description + stats row */}
          <div className="mb-16 grid items-start gap-12 lg:grid-cols-5">
            <ScrollReveal direction="left" delay={100} className="lg:col-span-3">
              <p className="text-lg leading-relaxed text-tam-black/70">
                Транспортно-логистическая компания, предоставляющая услуги по перевозке грузов железнодорожным и автотранспортом
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200} className="lg:col-span-2">
              <div className="flex gap-12 lg:justify-end">
                <div>
                  <p className="text-4xl font-bold text-tam-blue">10+</p>
                  <p className="mt-1 text-sm text-tam-black/50">лет на рынке</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-tam-blue">200</p>
                  <p className="mt-1 text-sm text-tam-black/50">вагонов</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Points */}
          <div className="grid gap-8 sm:grid-cols-3">
            {ABOUT_ITEMS.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 150}>
                <div className="group flex flex-col gap-4 px-8 py-8 first:pl-0 last:pr-0 max-sm:px-0 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tam-blue/10 text-tam-blue transition-colors group-hover:bg-tam-blue group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-tam-black">{item.title}</h3>
                  <p className="text-base leading-relaxed text-tam-black/60">{item.text}</p>
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
                  Обратная связь
                </p>
                <h2 className="mb-6 text-3xl font-semibold tracking-tight text-tam-black sm:text-4xl">
                  Оставьте заявку
                </h2>
                <p className="mb-8 max-w-md text-base leading-relaxed text-tam-black/70">
                  Заполните форму, и наши специалисты свяжутся с вами в ближайшее время для обсуждения деталей сотрудничества.
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
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Введите имя"
                    className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-tam-black">
                    E-mail
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
                    Телефон
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
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Опишите ваш запрос..."
                    className="w-full resize-none rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-tam-blue py-4 text-base font-semibold text-white transition-all hover:bg-tam-blue/90 hover:shadow-lg hover:shadow-tam-blue/25 active:scale-[0.98]"
                >
                  Отправить заявку
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

      {/* Contacts */}
      <section id="contacts" className="relative bg-tam-blue py-24 overflow-hidden">
        {/* Scattered triangle background */}
        <div className="pointer-events-none absolute inset-0">
          <ScatteredPattern color="#FFFFFF" opacity={0.05} count={80} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal direction="up">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">
              Контакты
            </p>
            <h2 className="mb-12 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Свяжитесь с нами
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal direction="left" delay={0}>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Компания</p>
                <p className="text-lg font-semibold text-white">ТОО «TRN Trans»</p>
                <p className="text-base text-white/70">холдинг Turan Asset Management</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/50">E-mail</p>
                <a href="mailto:office.trntrans@turanasset.com" className="text-lg font-medium text-white underline-offset-4 hover:underline">
                  office.trntrans@turanasset.com
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/50">WhatsApp / мобильный</p>
                <a href="https://wa.me/77715819627" className="text-lg font-medium text-white underline-offset-4 hover:underline">
                  +7 771 581 96 27
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
