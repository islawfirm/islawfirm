'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InmigracionPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Green Card');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string || 'No proporcionado';
    const asunto = formData.get('asunto') as string;
    const mensaje = formData.get('mensaje') as string;
    
    // Formatear mensaje para WhatsApp
    const whatsappMessage = `*Formulario de Inmigración*\n\n` +
      `*Nombre:* ${nombre}\n` +
      `*Email:* ${email}\n` +
      `*Teléfono:* ${telefono}\n` +
      `*Asunto:* ${asunto}\n` +
      `*Mensaje:* ${mensaje}`;
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/18047083837?text=${encodedMessage}`;
    
    // Redirigir a WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const faqsByCategory = {
    'Inmigración': [
      {
        question: "Soy ciudadano estadounidense y presenté una petición por mi hermano y su familia. La petición es aprobada y el caso se encuentra ahora en el NVC. ¿Es posible acelerar el proceso del NVC?",
        answer: "Sí, en ciertas circunstancias es posible solicitar la aceleración del procesamiento en el Centro Nacional de Visas (NVC). Las razones válidas incluyen emergencias médicas graves, situaciones humanitarias urgentes, o intereses gubernamentales significativos. Sin embargo, el NVC tiene criterios estrictos para aprobar solicitudes de aceleración. Es importante proporcionar documentación sólida que respalde su solicitud. Nuestro bufete puede ayudarle a evaluar si su caso califica para una aceleración y preparar la documentación necesaria."
      },
      {
        question: "¿Cómo puedo agilizar el proceso de inmigración para mi madre, que tiene problemas de salud?",
        answer: "Si su madre tiene problemas de salud graves, puede solicitar una aceleración del proceso de inmigración basada en razones humanitarias o médicas. Necesitará documentación médica detallada de un médico que explique la condición, el tratamiento necesario, y por qué es urgente que esté en Estados Unidos. También puede solicitar una exención médica si es necesario. Nuestro bufete puede ayudarle a preparar una solicitud de aceleración bien fundamentada con toda la documentación médica necesaria."
      },
      {
        question: "¿Cómo cambio mi estatus de Au Pair J-1 a estudiante F-1?",
        answer: "Para cambiar de estatus de J-1 a F-1, primero debe verificar si su visa J-1 tiene la restricción de residencia de dos años. Si no tiene esta restricción, puede presentar el Formulario I-539 (Solicitud para Extender/Cambiar Estatus de No Inmigrante) antes de que expire su estatus J-1 actual. Necesitará una carta de aceptación de una institución educativa acreditada (Formulario I-20), prueba de fondos financieros suficientes, y mantener su estatus J-1 hasta que se apruebe el cambio. Es importante presentar la solicitud con suficiente anticipación."
      },
      {
        question: "¿Qué ocurre si tengo un visado K-1, me caso durante los 90 días, pero no presento la solicitud dentro de las fechas de mi estatus?",
        answer: "Si tiene una visa K-1 (prometido/a) y se casa dentro de los 90 días pero no presenta el Formulario I-485 (Ajuste de Estatus) antes de que expire su estatus K-1, estará fuera de estatus. Esto puede resultar en la acumulación de presencia ilegal, lo que puede afectar su elegibilidad para ajuste de estatus y puede resultar en barras de reingreso. Es crucial presentar el I-485 lo antes posible después del matrimonio, preferiblemente antes de que expire el estatus K-1. Si ya está fuera de estatus, consulte inmediatamente con un abogado de inmigración."
      },
      {
        question: "¿Se retrasará mi caso de inmigración debido a un cierre del gobierno?",
        answer: "Sí, los cierres del gobierno federal pueden afectar el procesamiento de casos de inmigración. Durante un cierre, las agencias como USCIS, el Departamento de Estado y las cortes de inmigración pueden operar con personal limitado o cerrar completamente. Esto puede resultar en retrasos en el procesamiento de solicitudes, cancelación de citas, y posponimiento de audiencias. Sin embargo, algunos servicios pueden continuar si están financiados por tarifas. Los tiempos de procesamiento generalmente se extienden después de un cierre. Es importante monitorear los comunicados oficiales de las agencias durante estos períodos."
      },
      {
        question: "¿Es cierto que la prohibición de inmigración de 3 o 10 años no se aplica a los visados J-1 o F-1?",
        answer: "No es completamente cierto. La prohibición de 3 o 10 años (barra de inadmisibilidad) se aplica cuando una persona acumula presencia ilegal en Estados Unidos y luego sale del país. Si tiene una visa J-1 o F-1 válida y mantiene su estatus, no acumula presencia ilegal. Sin embargo, si viola su estatus (por ejemplo, trabajando sin autorización o no asistiendo a clases en el caso de F-1), comenzará a acumular presencia ilegal. Una vez que acumule más de 180 días o 1 año de presencia ilegal y salga de EE.UU., puede activarse la barra de 3 o 10 años, independientemente del tipo de visa que tenía originalmente."
      },
      {
        question: "Entré en Estados Unidos con un visado de inmigrante, ¿necesito solicitar el ajuste de mi estatus para recibir la green card?",
        answer: "No, si entró a Estados Unidos con un visado de inmigrante (como una visa IR-1, CR-1, F-1 familiar, etc.), ya fue admitido como residente permanente condicional o permanente. No necesita ajustar su estatus. Su tarjeta de residencia permanente (green card) debería ser enviada automáticamente por correo después de su entrada. Si no la recibe dentro de un período razonable (generalmente 30-90 días), debe contactar a USCIS. El ajuste de estatus (I-485) es para personas que están en Estados Unidos en un estatus de no inmigrante y desean cambiar a residente permanente."
      },
      {
        question: "Después de entrar en Estados Unidos con el visado de visitante B1/B2, el consulado estadounidense se puso en contacto conmigo por correo electrónico e informó que mi visado había sido revocado y cancelado. ¿Significa esto que ahora estoy fuera de estatus? ¿Qué debería hacer?",
        answer: "La revocación de su visa B1/B2 después de haber entrado a Estados Unidos es una situación seria. Si su visa fue revocada, generalmente significa que el Departamento de Estado determinó que ya no es elegible para esa visa. Sin embargo, si ya entró legalmente a Estados Unidos antes de la revocación, su estatus de admisión generalmente sigue siendo válido hasta la fecha de expiración de su I-94 (registro de entrada/salida). Sin embargo, esto puede afectar futuras solicitudes de extensión o cambio de estatus. Es crucial consultar inmediatamente con un abogado de inmigración para evaluar su situación específica y determinar las mejores opciones, ya que esto puede tener implicaciones significativas para su estatus y futuras solicitudes de inmigración."
      }
    ],
    'Green Card': [
      {
        question: "¿Cuándo es el mejor momento para presentar el formulario de renovación de la Green Card? ¿Cuál es el proceso?",
        answer: "Debe presentar el Formulario I-90 (Solicitud para Reemplazar la Tarjeta de Residencia Permanente) dentro de los 6 meses antes de que expire su Green Card actual. El proceso típicamente toma de 10 a 12 meses. Debe presentar el formulario en línea o por correo, pagar la tarifa correspondiente, y proporcionar documentación de identidad. Después de presentar, recibirá un aviso de recibo que extiende su estatus mientras el caso está pendiente. Si su Green Card ya expiró, debe presentar la renovación inmediatamente para evitar problemas al viajar o trabajar."
      },
      {
        question: "Si obtengo el visado E-2, ¿puede eso llevarme a una green card?",
        answer: "Sí, una visa E-2 puede ser un paso hacia una Green Card, aunque no es un camino directo. La visa E-2 es una visa de no inmigrante, por lo que no conduce automáticamente a la residencia permanente. Sin embargo, puede usar su estatus E-2 para establecer un negocio exitoso y luego solicitar una Green Card a través de varias vías, como una petición basada en empleo (EB-1, EB-2, EB-3) si califica, o una petición familiar si tiene un familiar ciudadano o residente permanente que pueda patrocinarlo. También puede considerar el programa EB-5 si hace una inversión significativa."
      },
      {
        question: "Soy titular de la green card y recibí una oferta de trabajo en otro país. ¿Puedo trabajar y vivir en el extranjero durante 2-3 años con la tarjeta de residencia?",
        answer: "Vivir fuera de Estados Unidos por períodos prolongados puede poner en riesgo su estatus de residente permanente. Si permanece fuera de EE.UU. por más de 6 meses consecutivos, puede ser considerado como haber abandonado su residencia. Para períodos de 2-3 años, definitivamente necesitará un Permiso de Reingreso (Reentry Permit, Formulario I-131) antes de salir, que es válido por hasta 2 años. Sin embargo, incluso con un permiso, la ausencia prolongada puede plantear problemas al regresar. Si trabaja para una empresa estadounidense o el gobierno de EE.UU. en el extranjero, puede tener más protección. Es crucial consultar con un abogado antes de hacer planes de ausencia prolongada."
      },
      {
        question: "Tengo la tarjeta de residencia. Presenté el I-130 (Petición de Familiar Inmediato) por mi esposa y mi hijo, que residen en el extranjero. La petición fue aprobada, pero según tengo entendido, tardará casi 2 años en traerlos aquí. ¿Puedo llevarlos con visado de turista o visado V?",
        answer: "No es recomendable que sus familiares entren con visa de turista (B-2) con la intención de quedarse permanentemente, ya que esto constituiría fraude migratorio. La visa V solo está disponible para cónyuges e hijos menores de ciertos residentes permanentes que presentaron peticiones antes del 21 de diciembre de 2000, por lo que probablemente no sea aplicable. La mejor opción es esperar el proceso consular normal. Sin embargo, si tienen visas de turista válidas, pueden visitar temporalmente, pero deben salir antes de que expire su estatus y no pueden ajustar su estatus desde una visa de turista si la intención original era inmigrar. Consulte con un abogado para explorar opciones legales."
      },
      {
        question: "Mi I-751 lleva pendiente casi un año, el aviso de recibo muestra que solo se ha prorrogado por un año. ¿Perderé el estatus?",
        answer: "Si su I-751 (Petición para Eliminar las Condiciones de Residencia) está pendiente, su estatus de residencia permanente condicional se extiende automáticamente mientras la petición esté pendiente, incluso si el aviso de recibo solo muestra una extensión de un año. Puede solicitar una extensión adicional de su tarjeta de residencia condicional si es necesario. Sin embargo, es importante mantener documentación de que su caso está pendiente. Si viaja, lleve su tarjeta de residencia condicional vencida junto con el aviso de recibo del I-751. Si su caso está pendiente por más de 18 meses, puede solicitar una cita de información en su oficina local de USCIS para obtener un sello en su pasaporte que extienda su estatus."
      },
      {
        question: "¿Puedo presentar mi Solicitud de Naturalización (N-400) mientras mi Petición para Eliminar las Condiciones de Residencia (I-751) sigue pendiente?",
        answer: "Sí, puede presentar su N-400 mientras su I-751 está pendiente, siempre que cumpla con los requisitos de elegibilidad para la naturalización (generalmente 5 años como residente permanente, o 3 años si está casado con un ciudadano estadounidense). Sin embargo, USCIS generalmente no aprobará su N-400 hasta que se resuelva el I-751. En algunos casos, USCIS puede combinar las entrevistas para ambos casos. Es importante asegurarse de que su I-751 esté en orden antes de presentar la N-400, ya que cualquier problema con el I-751 puede afectar su solicitud de naturalización."
      },
      {
        question: "¿Qué puede ser prueba de lazos estrechos y/o intención de vivir en Estados Unidos para obtener la ciudadanía?",
        answer: "Para demostrar lazos estrechos e intención de vivir en Estados Unidos, puede presentar evidencia como: declaraciones de impuestos estadounidenses, cuentas bancarias en EE.UU., propiedad de bienes raíces, empleo en Estados Unidos, membresías en organizaciones, registros escolares de hijos, y correspondencia que muestre dirección residencial. También son útiles los registros de viaje que demuestren que ha mantenido residencia en EE.UU. La evidencia debe mostrar un patrón continuo de conexión con Estados Unidos."
      },
      {
        question: "¿Puedo solicitar que un familiar o cónyuge viva fuera de Estados Unidos mientras yo también vivo fuera de Estados Unidos?",
        answer: "Si es ciudadano estadounidense o residente permanente, generalmente puede patrocinar a un familiar o cónyuge para inmigración a Estados Unidos, pero el proceso generalmente requiere que el beneficiario viva en Estados Unidos después de obtener la residencia. Si tanto usted como su familiar vivirán fuera de Estados Unidos, esto puede plantear preguntas sobre la intención de residir permanentemente en EE.UU., que es un requisito para la residencia permanente. Sin embargo, hay excepciones, como si está trabajando para el gobierno de EE.UU. o una empresa estadounidense en el extranjero. Es importante consultar con un abogado para determinar si su situación específica permite este arreglo."
      }
    ],
    'Empleo': [
      {
        question: "Si alguien tiene un visado I, ¿aún necesita solicitar un Documento de Autorización de Empleo (EAD) y un número de Seguridad Social (SSN)?",
        answer: "Los titulares de visa I (representantes de medios de comunicación) generalmente no necesitan un EAD para trabajar en su capacidad oficial como periodistas o representantes de medios. Sin embargo, para obtener un número de Seguridad Social (SSN), aún necesitará presentar una solicitud en la oficina del Seguro Social con su visa I válida, pasaporte, y documentación que demuestre su estatus. Si planea realizar trabajo fuera de su capacidad oficial como representante de medios, puede necesitar un EAD. Es importante consultar con un abogado para determinar sus obligaciones específicas basadas en su situación particular."
      },
      {
        question: "He estado intentando obtener un permiso de trabajo en Estados Unidos, pero estoy experimentando dificultades y confusión. ¿Soy elegible para un permiso de trabajo? ¿Qué debería hacer?",
        answer: "La elegibilidad para un permiso de trabajo (EAD) depende de varios factores, incluyendo su estatus migratorio actual, el tipo de visa que tiene, y su situación específica. Algunas categorías comunes que pueden ser elegibles incluyen: solicitantes de asilo, titulares de ciertas visas, cónyuges de ciertos titulares de visas, y personas con ajuste de estatus pendiente. El proceso puede ser complejo y confuso. Recomendamos encarecidamente consultar con un abogado de inmigración experimentado que pueda evaluar su situación específica, determinar su elegibilidad, y ayudarle a navegar el proceso de solicitud. Nuestro bufete puede ayudarle a entender sus opciones y guiarle a través del proceso."
      },
      {
        question: "Si tengo un estatus F-1, ¿puedo hacer prácticas no remuneradas o no remuneradas sin autorización de trabajo?",
        answer: "Sí, los estudiantes F-1 generalmente pueden realizar prácticas no remuneradas (unpaid internships) sin autorización de trabajo, siempre que las prácticas cumplan con ciertos criterios: deben estar directamente relacionadas con su campo de estudio, ser parte de su programa académico, y no desplazar a trabajadores estadounidenses. Sin embargo, es importante verificar con su Designated School Official (DSO) antes de comenzar cualquier práctica, ya que las reglas pueden variar. Si la práctica es remunerada o no cumple con los criterios de práctica no remunerada, necesitará autorización de trabajo (como CPT o OPT). Siempre consulte con su DSO y un abogado antes de aceptar cualquier posición."
      },
      {
        question: "Soy estudiante F-1 con un ajuste de estatus pendiente basado en mi matrimonio con un ciudadano estadounidense. ¿Puedo trabajar durante mi proceso de ajuste de estatus aunque no haya recibido mi EAD?",
        answer: "No, no puede trabajar legalmente hasta que reciba su EAD (Documento de Autorización de Empleo) aprobado. Incluso si tiene un ajuste de estatus pendiente (I-485), debe esperar a recibir el EAD antes de comenzar a trabajar. Trabajar sin autorización puede resultar en la denegación de su solicitud de ajuste de estatus y puede tener consecuencias graves para su caso. Debe presentar el Formulario I-765 (Solicitud de Autorización de Empleo) junto con su I-485, y esperar la aprobación antes de comenzar cualquier empleo. Si tiene una emergencia, puede solicitar una aceleración del procesamiento del EAD, pero aún debe esperar la aprobación."
      },
      {
        question: "Ya he solicitado la green card, pero ahora quiero solicitar el documento de viaje y el permiso de trabajo mientras mi solicitud está pendiente. ¿Tengo que pagar un extra para poder obtener permiso de trabajo o permiso anticipado ya que ya presenté mi I-485?",
        answer: "Si presentó su I-485 (Ajuste de Estatus) después del 2 de octubre de 2020, puede solicitar el EAD (permiso de trabajo) y el Advance Parole (documento de viaje) usando el Formulario I-765 y I-131 respectivamente, y generalmente no hay tarifa adicional si los presenta junto con su I-485 o mientras su I-485 está pendiente. Sin embargo, si los presenta por separado o después de ciertos períodos, puede haber tarifas. Es importante verificar las tarifas actuales de USCIS, ya que pueden cambiar. Si presentó su I-485 antes de octubre de 2020, las reglas de tarifas pueden ser diferentes. Consulte con un abogado para determinar las tarifas exactas aplicables a su situación."
      }
    ],
    'Asilo': [
      {
        question: "¿Qué tipos de patrocinadores pueden considerarse como alternativas a una solicitud de asilo para fines laborales si alguien tiene una solicitud pendiente?",
        answer: "Si tiene una solicitud de asilo pendiente, puede explorar varias alternativas para obtener autorización de trabajo mientras su caso está en proceso. Algunas opciones incluyen: patrocinio basado en empleo (visas H-1B, L-1, O-1, etc.), patrocinio familiar si tiene un familiar ciudadano o residente permanente que pueda patrocinarlo, o ciertas categorías especiales de visas. Sin embargo, tener una solicitud de asilo pendiente puede afectar su elegibilidad para ciertos tipos de visas. Es importante consultar con un abogado de inmigración para evaluar todas sus opciones y determinar la mejor estrategia para su situación específica, ya que cada caso es único."
      },
      {
        question: "¿Puedo retirar mi caso de asilo si ya he asistido a biometrías y recibido la aprobación para un permiso de trabajo EB-3?",
        answer: "Sí, generalmente puede retirar su solicitud de asilo, pero debe hacerlo antes de que se tome una decisión final sobre su caso. Si ya recibió aprobación para un permiso de trabajo basado en EB-3, puede considerar retirar su caso de asilo si el EB-3 es una mejor opción para usted. Sin embargo, retirar un caso de asilo puede tener implicaciones, especialmente si su estatus actual depende del caso de asilo pendiente. Es crucial consultar con un abogado antes de retirar su caso de asilo para asegurarse de que no perderá su estatus o autorización de trabajo, y que el EB-3 es definitivamente una opción viable para usted."
      },
      {
        question: "Si me deniegan la solicitud de asilo, ¿puedo volver a mi estatus de visado F-1 y restablecer mi estatus de estudiante en EE. UU.?",
        answer: "Si su solicitud de asilo es denegada y anteriormente tenía un estatus F-1 válido, puede ser posible restablecer su estatus de estudiante, pero esto depende de varios factores: si su visa F-1 aún es válida, si su I-20 sigue siendo válido, si no ha acumulado presencia ilegal significativa, y si puede demostrar que su intención original era estudiar. Sin embargo, si su F-1 expiró mientras su caso de asilo estaba pendiente, puede ser más complicado. También, si su caso de asilo fue denegado y está en proceso de deportación, esto puede afectar su capacidad de restablecer el estatus F-1. Es esencial consultar inmediatamente con un abogado para evaluar sus opciones."
      },
      {
        question: "Tuve mi primera fecha en el juzgado, pero al llegar al juzgado me informaron de que mi caso iba a ser transferido desde el USCIS. ¿Qué debería hacer en esta situación?",
        answer: "Si su caso de asilo está siendo transferido de USCIS a la corte de inmigración, esto significa que su caso ahora será procesado en procedimientos de deportación. Es crucial que tenga representación legal inmediatamente. Debe: 1) Asegurarse de tener un abogado de inmigración experimentado, 2) Entender que ahora tendrá audiencias en la corte de inmigración en lugar de con USCIS, 3) Prepararse para presentar su caso de asilo ante un juez de inmigración, 4) Asegurarse de cumplir con todas las fechas de corte, y 5) Mantener toda su documentación organizada. El proceso en la corte es diferente al de USCIS y puede ser más complejo. No intente navegar esto sin un abogado experimentado."
      },
      {
        question: "¿Qué debería hacer si tengo un juez con una calificación baja o sesgado contra los inmigrantes?",
        answer: "Si tiene preocupaciones sobre la imparcialidad de su juez de inmigración, tiene varias opciones: 1) Puede solicitar la recusación del juez si puede demostrar un sesgo real, aunque esto es difícil de probar, 2) Puede apelar la decisión si el juez actúa de manera inapropiada o hace errores legales, 3) Puede presentar una queja ante la Oficina de Revisión de Conducta Judicial si hay evidencia de conducta inapropiada, 4) Lo más importante: asegúrese de tener un abogado experimentado que conozca al juez y pueda preparar su caso de la manera más efectiva posible. Un buen abogado puede adaptar la estrategia del caso según las tendencias del juez. Documente cualquier comportamiento inapropiado."
      },
      {
        question: "Si un solicitante de asilo había presentado una solicitud de asilo adecuada mientras estaba en estatus, entonces podría ajustar su estatus ante USCIS, siempre que la entrevista de asilo aún no se realice. Por lo tanto, el cliente puede ajustar su estatus ante el USCIS. ¿Tengo razón?",
        answer: "Esta es una situación compleja que depende de varios factores. Si presentó una solicitud de asilo (I-589) mientras estaba en estatus válido y luego se casa con un ciudadano estadounidense o tiene otra base para ajuste de estatus, puede ser posible ajustar su estatus. Sin embargo, hay consideraciones importantes: 1) Si su estatus expiró después de presentar el asilo, puede haber acumulado presencia ilegal, 2) Si ya tuvo su entrevista de asilo o el caso fue transferido a la corte, las reglas pueden ser diferentes, 3) Debe cumplir con todos los requisitos para ajuste de estatus independientemente del caso de asilo. Esta es una situación muy técnica que requiere análisis legal cuidadoso. Consulte con un abogado experimentado para evaluar su caso específico."
      },
      {
        question: "Solicité asilo, pero los miembros de mi familia siguen en mi país. ¿Cómo acelero mi caso de asilo?",
        answer: "Puede solicitar la aceleración de su caso de asilo basándose en razones humanitarias, especialmente si sus familiares están en peligro. Para acelerar su caso, puede: 1) Presentar una solicitud de aceleración con USCIS o la corte de inmigración con documentación que demuestre la urgencia (amenazas, violencia, persecución activa de familiares), 2) Solicitar procesamiento acelerado basado en emergencia médica o humanitaria, 3) Si sus familiares también son elegibles para asilo, puede incluirlos en su solicitud o ayudarles a presentar solicitudes separadas. Sin embargo, las solicitudes de aceleración son evaluadas caso por caso y no se garantizan. Es importante trabajar con un abogado para preparar una solicitud de aceleración sólida con documentación convincente."
      },
      {
        question: "¿Hay excepciones al plazo de un año para presentar solicitudes de asilo?",
        answer: "Sí, hay excepciones al requisito de presentar la solicitud de asilo dentro de un año de llegar a Estados Unidos. Las excepciones incluyen: 1) Circunstancias extraordinarias que le impidieron presentar a tiempo (enfermedad grave, discapacidad, detención), 2) Cambios extraordinarios en las condiciones de su país que afectan su elegibilidad, 3) Cambios en las circunstancias personales que afectan su elegibilidad, 4) Retraso debido a representación legal inadecuada o fraude, 5) Si es menor de edad cuando llegó. Debe demostrar que la excepción aplica a su caso y que presentó la solicitud dentro de un tiempo razonable después de que la circunstancia extraordinaria terminó. Es crucial tener documentación sólida que respalde su excepción."
      },
      {
        question: "¿Puedo viajar fuera de Estados Unidos mientras mi solicitud de asilo está pendiente?",
        answer: "Generalmente NO se recomienda viajar fuera de Estados Unidos mientras su solicitud de asilo está pendiente. Si sale de EE.UU. sin un Advance Parole aprobado, puede ser considerado como haber abandonado su solicitud de asilo, lo que resultaría en la denegación automática. Además, puede tener dificultades para regresar. Si tiene una emergencia humanitaria genuina, puede solicitar un Advance Parole (Formulario I-131) antes de viajar, pero esto puede tomar tiempo y no se garantiza. Incluso con Advance Parole, viajar a su país de origen puede plantear preguntas sobre su temor de persecución. Es crucial consultar con un abogado antes de hacer cualquier plan de viaje mientras su caso de asilo está pendiente."
      },
      {
        question: "Pedí la prórroga del estatus B-2, que me denegaron. Ahora he solicitado asilo. ¿Cómo afecta mi solicitud de prórroga B-2 a mi caso de asilo?",
        answer: "El hecho de que su extensión B-2 fue denegada generalmente no afecta directamente su caso de asilo, ya que el asilo se basa en un temor bien fundamentado de persecución, no en su estatus migratorio anterior. Sin embargo, si la denegación de la extensión B-2 resultó en presencia ilegal, esto puede afectar su elegibilidad para ciertos beneficios. Lo más importante es que presentó su solicitud de asilo dentro del plazo requerido (generalmente dentro de un año de llegar, o con una excepción válida). Si presentó el asilo después de que su B-2 expiró pero dentro del plazo de un año desde su entrada original, debería estar bien. Es importante documentar su caso de asilo sólidamente independientemente de la situación con su B-2."
      },
      {
        question: "Solicité asilo, pero los miembros de mi familia siguen en Irak. ¿Cómo acelero mi caso de asilo?",
        answer: "Si sus familiares están en Irak y están en peligro, puede solicitar la aceleración de su caso de asilo. Puede presentar una solicitud de aceleración con documentación que demuestre: 1) Amenazas específicas o persecución activa contra sus familiares en Irak, 2) Condiciones peligrosas en Irak que afectan a su familia, 3) Emergencias médicas o humanitarias. También puede considerar incluir a sus familiares en su solicitud de asilo si son elegibles, o ayudarles a presentar solicitudes de asilo separadas. Las solicitudes de aceleración se evalúan caso por caso. Trabaje con un abogado para preparar una solicitud de aceleración bien fundamentada con evidencia convincente de la urgencia de su situación."
      },
      {
        question: "Utilicé información falsa para obtener el visado de turista B-2 y solicité asilo después de entrar en Estados Unidos. ¿Cuáles son mis posibilidades?",
        answer: "Esta es una situación muy compleja y delicada. El uso de información falsa puede resultar en inadmisibilidad por fraude o tergiversación, lo que puede afectar gravemente su caso de asilo y futuras solicitudes de inmigración. Sin embargo, si puede demostrar un temor bien fundamentado de persecución válido para asilo, aún puede ser elegible. Puede ser posible solicitar una exención de inadmisibilidad si puede demostrar que el fraude fue resultado de su temor de persecución. Es crucial que consulte inmediatamente con un abogado de inmigración experimentado en casos de asilo y fraude. Un abogado puede ayudarle a evaluar sus opciones, potencialmente solicitar una exención, y presentar su caso de la manera más favorable posible. No intente navegar esto sin representación legal."
      }
    ]
  };

  const faqs = faqsByCategory[activeCategory as keyof typeof faqsByCategory] || [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setOpenIndex(null); // Cerrar cualquier pregunta abierta al cambiar de categoría
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen de fondo */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portadainmigration.avif"
            alt="Inmigración"
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
              href="/"
              className="inline-block text-white/80 hover:text-white text-sm md:text-base mb-6 transition-colors absolute top-4 left-4 md:top-6 md:left-6"
            >
              Atrás
            </Link>
            
            {/* Título y contenido - Tarjeta blanca en la parte inferior */}
            <div className="bg-white rounded-lg p-8 md:p-12 lg:p-16 shadow-2xl mt-16 md:mt-24">
              <h1 className="text-[#8B0000] text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Inmigración
              </h1>
              
              <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
                I.S. Law Firm tiene experiencia en todas las áreas del derecho de inmigración. Nuestra experiencia nos ha enseñado que trabajar estrechamente con nuestros clientes durante todo el proceso de inmigración es esencial para evitar errores y asegurar la finalización exitosa de sus solicitudes lo antes posible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios con Botones */}
      <section className="bg-white w-full py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          {/* Línea divisoria superior */}
          <div className="border-t-2 border-[#8B0000] mb-12 md:mb-16"></div>
          
          {/* Grid de botones de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Fila 1 - 3 botones */}
            <Link 
              href="/servicios/solicitud-trabajo"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-6 px-8 rounded-xl text-center text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Solicitud de Trabajo
            </Link>
            
            <Link 
              href="/servicios/permiso-trabajo"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-6 px-8 rounded-xl text-center text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Permiso de Trabajo
            </Link>
            
            <Link 
              href="/servicios/residencia"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-6 px-8 rounded-xl text-center text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Residencia
            </Link>
          </div>
          
          {/* Fila 2 - 2 botones centrados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto mb-12 md:mb-16">
            <Link 
              href="/servicios/asilo"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-6 px-8 rounded-xl text-center text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Asilo
            </Link>
            
            <Link 
              href="/servicios/permiso-estudio"
              className="bg-[#8B0000] hover:bg-[#9B0000] text-white font-semibold py-6 px-8 rounded-xl text-center text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Permiso de Estudio
            </Link>
          </div>
          
          {/* Línea divisoria inferior */}
          <div className="border-t-2 border-[#8B0000]"></div>
        </div>
      </section>

      {/* Sección de Texto Informativo */}
      <section className="bg-white w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {/* Contenido de texto */}
          <div className="space-y-6 md:space-y-8 text-left">
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              I.S. Law Firm tiene experiencia en todas las áreas del derecho de inmigración. Nuestra experiencia nos ha enseñado que trabajar estrechamente con nuestros clientes durante todo el proceso de inmigración es esencial para evitar errores y asegurar la finalización exitosa de sus solicitudes lo antes posible. El derecho de inmigración es una de las áreas legales más complejas en los Estados Unidos, en parte porque las leyes y regulaciones que lo rigen están en constante evolución.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Errores menores en el proceso de solicitud pueden provocar retrasos, costes adicionales y otras consecuencias desfavorables. Mientras que algunas firmas utilizan los mismos formularios y procedimientos para todos los clientes, I.S. Law Firm trata a los clientes como individuos y se toma el tiempo necesario para evaluar cuidadosamente las leyes específicas que se aplican a cada caso. Adoptamos un enfoque único, caso por caso, en los casos de inmigración y lo hacemos a una tarifa competitiva y razonable. Entendemos que el proceso de inmigración puede ser complejo y llevar mucho tiempo, por eso nos esforzamos por hacer que el procedimiento sea fácil y simple de entender para nuestros clientes.
            </p>
            
            <p className="text-[#2C2C2C] text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              Te explicaremos tus opciones, te diremos qué podemos hacer, cuánto costará y dedicaremos todos nuestros recursos, conocimientos y habilidades para ganar tu caso. Tu caso será evaluado con un detalle y atención meticulosos para lograr el mejor resultado posible. Trabajaremos duro para proporcionarte información clara y relevante sobre el caso, para que puedas confiar en nuestra experiencia y las decisiones que tomamos al intentar resolver tu asunto migratorio.
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
              Contáctanos
            </h2>
            <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
              ¿Tienes preguntas sobre nuestros servicios de inmigración? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
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

              {/* Asunto */}
              <div>
                <label htmlFor="asunto" className="block text-[#8B0000] text-sm md:text-base font-semibold mb-2 font-sans">
                  Asunto *
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-[#2C2C2C] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 focus:border-[#8B0000] transition-all"
                >
                  <option value="">Seleccione un asunto</option>
                  <option value="solicitud-trabajo">Solicitud de Trabajo</option>
                  <option value="permiso-trabajo">Permiso de Trabajo</option>
                  <option value="residencia">Residencia</option>
                  <option value="asilo">Asilo</option>
                  <option value="permiso-estudio">Permiso de Estudio</option>
                  <option value="consulta-general">Consulta General</option>
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
                placeholder="Cuéntanos cómo podemos ayudarte..."
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

      {/* Sección de Preguntas Frecuentes */}
      <section className="bg-white w-full py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {/* Título */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-[#8B0000] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 md:mb-8">
              Preguntas frecuentes
            </h2>
          </div>

          {/* Barra de Categorías */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-8 md:mb-12 border-b border-gray-200 pb-4">
            {Object.keys(faqsByCategory).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-base md:text-lg font-semibold font-sans transition-colors pb-2 relative ${
                  activeCategory === category
                    ? 'text-[#8B0000]'
                    : 'text-gray-600 hover:text-[#8B0000]'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B0000]"></span>
                )}
              </button>
            ))}
          </div>

          {/* Lista de FAQs */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-6 md:py-8 flex items-center justify-between group focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[#8B0000] text-base md:text-lg lg:text-xl font-semibold font-sans pr-8 group-hover:text-[#9B0000] transition-colors">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 text-[#8B0000] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6 md:pb-8 pt-0">
                    <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

