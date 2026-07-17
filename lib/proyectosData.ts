export interface Proyecto {
  id: string;
  titulo: string;
  resumen: string; // se ve en la card cerrada, 1 línea
  descripcion: string; // "README" breve, se ve al abrir la card
  tecnologias: string[];
  colorTema: string; // hex, color base (se usa si no hay colorGradiente)
  colorGradiente?: [string, string, string]; // 3 colores para el fondo animado tipo aurora
  estado?: "Terminado" | "En desarrollo";
  año: number; // se usa para ordenar de más nuevo a más viejo
  linkGithub?: string;
  linkDemo?: string;
  linkWebsite?: string; // opcional, solo si el proyecto tiene un sitio propio
  linkDescarga?: string; // para APKs u otros instalables
  capturas: string[]; // rutas a imágenes en /public, ej: "/proyectos/ecommerce-1.png"
}

export const proyectos: Proyecto[] = [
  {
    id: "luma-studio",
    titulo: "Luma Studio",
    resumen:
      "Plataforma todo-en-uno para crear y editar mockups profesionales de dispositivos.",
    descripcion:
      "Plataforma avanzada para la creación y edición de mockups profesionales de dispositivos: editor de mockups con perspectiva y múltiples pantallas, editor de imágenes con canvas y capas, editor de templates, gestión de brand kits, sistema de capturas y exportación por lotes. Flujo completo: captura de pantalla → edición avanzada → generación de mockups → exportación.",
    tecnologias: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn/UI",
      "Prisma",
      "PostgreSQL",
      "Node.js",
      "Supabase",
      "Zustand",
      "Canvas",
    ],
    colorTema: "#a855f7",
    colorGradiente: ["#a855f7", "#ec4899", "#6366f1"],
    estado: "En desarrollo",
    año: 2026,
    capturas: [],
  },
  {
    id: "cloudsync",
    titulo: "CloudSync",
    resumen:
      "Sincronización de archivos en la nube con chats en tiempo real, estilo Dropbox colaborativo.",
    descripcion:
      "Aplicación full-stack de sincronización de archivos en la nube (estilo Dropbox / Google Drive simplificado) con funcionalidades sociales: sistema de carpetas, chats en tiempo real dentro de carpetas o entre usuarios, autenticación completa, perfiles de usuario, subida de archivos con notificaciones push y soporte móvil nativo en Android. Pensada para equipos pequeños, estudiantes o uso personal.",
    tecnologias: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn/UI",
      "Capacitor",
      "Supabase",
    ],
    colorTema: "#3b82f6",
    colorGradiente: ["#3b82f6", "#06b6d4", "#8b5cf6"],
    estado: "Terminado",
    año: 2026,
    capturas: [],
  },
  {
    id: "vaultpass",
    titulo: "VaultPass",
    resumen:
      "Gestor de contraseñas seguro con encriptación end-to-end y sincronización entre dispositivos.",
    descripcion:
      "Gestor de contraseñas completo y seguro que permite almacenar, organizar y autocompletar credenciales de forma encriptada. Incluye generador de contraseñas fuertes, organización por categorías, sincronización segura entre dispositivos, interfaz moderna y soporte móvil nativo. Enfoque principal en seguridad (encriptación end-to-end) y experiencia de usuario. Proyecto completo y funcional.",
    tecnologias: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Capacitor",
      "Supabase",
      "Criptografía",
    ],
    colorTema: "#10b981",
    colorGradiente: ["#10b981", "#0d9488", "#1e293b"],
    estado: "Terminado",
    año: 2026,
    capturas: [],
  },
  {
    id: "misupergo",
    titulo: "MiSuperGO",
    resumen:
      "App móvil de compras inteligentes: escaneo de productos, comparación de precios y comunidad.",
    descripcion:
      "Aplicación móvil para compras inteligentes y comunidad de supermercados. Permite escanear productos, comparar precios, gestionar listas y conectar con otros usuarios locales. Incluye buscador y categorías de productos, calculadora de compras, supermercado favorito, mapa de comunidad con geolocalización y una sección social para coincidencia de productos entre usuarios.",
    tecnologias: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Capacitor",
      "Supabase",
      "GPS",
      "Escáner de códigos",
    ],
    colorTema: "#22c55e",
    colorGradiente: ["#22c55e", "#eab308", "#84cc16"],
    estado: "Terminado",
    año: 2025,
    capturas: [],
  },
  {
    id: "synapse",
    titulo: "Synapse",
    resumen:
      "Sistema ligero para usar cualquier dispositivo como segunda pantalla de forma inalámbrica.",
    descripcion:
      "Sistema para mirroring y gestión de pantallas secundarias sin necesidad de software pesado. Compuesto por un mirror para transmitir pantalla, un receiver como aplicación web progresiva (PWA), un dashboard de control y sincronización local y en la nube con soporte multi-display. Ya cumple su función principal, aunque sigue en desarrollo activo.",
    tecnologias: [
      "Node.js",
      "JavaScript",
      "HTML",
      "CSS",
      "SQLite",
      "PWA",
      "Service Worker",
    ],
    colorTema: "#6366f1",
    colorGradiente: ["#6366f1", "#3b82f6", "#8b5cf6"],
    estado: "En desarrollo",
    año: 2025,
    capturas: [],
  },
  {
    id: "amane",
    titulo: "Amane",
    resumen:
      "Ecosistema de bienestar: sitio web público más sistema interno de gestión de clientes.",
    descripcion:
      "Ecosistema completo para un negocio de bienestar. Amane New es el sitio web público orientado a clientes, con secciones de masajes, rutinas, productos, hidratación y sobre nosotros. El Registro de Clientes V28 es el sistema interno/administrativo (CRM básico), ya en una versión madura, para gestionar los registros de clientes.",
    tecnologias: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
    ],
    colorTema: "#f472b6",
    colorGradiente: ["#f472b6", "#fb923c", "#a78bfa"],
    estado: "Terminado",
    año: 2025,
    capturas: [],
  },
];