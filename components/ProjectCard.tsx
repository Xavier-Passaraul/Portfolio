"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Globe, Smartphone } from "lucide-react";
import type { Proyecto } from "@/lib/proyectosData";

interface Props {
  proyecto: Proyecto;
  abierto: boolean;
  onToggle: () => void;
}

const contenedorVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCard({ proyecto, abierto, onToggle }: Props) {
  const [c1, c2, c3] =
    proyecto.colorGradiente ?? [proyecto.colorTema, proyecto.colorTema, proyecto.colorTema];

  return (
    // Capa 1: solo maneja el "empuje" del acordeón (layout de Framer Motion)
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
    >
      {/* Capa 2: gradiente animado + flote + hover — 100% CSS, independiente de Framer */}
      <div
        onClick={() => !abierto && onToggle()}
        className={`relative p-7 card-gradient ${!abierto ? "cursor-pointer card-float" : ""}`}
        style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`, backgroundSize: "300% 300%" }}
      >
        {/* Botón cerrar */}
        {abierto && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label="Cerrar"
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-2xl font-bold leading-none hover:bg-white/30 transition-colors"
          >
            −
          </button>
        )}

        {/* Header */}
        <div className="relative pr-10">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-white">
              {proyecto.año}
            </span>
            {proyecto.estado === "En desarrollo" && (
              <span className="bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-amber-200">
                🚧 En desarrollo
              </span>
            )}
          </div>
          <h3
            className="text-2xl font-bold text-white tracking-tight"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            {proyecto.titulo}
          </h3>
          <p className="text-white/90 mt-2 leading-relaxed">{proyecto.resumen}</p>

          {!abierto && (
            <Plus size={16} className="absolute top-0 right-0 text-white/70" />
          )}
        </div>

        {/* Cuerpo expandible */}
        <AnimatePresence initial={false}>
          {abierto && (
            <motion.div
              key="body"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contenedorVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative mt-6 pt-6 border-t border-white/20"
            >
              {/* Capturas */}
              <motion.div variants={itemVariants} className="flex gap-2.5 mb-5">
                {(proyecto.capturas.length > 0 ? proyecto.capturas : [null, null, null]).map(
                  (cap, i) => (
                    <div
                      key={i}
                      className="w-1/3 h-24 rounded-lg overflow-hidden bg-black/20 flex items-center justify-center text-[10px] text-white/50 font-mono shadow-lg"
                    >
                      {cap ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cap} alt="" className="w-full h-full object-cover" />
                      ) : (
                        "captura.png"
                      )}
                    </div>
                  )
                )}
              </motion.div>

              {/* README */}
              <motion.div variants={itemVariants} className="mb-5">
                <h4 className="text-lg font-bold text-white mb-2">📄 README.md</h4>
                <p className="text-sm leading-relaxed text-white/85">{proyecto.descripcion}</p>
              </motion.div>

              {/* Tecnologías */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                {proyecto.tecnologias.map((t) => (
                  <span
                    key={t}
                    className="bg-black/30 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Acciones */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                {proyecto.linkGithub && (
                  <a
                    href={proyecto.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] text-center py-3 rounded-lg bg-[#24292e] hover:bg-black text-white text-xs font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5"
                  >
                    Ver GitHub
                  </a>
                )}
                {proyecto.linkDemo && (
                  <a
                    href={proyecto.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] text-center py-3 rounded-lg border border-white text-white text-xs font-bold uppercase tracking-wide backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all hover:-translate-y-0.5"
                  >
                    Live Demo
                  </a>
                )}
                {proyecto.linkWebsite && (
                  <a
                    href={proyecto.linkWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 rounded-lg border border-white text-white text-xs font-bold uppercase tracking-wide backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all hover:-translate-y-0.5"
                  >
                    <Globe size={14} /> Sitio
                  </a>
                )}
                {proyecto.linkDescarga && (
                  <a
                    href={proyecto.linkDescarga}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 rounded-lg border border-white text-white text-xs font-bold uppercase tracking-wide backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all hover:-translate-y-0.5"
                  >
                    <Smartphone size={14} /> APK
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .card-gradient {
          animation: gradientMove 8s ease infinite;
        }
        .card-float {
          animation:
            gradientMove 8s ease infinite,
            cardFloat 3s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .card-float:hover {
          animation-play-state: paused, paused;
          transform: translateY(-10px) scale(1.015);
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cardFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}