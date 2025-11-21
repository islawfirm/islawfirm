'use client';

import Link from 'next/link';

export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F5F0E8]/30 to-white pt-20 md:pt-24">
      {/* Hero Section Mejorado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#7A0000] to-[#6B0000] text-white py-20 md:py-28 lg:py-32">
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center">
          <div className="inline-block mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold">
              Estamos aquí para ayudarte
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            Contáctanos
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ponte en contacto con nuestro equipo de expertos. Estamos comprometidos a responder todas tus consultas y ayudarte en cada paso del proceso legal.
          </p>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Información de Contacto y Formulario - Diseño Mejorado */}
      <section className="w-full py-20 md:py-24 lg:py-32 -mt-12 relative z-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Información de Contacto - Tarjetas Mejoradas */}
            <div className="space-y-8">
              <div>
                <h2 className="text-[#8B0000] text-4xl md:text-5xl font-serif font-bold mb-4">
                  Información de Contacto
                </h2>
                <p className="text-[#666666] text-lg leading-relaxed">
                  Múltiples formas de ponerte en contacto con nosotros. Elige la que prefieras.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Teléfono - Tarjeta Mejorada */}
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#8B0000]/30 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#8B0000] text-xl font-bold mb-2 group-hover:text-[#9B0000] transition-colors">
                        Teléfono
                      </h3>
                      <a 
                        href="tel:+17035271779" 
                        className="text-[#2C2C2C] text-lg hover:text-[#8B0000] transition-colors font-medium inline-flex items-center gap-2"
                      >
                        (703) 527-1779
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <p className="text-[#666666] text-sm mt-1">Llámanos de lunes a viernes</p>
                    </div>
                  </div>
                </div>

                {/* Email - Tarjeta Mejorada */}
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#8B0000]/30 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#8B0000] text-xl font-bold mb-2 group-hover:text-[#9B0000] transition-colors">
                        Correo Electrónico
                      </h3>
                      <a 
                        href="mailto:law@islawfirm.com" 
                        className="text-[#2C2C2C] text-lg hover:text-[#8B0000] transition-colors font-medium inline-flex items-center gap-2 break-all"
                      >
                        law@islawfirm.com
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <p className="text-[#666666] text-sm mt-1">Respuesta en menos de 24 horas</p>
                    </div>
                  </div>
                </div>

                {/* Dirección - Tarjeta Mejorada */}
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#8B0000]/30 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#8B0000] text-xl font-bold mb-2 group-hover:text-[#9B0000] transition-colors">
                        Dirección
                      </h3>
                      <p className="text-[#2C2C2C] text-lg font-medium leading-relaxed">
                        3930 Walnut Street #200<br />
                        Fairfax, VA 22030
                      </p>
                      <p className="text-[#666666] text-sm mt-1">Visítanos en nuestra oficina</p>
                    </div>
                  </div>
                </div>

                {/* Horario - Tarjeta Mejorada */}
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#8B0000]/30 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#8B0000] text-xl font-bold mb-2 group-hover:text-[#9B0000] transition-colors">
                        Horario de Atención
                      </h3>
                      <p className="text-[#2C2C2C] text-lg font-medium leading-relaxed">
                        Lunes - Viernes<br />
                        <span className="text-[#8B0000] font-semibold">9:30 AM - 5:30 PM</span>
                      </p>
                      <p className="text-[#666666] text-sm mt-1">Horario de oficina</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Reservar Consulta Mejorado */}
              <div className="pt-4">
                <Link
                  href="/reservar-consulta"
                  className="group relative bg-gradient-to-r from-[#8B0000] to-[#6B0000] hover:from-[#9B0000] hover:to-[#7B0000] text-white font-bold py-5 px-10 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Reservar Consulta</span>
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              </div>
            </div>

            {/* Formulario de Contacto - Diseño Mejorado */}
            <div>
              <div className="mb-8">
                <h2 className="text-[#8B0000] text-4xl md:text-5xl font-serif font-bold mb-4">
                  Envíanos un Mensaje
                </h2>
                <p className="text-[#666666] text-lg leading-relaxed">
                  Completa el formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
                </p>
              </div>
              
              <form className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-100">
                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-[#8B0000] text-base font-bold mb-3 font-sans">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 text-[#2C2C2C] border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all text-base"
                      placeholder="Ingrese su nombre completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[#8B0000] text-base font-bold mb-3 font-sans">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 text-[#2C2C2C] border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all text-base"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className="block text-[#8B0000] text-base font-bold mb-3 font-sans">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 text-[#2C2C2C] border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all text-base"
                      placeholder="(703) 123-4567"
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="asunto" className="block text-[#8B0000] text-base font-bold mb-3 font-sans">
                      Asunto <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 text-[#2C2C2C] border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all text-base appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione un asunto</option>
                      <option value="consulta-general">Consulta General</option>
                      <option value="solicitud-trabajo">Solicitud de Trabajo</option>
                      <option value="permiso-trabajo">Permiso de Trabajo</option>
                      <option value="residencia">Residencia</option>
                      <option value="asilo">Asilo</option>
                      <option value="permiso-estudio">Permiso de Estudio</option>
                      <option value="lesiones-personales">Lesiones Personales</option>
                      <option value="derecho-empresarial">Derecho Empresarial</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className="block text-[#8B0000] text-base font-bold mb-3 font-sans">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={6}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 text-[#2C2C2C] border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all resize-none text-base"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    ></textarea>
                  </div>

                  {/* Botón de envío mejorado */}
                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      className="group relative bg-gradient-to-r from-[#8B0000] to-[#6B0000] hover:from-[#9B0000] hover:to-[#7B0000] text-white font-bold py-5 px-12 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Enviar Mensaje
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </div>

                  {/* Nota legal */}
                  <p className="text-xs md:text-sm text-[#666666] text-center mt-6 font-sans leading-relaxed">
                    Al enviar este formulario, acepta que nos pongamos en contacto con usted. 
                    La comunicación a través de este formulario no crea una relación abogado-cliente.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sección CTA Mejorada */}
      <section className="relative bg-gradient-to-br from-[#8B0000] via-[#7A0000] to-[#6B0000] text-white py-20 md:py-24 lg:py-28 overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center">
          <div className="inline-block mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-semibold">
              Consulta Legal Profesional
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            ¿Necesitas una Consulta Legal?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
            Ofrecemos consultas legales para evaluar tu caso y explicarte tus opciones. Nuestro equipo está listo para ayudarte a navegar el proceso legal con confianza y experiencia.
          </p>
          <Link
            href="/reservar-consulta"
            className="group relative bg-white text-[#8B0000] font-bold py-5 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Reservar una Consulta</span>
            <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/0 via-[#8B0000]/5 to-[#8B0000]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
