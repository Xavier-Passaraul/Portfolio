import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Todas las fuentes se auto-hospedan y optimizan con next/font: se descargan
// una sola vez en build, sin requests a Google en el navegador del visitante
// (antes cada sección las pedía por su cuenta con un <link> inyectado por JS).
const inter = Inter({ subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
  display: "swap",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fira",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://desarrollo-real.vercel.app"),
  title: {
    default: "Xavier Passaraul | Desarrollador Full Stack",
    template: "%s | Xavier Passaraul",
  },
  description:
    "Portfolio de Xavier Passaraul, desarrollador Full Stack especializado en React, Next.js, TypeScript y Node.js. Proyectos, tecnologías y contacto.",
  keywords: [
    "desarrollador full stack",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio desarrollador",
  ],
  authors: [{ name: "Xavier Passaraul" }],
  openGraph: {
    title: "Xavier Passaraul | Desarrollador Full Stack",
    description:
      "Portfolio de Xavier Passaraul, desarrollador Full Stack especializado en React, Next.js, TypeScript y Node.js.",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} ${jetbrainsMono.variable} ${poppins.variable} ${firaCode.variable} bg-[#0a0a0e] text-slate-200 antialiased`}
      >
        {/* Enlace para saltar al contenido: invisible hasta recibir foco por teclado */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:font-semibold"
        >
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
