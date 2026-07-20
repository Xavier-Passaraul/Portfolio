"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Proyectos() {
  return (
    <section
      id="proyectos"
      className="py-24 border-t border-slate-800 font-[var(--font-poppins),sans-serif]"
    >
      <style>{`
        #proyectos .liquid-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            perspective: 1200px;
        }

        /* ==========================================
           1. ANIMACIONES DE COLORES
           ========================================== */
        #proyectos .bg-blobs {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }

        #proyectos .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.8;
            mix-blend-mode: screen;
        }

        #proyectos .b1 { width: 400px; height: 400px; background: #ff007f; top: -10%; left: -10%; animation: proyFloat1 8s infinite alternate ease-in-out; }
        #proyectos .b2 { width: 350px; height: 350px; background: #00f0ff; bottom: -10%; right: -10%; animation: proyFloat2 11s infinite alternate ease-in-out; }
        #proyectos .b3 { width: 300px; height: 300px; background: #39ff14; top: 30%; left: 30%; animation: proyFloat3 9s infinite alternate ease-in-out; }

        @keyframes proyFloat1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(150px, 100px) scale(1.2); }
            100% { transform: translate(-50px, 200px) scale(0.9); }
        }
        @keyframes proyFloat2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-200px, -150px) scale(1.3); }
            100% { transform: translate(-50px, -300px) scale(1); }
        }
        @keyframes proyFloat3 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(200px, -100px) scale(0.8); }
            100% { transform: translate(-150px, 150px) scale(1.4); }
        }

        /* ==========================================
           2. LIQUID GLASS
           ========================================== */
        #proyectos .liquid-card {
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
            padding: 40px;
        }

        #proyectos .liquid-card:hover {
            transform: rotateX(2deg) rotateY(-2deg);
        }

        #proyectos .terminal-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        #proyectos .dots { display: flex; gap: 8px; margin-right: 20px; }
        #proyectos .dot { width: 12px; height: 12px; border-radius: 50%; }

        /* ==========================================
           3. BOTÓN NEÓN
           ========================================== */
        #proyectos .action-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 32px;
            background: #fff;
            color: #000;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            font-family: var(--font-fira), monospace;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            margin-top: 10px;
        }

        #proyectos .action-btn:hover {
            background: #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
            transform: translateY(-2px);
        }

        #proyectos .action-btn svg {
            transition: transform 0.3s ease;
        }

        #proyectos .action-btn:hover svg {
            transform: translateX(5px);
        }

        @media (max-width: 850px) {
            #proyectos .liquid-card { padding: 30px; }
        }
      `}</style>

      <div className="liquid-container">
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
            <span
              style={{
                fontFamily: "var(--font-fira), monospace",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              ~/proyectos/index.sh
            </span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span
              className="text-xs text-cyan-400 font-medium tracking-wide uppercase"
              style={{ fontFamily: "var(--font-fira), monospace" }}
            >
              Archivos cargados
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Mis Proyectos
          </h2>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            Cada proyecto tiene su propia historia — demo, código y capturas.
            Entrá a la sección completa para ver el detalle de cada uno.
          </p>

          <div>
            <Link href="/proyectos" className="action-btn">
              Ver todos los proyectos
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}