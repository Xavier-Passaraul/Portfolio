"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Home, FolderKanban, Cpu, Mail } from "lucide-react";

const links = [
  { href: "#inicio", label: "Inicio", icon: Home },
  { href: "/proyectos", label: "Proyectos", icon: FolderKanban },
  { href: "#tecnologias", label: "Tecnologías", icon: Cpu },
  { href: "#contacto", label: "Contacto", icon: Mail },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  // La barra se oculta apenas termina el Hero y reaparece si el usuario
  // vuelve a scrollear hacia arriba y el Hero vuelve a estar en pantalla.
  useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ x: visible ? 0 : "-120%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-3 md:left-4 top-1/2 -translate-y-1/2 z-50"
    >
      <nav
        aria-label="Navegación principal"
        className="relative w-16 md:w-48 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        {/* Highlight superior: simula el reflejo de luz en el cristal */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

        <div className="relative flex flex-col items-stretch py-4 px-2.5 gap-1">
          {/* Logo estilo prompt de terminal */}
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start gap-1 font-mono text-sm font-semibold text-white tracking-tight pb-4 mb-2 border-b border-white/10"
          >
            <Code2 className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="hidden md:inline">Xavier</span>
          </Link>

          <ul
            className="flex flex-col gap-1"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    className="relative flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-full"
                  >
                    {hovered === link.href && (
                      <motion.div
                        layoutId="liquidBlob"
                        className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className="relative z-10 w-[18px] h-[18px] shrink-0" />
                    <span className="relative z-10 hidden md:inline">
                      {link.label}
                    </span>
                    <span className="sr-only md:hidden">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </motion.div>
  );
}
