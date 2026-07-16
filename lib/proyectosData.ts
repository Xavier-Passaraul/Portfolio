export interface Proyecto {
  id: string;
  titulo: string;
  resumen: string; // se ve en la card cerrada, 1 línea
  descripcion: string; // "README" breve, se ve al abrir la card
  tecnologias: string[];
  colorTema: string; // hex, define la ambientación de la card (ej "#3b82f6")
  año: number; // se usa para ordenar de más nuevo a más viejo
  linkGithub?: string;
  linkDemo?: string;
  linkWebsite?: string; // opcional, solo si el proyecto tiene un sitio propio
  capturas: string[]; // rutas a imágenes en /public, ej: "/proyectos/ecommerce-1.png"
}

export const proyectos: Proyecto[] = [
  {
    id: "ecommerce-app",
    titulo: "E-Commerce App",
    resumen: "Plataforma de ventas con carrito de compras y pasarela de pago.",
    descripcion:
      "Plataforma de ventas full stack con carrito de compras, pasarela de pago vía Stripe y panel de administración para gestionar productos, pedidos y usuarios.",
    tecnologias: ["Next.js", "Tailwind CSS", "Node.js", "Stripe"],
    colorTema: "#3b82f6",
    año: 2026,
    linkGithub: "#",
    linkDemo: "#",
    capturas: [],
  },
  {
    id: "kanban-board",
    titulo: "Gestor de Tareas Kanban",
    resumen: "Gestión de proyectos con drag & drop y autenticación de usuarios.",
    descripcion:
      "Aplicación para gestión de proyectos con sistema de arrastrar y soltar (drag & drop), columnas personalizables y autenticación de usuarios vía Firebase.",
    tecnologias: ["React", "Firebase", "CSS Modules"],
    colorTema: "#a78bfa",
    año: 2025,
    linkGithub: "#",
    linkDemo: "#",
    capturas: [],
  },
  {
    id: "inventario-api",
    titulo: "API REST de Inventario",
    resumen: "Backend para control de stock, proveedores y reportes.",
    descripcion:
      "Backend robusto para control de stock, gestión de proveedores y reportes automatizados, con autenticación vía JWT y tests con Jest.",
    tecnologias: ["Express", "MongoDB", "JWT", "Jest"],
    colorTema: "#22d3ee",
    año: 2025,
    linkGithub: "#",
    capturas: [],
  },
];