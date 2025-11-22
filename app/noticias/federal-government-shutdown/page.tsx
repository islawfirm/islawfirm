'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FederalGovernmentShutdownPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen del Capitolio */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cierre.avif"
            alt="U.S. Capitol Building con banners de SHUTDOWN"
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
              Federal Government Shutdown: What It Means for U.S. Immigration
            </h1>
            <p className="text-white/90 text-sm md:text-base mb-4">
              <span className="font-semibold">Actualizado:</span> Oct 3, 2025
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
              <span>Oct 4, 2025</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>3 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Introducción */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif">
            Un cierre del gobierno federal comenzó el 1 de octubre de 2025. Históricamente, la mayoría de los cierres duran días o un par de semanas; el más largo (2018-2019) duró 35 días y causó interrupciones generalizadas. Esta vez, varias funciones de inmigración continúan, pero otras están en pausa. A continuación se detalla qué está abierto, qué está en espera y qué debe hacer ahora.
          </p>
        </div>

        {/* Resumen ejecutivo con cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-green-800 font-bold text-lg mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Operando Normalmente
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm md:text-base">
              <li>• USCIS: Abierto y procesando casos</li>
              <li>• Cortes de Inmigración (EOIR): Audiencias de detenidos continúan</li>
              <li>• ICE/CBP: Operaciones esenciales continúan</li>
              <li>• Consulados: Muchos servicios continúan</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-red-800 font-bold text-lg mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              En Pausa
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm md:text-base">
              <li>• E-Verify: Temporalmente no disponible</li>
              <li>• Departamento de Trabajo (OFLC/FLAG): PERM, Prevailing Wage, LCA pausados</li>
              <li>• Algunas audiencias no detenidas pueden ser reprogramadas</li>
            </ul>
          </div>
        </div>

        {/* Secciones detalladas */}
        <div className="space-y-12">
          {/* Cortes de Inmigración */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Cortes de Inmigración (EOIR)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Calendario de Detenidos
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Continúa como esencial. Las audiencias para personas detenidas seguirán programadas normalmente.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Calendario de No Detenidos
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A partir de esta semana, muchas cortes están manteniendo las audiencias en el calendario. <strong className="text-amber-900">No asuma cancelación</strong>; confirme su caso específico a través del Sistema Automatizado de Información de Casos de EOIR (en línea o por teléfono).
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-gray-800 mb-2">Cómo verificar su audiencia:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span><strong>En línea:</strong> Portal de Información Automatizada de Casos de EOIR (ACIS)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span><strong>Teléfono:</strong> 1-800-898-7180 (TDD 800-828-1120)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* USCIS */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              USCIS
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-3">Estado: Abierto y procesando casos</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                USCIS continúa procesando la mayoría de los casos (familia, ajuste de estatus, naturalización, empleo, humanitarios) porque la agencia está principalmente financiada por tarifas. Las citas y biometrías deben proceder normalmente.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">Dependencias Indirectas</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Algunas solicitudes dependen del Departamento de Trabajo (DOL) (por ejemplo, LCAs para H-1B, PERM/PWD). Espere retrasos en cascada donde se requieren pasos del DOL.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Lo que esto significa:</strong> Las nuevas solicitudes de PERM/PWD/LCA esperarán hasta que se reanuden las asignaciones; espere acumulación de casos después.
              </p>
            </div>
          </section>

          {/* ICE / CBP */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              ICE / CBP (DHS)
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Las operaciones esenciales continúan: control fronterizo, arrestos, deportaciones y recaudación de ingresos de CBP (aranceles) proceden bajo el plan de cierre de DHS.
              </p>
            </div>
          </section>

          {/* Servicios Consulares */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Servicios de Visa y Pasaporte
            </h2>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                Generalmente continúan porque la Oficina de Asuntos Consulares depende en gran medida de los ingresos por tarifas; sin embargo, los puestos individuales pueden reducir la capacidad o retrasar los servicios dependiendo del personal local y las condiciones.
              </p>
            </div>
          </section>

          {/* E-Verify */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              E-Verify
            </h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Temporalmente no disponible; DHS ha suspendido la regla de tres días para las contrataciones afectadas.
              </p>
            </div>
          </section>

          {/* Departamento de Trabajo */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
              Departamento de Trabajo (OFLC/FLAG)
            </h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                PERM, Prevailing Wage, LCA y sistemas relacionados están en pausa durante el cierre.
              </p>
            </div>
          </section>

          {/* Qué hacer ahora */}
          <section className="bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 pb-4 border-b-2 border-white/30">
              Qué Hacer Ahora (Pasos Prácticos)
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Si tiene una audiencia en la corte de inmigración
                </h3>
                <ul className="space-y-3 text-white/95 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">1.</span>
                    <span><strong>No se salte:</strong> Muchas audiencias de no detenidos están procediendo.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">2.</span>
                    <span><strong>Verifique el estado:</strong> Use EOIR ACIS en línea o llame al 1-800-898-7180 el día anterior y la mañana de su audiencia.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">3.</span>
                    <span><strong>Busque nuevos avisos:</strong> Si su audiencia se reprograma, la corte emitirá un nuevo aviso; siga el aviso sobre todo lo demás.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Si tiene una cita/entrevista de USCIS
                </h3>
                <p className="text-white/95 leading-relaxed">
                  Planee asistir a menos que reciba un aviso oficial de cancelación o reprogramación. USCIS está abierto y procesando casos.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-2.34 0-4.68.344-7.059.97M21 13.255c-1.01-.203-1.99-.439-2.948-.691m0 0a23.979 23.979 0 01-2.35-.305 8.5 8.5 0 00-1.702 1.702c-.305.35-.305.818 0 1.168a8.5 8.5 0 001.702 1.702c.35.305.818.305 1.168 0a8.5 8.5 0 001.702-1.702c.305-.35.305-.818 0-1.168a8.5 8.5 0 00-1.702-1.702c-.35-.305-.818-.305-1.168 0z" />
                  </svg>
                  Si es un empleador contratando ahora (I-9/E-Verify)
                </h3>
                <ul className="space-y-3 text-white/95 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span>Complete el Formulario I-9 a tiempo como de costumbre.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span>Mantenga un registro de cualquier persona contratada mientras E-Verify está fuera de servicio (nombre, fecha de contratación, fecha de creación del caso más tarde).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-3 font-bold">•</span>
                    <span>Cree casos de E-Verify una vez que se restaure el servicio; la regla de tres días está suspendida para las contrataciones afectadas.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Si su caso involucra PERM/PWD/LCA
                </h3>
                <p className="text-white/95 leading-relaxed">
                  Incluya tiempo de margen; las solicitudes y el procesamiento se reanudan solo después de que se restaure el financiamiento, y es probable que haya acumulación de casos.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-8 pb-4 border-b-2 border-[#8B0000]">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border-l-4 border-[#8B0000] p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Las audiencias de la corte de inmigración para no detenidos realmente están procediendo?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Sí, a partir de esta semana, muchos calendarios de no detenidos están procediendo. Siempre verifique el estado de su corte y caso individual a través de los sistemas de EOIR o con su abogado.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-[#8B0000] p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ¿USCIS está "cerrado" durante un cierre?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  No. USCIS está financiado por tarifas y continúa procesando casos. Algunos casos aún pueden verse afectados indirectamente si requieren pasos del DOL (por ejemplo, LCAs, PERM).
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-[#8B0000] p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Qué pasa con los plazos de E-Verify?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  E-Verify está temporalmente no disponible; DHS ha suspendido la regla de tres días durante la duración de la interrupción para las contrataciones afectadas. Cree casos una vez que el sistema esté en línea nuevamente y documente sus pasos.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-[#8B0000] p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Ocurrirán las entrevistas de visa consular?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Muchos puestos continúan los servicios de rutina porque las operaciones consulares están en gran parte financiadas por tarifas, pero las condiciones locales pueden causar retrasos o capacidad reducida. Verifique la página de su embajada/consulado para avisos locales.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-[#8B0000] p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  ¿Cuánto durará esto?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  No hay una fecha de finalización fija. Los tribunales federales dicen que pueden mantener operaciones con fondos de tarifas hasta el 17 de octubre de 2025, pero los cierres más largos pueden forzar cambios. Monitoree las actualizaciones oficiales.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Reserve una Consulta con I.S. Law Firm
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Para asesoramiento sobre su situación específica, contáctenos
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
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 border-l-4 border-gray-400 p-6 rounded-r-lg mt-12">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              <strong>Descargo de responsabilidad:</strong> Esta publicación proporciona información general y no constituye asesoramiento legal. Para obtener asesoramiento sobre su situación específica, comuníquese con I.S. Law Firm, PLLC.
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
              Gobierno Federal
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              USCIS
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Cortes de Inmigración
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

