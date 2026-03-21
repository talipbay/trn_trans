"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { getNews, strapiMedia, type NewsArticle } from "@/lib/strapi";

export default function NewsPage() {
  const { t, locale } = useI18n();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  useEffect(() => {
    setLoading(true);
    getNews(undefined, locale).then((data) => { setArticles(data); setLoading(false); }).catch(() => setLoading(false));
  }, [locale]);

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
            {t("docs.label")}
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-tam-black sm:text-5xl">
            {t("docs.news.title")}
          </h1>
          <div className="mb-8 h-1 w-16 rounded-full bg-tam-blue" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <div className="h-4 w-48 animate-pulse rounded bg-tam-grey/30" />
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <p className="text-tam-black/50">{t("docs.news.placeholder")}</p>
              </div>
            ) : (
              articles.map((article) => (
                <button key={article.id} onClick={() => setSelected(article)} className="flex flex-col text-left overflow-hidden rounded-2xl border border-tam-grey/40 pb-4 transition-all hover:border-tam-blue/20 hover:shadow-md">
                  {article.cover?.url && (
                    <div className="relative h-48 w-full shrink-0">
                      <Image
                        src={strapiMedia(article.cover.formats?.medium?.url || article.cover.url)}
                        alt={article.cover.alternativeText || article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="h-48 overflow-y-auto p-5 pb-6">
                    <div className="mb-2 flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        article.category === "social" ? "bg-tam-mint/10 text-tam-mint" : "bg-tam-blue/10 text-tam-blue"
                      }`}>
                        {article.category === "social" ? t("nav.docs.social") : t("nav.docs.news")}
                      </span>
                      <span className="text-xs text-tam-black/30">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base font-semibold text-tam-black">{article.title}</h3>
                    {article.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-tam-black/60">{article.summary}</p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Article modal */}
      {selected && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-tam-black/60 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-tam-grey/10 text-tam-black/40 transition-colors hover:bg-tam-grey/20 hover:text-tam-black" aria-label="Close">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-4 flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                selected.category === "social" ? "bg-tam-mint/10 text-tam-mint" : "bg-tam-blue/10 text-tam-blue"
              }`}>
                {selected.category === "social" ? t("nav.docs.social") : t("nav.docs.news")}
              </span>
              <span className="text-xs text-tam-black/30">{new Date(selected.publishedAt).toLocaleDateString()}</span>
            </div>

            <h2 className="mb-6 text-xl font-semibold tracking-tight text-tam-black pr-10 sm:text-2xl">{selected.title}</h2>

            {selected.cover?.url && (
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
                <Image src={strapiMedia(selected.cover.formats?.large?.url || selected.cover.url)} alt={selected.cover.alternativeText || selected.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
            )}

            {selected.summary && <p className="mb-4 text-sm leading-relaxed text-tam-black/70">{selected.summary}</p>}

            {selected.images && selected.images.length > 0 && (
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {selected.images.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={strapiMedia(img.formats?.medium?.url || img.url)} alt={img.alternativeText || `${selected.title} ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            )}

            {selected.content && <div className="text-sm leading-relaxed text-tam-black/70 whitespace-pre-line">{selected.content}</div>}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
