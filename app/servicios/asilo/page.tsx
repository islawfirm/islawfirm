'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function AsiloPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string || 'No proporcionado';
    const mensaje = formData.get('mensaje') as string;
    
    const whatsappMessage = `*Formulario de Asilo*\n\n` +
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
            src="/images/portadaasilo.jpg"
            alt="Asilo"
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
                Asilo
              </h1>
              
              <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans mb-8">
                El asilo es una forma de protección disponible para personas que han sido perseguidas o temen ser perseguidas en su país de origen debido a su raza, religión, nacionalidad, pertenencia a un grupo social particular, u opinión política. En I.S. Law Firm, entendemos la urgencia y la sensibilidad de estos casos, y estamos comprometidos a proporcionar representación legal experta y compasiva a quienes buscan protección en Estados Unidos.
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
              El proceso de asilo puede ser extremadamente complejo y desafiante. Hay requisitos estrictos de elegibilidad, plazos importantes que deben cumplirse, y el proceso puede involucrar tanto a USCIS como a las cortes de inmigración. Nuestro equipo tiene experiencia significativa en casos de asilo y entiende la importancia crítica de presentar un caso sólido y bien documentado.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Ayudamos a nuestros clientes con todos los aspectos del proceso de asilo, desde la preparación inicial de la solicitud (Formulario I-589) hasta la representación en entrevistas de asilo y audiencias en la corte de inmigración. Trabajamos estrechamente con nuestros clientes para desarrollar una narrativa convincente de su caso, reunir evidencia de apoyo, y prepararlos para las entrevistas y audiencias.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              También ayudamos con solicitudes de aceleración cuando hay circunstancias urgentes, con apelaciones si una solicitud es denegada, y con otros aspectos relacionados como permisos de trabajo para solicitantes de asilo. Entendemos que cada caso de asilo es único y requiere un enfoque personalizado y sensible. Estamos comprometidos a luchar por los derechos de nuestros clientes y a ayudarlos a encontrar seguridad y estabilidad en Estados Unidos.
            </p>

            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Si está buscando asilo o tiene preguntas sobre su caso, estamos aquí para ayudarle. Ofrecemos consultas confidenciales para evaluar su situación y explicarle sus opciones. No dude en contactarnos para comenzar.
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
              Contáctanos para tu Caso de Asilo
            </h2>
            <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
              ¿Necesitas ayuda con un caso de asilo? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo de manera confidencial.
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

              {/* Estado del Caso */}
              <div>
                <label htmlFor="estado-caso" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Estado del Caso
                </label>
                <select
                  id="estado-caso"
                  name="estado-caso"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                >
                  <option value="">Seleccione un estado</option>
                  <option value="nueva-solicitud">Nueva Solicitud</option>
                  <option value="solicitud-pendiente">Solicitud Pendiente</option>
                  <option value="entrevista-programada">Entrevista Programada</option>
                  <option value="corte-inmigracion">En Corte de Inmigración</option>
                  <option value="apelacion">Apelación</option>
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
                placeholder="Cuéntanos sobre tu situación. Toda la información será tratada de manera confidencial..."
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
              Toda la información será tratada de manera confidencial.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
