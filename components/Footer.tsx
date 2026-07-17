export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        <div className="mb-4 md:mb-0">
          <p className="text-slate-400 text-sm">
            © {anioActual} Xavier Passaraul. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex gap-6 justify-center">
          <a 
            href="https://github.com/Xavier-Passaraul" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/xavier-passaraul-4278b321a" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
          >
            LinkedIn
          </a>
        </div>
        
      </div>
    </footer>
  );
}