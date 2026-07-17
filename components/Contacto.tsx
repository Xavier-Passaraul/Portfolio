import { Mail, Globe, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const EMAIL = "desarrolloreal2@gmail.com";

const contactos = [
  {
    label: "Email",
    valor: EMAIL,
    href: `mailto:${EMAIL}`,
    Icono: Mail,
    externo: false,
  },
  {
    label: "LinkedIn",
    valor: "/in/xavier-passaraul",
    href: "https://www.linkedin.com/in/xavier-passaraul-4278b321a",
    Icono: FaLinkedin,
    externo: true,
  },
  {
    label: "GitHub",
    valor: "@Xavier-Passaraul",
    href: "https://github.com/Xavier-Passaraul",
    Icono: FaGithub,
    externo: true,
  },
  {
    label: "Sitio Web",
    valor: "Desarrollo Real",
    href: "https://desarrollo-real.vercel.app/",
    Icono: Globe,
    externo: true,
  },
];

export default function Contacto() {
  return (
    <section id="contacto" className="py-24 border-t border-slate-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm p-8 md:p-12 overflow-hidden">
          {/* Glow decorativo, ancla visual del panel */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative">
            <p className="font-mono text-xs font-semibold tracking-wide text-[#6a9955] mb-4">
              // contacto
            </p>

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
              ¿Tenés una idea? <span className="text-blue-500">Hablemos.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl">
              Contame qué necesitás construir — desde una landing hasta una app
              completa — y lo vemos juntos.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {contactos.map(({ label, valor, href, Icono, externo }) => (
                <a
                  key={label}
                  href={href}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noopener noreferrer" : undefined}
                  className="group flex flex-col gap-3 p-4 rounded-xl border border-slate-700 bg-[#0f172a]/60 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <Icono
                      size={18}
                      className="text-slate-500 group-hover:text-blue-400 transition-colors"
                    />
                    <ArrowUpRight
                      size={14}
                      className="text-slate-600 group-hover:text-blue-400 transition-colors"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-mono">{label}</p>
                    <p className="text-sm text-slate-200 font-medium truncate">
                      {valor}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}