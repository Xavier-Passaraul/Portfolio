export default function Tecnologias() {
  const habilidades = [
    "React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript",
    "Node.js", "Express", "MongoDB", "SQL", "Git"
  ];

  return (
    <section id="tecnologias" className="py-24 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
          Mis <span className="text-blue-500">Tecnologías</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {habilidades.map((tech) => (
            <span 
              key={tech} 
              className="px-6 py-3 bg-[#0f172a] border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}