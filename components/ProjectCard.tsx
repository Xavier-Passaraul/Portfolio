"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Plus, Globe, Smartphone } from "lucide-react";
import type { Proyecto } from "@/lib/proyectosData";

interface Props {
  proyecto: Proyecto;
  abierto: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ proyecto, abierto, onToggle }: Props) {
  const [c1, c2, c3] =
    proyecto.colorGradiente ?? [proyecto.colorTema, proyecto.colorTema, proyecto.colorTema];

  return (
    // El "layout" de framer-motion solo se usa para que las demás cards del grid
    // se acomoden suavemente cuando esta se expande/contrae. El resto de las
    // animaciones (float, gradiente, apertura, hovers) son 100% CSS, igual que
    // en el HTML original, así no dependen de que framer-motion las dispare bien.
      <motion.div
  layout
  transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
  className={`relative z-0 hover:z-50 rounded-3xl ${abierto ? "sm:col-span-2 lg:col-span-3" : ""}`}
>
      <div
        onClick={() => !abierto && onToggle()}
        className={`pc-card ${abierto ? "pc-open" : "pc-closed"}`}
        style={
          {
            backgroundImage: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`,
            "--glow-color": proyecto.colorTema,
          } as CSSProperties
        }
      >
        {/* Botón cerrar */}
        <div
          className="pc-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label="Cerrar"
        >
          −
        </div>

        {/* Header (siempre visible) */}
        <div className="pc-card-header">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="pc-year">{proyecto.año}</span>
            {proyecto.estado === "En desarrollo" && (
              <span className="pc-year text-amber-200">🚧 En desarrollo</span>
            )}
            {proyecto.dificultad && (
              <span className="pc-year">⚙ Dificultad: {proyecto.dificultad}</span>
            )}
          </div>
          <h2>{proyecto.titulo}</h2>
          <p className="pc-brief-desc">{proyecto.resumen}</p>
        </div>

        {!abierto && (
          <div className="pc-plus-wrap">
            <span className="pc-plus-circle">
              <Plus size={18} className="text-white" />
            </span>
          </div>
        )}

        {/* Cuerpo expandible: colapsa/expande con el truco de grid-template-rows */}
        <div className="pc-card-body-wrapper">
          <div className="pc-card-body" onClick={(e) => e.stopPropagation()}>
            <div className="pc-images-container">
              {(proyecto.capturas.length > 0 ? proyecto.capturas : [null, null, null]).map(
                (cap, i) => (
                  <div key={i} className="pc-img-placeholder">
                    {cap ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cap} alt="Dashboard View" />
                    ) : (
                      <span>captura.png</span>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="pc-readme-desc">
              <h3>📄 README.md</h3>
              <div className="pc-caso-block">
                <span className="pc-caso-label">// problema</span>
                <p>{proyecto.caso.problema}</p>
              </div>
              <div className="pc-caso-block">
                <span className="pc-caso-label">// solución</span>
                <p>{proyecto.caso.solucion}</p>
              </div>
              <div className="pc-caso-block">
                <span className="pc-caso-label">// resultado</span>
                <p>{proyecto.caso.resultado}</p>
              </div>
            </div>

            <div className="pc-languages">
              {proyecto.tecnologias.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="pc-actions">
              {proyecto.linkGithub && (
                <a
                  href={proyecto.linkGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-github"
                >
                  Ver GitHub
                </a>
              )}
              {proyecto.linkDemo && (
                <a
                  href={proyecto.linkDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-demo"
                >
                  Live Demo
                </a>
              )}
              {proyecto.linkWebsite && (
                <a
                  href={proyecto.linkWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-demo flex items-center justify-center gap-1.5"
                >
                  <Globe size={14} /> Sitio
                </a>
              )}
              {proyecto.linkDescarga && (
                <a
                  href={proyecto.linkDescarga}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-demo flex items-center justify-center gap-1.5"
                >
                  <Smartphone size={14} /> APK
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pc-card {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          padding: 28px;
          border-radius: 24px;
          background-size: 300% 300%;
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.5),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2);
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* --- Card cerrada: flota + gradiente en movimiento --- */
        .pc-card.pc-closed {
          cursor: pointer;
          aspect-ratio: 3 / 4;
          justify-content: space-between;
          animation: gradientMove 8s ease infinite, float 3s ease-in-out infinite;
        }

        .pc-card.pc-closed:hover {
          z-index: 20;
          transform: translateY(-15px) scale(1.02);
          /* Fallback: brilla violeta en cualquier navegador, aunque no soporte color-mix() */
          box-shadow:
            0 0 45px 8px rgba(122, 0, 255, 0.45),
            inset 0 0 0 1px rgba(255, 255, 255, 0.25);
          /* Sacamos "float" en hover para no pisar el transform del hover, igual que en el original */
          animation: gradientMove 8s ease infinite;
        }

        /* Donde el navegador soporte color-mix(), el brillo usa el color del tema del proyecto */
        @supports (background: color-mix(in srgb, red 50%, blue)) {
          .pc-card.pc-closed:hover {
            box-shadow:
              0 0 45px 8px color-mix(in srgb, var(--glow-color) 55%, transparent),
              inset 0 0 0 1px rgba(255, 255, 255, 0.25);
          }
        }

        /* --- Card abierta: solo gradiente en movimiento --- */
        .pc-card.pc-open {
          z-index: 10;
          animation: gradientMove 8s ease infinite;
        }

        /* --- Botón cerrar (−) --- */
        .pc-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 35px;
          height: 35px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26px;
          font-weight: bold;
          line-height: 1;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: rotate(90deg);
          transition: all 0.4s ease;
          z-index: 10;
        }

        .pc-close-btn:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: rotate(0deg) scale(1.1);
        }

        .pc-card.pc-open .pc-close-btn {
          opacity: 1;
          pointer-events: auto;
          transform: rotate(0deg);
        }

        /* --- Header --- */
        .pc-card-header {
          position: relative;
          z-index: 2;
          padding-right: 40px;
        }

        .pc-card-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .pc-year {
          display: inline-block;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(5px);
          color: #fff;
        }

        .pc-brief-desc {
          margin: 8px 0 0 0;
          font-size: 16px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }

        .pc-plus-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
          position: relative;
          z-index: 2;
        }

        .pc-plus-circle {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* --- Cuerpo expandible: truco de grid-template-rows para animar altura --- */
        .pc-card-body-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pc-card.pc-open .pc-card-body-wrapper {
          grid-template-rows: 1fr;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pc-card-body {
          overflow: hidden;
          position: relative;
          z-index: 2;
        }

        /* Elementos internos: aparecen en cascada */
        .pc-card-body > div {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .pc-card.pc-open .pc-card-body > div {
          opacity: 1;
          transform: translateY(0);
        }

        .pc-card.pc-open .pc-images-container {
          transition-delay: 0.1s;
        }
        .pc-card.pc-open .pc-readme-desc {
          transition-delay: 0.2s;
        }
        .pc-card.pc-open .pc-languages {
          transition-delay: 0.3s;
        }
        .pc-card.pc-open .pc-actions {
          transition-delay: 0.4s;
        }

        /* --- Capturas --- */
        .pc-images-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        @media (min-width: 640px) {
          .pc-images-container {
            flex-direction: row;
          }
        }

        .pc-img-placeholder {
          width: 100%;
          height: 96px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.5);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .pc-img-placeholder {
            width: 33.333%;
          }
        }

        .pc-img-placeholder:hover {
          transform: scale(1.1);
          z-index: 20;
        }

        .pc-img-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- README --- */
        .pc-readme-desc h3 {
          margin: 0 0 14px 0;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .pc-caso-block {
          margin-bottom: 14px;
        }

        .pc-caso-block:last-child {
          margin-bottom: 0;
        }

        .pc-caso-label {
          display: block;
          font-family: var(--font-mono, ui-monospace, "SF Mono", "Fira Code", monospace);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #6a9955; /* mismo verde de comentario que TerminalCode */
          margin-bottom: 4px;
        }

        .pc-readme-desc p {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        /* --- Tecnologías --- */
        .pc-languages {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .pc-languages span {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          color: #fff;
        }

        /* --- Botones de acción --- */
        .pc-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        @media (min-width: 640px) {
          .pc-actions {
            flex-direction: row;
          }
        }

        .pc-btn {
          flex: 1;
          min-width: 120px;
          padding: 12px;
          text-align: center;
          text-decoration: none;
          color: #fff;
          font-weight: bold;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .pc-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        }

        .pc-btn-github {
          background: #24292e;
          border: 1px solid #24292e;
        }

        .pc-btn-github:hover {
          background: #000;
        }

        .pc-btn-demo {
          background: transparent;
          border: 1px solid #fff;
          backdrop-filter: blur(5px);
        }

        .pc-btn-demo:hover {
          background: #fff;
          color: #7a00ff;
        }

        /* --- Keyframes --- */
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </motion.div>
  );
}