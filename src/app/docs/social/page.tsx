"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { getNews, strapiMedia, type NewsArticle } from "@/lib/strapi";

const PHOTOS = [
  "/images/social/1.jpeg",
  "/images/social/2.jpeg",
  "/images/social/3.jpeg",
  "/images/social/4.jpeg",
  "/images/social/5.jpeg",
];

export default function SocialPage() {
  const { t, locale } = useI18n();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNews("social", locale).then((data) => { setArticles(data); setLoading(false); }).catch(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-tam-mint">
            {t("social.label")}
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-tam-black sm:text-5xl">
            {t("social.title")}
          </h1>
          <div className="mb-8 h-1 w-16 rounded-full bg-tam-blue" />
          <p className="max-w-3xl text-lg leading-relaxed text-tam-black/70">
            {t("social.text")}
          </p>

          {/* Gallery */}
          <div className="mt-14">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-tam-black/30">{t("social.gallery")}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {PHOTOS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-tam-grey/20"
                >
                  <Image
                    src={src}
                    alt={`${t("social.gallery")} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-tam-blue/0 transition-colors group-hover:bg-tam-blue/10" />
                </button>
              ))}
            </div>
          </div>

          {/* Social news from Strapi */}
          {!loading && articles.length > 0 && (
            <div className="mt-14">
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-tam-black/30">{t("nav.docs.news")}</p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link key={article.id} href={`/docs/news/${article.documentId}`} className="flex flex-col overflow-hidden rounded-2xl border border-tam-grey/40 pb-4 transition-all hover:border-tam-blue/20 hover:shadow-md">
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
                      <span className="text-xs text-tam-black/30">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                      <h3 className="mt-1 text-base font-semibold text-tam-black">{article.title}</h3>
                      {article.summary && (
                        <p className="mt-2 text-sm leading-relaxed text-tam-black/60">{article.summary}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-tam-black/80 backdrop-blur-sm">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length)}
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="relative mx-16 max-h-[80vh] max-w-[90vw]">
            <Image
              src={PHOTOS[lightbox]}
              alt={`${t("social.gallery")} ${lightbox + 1}`}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
          </div>
          <button
            onClick={() => setLightbox((lightbox + 1) % PHOTOS.length)}
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
            {lightbox + 1} / {PHOTOS.length}
          </p>
        </div>
      )}

      <Footer />
    </>
  );
}
