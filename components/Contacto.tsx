"use client";

import { useEffect } from "react";
import { Mail, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const EMAIL = "desarrolloreal2@gmail.com";

const contactos = [
  {
    label: "Email",
    valor: EMAIL,
    href: `mailto:${EMAIL}`,
    Icono: Mail,
    externo: false,
    colorClass: "c-green",
  },
  {
    label: "LinkedIn",
    valor: "/in/xavier-passaraul",
    href: "https://www.linkedin.com/in/xavier-passaraul-4278b321a",
    Icono: FaLinkedin,
    externo: true,
    colorClass: "c-blue",
  },
  {
    label: "GitHub",
    valor: "@Xavier-Passaraul",
    href: "https://github.com/Xavier-Passaraul",
    Icono: FaGithub,
    externo: true,
    colorClass: "c-white",
  },
  {
    label: "Sitio Web",
    valor: "Desarrollo Real",
    href: "https://desarrollo-real.vercel.app/",
    Icono: Globe,
    externo: true,
    colorClass: "c-pink",
  },
];

export default function Contacto() {
  // Carga las mismas fuentes (Poppins + Fira Code) que usa el diseño liquid-glass original.
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Poppins:wght@300;400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <section
      id="contacto"
      className="py-24 border-t border-slate-800 font-['Poppins',sans-serif]"
    >
      <style>{`
        #contacto .liquid-container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            perspective: 1200px;
        }

        /* ==========================================
           1. ANIMACIONES DE COLORES
           ========================================== */
        #contacto .bg-blobs {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }

        #contacto .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.8;
            mix-blend-mode: screen;
        }

        #contacto .b1 { width: 400px; height: 400px; background: #ff007f; top: -10%; left: -10%; animation: float1 8s infinite alternate ease-in-out; }
        #contacto .b2 { width: 350px; height: 350px; background: #00f0ff; bottom: -10%; right: -10%; animation: float2 11s infinite alternate ease-in-out; }
        #contacto .b3 { width: 300px; height: 300px; background: #39ff14; top: 30%; left: 30%; animation: float3 9s infinite alternate ease-in-out; }

        @keyframes float1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(150px, 100px) scale(1.2); }
            100% { transform: translate(-50px, 200px) scale(0.9); }
        }
        @keyframes float2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-200px, -150px) scale(1.3); }
            100% { transform: translate(-50px, -300px) scale(1); }
        }
        @keyframes float3 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(200px, -100px) scale(0.8); }
            100% { transform: translate(-150px, 150px) scale(1.4); }
        }

        /* ==========================================
           2. LIQUID GLASS
           ========================================== */
        #contacto .liquid-card {
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
            padding: 30px;
        }

        #contacto .liquid-card:hover {
            transform: rotateX(2deg) rotateY(-2deg);
        }

        #contacto .terminal-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        #contacto .dots { display: flex; gap: 8px; margin-right: 20px; }
        #contacto .dot { width: 12px; height: 12px; border-radius: 50%; }

        /* ==========================================
           3. LAYOUT: BOTONES + FORMULARIO
           ========================================== */
        #contacto .layout-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 40px;
        }

        #contacto .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
        }

        #contacto .contact-btn {
            display: flex;
            align-items: center;
            gap: 15px;
            width: 100%;
            padding: 16px 20px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            text-decoration: none;
            font-size: 1.05rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        #contacto .contact-btn svg { font-size: 1.4rem; transition: transform 0.3s ease; }

        /* Efectos Neón por color */
        #contacto .contact-btn.c-green:hover { border-color: #25D366; background: rgba(37, 211, 102, 0.1); box-shadow: 0 0 20px rgba(37, 211, 102, 0.3); }
        #contacto .contact-btn.c-green svg { color: #25D366; }

        #contacto .contact-btn.c-white:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
        #contacto .contact-btn.c-white svg { color: #ffffff; }

        #contacto .contact-btn.c-blue:hover { border-color: #0077b5; background: rgba(0, 119, 181, 0.1); box-shadow: 0 0 20px rgba(0, 119, 181, 0.3); }
        #contacto .contact-btn.c-blue svg { color: #0077b5; }

        #contacto .contact-btn.c-pink:hover { border-color: #ff007f; background: rgba(255, 0, 127, 0.1); box-shadow: 0 0 20px rgba(255, 0, 127, 0.3); }
        #contacto .contact-btn.c-pink svg { color: #ff007f; }

        #contacto .contact-btn:hover { transform: translateX(8px); }
        #contacto .contact-btn:hover svg { transform: scale(1.2); }

        /* --- Formulario --- */
        #contacto .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            background: rgba(0, 0, 0, 0.2);
            padding: 25px;
            border-radius: 16px;
            border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        #contacto .full-width { grid-column: span 2; }

        #contacto .input-group { display: flex; flex-direction: column; gap: 8px; }

        #contacto .input-group label {
            font-family: 'Fira Code', monospace;
            font-size: 0.75rem;
            color: #00f0ff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        #contacto .form-grid input,
        #contacto .form-grid select,
        #contacto .form-grid textarea {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 12px;
            border-radius: 8px;
            color: #fff;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            outline: none;
            transition: all 0.3s ease;
        }

        #contacto .form-grid input:focus,
        #contacto .form-grid select:focus,
        #contacto .form-grid textarea:focus {
            border-color: #39ff14;
            background: rgba(0,0,0,0.6);
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.2);
        }

        #contacto .form-grid button {
            grid-column: span 2;
            padding: 16px;
            background: #fff;
            color: #000;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-family: 'Fira Code', monospace;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        #contacto .form-grid button:hover {
            background: #39ff14;
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
            transform: translateY(-2px);
        }

        @media (max-width: 850px) {
            #contacto .layout-grid { grid-template-columns: 1fr; gap: 30px; }
            #contacto .liquid-card { padding: 20px; }
        }
        @media (max-width: 500px) {
            #contacto .form-grid { grid-template-columns: 1fr; padding: 15px; }
            #contacto .full-width { grid-column: span 1; }
            #contacto .form-grid button { grid-column: span 1; }
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
                fontFamily: "'Fira Code', monospace",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              ~/contacto/panel.sh
            </span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              Abierto a nuevos proyectos
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            ¿Tenés una idea en mente y queres realizarla? <span className="text-blue-500">Hablemos.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl">
            Contame qué necesitás construir — desde una landing hasta una app
            completa — y lo vemos juntos.
          </p>

          <div className="layout-grid">
            {/* Métodos de contacto */}
            <div className="contact-methods">
              {contactos.map(({ label, href, Icono, externo, colorClass }) => (
                <a
                  key={label}
                  href={href}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noopener noreferrer" : undefined}
                  className={`contact-btn ${colorClass}`}
                >
                  <Icono size={22} />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Formulario */}
            <form className="form-grid">
              <div className="input-group">
                <label>{"> user.name"}</label>
                <input type="text" placeholder="'Tu nombre'" />
              </div>
              <div className="input-group">
                <label>{"> user.email"}</label>
                <input type="email" placeholder="'tu@email.com'" />
              </div>
              <div className="input-group full-width">
                <label>{"> config.asunto"}</label>
                <select>
                  <option>Propuesta de Trabajo</option>
                  <option>Proyecto Freelance</option>
                  <option>Consultoría Técnica</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="input-group full-width">
                <label>{"> payload.mensaje"}</label>
                <textarea rows={4} placeholder="Escribe tu mensaje aquí..." />
              </div>
              <button type="button">./enviar_datos.sh</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
