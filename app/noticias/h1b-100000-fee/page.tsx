'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function H1BFeeProclamationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/proclamacion.avif"
            alt="Proclamación Presidencial sobre tarifas H-1B"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors text-sm md:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
            <div className="mb-3">
              <span className="text-yellow-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Actualidad Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-4">
              Nueva Proclamación Agrega Tarifa de $100,000 a Ciertas Peticiones H-1B
            </h1>
            <p className="text-white/90 text-sm md:text-base mb-4">
              <span className="font-semibold">Publicado:</span> Sep 24, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Información del autor y metadata */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold text-[#8B0000] mr-2">Escrito por:</span>
              <span className="text-gray-800">I.S. Law Firm</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Sep 24, 2025</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Introducción */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif">
            El 19 de septiembre de 2025, el Presidente Donald J. Trump firmó una Proclamación titulada &ldquo;Restricción sobre la Entrada de Ciertos Trabajadores No Inmigrantes&rdquo;. La medida se presenta como un paso inicial para reformar el programa H-1B con el fin de frenar el abuso y proteger a los trabajadores estadounidenses.
          </p>
        </div>

        {/* Alerta importante */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12">
          <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Nueva Tarifa de $100,000
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A partir de las <strong className="text-red-900">12:01 a.m. hora del Este del 21 de septiembre de 2025</strong>, cualquier nueva petición H-1B debe estar acompañada de un pago de <strong className="text-red-900">$100,000</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Esto se aplica a las solicitudes sujetas al límite anual (cap-subject) en la lotería del año fiscal 2026, así como a cualquier otra nueva petición H-1B presentada en o después de esa hora efectiva.
          </p>
        </div>

        {/* Secciones detalladas */}
        <div className="space-y-12">
          {/* Implementación */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Implementación y Coordinación
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                La Proclamación ordena al Departamento de Seguridad Nacional (DHS) y al Departamento de Estado que coordinen y tomen todas las acciones necesarias para implementar estos cambios.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Las agencias federales han comenzado a emitir orientación de implementación:
              </p>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">•</span>
                  <span><strong>USCIS</strong> ha publicado instrucciones para los peticionarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">•</span>
                  <span><strong>U.S. Customs and Border Protection (CBP)</strong> ha circulado orientación a sus oficinas de campo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">•</span>
                  <span><strong>Departamento de Estado</strong> ha proporcionado orientación paralela a los puestos consulares para garantizar un procesamiento consistente</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Alcance de la Proclamación */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Alcance de la Proclamación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-green-800 font-bold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No Afecta
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                  <li>• Visas H-1B previamente emitidas</li>
                  <li>• Peticiones presentadas antes del 21 de septiembre de 2025 a las 12:01 a.m. ET</li>
                  <li>• Extensiones o renovaciones de H-1B (no cambia las tarifas existentes)</li>
                  <li>• Viajes de titulares actuales de visa H-1B</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <h3 className="text-amber-800 font-bold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Sí Aplica
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                  <li>• Nuevas peticiones H-1B presentadas el 21 de septiembre de 2025 a las 12:01 a.m. ET o después</li>
                  <li>• Peticiones sujetas al límite anual (cap-subject) para el año fiscal 2026</li>
                  <li>• Cualquier otra nueva petición H-1B</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>Importante:</strong> La Proclamación es prospectiva. El nuevo pago de $100,000 es un requisito único vinculado a la presentación de una nueva petición H-1B. Los titulares actuales de visa H-1B pueden continuar viajando dentro y fuera de Estados Unidos, ya que la Proclamación no restringe sus viajes.
              </p>
            </div>
          </section>

          {/* Reformas Adicionales */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Reformas Adicionales Previstas
            </h2>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Se anticipan más reformas en el programa H-1B:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">1.</span>
                  <div>
                    <strong className="text-purple-900">Departamento de Trabajo (DOL):</strong> Se le ha encomendado proponer reglas para revisar y aumentar los niveles de salario prevaleciente (prevailing wage levels).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">2.</span>
                  <div>
                    <strong className="text-purple-900">Departamento de Seguridad Nacional (DHS):</strong> Ha sido dirigido a buscar reglamentación que priorizaría a trabajadores con mayores habilidades y salarios más altos en el proceso de selección H-1B.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">3.</span>
                  <div>
                    <strong className="text-purple-900">Cambios Adicionales:</strong> Se están considerando cambios adicionales que se espera sean anunciados en los próximos meses.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Qué Significa Esto */}
          <section className="bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 pb-4 border-b-2 border-white/30">
              Qué Significa Esto para Empleadores y Trabajadores
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Para Empleadores
                </h3>
                <ul className="space-y-3 text-white/95 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span><strong>Reevalúe presupuestos y cronogramas inmediatamente</strong> considerando el nuevo requisito de pago de $100,000</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span><strong>Verifique si una presentación ocurrirá en o después de la hora efectiva</strong> (21 de septiembre de 2025, 12:01 a.m. ET)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span><strong>Monitoree la orientación de las agencias</strong> a medida que se finalizan los procedimientos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span><strong>Considere alternativas de visa</strong> si el costo es prohibitivo para su organización</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Para Trabajadores
                </h3>
                <ul className="space-y-3 text-white/95 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">✓</span>
                    <span><strong>Los empleados actuales de H-1B NO están afectados</strong> por el nuevo pago</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">✓</span>
                    <span><strong>Los casos ya presentados NO están afectados</strong> por el nuevo pago</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">✓</span>
                    <span><strong>Las extensiones y renovaciones NO requieren</strong> el pago adicional de $100,000</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">✓</span>
                    <span><strong>Los viajes continúan normalmente</strong> para los titulares actuales de visa H-1B</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline Visual */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Cronología de la Proclamación
            </h2>
            
            <div className="relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-[#8B0000]"></div>
              <div className="space-y-8">
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-[#8B0000] rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-white border-2 border-[#8B0000] rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-[#8B0000] mb-2">19 de Septiembre, 2025</h3>
                    <p className="text-gray-700">El Presidente Trump firma la Proclamación &ldquo;Restricción sobre la Entrada de Ciertos Trabajadores No Inmigrantes&rdquo;</p>
                  </div>
                </div>

                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-red-800 mb-2">21 de Septiembre, 2025 - 12:01 a.m. ET</h3>
                    <p className="text-gray-700 font-semibold mb-2">Fecha Efectiva</p>
                    <p className="text-gray-700">Todas las nuevas peticiones H-1B deben incluir el pago de $100,000</p>
                  </div>
                </div>

                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Septiembre - Octubre, 2025</h3>
                    <p className="text-gray-700">Agencias federales emiten orientación de implementación (USCIS, CBP, Departamento de Estado)</p>
                  </div>
                </div>

                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Próximos Meses</h3>
                    <p className="text-gray-700">Se esperan anuncios de reformas adicionales, incluyendo cambios en salarios prevalecientes y priorización de trabajadores altamente calificados</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              ¿Necesita Asesoramiento sobre su Caso H-1B?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Esta proclamación puede tener implicaciones significativas para su situación. Contáctenos para una consulta personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:law@islawfirm.com"
                className="bg-white text-[#8B0000] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                law@islawfirm.com
              </a>
              <Link 
                href="/contacto"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors"
              >
                Página de Contacto
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">Manténgase conectado para actualizaciones:</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <span className="font-semibold">Instagram</span>
                </a>
                <span className="text-white/40">|</span>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <span className="font-semibold">Facebook</span>
                </a>
                <span className="text-white/40">|</span>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <span className="font-semibold">YouTube</span>
                </a>
              </div>
              <p className="text-white/70 text-xs mt-2">Síganos para análisis continuo y consejos de presentación mientras las agencias implementan esta política</p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg mt-12">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              <strong>Descargo de responsabilidad:</strong> Esta publicación proporciona información general y no constituye asesoramiento legal. Para obtener asesoramiento adaptado a su situación específica, comuníquese con I.S. Law Firm, PLLC.
            </p>
          </div>
        </div>
      </article>

      {/* Sección de categorías/etiquetas */}
      <section className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#8B0000] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Inmigración
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Inmigración Basada en Empleo
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Visa H-1B
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Proclamación Presidencial
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

