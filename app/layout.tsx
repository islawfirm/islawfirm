import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalMain from "@/components/ConditionalMain";
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
        <ConditionalHeader />
        <ConditionalMain>
          {children}
        </ConditionalMain>
        <ConditionalFooter />
        
        {/* Botón Flotante Revisar Estado */}
        <FloatingButton />
      </body>
    </html>
  );
}

