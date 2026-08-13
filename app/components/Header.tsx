"use client";

import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cotizacion", label: "Cotizacion" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1220] border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-tight">
            OXXEN<span className="text-[#38BDF8]">GROUP</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/cotizacion"
          className="hidden md:inline-block bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0B1220] font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
        >
          Cotizar ahora
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Abrir menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-[#0B1220] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-white text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cotizacion"
            className="bg-[#38BDF8] text-[#0B1220] font-semibold text-sm px-5 py-2.5 rounded-md text-center"
          >
            Cotizar ahora
          </a>
        </nav>
      )}
    </header>
  );
}