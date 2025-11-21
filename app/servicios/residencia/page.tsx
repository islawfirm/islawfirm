'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ResidenciaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen de fondo */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portadaresidencia.webp"
            alt="Residencia"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        
        {/* Contenido de texto superpuesto en la parte inferior */}
        <div className="relative z-10 mt-auto w-full px-4 md:px-6 lg:px-8 pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Texto "Atrás" en la esquina superior izquierda */}
            <Link 
              href="/servicios/inmigracion"
              className="inline-block text-white/80 hover:text-white text-sm md:text-base mb-6 transition-colors absolute top-4 left-4 md:top-6 md:left-6"
            >
              Atrás
            </Link>
            
            {/* Título y contenido - Tarjeta blanca en la parte inferior */}
            <div className="bg-white rounded-lg p-8 md:p-12 lg:p-16 shadow-2xl mt-16 md:mt-24">
              <h1 className="text-[#8B0000] text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Residencia Permanente
              </h1>
              
              <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans mb-8">
                Obtener la residencia permanente (Green Card) en Estados Unidos es uno de los objetivos más importantes para muchos inmigrantes. En I.S. Law Firm, tenemos amplia experiencia ayudando a nuestros clientes a navegar el complejo proceso de obtener y mantener su residencia permanente. Ya sea a través de peticiones familiares, empleo, inversión, o otras vías, estamos aquí para ayudarle a alcanzar este importante hito.
              </p>

              <div className="flex justify-end">
                <Link
                  href="/reservar-consulta"
                  className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-4 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Reservar Consulta</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Texto Informativo */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {/* Contenido de texto */}
          <div className="space-y-6 md:space-y-8 text-left">
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Hay varias vías para obtener la residencia permanente en Estados Unidos. Las peticiones familiares son una de las formas más comunes, donde un ciudadano estadounidense o residente permanente puede patrocinar a ciertos familiares. También hay residencia permanente basada en empleo, donde un empleador puede patrocinar a un trabajador extranjero. Otras vías incluyen el programa de inversión EB-5, el programa de diversidad de visas, y ciertas categorías especiales.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              El proceso de obtener una Green Card puede ser largo y complejo, involucrando múltiples agencias gubernamentales y pasos específicos que deben seguirse en orden. Nuestro equipo tiene experiencia en todos los aspectos de este proceso, desde la preparación inicial de peticiones hasta el ajuste de estatus o procesamiento consular, y todo lo que viene después, incluyendo la eliminación de condiciones para residentes permanentes condicionales.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              También ayudamos con renovaciones de Green Cards, reemplazos de tarjetas perdidas o dañadas, y con problemas que puedan surgir, como mantener el estatus de residencia permanente o navegar situaciones complejas. Entendemos que obtener y mantener la residencia permanente es fundamental para construir una vida estable en Estados Unidos, y estamos comprometidos a ayudarle en cada paso del camino.
            </p>

            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Si está buscando obtener la residencia permanente o tiene preguntas sobre su caso, estamos aquí para ayudarle. Ofrecemos consultas para evaluar su elegibilidad y explicarle sus opciones. No dude en contactarnos para comenzar su proceso hacia la residencia permanente.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Formulario de Contacto */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {/* Título */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Contáctanos para tu Residencia Permanente
            </h2>
            <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
              ¿Necesitas ayuda con tu residencia permanente? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>

          {/* Formulario */}
          <form className="bg-[#F5F0E8] rounded-xl p-8 md:p-10 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                  placeholder="Ingrese su nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                  placeholder="(703) 123-4567"
                />
              </div>

              {/* Tipo de Petición */}
              <div>
                <label htmlFor="tipo-peticion" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Tipo de Petición
                </label>
                <select
                  id="tipo-peticion"
                  name="tipo-peticion"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="familiar">Petición Familiar</option>
                  <option value="empleo">Basada en Empleo</option>
                  <option value="inversion">EB-5 (Inversión)</option>
                  <option value="ajuste-estatus">Ajuste de Estatus</option>
                  <option value="renovacion">Renovación de Green Card</option>
                  <option value="eliminacion-condiciones">Eliminación de Condiciones</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            {/* Mensaje */}
            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all resize-none"
                placeholder="Cuéntanos sobre tu situación y cómo podemos ayudarte con tu residencia permanente..."
              ></textarea>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-4 px-10 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Enviar Mensaje
              </button>
            </div>

            {/* Nota legal */}
            <p className="text-xs md:text-sm text-[#666666] text-center mt-6 font-sans">
              Al enviar este formulario, acepta que nos pongamos en contacto con usted. 
              La comunicación a través de este formulario no crea una relación abogado-cliente.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
