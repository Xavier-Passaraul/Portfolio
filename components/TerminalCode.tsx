"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Token = { t: string; c: string };
type Line = Token[];

// Paleta VS Code Dark+
const COLOR = {
  keyword: "text-[#569CD6]",
  type: "text-[#4EC9B0]",
  prop: "text-[#9CDCFE]",
  string: "text-[#CE9178]",
  punct: "text-[#D4D4D4]",
  comment: "text-[#6A9955] italic",
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

  let restante = typed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mt-6 md:mt-0 rounded-lg overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl text-left"
    >
      {/* Pestaña estilo VS Code */}
      <div className="flex items-center bg-[#252526] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#2d2d2d] text-xs text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#3178c6]" />
          sobre-mi.tsx
        </div>
      </div>

      {/* Cuerpo del editor */}
      <div className="flex font-mono text-[13px] leading-6">
        {/* Números de línea */}
        <div className="select-none text-right pr-3 pl-4 py-4 text-[#6e7681] bg-[#1e1e1e]">
          {codigo.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Código */}
        <div className="py-4 pr-4 flex-1 overflow-x-auto">
          {codigo.map((line, li) => {
            const lineLen = line.reduce((s, tok) => s + tok.t.length, 0);

            if (restante <= 0) {
              return <div key={li}>&nbsp;</div>;
            }

            if (restante >= lineLen) {
              restante -= lineLen + 1;
              const cursorAqui = restante <= 0;
              return (
                <div key={li} className="whitespace-pre">
                  {line.map((tok, ti) => (
                    <span key={ti} className={tok.c}>{tok.t}</span>
                  ))}
                  {cursorAqui && (
                    <span className="text-slate-200 animate-blink">|</span>
                  )}
                </div>
              );
            }

            // Línea parcial: acá está tipeando ahora
            let restanteLinea = restante;
            const parcial = line.map((tok, ti) => {
              if (restanteLinea <= 0) return null;
              const visible = tok.t.slice(0, restanteLinea);
              restanteLinea -= tok.t.length;
              return <span key={ti} className={tok.c}>{visible}</span>;
            });
            restante = -1;
            return (
              <div key={li} className="whitespace-pre">
                {parcial}
                <span className="text-slate-200 animate-blink">|</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}