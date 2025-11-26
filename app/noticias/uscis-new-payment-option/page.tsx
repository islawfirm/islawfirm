'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function USCISPaymentOptionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pago.avif"
            alt="Nueva opción de pago de USCIS desde cuenta bancaria"
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
              USCIS Introduce Nueva Opción de Pago: Pague las Tarifas de Inmigración Directamente desde su Cuenta Bancaria
            </h1>
            <p className="text-white/90 text-sm md:text-base mb-4">
              <span className="font-semibold">Publicado:</span> Sep 21, 2025
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
              <span>Sep 21, 2025</span>
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
            El Servicio de Ciudadanía e Inmigración de Estados Unidos (USCIS) ha anunciado una actualización significativa que afectará cómo los solicitantes pagan sus trámites de inmigración. A partir de ahora, los solicitantes pueden enviar las tarifas de presentación directamente desde una cuenta bancaria estadounidense utilizando el recién introducido <strong>Formulario G-1650, Autorización para Transacciones ACH</strong>.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif mt-4">
            Este cambio refleja los esfuerzos más amplios de USCIS para modernizar sus sistemas, mejorar la seguridad y reducir los retrasos causados por los métodos de pago tradicionales.
          </p>
        </div>

        {/* Por qué importa este cambio */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
            Por Qué Importa Este Cambio
          </h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Hasta ahora, la mayoría de los solicitantes dependían de cheques en papel o giros postales para cubrir las tarifas de presentación. Aunque ampliamente utilizados, estos métodos a menudo conllevaban riesgos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-red-800 font-bold text-lg">Pérdida o Robo</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Los cheques perdidos o robados podían interrumpir el proceso de solicitud.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-amber-800 font-bold text-lg">Retrasos Postales</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Los retrasos en la entrega por correo a veces posponían la aceptación de las solicitudes.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="text-orange-800 font-bold text-lg">Pagos Rechazados</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Los pagos rechazados o sin fondos podían resultar en la denegación o rechazo de un caso.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-6">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-green-900">La nueva opción de débito ACH</strong> permite a los solicitantes realizar pagos directamente desde sus cuentas bancarias, garantizando un proceso más seguro, confiable y eficiente.
            </p>
          </div>
        </section>

        {/* Cómo puede pagar */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
            Cómo Puede Pagar las Tarifas de Presentación de USCIS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 className="text-blue-900 font-bold text-xl">Pago desde Cuenta Bancaria (Débito ACH)</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">1.</span>
                  <span>Presente el <strong>Formulario G-1650</strong> con su paquete de solicitud</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">2.</span>
                  <span>Los fondos se retirarán directamente de su cuenta bancaria estadounidense designada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 font-bold">3.</span>
                  <span>Proceso seguro y directo</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 className="text-purple-900 font-bold text-xl">Pago con Tarjeta de Crédito</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">1.</span>
                  <span>Presente el <strong>Formulario G-1450</strong> con su solicitud</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">2.</span>
                  <span>USCIS acepta tanto tarjetas de crédito como tarjetas de crédito prepagadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3 font-bold">3.</span>
                  <span>Opción disponible si no tiene cuenta bancaria estadounidense</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Fecha límite importante */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fecha Límite Importante
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              A partir del <strong className="text-red-900">28 de octubre de 2025</strong>, USCIS ya no aceptará cheques en papel ni giros postales.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A partir de esa fecha, solo se aceptarán pagos desde cuenta bancaria o pagos con tarjeta de crédito.
            </p>
          </div>
        </section>

        {/* Cosas a tener en cuenta */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
            Cosas a Tener en Cuenta
          </h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h3 className="text-yellow-800 font-bold text-lg mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fondos Suficientes
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Asegúrese de que su cuenta bancaria tenga suficiente dinero para cubrir la tarifa de presentación en su totalidad. Los fondos insuficientes pueden llevar al rechazo de toda su solicitud.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-red-800 font-bold text-lg mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Riesgo de Rechazo de Solicitud
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si su pago falla por cualquier razón, USCIS puede devolver su solicitud sin procesar.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-green-800 font-bold text-lg mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Opción de Tarjeta de Crédito Disponible
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si no tiene una cuenta bancaria estadounidense, aún puede pagar con una tarjeta de crédito, incluyendo tarjetas prepagadas.
              </p>
            </div>
          </div>
        </section>

        {/* Qué significa esto */}
        <section className="bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 pb-4 border-b-2 border-white/30">
            Qué Significa Esto para los Solicitantes
          </h2>
          
          <p className="text-white/95 text-lg leading-relaxed mb-6">
            Esta actualización es un desarrollo bienvenido para los solicitantes y sus familias. Hace que el proceso de pago sea:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-bold">Más Rápido</h3>
              </div>
              <p className="text-white/90">
                No más esperar a que se compensen los cheques en papel.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-bold">Más Seguro</h3>
              </div>
              <p className="text-white/90">
                Elimina los riesgos de cheques perdidos o robados.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold">Más Confiable</h3>
              </div>
              <p className="text-white/90">
                Garantiza que los pagos se procesen directa y seguramente.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white/10 rounded-lg p-6">
            <p className="text-white/95 leading-relaxed">
              Al agilizar el proceso de pago, USCIS tiene como objetivo reducir errores y acelerar los tiempos de manejo de solicitudes.
            </p>
          </div>
        </section>

        {/* Comparación visual */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B0000] mb-6 pb-3 border-b-2 border-[#8B0000]">
            Comparación: Métodos de Pago
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#8B0000] text-white">
                  <th className="px-6 py-4 text-left font-bold">Método de Pago</th>
                  <th className="px-6 py-4 text-center font-bold">Disponible Hasta</th>
                  <th className="px-6 py-4 text-center font-bold">Velocidad</th>
                  <th className="px-6 py-4 text-center font-bold">Seguridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">Cheques en Papel</td>
                  <td className="px-6 py-4 text-center text-red-600 font-semibold">28 Oct 2025</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-amber-600">Lento</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600">Riesgo de pérdida</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">Giros Postales</td>
                  <td className="px-6 py-4 text-center text-red-600 font-semibold">28 Oct 2025</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-amber-600">Lento</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-amber-600">Moderado</span>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-blue-900">Débito ACH (Cuenta Bancaria)</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Disponible</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">Rápido</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">Alto</span>
                  </td>
                </tr>
                <tr className="hover:bg-purple-50 bg-purple-50">
                  <td className="px-6 py-4 font-semibold text-purple-900">Tarjeta de Crédito</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Disponible</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">Rápido</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-600 font-semibold">Alto</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cómo I.S. Law Firm puede ayudar */}
        <section className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] rounded-xl p-8 md:p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Cómo I.S. Law Firm Puede Ayudar
          </h2>
          <p className="text-white/95 mb-6 text-lg leading-relaxed">
            En I.S. Law Firm, monitoreamos de cerca cada actualización de USCIS para asegurar que nuestros clientes se beneficien de la información más precisa y actualizada. Al preparar su solicitud de inmigración, le ayudaremos a elegir el mejor método de pago y nos aseguraremos de que todos los formularios requeridos se completen correctamente para evitar retrasos innecesarios.
          </p>
          <p className="text-white/95 mb-6 text-lg leading-relaxed">
            Si tiene preguntas sobre esta nueva opción de pago o cualquier aspecto de su caso de inmigración, contacte nuestra oficina hoy para programar una consulta con uno de nuestros experimentados abogados de inmigración.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a 
              href="mailto:admin@islawfirm.com.co"
              className="bg-white text-[#8B0000] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              admin@islawfirm.com.co
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
            <strong>Descargo de responsabilidad:</strong> Esta publicación proporciona información general y no constituye asesoramiento legal. Para obtener asesoramiento adaptado a su situación específica, comuníquese con I.S. Law Firm, PLLC.
          </p>
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
              USCIS
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Métodos de Pago
            </span>
            <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Formularios
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

