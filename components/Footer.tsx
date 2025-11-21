import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#9B2A2A] text-white mt-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Información de la firma */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">I.S. Law Firm, PLLC</h3>
            <p className="text-white/90 mb-4">
              Abogados especializados en servicios de inmigración. 
              Brindamos atención personalizada y profesional para hacer realidad tu sueño americano.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/solicitud-trabajo" className="text-white/90 hover:text-white transition-colors">
                  Solicitud de Trabajo
                </Link>
              </li>
              <li>
                <Link href="/servicios/permiso-trabajo" className="text-white/90 hover:text-white transition-colors">
                  Permiso de Trabajo
                </Link>
              </li>
              <li>
                <Link href="/servicios/residencia" className="text-white/90 hover:text-white transition-colors">
                  Residencia
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-white/90 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/consulta-caso" className="text-white/90 hover:text-white transition-colors">
                  Consulta de Caso
                </Link>
              </li>
              <li>
              <Link href="/contacto" className="text-white/90 hover:text-white transition-colors">
                Contacto
              </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+17035271779" className="hover:text-white transition-colors">
                  (703) 527-1779
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:law@islawfirm.com" className="hover:text-white transition-colors">
                  law@islawfirm.com
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  3930 Walnut Street #200<br />
                  Fairfax, VA 22030
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Lunes - Viernes<br />
                  9:30 AM - 5:30 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Síguenos</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior con avisos legales */}
          <div className="border-t border-white/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/90 text-center md:text-left">
              <p className="mb-2">
                La comunicación a través de este sitio web no crea una relación abogado-cliente. 
                Su caso puede tener plazos críticos que deben cumplirse antes de recibir una respuesta de nosotros.
              </p>
              <p className="mb-2">
                Cualquier comunicación, incluido el correo electrónico, a través de este sitio web puede no ser confidencial o privilegiada.
              </p>
              <p>
                LOS RESULTADOS DEL CASO DEPENDEN DE UNA VARIEDAD DE FACTORES ÚNICOS DE CADA CASO. 
                LOS RESULTADOS DEL CASO DESCRITOS EN ESTE SITIO WEB NO GARANTIZAN NI PREDICEN UN RESULTADO SIMILAR 
                EN CUALQUIER CASO FUTURO EMPRENDIDO POR I.S. LAW FIRM, PLLC.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-white/30">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <Link href="/politica-privacidad" className="text-sm text-white/90 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/politica-cookies" className="text-sm text-white/90 hover:text-white transition-colors">
                Política de Cookies
              </Link>
            </div>
            <p className="text-sm text-white/90">
              © {new Date().getFullYear()} por I.S. Law Firm, PLLC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

