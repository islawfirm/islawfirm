import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section con imagen de fondo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/familiamigrante.jpg"
            alt="Familia migrante"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Contenido de texto */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            SUS ABOGADOS DE CONFIANZA
            <br />
            <span className="text-yellow-300">EN CADA PASO ADELANTE</span>
        </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/95 font-light tracking-wide">
            HACEN REALIDAD SU SUEÑO AMERICANO
          </p>
        </div>
      </section>

      {/* Sección Informativa */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <p className="text-[#8B0000] text-lg md:text-xl lg:text-2xl leading-relaxed text-center mb-10 font-serif font-light">
            Fundado por el abogado Ismail Shahtakhtinski, el bufete de abogados I.S. está estructurado para brindar excelentes servicios legales con atención individual a las necesidades específicas de todos y cada uno de los clientes, todo al costo más razonable. Hemos ayudado a miles a emigrar a los Estados Unidos, establecer negocios en los Estados Unidos y obtener una compensación por sus lesiones. Nuestros abogados trabajan en estrecha colaboración con personal de apoyo multilingüe experimentado para lograr el resultado más favorable para nuestros clientes. Hablamos inglés, español, coreano, turco, ruso, ucraniano, amárico y azerbaiyano.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/sobre-nosotros"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-4 px-10 rounded-lg text-lg md:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Aprender más
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Inmigración */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-56 h-56 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src="/images/inmigracion.avif"
                  alt="Inmigración"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold font-serif mb-5">
                Inmigración
              </h3>
              <Link 
                href="/servicios/inmigracion" 
                className="text-[#8B0000] underline hover:text-[#8B0000] transition-colors text-base md:text-lg leading-relaxed max-w-xs"
              >
                Haga clic aquí para obtener más información sobre los servicios de inmigración.
              </Link>
            </div>

            {/* Lesiones Personales */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-56 h-56 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src="/images/lesiones.avif"
                  alt="Lesiones personales"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold font-serif mb-5">
                Lesiones personales
              </h3>
              <Link 
                href="/servicios/lesiones-personales" 
                className="text-[#8B0000] underline hover:text-[#8B0000] transition-colors text-base md:text-lg leading-relaxed max-w-xs"
              >
                Haga clic aquí para obtener más información sobre los servicios de lesiones personales.
              </Link>
            </div>

            {/* Derecho Empresarial */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-56 h-56 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src="/images/derecho.avif"
                  alt="Derecho Empresarial"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold font-serif mb-5">
                Derecho Empresarial
              </h3>
              <Link 
                href="/servicios/derecho-empresarial" 
                className="text-[#8B0000] underline hover:text-[#8B0000] transition-colors text-base md:text-lg leading-relaxed max-w-xs"
              >
                Haga clic aquí para obtener más información sobre los servicios de derecho comercial.
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Conócenos */}
      <section className="bg-white w-full py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-7xl mx-auto items-start">
            {/* Imagen a la izquierda */}
            <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/10 to-transparent rounded-2xl"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8B0000]/20">
                <Image
                  src="/images/señor.avif"
                  alt="I. Shahtakhtinski"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Contenido de texto a la derecha */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Título y subtítulo */}
              <div className="space-y-4">
                <div className="inline-block mb-2">
                  <span className="text-[#8B0000] text-sm md:text-base font-semibold uppercase tracking-wider font-sans">
                    Sobre Nosotros
                  </span>
                </div>
                <h2 className="text-[#8B0000] text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  Conócenos
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#8B0000] to-[#9B0000]"></div>
                <h3 className="text-[#8B0000] text-2xl md:text-3xl lg:text-4xl font-serif font-light italic pt-2">
                  Representación excepcional
                </h3>
              </div>
              
              {/* Texto descriptivo */}
              <div className="space-y-6 text-[#2C2C2C] text-base md:text-lg leading-[1.8] font-sans">
                <p className="text-justify">
                  Nuestro enfoque es personal y tenemos más de 20 años de experiencia legal combinada. No somos un bufete de abogados basado en el volumen; No solo presentamos documentos y seguimos adelante. Profundizamos en la historia de cada cliente, a menudo descubriendo opciones legales que no sabían que tenían. Cada caso se adapta a la situación única del cliente. También creo que nuestra diversidad nos da una ventaja, somos un equipo multilingüe y multicultural, y entendemos lo que significa construir una nueva vida en un nuevo país.
                </p>
                
                <p className="text-justify">
                  Nos enorgullecemos de la diversidad de nuestro equipo, que incluye profesionales de todo el mundo. Nuestro personal habla una amplia gama de idiomas, lo que refleja la naturaleza global de nuestros clientes y aporta ricas perspectivas culturales al trabajo que hacemos. Esta diversidad es más que un punto de orgullo; Es una fortaleza que nos ayuda a comprender, comunicarnos y defender mejor a las personas a las que servimos. Ya sea a través del idioma, la experiencia vivida o la sensibilidad cultural, nuestro equipo está equipado para conectarse con los clientes a un nivel profundamente humano.
                </p>
              </div>

              {/* Firma */}
              <div className="pt-6 border-t border-[#8B0000]/20">
                <p className="text-[#8B0000] text-xl md:text-2xl font-serif font-semibold tracking-wide">
                  I. Shahtakhtinski
                </p>
                <p className="text-[#666666] text-sm md:text-base font-sans mt-1">
                  Fundador y Abogado Principal
                </p>
              </div>

              {/* Botón Leer más */}
              <div className="pt-4">
                <Link
                  href="/sobre-nosotros"
                  className="bg-[#8B0000] hover:bg-[#8B0000] text-white font-semibold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3 group"
                >
                  <span>Leer más</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="bg-white w-full py-12 md:py-16 lg:py-20">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Encabezado de la sección */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block mb-2">
              <span className="text-[#8B0000] text-xs md:text-sm font-semibold uppercase tracking-wider font-sans">
                Actualidad Legal
              </span>
            </div>
            <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3">
              Noticias
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#8B0000] to-[#9B0000] mx-auto"></div>
          </div>

          {/* Grid de noticias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Noticia 1 */}
            <Link href="/noticias" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/images/cierre.avif"
                    alt="Noticia sobre cierre"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-[#8B0000] text-xs font-semibold uppercase tracking-wide">
                      Actualidad
                    </span>
                  </div>
                  <h3 className="text-[#8B0000] text-lg md:text-xl font-serif font-bold mb-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                    Noticia Legal
                  </h3>
                  <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
                    Manténgase informado sobre las últimas actualizaciones legales y cambios en la legislación que pueden afectar su caso.
                  </p>
                  <div className="flex items-center text-[#8B0000] font-semibold text-sm group-hover:text-[#8B0000] transition-colors">
                    <span>Leer más</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Noticia 2 */}
            <Link href="/noticias" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/images/proclamacion.avif"
                    alt="Noticia sobre proclamación"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-[#8B0000] text-xs font-semibold uppercase tracking-wide">
                      Actualidad
                    </span>
                  </div>
                  <h3 className="text-[#8B0000] text-lg md:text-xl font-serif font-bold mb-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                    Noticia Legal
                  </h3>
                  <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
                    Manténgase informado sobre las últimas actualizaciones legales y cambios en la legislación que pueden afectar su caso.
                  </p>
                  <div className="flex items-center text-[#8B0000] font-semibold text-sm group-hover:text-[#8B0000] transition-colors">
                    <span>Leer más</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Noticia 3 */}
            <Link href="/noticias" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/images/pago.avif"
                    alt="Noticia sobre pago"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-[#8B0000] text-xs font-semibold uppercase tracking-wide">
                      Actualidad
                    </span>
                  </div>
                  <h3 className="text-[#8B0000] text-lg md:text-xl font-serif font-bold mb-2 group-hover:text-[#8B0000] transition-colors line-clamp-2">
                    Noticia Legal
                  </h3>
                  <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
                    Manténgase informado sobre las últimas actualizaciones legales y cambios en la legislación que pueden afectar su caso.
                  </p>
                  <div className="flex items-center text-[#8B0000] font-semibold text-sm group-hover:text-[#8B0000] transition-colors">
                    <span>Leer más</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Áreas de Práctica */}
      <section className="bg-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] md:min-h-[700px]">
          {/* Columna izquierda - Texto con fondo rojizo */}
          <div className="bg-[#8B0000] w-full py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-16 flex flex-col justify-center">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-sans mb-10 md:mb-12 leading-tight">
              Nuestras Áreas de
              <br />
              <span className="pl-0 md:pl-4">Práctica</span>
            </h2>

            <div className="space-y-8 md:space-y-10 mb-10 md:mb-12">
              {/* Inmigración */}
              <div>
                <h3 className="text-white text-xl md:text-2xl font-bold font-sans mb-3 md:mb-4">
                  Inmigración
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed font-sans font-normal">
                  I.S. Law Firm tiene experiencia en todas las áreas de la ley de inmigración. Nuestra experiencia nos ha enseñado que trabajar en estrecha colaboración con nuestros clientes durante todo el proceso de inmigración es esencial para evitar errores y garantizar la finalización exitosa de sus solicitudes lo más rápido posible.
                </p>
              </div>

              {/* Derecho Empresarial */}
              <div>
                <h3 className="text-white text-xl md:text-2xl font-bold font-sans mb-3 md:mb-4">
                  Derecho Empresarial
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed font-sans font-normal">
                  Nuestros clientes acuden a nosotros no solo porque somos defensores entusiastas y experimentados, sino porque estamos realmente comprometidos a ayudar a las pequeñas empresas. Creemos que las pequeñas empresas son vitales para el crecimiento y desarrollo de la comunidad, y entendemos que las empresas exitosas requieren ayuda legal experta. Es por eso que ofrecemos servicios legales integrales adaptados a las necesidades individuales.
                </p>
              </div>

              {/* Lesiones personales */}
              <div>
                <h3 className="text-white text-xl md:text-2xl font-bold font-sans mb-3 md:mb-4">
                  Lesiones personales
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed font-sans font-normal">
                  El bufete de abogados I.S. ofrece una excelente representación legal para todo tipo de casos de lesiones personales, incluidos accidentes automovilísticos, lesiones en alta mar / marineros, resbalones y caídas y casos de responsabilidad de locales. Podemos ayudarlo a obtener la compensación que merece por sus lesiones.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-full">
            <Image
              src="/images/charla.avif"
              alt="Áreas de práctica"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24 pb-0">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Título */}
          <h2 className="text-[#8B0000] text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-12 md:mb-16 text-center">
            Con la confianza de los clientes
          </h2>

          {/* Grid de dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Columna izquierda - Fondo blanco */}
            <div className="bg-white w-full py-10 md:py-12 lg:py-16 px-6 md:px-10 lg:px-12">
              <div className="space-y-10 md:space-y-12">
                {/* Testimonio 1 */}
                <div>
                  <p className="text-[#333333] text-base md:text-lg leading-relaxed italic mb-4 font-serif">
                    "Estoy agradecido con Ismail y su equipo, me apoyaron en cada paso de todo el proceso. Son receptivos, profesionales y, lo que es más importante, tienen una profunda experiencia en el área de inmigración. Los recomiendo encarecidamente a cualquiera que se ocupe de problemas de inmigración. En el futuro trabajaré con ellos con confianza".
                  </p>
                  <p className="text-[#666666] text-sm md:text-base font-sans">
                    — Apoyo excepcional a la inmigración
                  </p>
                </div>

                {/* Testimonio 2 */}
                <div>
                  <p className="text-[#333333] text-base md:text-lg leading-relaxed italic mb-4 font-serif">
                    "He estado trabajando con Ismail y su increíble equipo durante unos dos años y gracias a ellos. Obtuve mi tarjeta verde hace un mes. En primer lugar, lo que más me satisface es que puedo llegar a ellos constantemente y obtener una respuesta inmediata. Cuando era necesario, obtenía una respuesta fuera del trabajo, lo cual era muy importante para mí. Aunque a veces hay detalles finos en mi caso, Ismail me guió de la manera más correcta, le estoy muy agradecido a él y a su equipo. Me alegro de haber trabajado con ellos".
                  </p>
                  <p className="text-[#666666] text-sm md:text-base font-sans">
                    — Adquisición exitosa de la tarjeta verde
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha - Fondo beige/rosado */}
            <div className="bg-[#F5F0E8] w-full py-10 md:py-12 lg:py-16 px-6 md:px-10 lg:px-12">
              <div className="space-y-10 md:space-y-12">
                {/* Testimonio 3 */}
                <div>
                  <p className="text-[#333333] text-base md:text-lg leading-relaxed italic mb-4 font-serif">
                    "La comunicación fue genial | nunca tuve una pregunta sin respuesta. El proceso para mi naturalización fue sencillo y no tomó más de 6 meses, no tenía tarifas ocultas, todo fue sencillo. Hildana fue increíble, así que estuvo disponible siempre que necesite respuestas a alguna pregunta, realmente aprecio trabajar con el bufete de abogados I.S, definitivamente lo recomendaría a cualquiera que esté buscando comenzar su proceso de naturalización".
                  </p>
                  <p className="text-[#666666] text-sm md:text-base font-sans">
                    — Gran experiencia trabajando con el bufete de abogados I.S.
                  </p>
                </div>

                {/* Testimonio 4 */}
                <div>
                  <p className="text-[#333333] text-base md:text-lg leading-relaxed italic mb-4 font-serif">
                    "Un equipo de abogados amables y competentes en el que todos pueden confiar. Un alto grado de profesionalismo y un excelente manejo de casos exigentes, especialmente a través de ER y auditorías complicadas. Brillante representación a través del largo proceso de Certificación Laboral y PERM. Tener el conocimiento, la experiencia y el gran esfuerzo para lograr resultados positivos. Muy agradecido".
                  </p>
                  <p className="text-[#666666] text-sm md:text-base font-sans">
                    — Abogados confiables y profesionales
        </p>
      </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Suscripción */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-0">
          {/* Columna izquierda - Imagen de fondo */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/abogado.avif"
              alt="Abogado"
              fill
              className="object-cover"
            />
          </div>

          {/* Columna derecha - Formulario de suscripción */}
          <div className="bg-white w-full py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-12 flex flex-col justify-center">
            <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8">
              Subscribir
            </h2>

            <form className="space-y-6">
              {/* Campo de correo */}
              <div>
                <label htmlFor="email" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingrese su correo electrónico"
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] text-[#8B0000] placeholder-[#8B0000]/60 border-none focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all"
                />
              </div>

              {/* Descripción */}
              <p className="text-[#8B0000] text-sm md:text-base leading-relaxed">
                ¡Sé el primero en conocer nuestras novedades! Una vez al mes, conocerás nuestras últimas funciones y las últimas noticias. Y nada de spam, por supuesto.
              </p>

              {/* Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="mt-1 w-5 h-5 text-[#8B0000] border-2 border-[#8B0000] rounded focus:ring-2 focus:ring-[#8B0000]/30"
                />
                <label htmlFor="newsletter" className="text-[#8B0000] text-sm md:text-base cursor-pointer">
                  Sí, suscríbeme a tu newsletter.
                </label>
              </div>

              {/* Botón Enviar */}
              <button
                type="submit"
                className="w-full bg-[#8B0000] hover:bg-[#8B0000] text-white font-semibold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Botón Flotante Reservar Consulta */}
      <Link
        href="/reservar-consulta"
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-4 px-6 md:py-5 md:px-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 group"
      >
        <span className="text-base md:text-lg">Reservar Consulta</span>
        <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

