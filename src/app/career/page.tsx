"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import { useI18n } from "@/lib/i18n";
import { getVacancies, type Vacancy } from "@/lib/strapi";

export default function CareerPage() {
  const { t, locale } = useI18n();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Vacancy | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [applyTitle, setApplyTitle] = useState("");

  useEffect(() => {
    setLoading(true);
    getVacancies(locale).then((data) => { setVacancies(data); setLoading(false); }).catch(() => setLoading(false));
  }, [locale]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-tam-mint">
            {t("career.label")}
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-tam-black sm:text-5xl">
            {t("career.title")}
          </h1>
          <div className="mb-8 h-1 w-16 rounded-full bg-tam-blue" />
          <p className="max-w-2xl text-lg leading-relaxed text-tam-black/70">
            {t("career.text")}
          </p>

          <div className="mt-12 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <div className="h-4 w-48 animate-pulse rounded bg-tam-grey/30" />
              </div>
            ) : vacancies.length === 0 ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <p className="text-tam-black/50">{t("career.placeholder")}</p>
              </div>
            ) : (
              vacancies.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelected(v)}
                  className="w-full text-left rounded-2xl border border-tam-grey/40 p-6 transition-all hover:border-tam-blue/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-tam-black">{v.title}</h3>
                      {v.location && (
                        <p className="mt-1 text-sm text-tam-black/40">{v.location}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-tam-black/30">
                      {new Date(v.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {v.description && (
                    <p className="mt-3 text-sm leading-relaxed text-tam-black/60 line-clamp-2">{v.description}</p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Vacancy modal */}
      {selected && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-tam-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-tam-grey/10 text-tam-black/40 transition-colors hover:bg-tam-grey/20 hover:text-tam-black"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold text-tam-black pr-10">{selected.title}</h2>
            <div className="mt-3 flex items-center gap-3">
              {selected.location && (
                <span className="text-sm text-tam-black/50">{selected.location}</span>
              )}
              <span className="text-xs text-tam-black/30">
                {new Date(selected.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-1 h-px w-full bg-tam-grey/30" />
            {selected.description && (
              <p className="mt-5 text-sm leading-relaxed text-tam-black/70 whitespace-pre-line">{selected.description}</p>
            )}
            <button
              onClick={() => { setApplyTitle(selected.title); setSelected(null); setContactOpen(true); }}
              className="mt-6 w-full rounded-xl bg-tam-blue py-3.5 text-base font-semibold text-white transition-all hover:bg-tam-blue/90 hover:shadow-lg hover:shadow-tam-blue/25 active:scale-[0.98]"
            >
              {t("career.apply")}
            </button>
          </div>
        </div>
      )}

      <ApplyModal open={contactOpen} onClose={() => setContactOpen(false)} vacancyTitle={applyTitle} />
      <Footer />
    </>
  );
}
