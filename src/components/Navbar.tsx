"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo_blue.png";
import ContactModal from "@/components/ContactModal";
import { useI18n, type Locale } from "@/lib/i18n";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "kz", label: "KZ" },
  { code: "en", label: "EN" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  const NAV_LINKS = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.career"), href: "/career" },
    { label: t("nav.contacts"), href: "#contacts" },
  ];

  const DOC_SUBMENU = [
    { label: t("nav.docs.founding"), href: "/docs/founding" },
    { label: t("nav.docs.social"), href: "/docs/social" },
    { label: t("nav.docs.news"), href: "/docs/news" },
    { label: t("nav.docs.contracts"), href: "/docs/contracts" },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) setDocsOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-tam-blue">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center">
          <Image src={logo} alt="TRN Trans" width={120} height={32} className="h-8 w-auto brightness-0 invert" priority />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className="text-sm font-bold text-white transition-colors hover:text-white/80">{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className="text-sm font-bold text-white transition-colors hover:text-white/80">{link.label}</Link>
            )
          )}

          {/* Документы dropdown */}
          <div ref={docsRef} className="relative">
            <button onClick={() => setDocsOpen(!docsOpen)} className="flex items-center gap-1 text-sm font-bold text-white transition-colors hover:text-white/80 leading-none">
              {t("nav.documents")}
              <svg className={`h-3.5 w-3.5 translate-y-[3px] transition-transform ${docsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {docsOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 rounded-xl bg-white py-2 shadow-xl shadow-tam-black/10">
                {DOC_SUBMENU.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setDocsOpen(false)} className="block px-4 py-2.5 text-sm text-tam-black/70 transition-colors hover:bg-tam-blue/5 hover:text-tam-blue">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm font-bold text-white/70 transition-colors hover:text-white leading-none">
              {locale.toUpperCase()}
              <svg className={`h-3 w-3 translate-y-[2px] transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-3 w-20 rounded-xl bg-white py-1 shadow-xl shadow-tam-black/10">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); setLangOpen(false); }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-tam-blue/5 hover:text-tam-blue ${locale === l.code ? "font-bold text-tam-blue" : "text-tam-black/60"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isHome ? (
            <a href="#contacts" className="rounded-full bg-white px-5 py-2 text-sm font-semibold leading-none text-tam-blue transition-colors hover:bg-white/90">{t("nav.contact_us")}</a>
          ) : (
            <button onClick={() => setModalOpen(true)} className="rounded-full bg-white px-5 py-2 text-sm font-semibold leading-none text-tam-blue transition-colors hover:bg-white/90">{t("nav.contact_us")}</button>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 md:hidden" aria-label="Toggle menu">
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-tam-blue/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-white/80 transition-colors hover:text-white">{link.label}</a>
              ) : (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-white/80 transition-colors hover:text-white">{link.label}</Link>
              )
            )}

            <button onClick={() => setMobileDocsOpen(!mobileDocsOpen)} className="flex items-center justify-between text-base font-medium text-white/80 transition-colors hover:text-white">
              {t("nav.documents")}
              <svg className={`h-4 w-4 transition-transform ${mobileDocsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileDocsOpen && (
              <div className="flex flex-col gap-3 pl-4 border-l border-white/20">
                {DOC_SUBMENU.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => { setOpen(false); setMobileDocsOpen(false); }} className="text-sm text-white/60 transition-colors hover:text-white">{item.label}</Link>
                ))}
              </div>
            )}

            {/* Mobile language selector */}
            <div className="flex items-center gap-2 mt-2">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${locale === l.code ? "bg-white text-tam-blue" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {isHome ? (
              <a href="#contacts" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-tam-blue">{t("nav.contact_us")}</a>
            ) : (
              <button onClick={() => { setOpen(false); setModalOpen(true); }} className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-tam-blue">{t("nav.contact_us")}</button>
            )}
          </div>
        </div>
      )}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
}
