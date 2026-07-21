export interface CasoDeEstudio {
  problema: string;
  solucion: string;
  resultado: string;
}

export interface Proyecto {
  id: string;
  titulo: string;
  resumen: string; 
  caso: CasoDeEstudio;
  tecnologias: string[];
  colorTema: string;
  colorGradiente?: [string, string, string];
  estado?: "Terminado" | "En desarrollo" | "Terminado / Con ideas de mejoras" | "En construcción";
  dificultad?: string;
  año: number;
  linkGithub?: string;
  linkDemo?: string;
  linkWebsite?: string; 
  linkDescarga?: string;
  capturas: string[];
}


export const proyectos: Proyecto[] = [
  {
    id: "luma-studio",
    titulo: "Luma Studio",
    resumen:
      "Luma Studio es una plataforma para crear mockups de productos digitales en dispositivos reales, con edición de capturas y exportación por lotes.",
    caso: {
      problema:
        "Me enfrente que la mayoria de las plataformas similares ofrecen Mockups genericos y no mucha decision de edicion, por eso decidi crear una plataforma que permita a los usuarios crear sus propios mockups en segundos y con la imagen que mas necesiten.",
      solucion:
        "La solución fue pensar que me gustaria encontrar en una plataforma de mockups, en base a eso cree Luma Studio, una plataforma que te permite lo que te imaginación lo desee",
      resultado:
        "Motor de renderizado de perspectivas y colas de procesamiento para exports pesados, corriendo sobre Node.js con Prisma/PostgreSQL y storage de imágenes en Supabase. Sigue en desarrollo activo.",
    },
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
    dificultad: "Alta)",
    año: 2025-2026,
    capturas: [],
  },
  {
    id: "cloudsync",
    titulo: "CloudSync",
    resumen:
      "Sincronización de archivos en la nube con chats en tiempo real.",
    caso: {
      problema:
        "Siempre dije: las apps de sincronización de archivos en la nube no ofrecen una experiencia completa. solo se enfocan en una sola cosa y no se expanden a otras necesidades del usuario.",
      solucion:
        "Una app full-stack que combina sincronización de archivos en carpetas, con chats en tiempo real entre dispositivos, con autenticación completa, notificaciones push y una app nativa para Android vía Capacitor.",
      resultado:
        "Sistema de carpetas, subida de archivos con notificaciones automáticas y mensajería en tiempo real funcionando sobre Supabase (Auth, Storage, Realtime y Edge Functions), con despliegue móvil listo.",
    },
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
    dificultad: "Media-Alta",
    año: 2025,
    capturas: [],
  },
  {
    id: "vaultpass",
    titulo: "VaultPass",
    resumen:
      "Gestor de contraseñas seguro con encriptación end-to-end.",
    caso: {
      problema:
        "Reutilizar contraseñas o guardarlas en notas sueltas es uno de los errores de seguridad más comunes, pero muchos gestores de contraseñas se sienten complicados o poco confiables para el usuario final.",
      solucion:
        "Un gestor con almacenamiento encriptado de credenciales, generador de contraseñas fuertes, organización por categorías, con una interfaz simple y móvil nativo vía Capacitor.",
      resultado:
        "Proyecto completo y funcional, con foco explícito en criptografía y encriptación end-to-end por sobre features accesorias.",
    },
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
    estado: "Terminado / Con ideas de mejoras",
    dificultad: "Media-Alta",
    año: 2025,
    capturas: [],
  },
  {
    id: "misupergo",
    titulo: "MiSuperGO",
    resumen:
      "App móvil de compras inteligentes: escaneo de productos, comparación de precios y comunidad.",
    caso: {
      problema:
        "Comparar precios entre supermercados y armar la lista de compras implica abrir varias apps o folletos distintos, sin forma de compartir hallazgos con gente cerca.",
      solucion:
        "Una app móvil que combina escaneo de código de barras, comparación de precios, listas de compras y una capa social/geolocalizada para conectar con usuarios de la misma zona.",
      resultado:
        "Integración de cámara, GPS y mapas sobre React + Capacitor, con backend completo en Supabase. Funcional, con foco en ahorro real para el usuario.",
    },
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
    estado: "En construcción",
    dificultad: "Media",
    año: 2026,
    capturas: [],
  },
  {
    id: "synapse",
    titulo: "Synapse",
    resumen:
      "Sistema ligero para usar cualquier dispositivo como segunda pantalla de forma inalámbrica.",
    caso: {
      problema:
        "Usar un segundo dispositivo como pantalla extendida suele requerir instalar software pesado y configurar drivers, poco práctico para un uso rápido y puntual.",
      solucion:
        "Un sistema liviano de mirroring: un emisor que transmite la pantalla, un receiver como PWA sin instalación y un dashboard de control, con sincronización local y en la nube.",
      resultado:
        "Streaming funcional entre dispositivos con Node.js y soporte multi-display. Ya cumple su función principal; el mayor desafío sigue siendo la latencia y la compatibilidad cross-device.",
    },
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
    dificultad: "Media",
    año: 2026,
    capturas: [],
  },
  {
    id: "amane",
    titulo: "Amane Natural",
    resumen:
      "Ecosistema de bienestar: sitio web público más sistema interno de gestión de clientes.",
    caso: {
      problema:
        "Un centro de bienestar necesitaba tanto una cara pública para atraer clientes como una forma ordenada de gestionar sus registros internamente, sin depender de planillas sueltas.",
      solucion:
        "Un ecosistema de dos partes: Amane Natural, el sitio web público con la oferta de servicios (masajes, rutinas, productos, hidratación), y un CRM interno para administrar el registro de clientes.",
      resultado:
        "Sistema interno ya en su versión V28, una base madura y probada en uso real para la gestión diaria de clientes.",
    },
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