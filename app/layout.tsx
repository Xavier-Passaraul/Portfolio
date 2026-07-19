import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// STREAMING_CHUNK:Configuring fonts...
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

{/* STREAMING_CHUNK:Styling body for dark aesthetic... */}
<body className={${inter.className} ${jetbrainsMono.variable} bg-[#0a0a0e] text-slate-200 antialiased}>


{children}




);
}