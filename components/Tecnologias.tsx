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

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="py-24 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight text-center">
          Mis <span className="text-blue-500">Tecnologías</span>
        </h2>

        <div className="flex flex-col gap-10">
          {categorias.map((categoria) => (
            <div key={categoria.titulo}>
              <p className="font-mono text-xs font-semibold tracking-wide text-[#6a9955] mb-4">
                {categoria.titulo}
              </p>
              <div className="flex flex-wrap gap-3">
                {categoria.tecnologias.map(({ nombre, Icono }) => (
                  <span
                    key={nombre}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all cursor-default"
                  >
                    <Icono
                      size={16}
                      className="text-slate-500 group-hover:text-blue-400 transition-colors"
                    />
                    <span className="text-sm">{nombre}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}