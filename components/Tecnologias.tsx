import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiSqlite,
  SiCapacitor,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

interface Tech {
  nombre: string;
  Icono: IconType;
}

interface Categoria {
  titulo: string;
  tecnologias: Tech[];
}

const categorias: Categoria[] = [
  {
    titulo: "// frontend",
    tecnologias: [
      { nombre: "React", Icono: SiReact },
      { nombre: "TypeScript", Icono: SiTypescript },
      { nombre: "JavaScript", Icono: SiJavascript },
      { nombre: "Next.js", Icono: SiNextdotjs },
      { nombre: "Vite", Icono: SiVite },
      { nombre: "Tailwind CSS", Icono: SiTailwindcss },
      { nombre: "HTML5", Icono: SiHtml5 },
      { nombre: "CSS3", Icono: SiCss },
    ],
  },
  {
    titulo: "// backend & datos",
    tecnologias: [
      { nombre: "Node.js", Icono: SiNodedotjs },
      { nombre: "Supabase", Icono: SiSupabase },
      { nombre: "PostgreSQL", Icono: SiPostgresql },
      { nombre: "Prisma", Icono: SiPrisma },
      { nombre: "SQLite", Icono: SiSqlite },
    ],
  },
  {
    titulo: "// mobile & herramientas",
    tecnologias: [
      { nombre: "Capacitor", Icono: SiCapacitor },
      { nombre: "Git", Icono: SiGit },
    ],
  },
];

// Animaciones para Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Tiempo entre la aparición de cada categoría
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  },
};

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="relative py-24 bg-[#09090b] overflow-hidden">
      {/* Efecto "Liquid" - Orbes de luz en el fondo */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Contenedor Terminal + Liquid Glass */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Header de la Terminal (Estilo VS Code / macOS) */}
          <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-slate-400 font-mono text-xs">
              <SiTypescript size={12} className="text-blue-400" />
              <span>tecnologias.tsx</span>
            </div>
          </div>

          {/* Cuerpo de la Terminal */}
          <div className="p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-10 font-mono"
            >
              <span className="text-pink-500">const</span>{" "}
              <span className="text-blue-400">stack</span>{" "}
              <span className="text-slate-300">=</span>{" "}
              <span className="text-emerald-400">"Mis Tecnologías"</span>
              <span className="text-slate-300">;</span>
              <span className="ml-2 animate-pulse text-slate-400">_</span>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-10"
            >
              {categorias.map((categoria) => (
                <motion.div key={categoria.titulo} variants={itemVariants}>
                  <p className="font-mono text-sm tracking-wide text-[#6a9955] mb-5">
                    {categoria.titulo}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {categoria.tecnologias.map(({ nombre, Icono }) => (
                      <motion.span
                        key={nombre}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 font-medium rounded-lg hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all cursor-default"
                      >
                        <Icono
                          size={18}
                          className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300"
                        />
                        <span className="text-sm tracking-wide">{nombre}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}