import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-24 border-t border-slate-800">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Mis <span className="text-blue-500">Proyectos</span>
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Cada proyecto tiene su propia historia — demo, código y capturas.
          Entrá a la sección completa para ver el detalle de cada uno.
        </p>
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        >
          Ver todos los proyectos
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}