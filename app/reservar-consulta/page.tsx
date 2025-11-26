'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ReservarConsulta() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const mensaje = formData.get('mensaje') as string || 'Sin mensaje adicional';
    
    // Formatear mensaje para WhatsApp
    const whatsappMessage = `*Reserva de Consulta*\n\n` +
      `*Nombre:* ${nombre}\n` +
      `*Email:* ${email}\n` +
      `*Teléfono:* ${telefono}\n` +
      `*Mensaje:* ${mensaje}`;
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/18047083837?text=${encodedMessage}`;
    
    // Redirigir a WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Resetear después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5E6E6]">
      {/* Modal/Overlay del Formulario */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8 lg:p-10">
              {/* Encabezado */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-[#8B0000] text-2xl md:text-3xl font-serif font-bold">
                  Reservar Consulta
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mensaje informativo */}
              <div className="bg-[#F5F0E8] border-l-4 border-[#8B0000] p-4 mb-6 rounded-r-lg">
                <p className="text-[#2C2C2C] text-sm md:text-base leading-relaxed font-sans">
                  <strong className="text-[#8B0000]">Información importante:</strong> Su solicitud será enviada a nuestra central de atención. Nuestro equipo se pondrá en contacto con usted en un plazo máximo de 24 horas para confirmar su consulta y proporcionarle los detalles adicionales.
                </p>
              </div>

              {/* Formulario */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Ingrese su nombre completo"
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

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                      placeholder="(703) 123-4567"
                    />
                  </div>

                  {/* Mensaje opcional */}
                  <div>
                    <label htmlFor="mensaje" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all resize-none"
                      placeholder="Cuéntanos brevemente sobre tu caso o consulta..."
                    ></textarea>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#8B0000] hover:bg-[#9B0000] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#2C2C2C] font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[#8B0000] text-xl md:text-2xl font-serif font-bold mb-4">
                    ¡Solicitud Enviada!
                  </h3>
                  <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans">
                    Gracias por contactarnos. Hemos recibido su solicitud y nuestro equipo se pondrá en contacto con usted en menos de 24 horas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Primera Sección - Tarjetas de Abogados */}
      <section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Tarjeta 1 - Ismail Shahtakhtinski */}
            <div className="flex flex-col md:flex-row items-start gap-0">
              {/* Imagen a la izquierda */}
              <div className="relative w-full md:w-80 lg:w-96 h-[400px] md:h-[500px] flex-shrink-0">
                <Image
                  src="/images/abogadojef.avif"
                  alt="Ismail Shahtakhtinski"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tarjeta de texto a la derecha */}
              <div className="bg-white border-2 border-[#8B0000] rounded-none md:rounded-r-lg p-6 md:p-8 flex-1 w-full md:w-auto">
                <h2 className="text-[#8B0000] text-2xl md:text-3xl font-bold font-serif mb-4">
                  Consulta legal
                </h2>
                <p className="text-[#666666] text-base md:text-lg mb-4">
                  Consulta telefónica/en línea con <span className="font-semibold">Ismail Shahtakhtinski, Esq.</span>
                </p>
                <div className="border-t border-[#CCCCCC] my-4"></div>
                <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-6">
                  El abogado Ismail Shahtakhtinski es el fundador y abogado principal de I.S. Law Firm, PLLC. Con amplia experiencia en derecho de inmigración, lesiones personales y derecho comercial, asesora y representa a empresas estadounidenses, corporaciones internacionales e individuos en asuntos legales complejos.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-center w-full md:w-auto"
                >
                  Reservar Consulta
                </button>
              </div>
            </div>

            {/* Tarjeta 2 - Furkan Bayraktar */}
            <div className="flex flex-col md:flex-row items-start gap-0">
              {/* Imagen a la izquierda */}
              <div className="relative w-full md:w-80 lg:w-96 h-[400px] md:h-[500px] flex-shrink-0">
                <Image
                  src="/images/abogadoleg.jpeg"
                  alt="Furkan Bayraktar"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tarjeta de texto a la derecha */}
              <div className="bg-white border-2 border-[#8B0000] rounded-none md:rounded-r-lg p-6 md:p-8 flex-1 w-full md:w-auto">
                <h2 className="text-[#8B0000] text-2xl md:text-3xl font-bold font-serif mb-4">
                  Consulta legal
                </h2>
                <p className="text-[#666666] text-base md:text-lg mb-4">
                  Consulta telefónica/en línea con <span className="font-semibold">Furkan Bayraktar, Esq.</span>
                </p>
                <div className="border-t border-[#CCCCCC] my-4"></div>
                <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-6">
                  Furkan tiene una sólida experiencia en derechos humanos y leyes de inmigración con un enfoque en asilo, defensa de deportación y defensa de notificación roja de Interpol. Antes de su experiencia con el bufete de abogados I.S., Furkan participó en proyectos de voluntariado en los que ayudó a los clientes con sus solicitudes de ayuda humanitaria.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-center w-full md:w-auto"
                >
                  Reservar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section id="preguntas" className="w-full py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center mb-12 md:mb-16">
            ¿Cómo reservar una consulta?
          </h2>

          <div className="space-y-10 md:space-y-12">
            {/* Pregunta 1 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Cómo funciona la reserva de una consulta?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Se le dará un enlace seguro a través de nuestro sistema de administración de casos donde puede elegir una fecha y hora disponibles, procesar el pago en línea y reservar su consulta. El calendario se basa en el orden de llegada y la disponibilidad de nuestro abogado. El abogado se comunicará con usted en la fecha y hora de su consulta. Si tiene alguna pregunta, puede enviarnos un correo electrónico a admin@islawfirm.com.co.
              </p>
            </div>

            {/* Pregunta 2 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Cuánto es una tarifa de consulta?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Las consultas cuestan entre $ 200 y $ 350.00, dependiendo del abogado específico que elija para su consulta legal. Si contrata a nuestro bufete de abogados para manejar su caso después de la consulta, la tarifa de consulta se deducirá del costo total de los honorarios legales.
              </p>
            </div>

            {/* Pregunta 3 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Qué es una consulta legal?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Se está reuniendo con un abogado de inmigración con experiencia que lo acompañará paso a paso a través de su problema legal y le brindará un sólido asesoramiento legal sobre cómo proceder. El abogado revisará los hechos de su caso, responderá cualquier pregunta que pueda tener, discutirá los méritos de su caso y le aconsejará el resultado probable realista, para que conozca sus opciones sobre la mejor manera de proceder con su caso.
              </p>
            </div>

            {/* Pregunta 4 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Es en línea, por teléfono o en persona?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Todas las consultas se ofrecen por teléfono o en línea a través de videoconferencia. Puede indicar su preferencia, al momento de programar su consulta. Representamos a clientes en todo Estados Unidos y en todo el mundo. Nuestra oficina está equipada con tecnología avanzada para administrar todas las aplicaciones en línea y realizar todas las reuniones necesarias de forma remota a través de video y telecomunicaciones. En nuestro compromiso con la comodidad y la eficiencia, hemos eliminado la necesidad de que viaje o haga un esfuerzo adicional. Nos conectaremos sin problemas con usted a través de varios medios digitales, ya sea videoconferencia o llamadas telefónicas. Puede compartir cómodamente sus documentos con nosotros a través del portal de escaneo seguro y el correo electrónico. Este enfoque moderno le garantiza un tiempo precioso sin dejar de recibir un excelente apoyo legal. ¡Esperamos trabajar con usted en su viaje de inmigración!
              </p>
            </div>

            {/* Pregunta 5 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Cuánto dura una consulta?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Estamos comprometidos a brindar consultas integrales y personalizadas para abordar sus inquietudes legales únicas. La tarifa de consulta es una tarifa plana, diseñada para su conveniencia y no está sujeta a limitaciones de tiempo. Nos esforzamos por resolver todas sus consultas dentro de la reunión programada inicialmente. Nuestras consultas se reservan en el calendario por hasta una hora, pero a menudo toman menos. Sin embargo, si su consulta se extiende más allá de una hora debido a la complejidad del caso, es posible que debamos extender nuestra conversación a través de una llamada de seguimiento o un correo electrónico.
              </p>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed mt-4">
                Recuerde, nuestro objetivo principal es brindarle una comprensión profunda de su situación legal, equipándolo con el conocimiento necesario para tomar las decisiones más informadas. Su satisfacción es nuestra máxima prioridad y esperamos poder ayudarlo.
              </p>
            </div>

            {/* Pregunta 6 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Qué sigue después de reservar una consulta?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Recibirá un mensaje de texto o correo electrónico de confirmación. Debe tomarse el tiempo para organizar y reunir documentos importantes, de modo que esté preparado para responder cualquier pregunta que el abogado pueda tener sobre su caso.
              </p>
            </div>

            {/* Pregunta 7 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Qué pasa si necesito reprogramar?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Si necesita reprogramar su consulta por cualquier motivo, puede usar el enlace en el correo electrónico de confirmación para programar o comunicarse con nuestra oficina lo antes posible. Hay muchas personas que están esperando que sus casos sean consultados con nuestro abogado y cuanto antes tengamos noticias suyas, podemos abrir el lugar a otras personas que necesitan urgentemente una consulta, especialmente si hay plazos legales involucrados.
              </p>
            </div>

            {/* Pregunta 8 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Puedo obtener un reembolso si el abogado determina que no tengo un buen caso?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Por lo general, no hay reembolso por una consulta. Nuestro abogado responderá a todas sus preguntas en función de su experiencia y conocimientos. Tendrá una mejor comprensión de sus opciones y cuáles son los posibles próximos pasos a seguir (o no tomar) en su caso. También puede recibir una respuesta de que no se puede hacer nada en su caso debido a la falta de disponibilidad de visas u otras razones. Sin embargo, conocer y confirmar esto puede ser un paso importante en su caso de inmigración.
              </p>
            </div>

            {/* Pregunta 9 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Qué pasa si olvidé preguntar algo o tengo preguntas de seguimiento?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Su tarifa de consulta incluye cualquier pregunta de seguimiento dentro de los 2 días hábiles posteriores a su consulta, siempre que las nuevas preguntas se relacionen con el mismo asunto. Para cualquier asunto nuevo o asesoramiento legal posterior, deberá programar otra consulta. Para recordarle, su tarifa de consulta, incluso si tiene varias consultas, se aplica como un crédito para (deducido de) honorarios legales futuros si contrata a nuestra firma para manejar el asunto sobre el cual recibió su consulta.
              </p>
            </div>

            {/* Pregunta 10 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Pueden varias personas reservar una consulta?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Generalmente, cada persona debe reservar una consulta por separado. Hacemos excepciones en algunas circunstancias si los dos casos son muy similares o están estrechamente relacionados. Si desea verificar, comuníquese con nuestra oficina.
              </p>
            </div>

            {/* Pregunta 11 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Puede el abogado revisar los formularios de inmigración que preparé y ayudarme a presentar mi propio caso?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                No podemos revisar ni aprobar los formularios que preparó por su cuenta. Tampoco se nos permite ayudarlo a representarse a sí mismo. Las obligaciones éticas no permiten que los abogados ayuden a las personas que no son abogados a preparar documentos legales. Si decide contratar a nuestra firma para representar su caso, debe dar su consentimiento para la representación del abogado en su caso y firmar un acuerdo de honorarios.
              </p>
            </div>

            {/* Pregunta 12 */}
            <div>
              <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-serif mb-4">
                ¿Dónde está su oficina?
              </h3>
              <p className="text-[#000000] text-base md:text-lg leading-relaxed">
                Representamos a clientes en todo Estados Unidos y en todo el mundo. Nuestra oficina está equipada con tecnología avanzada para administrar todas las aplicaciones en línea y realizar todas las reuniones necesarias de forma remota a través de video y telecomunicaciones. En nuestro compromiso con la comodidad y la eficiencia, hemos eliminado la necesidad de que viaje o haga un esfuerzo adicional. Nos conectaremos sin problemas con usted a través de varios medios digitales, ya sea videoconferencia o llamadas telefónicas. Puede compartir cómodamente sus documentos con nosotros a través del portal de escaneo seguro y el correo electrónico. Este enfoque moderno le garantiza un tiempo precioso sin dejar de recibir un excelente apoyo legal. Puede utilizar este enlace para programar una consulta por video/teleconsulta con nosotros: Consulta telefónica/en línea | I.S. Law Firm, PLLC. Esperamos trabajar con usted en su viaje de inmigración.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

