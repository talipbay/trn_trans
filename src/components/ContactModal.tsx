"use client";

import { useEffect } from "react";
import { DenseGradientPattern } from "@/components/TrianglePatterns";
import { useI18n } from "@/lib/i18n";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-tam-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-8 shadow-2xl sm:p-10 animate-modal-in">
        {/* Corner gradient pattern */}
        <div className="pointer-events-none absolute -bottom-2 -right-2 opacity-60">
          <DenseGradientPattern color="#1D90F9" rows={10} cols={10} />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-tam-black/40 transition-colors hover:bg-tam-grey/30 hover:text-tam-black"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-tam-mint">
          {t("form.label")}
        </p>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-tam-black">
          {t("form.title")}
        </h2>

        <form className="relative flex flex-col gap-5">
          <div>
            <label htmlFor="modal-name" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.name")}
            </label>
            <input
              type="text"
              id="modal-name"
              placeholder={t("form.name_placeholder")}
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="modal-email" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.email")}
            </label>
            <input
              type="email"
              id="modal-email"
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="modal-phone" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.phone")}
            </label>
            <input
              type="tel"
              id="modal-phone"
              placeholder="+7 (___) ___-__-__"
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="modal-message" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.message")}
            </label>
            <textarea
              id="modal-message"
              rows={3}
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
    </div>
  );
}
