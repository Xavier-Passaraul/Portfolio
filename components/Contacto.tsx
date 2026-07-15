export default function Contacto() {
  return (
    <section id="contacto" className="py-24 border-t border-slate-800">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
          Ponete en <span className="text-blue-500">Contacto</span>
        </h2>
        <p className="text-slate-400 mb-10 text-lg">
          Tenés una idea y no sabés cómo programarla? Contame tu proyecto y lo hacemos realidad.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="mailto:tuemail@ejemplo.com" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Envime un Email
          </a>
          <a 
            href="www.linkedin.com/in/xavier-passaraul-4278b321a" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 font-medium rounded-lg transition-colors"
          >
            Visitá mi LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}