"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo_blue.png";
import { ScatteredPattern } from "@/components/TrianglePatterns";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  const NAV_LINKS = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.career"), href: "/career" },
    { label: t("nav.contacts"), href: "#contacts" },
  ];

  const DOC_LINKS = [
    { label: t("nav.docs.founding"), href: "/docs/founding" },
    { label: t("nav.docs.social"), href: "/docs/social" },
    { label: t("nav.docs.news"), href: "/docs/news" },
    { label: t("nav.docs.contracts"), href: "/docs/contracts" },
  ];

  return (
    <footer id="contacts" className="relative bg-tam-blue overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ScatteredPattern color="#FFFFFF" opacity={0.04} count={60} />
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10">
        {/* Top row: logo + nav columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* Logo + tagline */}
          <div className="lg:col-span-4">
            <Image src={logo} alt="TRN Trans" width={140} height={36} className="h-9 w-auto brightness-0 invert mb-4" />
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">{t("footer.navigation")}</p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">{t("nav.documents")}</p>
            <div className="flex flex-col gap-2.5">
              {DOC_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">{t("footer.contacts")}</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:office.trntrans@turanasset.com" className="text-sm text-white/60 transition-colors hover:text-white">
                office.trntrans@turanasset.com
              </a>
              <a href="https://wa.me/77717003053" className="text-sm text-white/60 transition-colors hover:text-white">
                +7 771 700 30 53
              </a>
              {/* Social icons */}
              <div className="mt-2 flex gap-3">
                <a href="tel:+77717003053" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20" aria-label="Call">
                  <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </a>
                <a href="https://t.me/+77717003053" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20" aria-label="Telegram">
                  <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a href="https://wa.me/77717003053" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20" aria-label="WhatsApp">
                  <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 h-px bg-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} TRN Trans. {t("footer.rights")}
          </p>
          <p className="text-xs text-white/30">
            {t("footer.company_name")} — {t("footer.holding")}
          </p>
        </div>
      </div>
    </footer>
  );
}
