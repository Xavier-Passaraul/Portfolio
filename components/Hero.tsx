"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TerminalCode from "./TerminalCode";
import DnaHelix from "./DnaHelix";

const NOMBRE = "Xavier Jesús Passaraul";
const TITULO = "Desarrollador Full Stack en formación";

export default function Hero() {
  const [paso, setPaso] = useState<0 | 1 | 2>(0);
  const [nombreCount, setNombreCount] = useState(0);
  const [tituloCount, setTituloCount] = useState(0);

  useEffect(() => {
    if (paso !== 0) return;
    if (nombreCount < NOMBRE.length) {
      const t = setTimeout(() => setNombreCount((c) => c + 1), 70);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPaso(1), 400);
    return () => clearTimeout(t);
  }, [paso, nombreCount]);

  useEffect(() => {
    if (paso !== 1) return;
    if (tituloCount < TITULO.length) {
      const t = setTimeout(() => setTituloCount((c) => c + 1), 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPaso(2), 500);
    return () => clearTimeout(t);
  }, [paso, tituloCount]);

  return (
    <section className="relative flex items-center min-h-[85vh] overflow-hidden px-4">

      {/* Fondo: cadena de ADN (canvas) */}
      <DnaHelix />

      {/* Vignette hacia los bordes, para que el ADN se funda con el resto de la página */}
      <div className="absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0f172a_95%)]" />

      {/* Contenido: grid de 2 columnas */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight min-h-[1.2em]">
            {NOMBRE.slice(0, nombreCount)}
            {paso === 0 && (
              <span className="text-blue-500 font-bold animate-blink">_</span>
            )}
          </h1>

          {paso >= 1 && (
            <p className="text-xl md:text-2xl text-blue-400 font-medium min-h-[1.2em]">
              {TITULO.slice(0, tituloCount)}
              {paso === 1 && (
                <span className="text-blue-500 font-bold animate-blink">_</span>
              )}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: paso === 2 ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 justify-center md:justify-start mt-8"
          >
            <a href="/proyectos" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              Ver Proyectos
            </a>
            <a href="#contacto" className="px-6 py-3 bg-[#0f172a] border border-slate-600 hover:border-slate-400 text-slate-300 font-medium rounded-lg transition-colors">
              Contactarme
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center md:justify-end">
          <TerminalCode />
        </div>
      </div>
    </section>
  );
}