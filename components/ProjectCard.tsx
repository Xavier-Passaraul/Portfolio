"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Globe, Smartphone } from "lucide-react";
import type { Proyecto } from "@/lib/proyectosData";

interface Props {
  proyecto: Proyecto;
  abierto: boolean;
  onToggle: () => void;
}

// Controla el delay en cascada (0.1s entre cada hijo) para igualar el CSS original
const contenedorVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Recrea la entrada: opacity 0 -> 1 y translateY(20px) -> 0
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProjectCard({ proyecto, abierto, onToggle }: Props) {
  const [c1, c2, c3] =
    proyecto.colorGradiente ?? [proyecto.colorTema, proyecto.colorTema, proyecto.colorTema];

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className={`rounded-3xl overflow-hidden ${abierto ? "sm:col-span-2 lg:col-span-3" : ""}`}
    >
      <div
        onClick={() => !abierto && onToggle()}
        className={`relative p-7 flex flex-col card-base ${
          !abierto ? "cursor-pointer card-closed aspect-[3/4] justify-between" : "card-open"
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`,
          backgroundSize: "300% 300%",
          ["--glow-color" as string]: proyecto.colorTema,
        }}
      >
        {/* Botón cerrar */}
        <motion.button
          animate={{ opacity: abierto ? 1 : 0, rotate: abierto ? 0 : 90 }}
          whileHover={abierto ? { scale: 1.1 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ pointerEvents: abierto ? "auto" : "none" }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label="Cerrar"
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold leading-none hover:bg-white/40 transition-colors cursor-pointer"
        >
          −
        </motion.button>

        {/* Header */}
        <div className="relative pr-10 z-10">
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
          <p className="text-white/90 mt-2 leading-relaxed text-[16px]">{proyecto.resumen}</p>
        </div>

        {!abierto && (
          <div className="flex justify-end mt-4 z-10">
            <span className="w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center">
              <Plus size={18} className="text-white" />
            </span>
          </div>
        )}

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
              className="relative mt-6 pt-6 border-t border-white/20 z-10"
            >
              {/* Capturas con animacion hover de scale 1.1 */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2.5 mb-5">
                {(proyecto.capturas.length > 0 ? proyecto.capturas : [null, null, null]).map(
                  (cap, i) => (
                    <div
                      key={i}
                      className="w-full sm:w-1/3 h-24 rounded-lg overflow-hidden bg-black/20 flex items-center justify-center text-[10px] text-white/50 font-mono shadow-lg transition-transform duration-300 hover:scale-110 hover:z-20 cursor-pointer"
                    >
                      {cap ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cap} alt="Dashboard View" className="w-full h-full object-cover" />
                      ) : (
                        "captura.png"
                      )}
                    </div>
                  )
                )}
              </motion.div>

              {/* README */}
              <motion.div variants={itemVariants} className="mb-5">
                <h4 className="text-[18px] font-bold text-white mb-2.5">📄 README.md</h4>
                <p className="text-[14.5px] leading-[1.6] text-white/85">{proyecto.descripcion}</p>
              </motion.div>

              {/* Tecnologías */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                {proyecto.tecnologias.map((t) => (
                  <span
                    key={t}
                    className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Acciones con animacion hover de translate-y y shadow */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                {proyecto.linkGithub && (
                  <a
                    href={proyecto.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] text-center py-3 rounded-lg bg-[#24292e] border border-[#24292e] hover:bg-black text-white text-[13px] font-bold uppercase tracking-[1px] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                  >
                    Ver GitHub
                  </a>
                )}
                {proyecto.linkDemo && (
                  <a
                    href={proyecto.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] text-center py-3 rounded-lg border border-white text-white text-[13px] font-bold uppercase tracking-[1px] backdrop-blur-sm bg-transparent hover:bg-white hover:text-[#7a00ff] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                  >
                    Live Demo
                  </a>
                )}
                {proyecto.linkWebsite && (
                  <a
                    href={proyecto.linkWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 rounded-lg border border-white text-white text-[13px] font-bold uppercase tracking-[1px] backdrop-blur-sm bg-transparent hover:bg-white hover:text-slate-900 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                  >
                    <Globe size={14} /> Sitio
                  </a>
                )}
                {proyecto.linkDescarga && (
                  <a
                    href={proyecto.linkDescarga}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-3 rounded-lg border border-white text-white text-[13px] font-bold uppercase tracking-[1px] backdrop-blur-sm bg-transparent hover:bg-white hover:text-slate-900 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
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
        .card-base {
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.5),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2);
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .card-closed {
          animation: gradientMove 8s ease infinite, float 3s ease-in-out infinite;
        }

        /* Al hacer hover quitamos la animación float temporalmente para no sobreescribir el transform de escalado */
        .card-closed:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow:
            0 25px 45px color-mix(in srgb, var(--glow-color) 45%, transparent),
            inset 0 0 0 1px rgba(255, 255, 255, 0.25);
          animation: gradientMove 8s ease infinite;
        }

        .card-open {
          animation: gradientMove 8s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}