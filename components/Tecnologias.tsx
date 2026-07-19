"use client";

import { useEffect } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiSqlite,
  SiCapacitor,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { CSSProperties } from "react";

interface Tech {
  nombre: string;
  Icono: IconType;
}

interface Categoria {
  titulo: string;
  colorClass: "c-cyan" | "c-green" | "c-pink";
  tecnologias: Tech[];
}

const categorias: Categoria[] = [
  {
    titulo: "// frontend",
    colorClass: "c-cyan",
    tecnologias: [
      { nombre: "React", Icono: SiReact },
      { nombre: "TypeScript", Icono: SiTypescript },
      { nombre: "JavaScript", Icono: SiJavascript },
      { nombre: "Next.js", Icono: SiNextdotjs },
      { nombre: "Vite", Icono: SiVite },
      { nombre: "Tailwind CSS", Icono: SiTailwindcss },
      { nombre: "HTML5", Icono: SiHtml5 },
      { nombre: "CSS3", Icono: SiCss },
    ],
  },
  {
    titulo: "// backend & datos",
    colorClass: "c-green",
    tecnologias: [
      { nombre: "Node.js", Icono: SiNodedotjs },
      { nombre: "Supabase", Icono: SiSupabase },
      { nombre: "PostgreSQL", Icono: SiPostgresql },
      { nombre: "Prisma", Icono: SiPrisma },
      { nombre: "SQLite", Icono: SiSqlite },
    ],
  },
  {
    titulo: "// mobile & herramientas",
    colorClass: "c-pink",
    tecnologias: [
      { nombre: "Capacitor", Icono: SiCapacitor },
      { nombre: "Git", Icono: SiGit },
    ],
  },
];

// Helper para pasar variables CSS custom (--i) tipadas sin pelear con CSSProperties
const cssVars = (vars: Record<string, string | number>): CSSProperties =>
  vars as CSSProperties;

export default function Tecnologias() {
  // Misma fuente (Fira Code) que usa el terminal-header de Contacto.
  useEffect(() => {
    if (document.getElementById("fira-code-font")) return;
    const fontLink = document.createElement("link");
    fontLink.id = "fira-code-font";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  return (
    <section id="tecnologias" className="py-24">
      <style>{`
        #tecnologias .tec-container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            perspective: 1200px;
        }

        /* ==========================================
           1. ORBES DE LUZ (idénticos a los de Contacto)
           ========================================== */
        #tecnologias .bg-blobs {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }

        #tecnologias .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.8;
            mix-blend-mode: screen;
        }

        #tecnologias .b1 { width: 400px; height: 400px; background: #ff007f; top: -10%; left: -10%; animation: tecFloat1 8s infinite alternate ease-in-out; }
        #tecnologias .b2 { width: 350px; height: 350px; background: #00f0ff; bottom: -10%; right: -10%; animation: tecFloat2 11s infinite alternate ease-in-out; }
        #tecnologias .b3 { width: 300px; height: 300px; background: #39ff14; top: 30%; left: 30%; animation: tecFloat3 9s infinite alternate ease-in-out; }

        @keyframes tecFloat1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(150px, 100px) scale(1.2); }
            100% { transform: translate(-50px, 200px) scale(0.9); }
        }
        @keyframes tecFloat2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-200px, -150px) scale(1.3); }
            100% { transform: translate(-50px, -300px) scale(1); }
        }
        @keyframes tecFloat3 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(200px, -100px) scale(0.8); }
            100% { transform: translate(-150px, 150px) scale(1.4); }
        }

        /* ==========================================
           2. LIQUID GLASS (mismos valores que .liquid-card)
           ========================================== */
        #tecnologias .liquid-card {
            position: relative;
            z-index: 10;
            background: rgba(15, 15, 20, 0.25);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 24px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            transform-style: preserve-3d;
            overflow: hidden;
        }

        #tecnologias .liquid-card:hover {
            transform: rotateX(2deg) rotateY(-2deg);
        }

        /* ==========================================
           3. TERMINAL HEADER (idéntico a Contacto)
           ========================================== */
        #tecnologias .terminal-header {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            background: rgba(0,0,0,0.25);
        }

        #tecnologias .dots { display: flex; gap: 8px; margin-right: 20px; }
        #tecnologias .dot { width: 12px; height: 12px; border-radius: 50%; }

        #tecnologias .terminal-path {
            font-family: 'Fira Code', monospace;
            color: #fff;
            font-size: 0.9rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        /* ==========================================
           4. CHIPS DE TECNOLOGÍA (mismo lenguaje visual que .contact-btn)
           ========================================== */
        #tecnologias .tec-body { padding: 30px; }

        @media (min-width: 768px) {
            #tecnologias .tec-body { padding: 48px; }
        }

        #tecnologias .tech-chip {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 18px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255,255,255,0.85);
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            cursor: default;
        }

        #tecnologias .tech-chip svg { font-size: 1.1rem; transition: transform 0.3s ease, color 0.3s ease; color: #94a3b8; }

        #tecnologias .tech-chip:hover { transform: translateY(-3px); }
        #tecnologias .tech-chip:hover svg { transform: scale(1.2); }

        #tecnologias .tech-chip.c-cyan:hover { border-color: #00f0ff; background: rgba(0, 240, 255, 0.1); box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); color: #fff; }
        #tecnologias .tech-chip.c-cyan:hover svg { color: #00f0ff; }

        #tecnologias .tech-chip.c-green:hover { border-color: #39ff14; background: rgba(57, 255, 20, 0.1); box-shadow: 0 0 20px rgba(57, 255, 20, 0.3); color: #fff; }
        #tecnologias .tech-chip.c-green:hover svg { color: #39ff14; }

        #tecnologias .tech-chip.c-pink:hover { border-color: #ff007f; background: rgba(255, 0, 127, 0.1); box-shadow: 0 0 20px rgba(255, 0, 127, 0.3); color: #fff; }
        #tecnologias .tech-chip.c-pink:hover svg { color: #ff007f; }
      `}</style>

      <div className="tec-container">
        {/* Fondo animado */}
        <div className="bg-blobs">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>

        {/* Cristal principal */}
        <div className="liquid-card">
          <div className="terminal-header">
            <div className="dots">
              <div className="dot" style={{ background: "#ff5f56" }} />
              <div className="dot" style={{ background: "#ffbd2e" }} />
              <div className="dot" style={{ background: "#27c93f" }} />
            </div>
            <span className="terminal-path">
              <SiTypescript size={12} style={{ color: "#00f0ff" }} />
              ~/tecnologias/stack.tsx
            </span>
          </div>

          <div className="tec-body">
            <div className="mb-10 font-mono" style={{ fontFamily: "'Fira Code', monospace" }}>
              <span className="text-pink-500">const</span>{" "}
              <span className="text-blue-400">stack</span>{" "}
              <span className="text-slate-300">=</span>{" "}
              <span className="text-emerald-400">"Mis Tecnologías"</span>
              <span className="text-slate-300">;</span>
              <span className="ml-2 animate-pulse text-slate-400">_</span>
            </div>

            <div className="flex flex-col gap-10">
              {categorias.map((categoria) => (
                <div key={categoria.titulo}>
                  <p className="font-mono text-sm tracking-wide text-[#6a9955] mb-5">
                    {categoria.titulo}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {categoria.tecnologias.map(({ nombre, Icono }, i) => (
                      <span
                        key={nombre}
                        className={`tech-chip ${categoria.colorClass}`}
                        style={cssVars({ "--i": i })}
                      >
                        <Icono size={18} />
                        <span>{nombre}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}