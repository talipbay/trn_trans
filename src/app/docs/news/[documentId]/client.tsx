"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { getNewsArticle, strapiMedia, type NewsArticle } from "@/lib/strapi";

export default function NewsArticleClient() {
  const { t, locale } = useI18n();
  const params = useParams();
  const documentId = params.documentId as string;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNewsArticle(documentId, locale)
      .then((data) => { setArticle(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [documentId, locale]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/docs/news"
            className="mb-8 inline-flex items-center gap-2 text-sm text-tam-black/40 transition-colors hover:text-tam-blue"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {t("docs.news.title")}
          </Link>

          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-64 animate-pulse rounded bg-tam-grey/30" />
              <div className="h-64 animate-pulse rounded-2xl bg-tam-grey/20" />
            </div>
          ) : !article ? (
            <p className="text-tam-black/50">Article not found</p>
          ) : (
            <article>
              <div className="mb-4 flex items-center gap-3">
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

              <h1 className="mb-6 text-xl font-semibold tracking-tight text-tam-black sm:text-2xl">
                {article.title}
              </h1>

              {article.cover?.url && (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
                  <Image
                    src={strapiMedia(article.cover.formats?.large?.url || article.cover.url)}
                    alt={article.cover.alternativeText || article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                  />
                </div>
              )}

              {article.summary && (
                <p className="mb-4 text-sm leading-relaxed text-tam-black/70">{article.summary}</p>
              )}

              {article.images && article.images.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {article.images.map((img, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                        <Image
                          src={strapiMedia(img.formats?.medium?.url || img.url)}
                          alt={img.alternativeText || `${article.title} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {article.content && (
                <div className="text-sm leading-relaxed text-tam-black/70 whitespace-pre-line">
                  {article.content}
                </div>
              )}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
