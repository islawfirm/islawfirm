import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

export const metadata: Metadata = {
  title: "I.S. Law Firm - Servicios Legales de Inmigración",
  description: "Firma de abogados especializada en servicios de inmigración. Solicitud de trabajo, permisos, residencia, asilo y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
        
        {/* Botón Flotante Revisar Estado */}
        <FloatingButton />
      </body>
    </html>
  );
}

