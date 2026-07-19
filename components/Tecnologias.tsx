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
  colorClass: "c-blue" | "c-green" | "c-pink";
  tecnologias: Tech[];
}

const categorias: Categoria[] = [
  {
    titulo: "// frontend",
    colorClass: "c-blue",
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

// Helper para pasar variables CSS custom (--i, --catDelay) tipadas sin pelear con CSSProperties
const cssVars = (vars: Record<string, string | number>): CSSProperties =>
  vars as CSSProperties;

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="relative py-24 bg-[#09090b] overflow-hidden">
      <style>{`
        /* ==========================================
           1. ORBES FLOTANDO (mismo enfoque que los blobs de Contacto)
           ========================================== */
        #tecnologias .tec-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            pointer-events: none;
        }
        #tecnologias .tec-blob-1 {
            top: 0;
            left: 25%;
            width: 500px;
            height: 500px;
            background: rgba(37, 99, 235, 0.2);
            mix-blend-mode: screen;
            animation: tecFloat1 10s infinite alternate ease-in-out;
        }
        #tecnologias .tec-blob-2 {
            bottom: 0;
            right: 25%;
            width: 400px;
            height: 400px;
            background: rgba(5, 150, 105, 0.1);
            mix-blend-mode: screen;
            filter: blur(100px);
            animation: tecFloat2 12s infinite alternate ease-in-out;
        }

        @keyframes tecFloat1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(80px, 60px) scale(1.15); }
            100% { transform: translate(-40px, 120px) scale(0.95); }
        }
        @keyframes tecFloat2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-90px, -50px) scale(1.2); }
            100% { transform: translate(30px, -110px) scale(1); }
        }

        /* ==========================================
           2. CARD LIQUID GLASS (mismo tilt 3D que .liquid-card de Contacto)
           ========================================== */
        #tecnologias .tec-card {
            position: relative;
            z-index: 10;
            border-radius: 12px;
            overflow: hidden;
            background: rgba(30, 30, 30, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease;
            transform-style: preserve-3d;
            animation: tecFadeUp 0.6s ease both;
        }
        #tecnologias .tec-card:hover {
            transform: rotateX(1.5deg) rotateY(-1.5deg);
        }

        @keyframes tecFadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ==========================================
           3. ENTRADA EN CASCADA (categorías y chips)
           ========================================== */
        #tecnologias .tec-intro {
            animation: tecFadeIn 0.6s ease 0.15s both;
        }
        @keyframes tecFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        #tecnologias .tec-category {
            animation: tecFadeUp 0.6s ease both;
            animation-delay: calc(var(--catDelay, 0s) + 0.2s);
        }

        #tecnologias .tech-chip {
            animation: tecFadeUp 0.45s ease both;
            animation-delay: calc(var(--catDelay, 0s) + (var(--i, 0) * 0.05s) + 0.4s);
        }

        /* ==========================================
           4. HOVER NEÓN DE LOS CHIPS (mismo enfoque que .contact-btn de Contacto)
           ========================================== */
        #tecnologias .tech-chip {
            transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        }
        #tecnologias .tech-chip:hover {
            transform: translateY(-2px) scale(1.05);
        }
        #tecnologias .tech-chip svg { transition: transform 0.3s ease, color 0.3s ease; }
        #tecnologias .tech-chip:hover svg { transform: scale(1.15); }

        #tecnologias .tech-chip.c-blue:hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.12); box-shadow: 0 0 20px rgba(59, 130, 246, 0.25); color: #93c5fd; }
        #tecnologias .tech-chip.c-blue:hover svg { color: #60a5fa; }

        #tecnologias .tech-chip.c-green:hover { border-color: #10b981; background: rgba(16, 185, 129, 0.12); box-shadow: 0 0 20px rgba(16, 185, 129, 0.25); color: #6ee7b7; }
        #tecnologias .tech-chip.c-green:hover svg { color: #34d399; }

        #tecnologias .tech-chip.c-pink:hover { border-color: #ec4899; background: rgba(236, 72, 153, 0.12); box-shadow: 0 0 20px rgba(236, 72, 153, 0.25); color: #f9a8d4; }
        #tecnologias .tech-chip.c-pink:hover svg { color: #f472b6; }

        @media (prefers-reduced-motion: reduce) {
            #tecnologias .tec-blob-1,
            #tecnologias .tec-blob-2,
            #tecnologias .tec-card,
            #tecnologias .tec-intro,
            #tecnologias .tec-category,
            #tecnologias .tech-chip {
                animation: none !important;
            }
        }
      `}</style>

      {/* Efecto "Liquid" - Orbes de luz en el fondo */}
      <div className="tec-blob tec-blob-1" />
      <div className="tec-blob tec-blob-2" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Contenedor Terminal + Liquid Glass */}
        <div className="tec-card">
          {/* Header de la Terminal (Estilo VS Code / macOS) */}
          <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-slate-400 font-mono text-xs">
              <SiTypescript size={12} className="text-blue-400" />
              <span>tecnologias.tsx</span>
            </div>
          </div>

          {/* Cuerpo de la Terminal */}
          <div className="p-8 md:p-12">
            <div className="tec-intro mb-10 font-mono">
              <span className="text-pink-500">const</span>{" "}
              <span className="text-blue-400">stack</span>{" "}
              <span className="text-slate-300">=</span>{" "}
              <span className="text-emerald-400">"Mis Tecnologías"</span>
              <span className="text-slate-300">;</span>
              <span className="ml-2 animate-pulse text-slate-400">_</span>
            </div>

            <div className="flex flex-col gap-10">
              {categorias.map((categoria, catIndex) => (
                <div
                  key={categoria.titulo}
                  className="tec-category"
                  style={cssVars({ "--catDelay": `${catIndex * 0.15}s` })}
                >
                  <p className="font-mono text-sm tracking-wide text-[#6a9955] mb-5">
                    {categoria.titulo}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {categoria.tecnologias.map(({ nombre, Icono }, i) => (
                      <span
                        key={nombre}
                        className={`tech-chip ${categoria.colorClass} group flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-medium rounded-lg cursor-default`}
                        style={cssVars({ "--i": i })}
                      >
                        <Icono size={18} className="text-slate-400" />
                        <span className="text-sm tracking-wide">{nombre}</span>
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
