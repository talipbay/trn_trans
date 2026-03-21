"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { getNews, strapiMedia, type NewsArticle } from "@/lib/strapi";

export default function NewsPage() {
  const { t, locale } = useI18n();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNews(undefined, locale).then((data) => { setArticles(data); setLoading(false); }).catch(() => setLoading(false));
  }, [locale]);

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
                    <div className="mb-2 flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        article.category === "social"
                          ? "bg-tam-mint/10 text-tam-mint"
                          : "bg-tam-blue/10 text-tam-blue"
                      }`}>
                        {article.category === "social" ? t("nav.docs.social") : t("nav.docs.news")}
                      </span>
                      <span className="text-xs text-tam-black/30">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-tam-black">{article.title}</h3>
                    {article.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-tam-black/60">{article.summary}</p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
