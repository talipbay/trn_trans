"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { DenseGradientPattern } from "@/components/TrianglePatterns";
import { useI18n } from "@/lib/i18n";
import { submitJobApplication } from "@/lib/strapi";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  vacancyTitle: string;
}

export default function ApplyModal({ open, onClose, vacancyTitle }: ApplyModalProps) {
  const { t } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setFileName(null);
      setStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("apply-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("apply-email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("apply-phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("apply-message") as HTMLTextAreaElement).value,
      vacancyTitle,
      resume: fileRef.current?.files?.[0] || undefined,
    };

    const ok = await submitJobApplication(data);
    setSending(false);
    setStatus(ok ? "success" : "error");
    if (ok) {
      form.reset();
      setFileName(null);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-tam-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-hidden rounded-3xl bg-white p-8 shadow-2xl sm:p-10 animate-modal-in">
        <div className="pointer-events-none absolute -bottom-2 -right-2 opacity-60">
          <DenseGradientPattern color="#1D90F9" rows={10} cols={10} />
        </div>

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
          {t("apply.label")}
        </p>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-tam-black">
          {t("apply.title")}
        </h2>
        <p className="mb-6 text-sm text-tam-black/50">{vacancyTitle}</p>

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
          <div>
            <label htmlFor="apply-name" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.name")}
            </label>
            <input
              type="text"
              id="apply-name"
              name="apply-name"
              required
              placeholder={t("form.name_placeholder")}
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="apply-email" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.email")}
            </label>
            <input
              type="email"
              id="apply-email"
              name="apply-email"
              required
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="apply-phone" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.phone")}
            </label>
            <input
              type="tel"
              id="apply-phone"
              name="apply-phone"
              placeholder="+7 (___) ___-__-__"
              className="w-full rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-tam-black">
              {t("apply.resume")}
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-xl border border-dashed border-tam-grey bg-white px-4 py-3 text-sm text-tam-black/40 transition-all hover:border-tam-blue/40 hover:text-tam-black/60"
            >
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 013.572 5.345A3.75 3.75 0 0118 19.5H6.75z" />
              </svg>
              <span className={fileName ? "text-tam-black" : ""}>
                {fileName || t("apply.upload_placeholder")}
              </span>
            </button>
          </div>
          <div>
            <label htmlFor="apply-message" className="mb-2 block text-sm font-medium text-tam-black">
              {t("form.message")}
            </label>
            <textarea
              id="apply-message"
              name="apply-message"
              rows={3}
              placeholder={t("form.message_placeholder")}
              className="w-full resize-none rounded-xl border border-tam-grey bg-white px-4 py-3 text-tam-black placeholder:text-tam-black/40 focus:border-tam-mint focus:outline-none focus:ring-2 focus:ring-tam-mint/20 transition-all"
            />
          </div>

          {status === "success" && (
            <p className="text-sm font-medium text-green-600">{t("apply.success")}</p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-500">{t("apply.error")}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-2 w-full rounded-xl bg-tam-blue py-4 text-base font-semibold text-white transition-all hover:bg-tam-blue/90 hover:shadow-lg hover:shadow-tam-blue/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? t("apply.sending") : t("apply.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
