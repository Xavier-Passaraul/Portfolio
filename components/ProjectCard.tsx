"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Minus, Plus } from "lucide-react";
import type { Proyecto } from "@/lib/proyectosData";

interface Props {
  proyecto: Proyecto;
  abierto: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ proyecto, abierto, onToggle }: Props) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className="relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: abierto ? `${proyecto.colorTema}66` : "#1e293b",
        background: `linear-gradient(135deg, ${proyecto.colorTema}14, #0f172a 60%)`,
      }}
    >
      {/* Header — siempre visible, clickeable */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: proyecto.colorTema }} />
            <span className="text-xs text-slate-500 font-mono">{proyecto.año}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">{proyecto.titulo}</h3>
          <p className="text-slate-400 text-sm">{proyecto.resumen}</p>
        </div>

        <span
          className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
          style={{ borderColor: `${proyecto.colorTema}66` }}
        >
          {abierto ? (
            <Minus size={16} style={{ color: proyecto.colorTema }} />
          ) : (
            <Plus size={16} style={{ color: proyecto.colorTema }} />
          )}
        </span>
      </button>

      {/* Contenido expandido */}
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-800/60">
              {/* Capturas — si no hay imágenes reales todavía, muestra placeholders */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5">
                {(proyecto.capturas.length > 0 ? proyecto.capturas : [null, null, null]).map(
                  (cap, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-lg border border-slate-800 flex items-center justify-center text-[11px] text-slate-600 font-mono overflow-hidden"
                      style={{ background: `${proyecto.colorTema}0d` }}
                    >
                      {cap ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cap}
                          alt={`${proyecto.titulo} captura ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "captura.png"
                      )}
                    </div>
                  )
                )}
              </div>

              {/* README breve */}
              <div className="font-mono text-sm text-slate-300 bg-black/20 rounded-lg p-4 mb-5 leading-relaxed">
                <span className="text-slate-500"># README.md</span>
                <p className="mt-2">{proyecto.descripcion}</p>
              </div>

              {/* Tecnologías */}
              <div className="flex flex-wrap gap-2 mb-5">
                {proyecto.tecnologias.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full border"
                    style={{ borderColor: `${proyecto.colorTema}44`, color: proyecto.colorTema }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {proyecto.linkGithub && (
                  <a
                    href={proyecto.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 hover:border-slate-500 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
                    </svg>{" "}
                    GitHub
                  </a>
                )}
                {proyecto.linkDemo && (
                  <a
                    href={proyecto.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white transition-colors"
                    style={{ background: proyecto.colorTema }}
                  >
                    <ExternalLink size={15} /> Demo
                  </a>
                )}
                {proyecto.linkWebsite && (
                  <a
                    href={proyecto.linkWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors"
                    style={{ borderColor: `${proyecto.colorTema}66`, color: proyecto.colorTema }}
                  >
                    <Globe size={15} /> Sitio web
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}