"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Token = { t: string; c: string };
type Line = Token[];

// Paleta Neon/Cyberpunk — misma paleta que los blobs de Hero
const COLOR = {
  keyword: "text-[#ff007f]", // Rosa Neón
  type: "text-[#00f0ff]", // Cian
  prop: "text-[#ffffff]", // Blanco
  string: "text-[#39ff14]", // Verde Neón
  punct: "text-[#a0aec0]", // Gris claro
  comment: "text-[#64748b] italic", // Pizarra
};

const codigo: Line[] = [
  [{ t: "// Sobre mí", c: COLOR.comment }],
  [
    { t: "interface", c: COLOR.keyword }, { t: " ", c: "" },
    { t: "Developer", c: COLOR.type }, { t: " {", c: COLOR.punct },
  ],
  [
    { t: "  role", c: COLOR.prop }, { t: ": ", c: COLOR.punct },
    { t: "string", c: COLOR.type }, { t: ";", c: COLOR.punct },
  ],
  [
    { t: "  stack", c: COLOR.prop }, { t: ": ", c: COLOR.punct },
    { t: "string", c: COLOR.type }, { t: "[];", c: COLOR.punct },
  ],
  [{ t: "}", c: COLOR.punct }],
  [{ t: "", c: "" }],
  [
    { t: "const", c: COLOR.keyword }, { t: " xavier", c: COLOR.prop },
    { t: ": ", c: COLOR.punct }, { t: "Developer", c: COLOR.type },
    { t: " = {", c: COLOR.punct },
  ],
  [
    { t: "  role", c: COLOR.prop }, { t: ": ", c: COLOR.punct },
    { t: '"Full Stack Dev en formación"', c: COLOR.string }, { t: ",", c: COLOR.punct },
  ],
  [
    { t: "  stack", c: COLOR.prop }, { t: ": [", c: COLOR.punct },
    { t: '"Next.js"', c: COLOR.string }, { t: ", ", c: COLOR.punct },
    { t: '"TypeScript"', c: COLOR.string }, { t: ", ", c: COLOR.punct },
    { t: '"Node.js"', c: COLOR.string }, { t: "],", c: COLOR.punct },
  ],
  [{ t: "};", c: COLOR.punct }],
];

const SPEED = 25; // ms por carácter

export default function TerminalCode() {
  const [typed, setTyped] = useState(0);

  const total = codigo.reduce(
    (sum, line) => sum + line.reduce((s, tok) => s + tok.t.length, 0) + 1,
    0
  );

  useEffect(() => {
    if (typed >= total) return;
    const timeout = setTimeout(() => setTyped((c) => c + 1), SPEED);
    return () => clearTimeout(timeout);
  }, [typed, total]);

  // Recorre las líneas una sola vez, calculando cuánto texto de cada línea ya
  // "se tipeó". Se hace con reduce (sin mutar variables fuera del callback)
  // para que el cálculo sea puro durante el render.
  const lineasRenderizadas = codigo.reduce<{ restante: number; nodos: React.ReactNode[] }>(
    (acc, line, li) => {
      const lineLen = line.reduce((s, tok) => s + tok.t.length, 0);

      if (acc.restante <= 0) {
        acc.nodos.push(<div key={li}>&nbsp;</div>);
        return acc;
      }

      if (acc.restante >= lineLen) {
        const restanteDespues = acc.restante - (lineLen + 1);
        const cursorAqui = restanteDespues <= 0;
        acc.nodos.push(
          <div key={li} className="whitespace-pre">
            {line.map((tok, ti) => (
              <span key={ti} className={tok.c}>{tok.t}</span>
            ))}
            {cursorAqui && (
              <span className="text-[#00f0ff] animate-pulse">|</span>
            )}
          </div>
        );
        return { restante: restanteDespues, nodos: acc.nodos };
      }

      // Línea parcial: acá está tipeando ahora
      let restanteLinea = acc.restante;
      const parcial = line.map((tok, ti) => {
        if (restanteLinea <= 0) return null;
        const visible = tok.t.slice(0, restanteLinea);
        restanteLinea -= tok.t.length;
        return <span key={ti} className={tok.c}>{visible}</span>;
      });
      acc.nodos.push(
        <div key={li} className="whitespace-pre">
          {parcial}
          <span className="text-[#00f0ff] animate-pulse">|</span>
        </div>
      );
      return { restante: -1, nodos: acc.nodos };
    },
    { restante: typed, nodos: [] }
  ).nodos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="liquid-card w-full max-w-lg mt-6 md:mt-0 text-left"
    >
      {/* Cabecera estilo Terminal de macOS (igual a Contacto) */}
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
          ~/xavier/sobre-mi.ts
        </span>
      </div>

      {/* Cuerpo del editor */}
      <div className="flex font-mono text-[13px] leading-7 md:text-[14px]">
        {/* Números de línea */}
        <div className="select-none text-right pr-4 text-slate-600">
          {codigo.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Código */}
        <div className="pl-2 flex-1 overflow-x-auto">
          {lineasRenderizadas}
        </div>
      </div>
    </motion.div>
  );
}
