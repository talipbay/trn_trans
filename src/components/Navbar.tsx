"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo_blue.png";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Заявка", href: "#contact-form" },
  { label: "Контакты", href: "#contacts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-tam-blue">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image src={logo} alt="TRN Trans" width={120} height={32} className="h-8 w-auto brightness-0 invert" priority />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-white transition-colors hover:text-white/80"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-tam-blue transition-colors hover:bg-white/90"
          >
            Связаться
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-tam-blue/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacts"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-tam-blue"
            >
              Связаться
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
