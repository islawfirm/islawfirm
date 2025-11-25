'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function PermisoTrabajoPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string || 'No proporcionado';
    const mensaje = formData.get('mensaje') as string;
    
    const whatsappMessage = `*Formulario de Permiso de Trabajo*\n\n` +
      `*Nombre:* ${nombre}\n` +
      `*Email:* ${email}\n` +
      `*Teléfono:* ${telefono}\n` +
      `*Mensaje:* ${mensaje}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/18047083837?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen de fondo */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portadaempleo.jpeg"
            alt="Permiso de Trabajo"
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
                Permiso de Trabajo
              </h1>
              
              <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans mb-8">
                Obtener un permiso de trabajo (EAD - Employment Authorization Document) es un paso crucial para muchos inmigrantes que desean trabajar legalmente en Estados Unidos. En I.S. Law Firm, ayudamos a nuestros clientes a navegar el proceso de solicitud de permiso de trabajo, asegurándonos de que cumplan con todos los requisitos y presenten su solicitud correctamente.
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
              El permiso de trabajo (EAD) permite a ciertos extranjeros trabajar legalmente en Estados Unidos mientras su caso de inmigración está pendiente o mientras mantienen un estatus específico. Hay varias categorías de elegibilidad para un EAD, incluyendo solicitantes de asilo, cónyuges de ciertos titulares de visas, estudiantes con OPT, personas con ajuste de estatus pendiente, y otras categorías específicas.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              El proceso de solicitud puede ser complejo y requiere documentación específica según su categoría de elegibilidad. Nuestro equipo tiene experiencia en todas las categorías de EAD y puede ayudarle a determinar si es elegible, qué documentación necesita, y cómo presentar su solicitud de manera efectiva. Nos aseguramos de que su solicitud esté completa y presentada correctamente para evitar retrasos innecesarios.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              También ayudamos con renovaciones de permisos de trabajo y con problemas que puedan surgir durante el proceso, como solicitudes de aceleración cuando hay circunstancias urgentes. Entendemos que poder trabajar es esencial para muchos de nuestros clientes, por lo que trabajamos diligentemente para asegurar que sus solicitudes se procesen de manera oportuna.
            </p>

            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Si necesita un permiso de trabajo o tiene preguntas sobre su elegibilidad, estamos aquí para ayudarle. Ofrecemos consultas para evaluar su situación y guiarle a través del proceso. No dude en contactarnos para comenzar.
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
              Contáctanos para tu Permiso de Trabajo
            </h2>
            <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
              ¿Necesitas ayuda con un permiso de trabajo? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-[#F5F0E8] rounded-xl p-8 md:p-10 lg:p-12 shadow-lg">
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

              {/* Categoría de Elegibilidad */}
              <div>
                <label htmlFor="categoria" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Categoría de Elegibilidad
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="asilo">Solicitante de Asilo</option>
                  <option value="ajuste-estatus">Ajuste de Estatus Pendiente</option>
                  <option value="opt">OPT (Estudiante)</option>
                  <option value="conyuge-visa">Cónyuge de Titular de Visa</option>
                  <option value="renovacion">Renovación de EAD</option>
                  <option value="otro">Otra Categoría</option>
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
                placeholder="Cuéntanos sobre tu situación y cómo podemos ayudarte con tu permiso de trabajo..."
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
