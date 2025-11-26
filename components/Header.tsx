'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: 'Solicitud de Trabajo', href: '/servicios/solicitud-trabajo' },
    { name: 'Permiso de Trabajo', href: '/servicios/permiso-trabajo' },
    { name: 'Residencia', href: '/servicios/residencia' },
    { name: 'Asilo', href: '/servicios/asilo' },
    { name: 'Permiso de Estudio', href: '/servicios/permiso-estudio' },
  ];

  return (
    <header className="bg-blue-100 fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="w-full">
        <div className="bg-[#8B0000] w-full">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/ISLaw-logo-horizontal-_white_.png"
                alt="I.S. Law Firm"
                width={200}
                height={60}
                className="h-10 md:h-12 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-white font-sans text-sm xl:text-base">
              <Link href="/reservar-consulta" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Reservar Consulta
              </Link>
              <Link href="/sobre-nosotros" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Sobre Nosotros
              </Link>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="hover:text-yellow-300 transition-colors flex items-center space-x-1 whitespace-nowrap">
                  <span>Áreas de Práctica</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white text-text-primary rounded-lg shadow-xl py-2 z-50">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 hover:bg-background-secondary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/revisar-estado" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Revisar Estado
              </Link>
              <Link href="/" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Noticias
              </Link>
              <Link href="/sobre-nosotros" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Equipo
              </Link>
              <Link href="/contacto" className="hover:text-yellow-300 transition-colors whitespace-nowrap">
                Contacto
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 pt-2 px-4 md:px-6 border-t border-white/20">
              <div className="flex flex-col space-y-3 text-white">
                <Link 
                  href="/reservar-consulta" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservar Consulta
                </Link>
                <Link 
                  href="/sobre-nosotros" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                
                <div>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="hover:text-yellow-300 transition-colors flex items-center justify-between w-full py-2 text-base"
                  >
                    <span>Áreas de Práctica</span>
                    <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block py-2 hover:text-yellow-300 transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/revisar-estado" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Revisar Estado
                </Link>
                <Link 
                  href="/" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Noticias
                </Link>
                <Link 
                  href="/sobre-nosotros" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Equipo
                </Link>
                <Link 
                  href="/contacto" 
                  className="hover:text-yellow-300 transition-colors py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

