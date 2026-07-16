"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { proyectos } from "@/lib/proyectosData";
import ProjectCard from "@/components/ProjectCard";

export default function ProyectosPage() {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const ordenados = [...proyectos].sort((a, b) => b.año - a.año);

  return (
    <div className="py-16 max-w-4xl mx-auto px-4">
      <Link
        href="/"
        className="text-sm text-slate-400 hover:text-white transition-colors mb-8 inline-block"
      >
        ← Volver al inicio
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Todos los <span className="text-blue-500">Proyectos</span>
      </h1>
      <p className="text-slate-400 mb-10">Del más reciente al más antiguo.</p>

      <motion.div layout className="flex flex-col gap-5">
        {ordenados.map((p) => (
          <ProjectCard
            key={p.id}
            proyecto={p}
            abierto={abiertoId === p.id}
            onToggle={() => setAbiertoId(abiertoId === p.id ? null : p.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}