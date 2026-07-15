import React from "react";

const listaProyectos = [
  {
    id: 1,
    titulo: "E-Commerce App",
    descripcion: "Plataforma de ventas completa con carrito de compras, pasarela de pago y panel de administración.",
    tecnologias: ["Next.js", "Tailwind CSS", "Node.js", "Stripe"],
    linkGithub: "#",
    linkDemo: "#"
  },
  {
    id: 2,
    titulo: "Gestor de Tareas Kanban",
    descripcion: "Aplicación para gestión de proyectos con sistema de arrastrar y soltar (drag & drop) y autenticación de usuarios.",
    tecnologias: ["React", "Firebase", "CSS Modules"],
    linkGithub: "#",
    linkDemo: "#"
  },
  {
    id: 3,
    titulo: "API REST de Inventario",
    descripcion: "Backend robusto para control de stock, gestión de proveedores y reportes automatizados.",
    tecnologias: ["Express", "MongoDB", "JWT", "Jest"],
    linkGithub: "#",
    linkDemo: "#"
  }
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">
          Mis Proyectos <span className="text-blue-500">Destacados</span>
        </h2>
        
        {/* Grilla de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listaProyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{proyecto.titulo}</h3>
              <p className="text-slate-400 mb-6 flex-grow">{proyecto.descripcion}</p>
              
              {/* Etiquetas de Tecnologías */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proyecto.tecnologias.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-blue-400 text-xs font-medium rounded-full border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Botones de Acción */}
              <div className="flex gap-4 mt-auto pt-4 border-t border-slate-800/50">
                <a href={proyecto.linkGithub} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href={proyecto.linkDemo} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Live Demo →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}