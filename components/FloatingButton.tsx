'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FloatingButton() {
  const pathname = usePathname();
  
  // No mostrar el botón en la página de revisar-estado
  if (pathname === '/revisar-estado') {
    return null;
  }

  return (
    <Link
      href="/revisar-estado"
      className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-50 group"
      aria-label="Revisar Estado del Caso"
    >
      <div className="relative">
        {/* Sombra animada de fondo */}
        <div className="absolute inset-0 bg-[#8B0000] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        {/* Botón principal */}
        <div className="relative bg-gradient-to-br from-[#8B0000] to-[#6B0000] hover:from-[#9B0000] hover:to-[#7B0000] text-white font-semibold py-4 px-6 md:py-5 md:px-8 rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(139,0,0,0.4)] transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 border border-white/10 backdrop-blur-sm">
          {/* Icono con animación */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
            <svg 
              className="relative w-6 h-6 md:w-7 md:h-7 transform group-hover:rotate-12 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          
          {/* Texto con efecto */}
          <span className="text-sm md:text-base font-medium tracking-wide relative">
            <span className="relative z-10">Revisar Estado</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          </span>
          
          {/* Indicador de pulso */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
        </div>
      </div>
    </Link>
  );
}

