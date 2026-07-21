"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  // La barra se oculta apenas termina el Hero y reaparece si el usuario
  // vuelve a scrollear hacia arriba y el Hero vuelve a estar en pantalla.
  useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setIsOpen(false);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "-150%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 inset-x-0 z-50 w-full flex justify-center px-4"
    >
      <nav className="relative w-full max-w-3xl" aria-label="Navegación principal">
        {/* Contenedor de vidrio líquido */}
        <div className="relative rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Highlight superior: simula el reflejo de luz en el cristal */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

          <div className="relative flex items-center justify-between h-14 px-4 sm:px-5">
            {/* Logo estilo prompt de terminal */}
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-white tracking-tight flex items-center gap-1 shrink-0"
            >
              <span className="text-blue-400">{"<"}</span>
              Xavier
              <span className="text-blue-400">{" />"}</span>
            </Link>

            {/* Menú Desktop */}
            <div
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHovered(null)}
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {hovered === link.href && (
                    <motion.div
                      layoutId="liquidBlob"
                      className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Botón Menú Móvil */}
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="sr-only">
                {isOpen ? "Cerrar menú principal" : "Abrir menú principal"}
              </span>
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              <div className="px-2 py-2 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
