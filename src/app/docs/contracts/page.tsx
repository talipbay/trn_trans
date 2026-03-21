"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { getContractDocuments, strapiMedia, type ContractDocument } from "@/lib/strapi";

export default function ContractsPage() {
  const { t, locale } = useI18n();
  const [docs, setDocs] = useState<ContractDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContractDocuments(locale).then((data) => { setDocs(data); setLoading(false); }).catch(() => setLoading(false));
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
            {t("docs.contracts.title")}
          </h1>
          <div className="mb-8 h-1 w-16 rounded-full bg-tam-blue" />

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <div className="h-4 w-48 animate-pulse rounded bg-tam-grey/30" />
              </div>
            ) : docs.length === 0 ? (
              <div className="rounded-2xl border border-tam-grey/40 p-8">
                <p className="text-tam-black/50">{t("docs.contracts.placeholder")}</p>
              </div>
            ) : (
              docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-2xl border border-tam-grey/40 p-6 transition-all hover:border-tam-blue/20 hover:shadow-md">
                  <div>
                    <h3 className="text-base font-semibold text-tam-black">{doc.title}</h3>
                    {doc.description && (
                      <p className="mt-1 text-sm text-tam-black/50">{doc.description}</p>
                    )}
                  </div>
                  {doc.file?.url && (
                    <a
                      href={strapiMedia(doc.file.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 shrink-0 rounded-xl bg-tam-blue/10 px-4 py-2 text-sm font-medium text-tam-blue transition-colors hover:bg-tam-blue hover:text-white"
                    >
                      <svg className="inline-block h-4 w-4 mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {doc.file.name}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
