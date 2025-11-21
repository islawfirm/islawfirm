import Image from 'next/image';
import Link from 'next/link';

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white">
      {/* Primera Sección - Dos Columnas */}
      <section className="w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
            {/* Columna izquierda - Imagen */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src="/images/law.avif"
                alt="I.S. Law Firm"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Columna derecha - Texto */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-[#8B0000] text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
                Acerca de I.S. Law Firm
              </h1>
              <h2 className="text-[#8B0000] text-xl md:text-2xl lg:text-3xl font-serif font-light italic">
                Attorneys at Law
              </h2>
              
              <div className="space-y-6 text-[#000000] text-base md:text-lg leading-relaxed">
                <p>
                  Fundado por el abogado Ismail Shahtakhtinski, el bufete de abogados I.S. está estructurado para brindar excelentes servicios legales con atención individual a las necesidades específicas de todos y cada uno de los clientes, todo al costo más razonable. Hemos ayudado a miles a emigrar a los Estados Unidos, establecer negocios en los Estados Unidos y obtener una compensación por sus lesiones.
                </p>
                
                <p>
                  Nuestros abogados trabajan en estrecha colaboración con personal de apoyo multilingüe experimentado para lograr el resultado más favorable para nuestros clientes. Hablamos inglés, español, coreano, turco, ruso, ucraniano, amárico y azerbaiyano.
                </p>
                
                <p>
                  Nuestra firma se basa en algo más que el conocimiento legal: se basa en las personas. Entendemos que detrás de cada caso hay una vida, un desafío y una historia que merece ser escuchada. Es por eso que nos acercamos a cada cliente con mano firme, una mente aguda y una presencia tranquila y enfocada.
                </p>
                
                <p>
                  Ya sea en la sala del tribunal o en la mesa de negociaciones, nunca perdemos de vista lo que más importa: su confianza, su futuro y su voz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Banner Horizontal */}
      <section className="w-full bg-[#8B0000] py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-sans leading-tight mb-4">
              Permítanos ser su ancla legal en
              <br />
              cada paso del camino.
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-sans font-normal">
              Defensa de confianza. Resultados probados.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Equipo - Dos Columnas */}
      <section className="w-full bg-[#F5F0E8]">
        {/* Encabezado de la sección */}
        <div className="bg-white w-full py-8 md:py-10 px-6 md:px-10 lg:px-16">
          <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-3">
            Personas en las que puedes confiar.
          </h2>
          <Link href="#equipo" className="text-[#8B0000] text-base md:text-lg underline hover:no-underline transition-all inline-block">
            Conoce a nuestro equipo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Columna Izquierda - Fondo Blanco */}
          <div className="bg-white w-full py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-16 flex flex-col">
            {/* Perfil Ismail */}
            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-6">
                <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src="/images/ismail.avif"
                    alt="Ismail T. Shahtakhtinski"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-sans mb-2">
                    Ismail T. Shahtakhtinski, Esq.
                  </h3>
                  <p className="text-[#8B0000] text-base md:text-lg font-bold font-sans">
                    Fundador y Abogado Principal
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[#000000] text-sm md:text-base leading-relaxed">
                <p>
                  El Sr. Shahtakhtinski ha desarrollado experiencia en una amplia gama de asuntos civiles, incluida la ley de inmigración, lesiones personales, cobertura de seguros y litigios. En el pasado, el Sr. Shahtakhtinski representó a varias empresas del área de Washington, DC, corporaciones internacionales, gobiernos extranjeros e individuos en sus asuntos legales.
                </p>
                <p>
                  A lo largo de muchos años de su práctica legal, Ismail representó a numerosos solicitantes de asilo de varias partes del mundo, incluidos disidentes cuyo gobierno emitió notificaciones rojas falsas de Interpol debido a sus opiniones políticas. El abogado Shahtakhtinski es invitado con frecuencia como panelista a foros y conferencias sobre asuntos relacionados con las leyes de inmigración de los Estados Unidos, las leyes internacionales y los derechos humanos. A menudo es entrevistado por varios medios de comunicación estadounidenses e internacionales sobre la evolución de las leyes estadounidenses.
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Fondo Beige */}
          <div className="bg-[#F5F0E8] w-full py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-16 flex flex-col">
            {/* Perfil Furkan */}
            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-6">
                <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src="/images/furkan.avif"
                    alt="Furkan Bayraktar"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-[#8B0000] text-xl md:text-2xl font-bold font-sans mb-2">
                    Furkan Bayraktar, Abogado Esq.
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-[#000000] text-sm md:text-base leading-relaxed">
                <p>
                  El abogado Furkan se graduó del programa de Maestría en Derecho (LL.M.) en la Facultad de Derecho Northwestern Pritzker y tiene licencia para ejercer la abogacía en el estado de Connecticut. Furkan tiene una sólida experiencia en derechos humanos y leyes de inmigración con un enfoque en asilo, defensa de deportación y defensa de notificación roja de Interpol. Antes de su experiencia con el bufete de abogados I.S., Furkan participó en proyectos de voluntariado en los que ayudó a los clientes con sus solicitudes de ayuda humanitaria.
                </p>
                <p>
                  Tuvo más oportunidades de poner a prueba sus conocimientos y habilidades cuando fue seleccionado para representar a su universidad en el Concurso de Tribunales Simulados de Derecho Internacional sobre Migración y Refugiados de 2022, en el que su equipo recibió el Premio al Mejor Escrito de Alegatos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="w-full bg-[#8B0000] py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-8 md:mb-12 text-center">
            ¿Quieres contactarte con nosotros?
          </h2>

          <form className="space-y-6">
            {/* Campo Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-white text-sm md:text-base font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-[#000000] placeholder-[#666666] border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="Ingrese su nombre"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm md:text-base font-semibold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-[#000000] placeholder-[#666666] border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="Ingrese su correo electrónico"
              />
            </div>

            {/* Campo Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-white text-sm md:text-base font-semibold mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full px-4 py-3 rounded-lg bg-white text-[#000000] placeholder-[#666666] border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="Ingrese su número de teléfono"
              />
            </div>

            {/* Campo Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-white text-sm md:text-base font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-[#000000] placeholder-[#666666] border-none focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                placeholder="Escriba su mensaje aquí"
              ></textarea>
            </div>

            {/* Botón Enviar */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-[#8B0000] font-semibold py-4 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

