import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Comprime la respuesta (gzip/brotli) automáticamente
  compress: true,
  // Quita el header "X-Powered-By: Next.js" (menos info expuesta, no aporta nada al usuario)
  poweredByHeader: false,
  // Sólo importa el ícono usado de cada paquete de íconos en vez del paquete entero,
  // reduce mucho el JS que viaja al navegador (Proyectos/Contacto/Tecnologías usan
  // lucide-react y react-icons)
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
