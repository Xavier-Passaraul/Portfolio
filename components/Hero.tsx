"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TerminalCode from "./TerminalCode";
import FondoAnimado from "./FondoAnimado";

const NOMBRE = "Xavier Jesús Passaraul";
const TITULO = "Desarrollador Full Stack";

export default function Hero() {
const [paso, setPaso] = useState<0 | 1 | 2>(0);
const [nombreCount, setNombreCount] = useState(0);
const [tituloCount, setTituloCount] = useState(0);

useEffect(() => {
if (paso !== 0) return;
if (nombreCount < NOMBRE.length) {
const t = setTimeout(() => setNombreCount((c) => c + 1), 60);
return () => clearTimeout(t);
}
const t = setTimeout(() => setPaso(1), 300);
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

{/* Estilos inyectados compartidos (Blobs, Liquid Card y Botones) */}
{`
#hero-section {
perspective: 1200px;
}

    /* 1. ANIMACIONES DE COLORES (Blobs) */
    #hero-section .bg-blobs {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        transform: translate(-50%, -50%);
        z-index: 0;
        pointer-events: none;
    }

    #hero-section .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.6;
        mix-blend-mode: screen;
    }

    #hero-section .b1 { width: 500px; height: 500px; background: #ff007f; top: -10%; left: -10%; animation: float1 10s infinite alternate ease-in-out; }
    #hero-section .b2 { width: 450px; height: 450px; background: #00f0ff; bottom: -20%; right: -10%; animation: float2 14s infinite alternate ease-in-out; }
    #hero-section .b3 { width: 400px; height: 400px; background: #39ff14; top: 40%; left: 40%; animation: float3 12s infinite alternate ease-in-out; }

    @keyframes float1 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(200px, 150px) scale(1.2); }
        100% { transform: translate(-50px, 300px) scale(0.9); }
    }
    @keyframes float2 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-250px, -200px) scale(1.3); }
        100% { transform: translate(-100px, -400px) scale(1); }
    }
    @keyframes float3 {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(250px, -150px) scale(0.8); }
        100% { transform: translate(-200px, 200px) scale(1.4); }
    }

    /* 2. LIQUID GLASS (Para la Terminal) */
    #hero-section .liquid-card {
        position: relative;
        z-index: 10;
        background: rgba(15, 15, 20, 0.35);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease;
        transform-style: preserve-3d;
        padding: 24px;
    }

    #hero-section .liquid-card:hover {
        transform: rotateX(4deg) rotateY(-4deg) translateY(-5px);
        box-shadow: 0 40px 80px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.2);
    }

    #hero-section .terminal-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    #hero-section .dots { display: flex; gap: 8px; margin-right: 20px; }
    #hero-section .dot { width: 12px; height: 12px; border-radius: 50%; }

    /* 3. BOTONES NEÓN */
    #hero-section .hero-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        text-decoration: none;
        font-size: 1.05rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    #hero-section .hero-btn.btn-cyan:hover {
        border-color: #00f0ff;
        background: rgba(0, 240, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        transform: translateY(-3px);
        color: #00f0ff;
    }

    #hero-section .hero-btn.btn-pink:hover {
        border-color: #ff007f;
        background: rgba(255, 0, 127, 0.1);
        box-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
        transform: translateY(-3px);
        color: #ff007f;
    }
  `}</style>

  {/* Fondo Animado con los Blobs */}
  <FondoAnimado />

  {/* Contenido: grid de 2 columnas */}
  <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight min-h-[1.2em] tracking-tight drop-shadow-lg">
        {NOMBRE.slice(0, nombreCount)}
        {paso === 0 && (
          <span className="text-[#ff007f] font-bold animate-pulse">_</span>
        )}
      </h1>

      {paso >= 1 && (
        <p className="text-xl md:text-2xl text-[#00f0ff] font-medium min-h-[1.2em] drop-shadow-md">
          {TITULO.slice(0, tituloCount)}
          {paso === 1 && (
            <span className="text-[#39ff14] font-bold animate-pulse">_</span>
          )}
          {paso === 2 && (
            <span className="text-slate-500 font-bold ml-2">en formación</span>
          )}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: paso === 2 ? 1 : 0, y: paso === 2 ? 0 : 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-10"
      >
        <a href="/proyectos" className="hero-btn btn-cyan font-semibold">
          Ver Proyectos
        </a>
        <a href="#contacto" className="hero-btn btn-pink font-semibold">
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