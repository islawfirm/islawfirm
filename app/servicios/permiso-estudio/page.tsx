'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function PermisoEstudioPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string || 'No proporcionado';
    const mensaje = formData.get('mensaje') as string;
    
    const whatsappMessage = `*Formulario de Permiso de Estudio*\n\n` +
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
            src="/images/portadaestudio.jpg"
            alt="Permiso de Estudio"
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
                Permiso de Estudio
              </h1>
              
              <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans mb-8">
                Estudiar en Estados Unidos es una oportunidad emocionante que puede abrir muchas puertas. En I.S. Law Firm, ayudamos a estudiantes internacionales a obtener las visas y autorizaciones necesarias para estudiar en instituciones educativas estadounidenses. Ya sea que esté buscando una visa F-1 para estudios académicos, una visa M-1 para estudios vocacionales, o necesita ayuda con OPT (Optional Practical Training), estamos aquí para ayudarle.
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
              Las visas de estudiante F-1 y M-1 son visas de no inmigrante que permiten a estudiantes internacionales estudiar en Estados Unidos. El proceso de obtener estas visas puede ser complejo, involucrando primero ser aceptado en una institución educativa acreditada, recibir un Formulario I-20, y luego solicitar la visa en un consulado estadounidense. Nuestro equipo puede ayudarle en cada paso de este proceso.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Una vez que esté estudiando en Estados Unidos, también podemos ayudarle con aspectos importantes como mantener su estatus de estudiante, solicitar extensiones de estatus, cambiar de escuela o programa, y obtener autorización para trabajar mientras estudia (como CPT - Curricular Practical Training). También ayudamos con OPT, que permite a estudiantes F-1 trabajar en su campo de estudio después de completar sus estudios.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              También ayudamos con situaciones más complejas, como cambiar de estatus de estudiante a otro tipo de visa, transferir de una escuela a otra, o navegar problemas que puedan surgir con su estatus de estudiante. Entendemos que estudiar en Estados Unidos es una inversión importante y estamos comprometidos a ayudarle a mantener su estatus legal y aprovechar al máximo su experiencia educativa.
            </p>

            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Si está buscando estudiar en Estados Unidos o necesita ayuda con su visa de estudiante o estatus, estamos aquí para ayudarle. Ofrecemos consultas para evaluar su situación y explicarle sus opciones. No dude en contactarnos para comenzar.
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
              Contáctanos para tu Permiso de Estudio
            </h2>
            <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
              ¿Necesitas ayuda con una visa de estudiante o permiso de estudio? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
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

              {/* Tipo de Visa/Estatus */}
              <div>
                <label htmlFor="tipo-visa" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Tipo de Visa/Estatus
                </label>
                <select
                  id="tipo-visa"
                  name="tipo-visa"
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="f1-nueva">F-1 (Nueva Solicitud)</option>
                  <option value="f1-extension">F-1 (Extensión)</option>
                  <option value="m1">M-1 (Estudios Vocacionales)</option>
                  <option value="cpt">CPT (Curricular Practical Training)</option>
                  <option value="opt">OPT (Optional Practical Training)</option>
                  <option value="cambio-estatus">Cambio de Estatus</option>
                  <option value="transferencia">Transferencia de Escuela</option>
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
                placeholder="Cuéntanos sobre tu situación educativa y cómo podemos ayudarte con tu permiso de estudio..."
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
