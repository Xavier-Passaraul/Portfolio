import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Mi Portfolio | Full Stack Developer",
  description: "Portfolio personal creado con Next.js y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <Navbar />
        <main id="inicio" className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}