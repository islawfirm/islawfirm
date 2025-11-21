'use client';

import { useState } from 'react';
import Image from 'next/image';

// Tipo para eventos del timeline
interface Evento {
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: 'completado' | 'en-proceso' | 'pendiente';
}

// Tipo para documentos
interface Documento {
  nombre: string;
  tipo: string;
  fecha: string;
  url?: string;
  estado: 'aprobado' | 'pendiente' | 'rechazado';
}

// Tipo para los datos del caso
interface CasoInfo {
  codigo: string;
  nombreCliente: string;
  tipoCaso: string;
  fechaInicio: string;
  estado: 'En Proceso' | 'Aprobado' | 'Pendiente' | 'Rechazado' | 'Completado';
  abogadoAsignado: string;
  emailAbogado: string;
  telefonoAbogado: string;
  ultimaActualizacion: string;
  descripcionCaso: string;
  eventos: Evento[];
  documentos: Documento[];
  documentosPendientes: string[];
  notasAbogado: string[];
  imagenCaso?: string;
  porcentajeProgreso: number;
}

// Base de datos simulada - En producción esto vendría de una API
const casosRegistrados: Record<string, CasoInfo> = {
  // 1. Solicitud de Trabajo
  'IS-2024-001234': {
    codigo: 'IS-2024-001234',
    nombreCliente: 'Carlos Ramírez Martínez',
    tipoCaso: 'Solicitud de Trabajo',
    fechaInicio: '15 de marzo de 2024',
    estado: 'En Proceso',
    abogadoAsignado: 'Ismail T. Shahtakhtinski, Esq.',
    emailAbogado: 'ismail@islawfirm.com',
    telefonoAbogado: '(703) 527-1779',
    ultimaActualizacion: '28 de noviembre de 2024',
    descripcionCaso: 'Solicitud de permiso de trabajo para empleo en empresa tecnológica. Caso presentado ante USCIS bajo categoría H-1B.',
    porcentajeProgreso: 65,
    eventos: [
      {
        fecha: '15 de marzo de 2024',
        titulo: 'Caso iniciado',
        descripcion: 'Reunión inicial con el cliente y recopilación de documentación inicial.',
        tipo: 'completado'
      },
      {
        fecha: '22 de marzo de 2024',
        titulo: 'Documentación presentada',
        descripcion: 'Todos los documentos requeridos fueron presentados a USCIS.',
        tipo: 'completado'
      },
      {
        fecha: '10 de abril de 2024',
        titulo: 'Recibo de confirmación',
        descripcion: 'USCIS confirmó la recepción de la solicitud. Número de caso: MSC-2024-001234.',
        tipo: 'completado'
      },
      {
        fecha: '15 de mayo de 2024',
        titulo: 'Biometría programada',
        descripcion: 'Cita de biometría completada exitosamente.',
        tipo: 'completado'
      },
      {
        fecha: '20 de noviembre de 2024',
        titulo: 'Revisión en proceso',
        descripcion: 'USCIS está revisando la solicitud. Esperando respuesta.',
        tipo: 'en-proceso'
      },
      {
        fecha: '15 de enero de 2025',
        titulo: 'Decisión esperada',
        descripcion: 'Fecha estimada para recibir la decisión final.',
        tipo: 'pendiente'
      }
    ],
    documentos: [
      {
        nombre: 'Formulario I-129',
        tipo: 'PDF',
        fecha: '22 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Carta de oferta de empleo',
        tipo: 'PDF',
        fecha: '20 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Certificado de estudios',
        tipo: 'PDF',
        fecha: '18 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Recibo de biometría',
        tipo: 'PDF',
        fecha: '15 de mayo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Certificado de antecedentes penales',
        tipo: 'PDF',
        fecha: 'Pendiente',
        estado: 'pendiente'
      }
    ],
    documentosPendientes: [
      'Certificado de antecedentes penales actualizado',
      'Carta de recomendación del empleador'
    ],
    notasAbogado: [
      'El caso está avanzando según lo esperado. No se han presentado complicaciones.',
      'Se recomienda mantener todos los documentos actualizados mientras se espera la decisión.',
      'Próxima revisión programada para el 10 de diciembre de 2024.'
    ]
  },

  // 2. Permiso de Trabajo
  'IS-2024-002567': {
    codigo: 'IS-2024-002567',
    nombreCliente: 'María González López',
    tipoCaso: 'Permiso de Trabajo',
    fechaInicio: '22 de abril de 2024',
    estado: 'Aprobado',
    abogadoAsignado: 'Furkan Bayraktar, Abogado Esq.',
    emailAbogado: 'furkan@islawfirm.com',
    telefonoAbogado: '(703) 527-1779',
    ultimaActualizacion: '20 de noviembre de 2024',
    descripcionCaso: 'Solicitud de permiso de trabajo (EAD) basado en solicitud de asilo pendiente. Caso procesado exitosamente.',
    porcentajeProgreso: 100,
    eventos: [
      {
        fecha: '22 de abril de 2024',
        titulo: 'Caso iniciado',
        descripcion: 'Inicio del proceso de solicitud de permiso de trabajo.',
        tipo: 'completado'
      },
      {
        fecha: '30 de abril de 2024',
        titulo: 'Solicitud presentada',
        descripcion: 'Formulario I-765 presentado a USCIS.',
        tipo: 'completado'
      },
      {
        fecha: '15 de mayo de 2024',
        titulo: 'Biometría completada',
        descripcion: 'Proceso de biometría finalizado exitosamente.',
        tipo: 'completado'
      },
      {
        fecha: '20 de noviembre de 2024',
        titulo: 'Permiso aprobado',
        descripcion: 'USCIS aprobó la solicitud de permiso de trabajo. El documento será enviado por correo.',
        tipo: 'completado'
      }
    ],
    documentos: [
      {
        nombre: 'Formulario I-765',
        tipo: 'PDF',
        fecha: '30 de abril de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Notificación de aprobación',
        tipo: 'PDF',
        fecha: '20 de noviembre de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Permiso de Trabajo (EAD)',
        tipo: 'Imagen',
        fecha: '25 de noviembre de 2024',
        estado: 'aprobado',
        url: '#'
      }
    ],
    documentosPendientes: [],
    notasAbogado: [
      '¡Felicitaciones! Su permiso de trabajo ha sido aprobado exitosamente.',
      'El documento físico será enviado a la dirección registrada en los próximos 7-10 días hábiles.',
      'Recuerde renovar el permiso 180 días antes de su fecha de expiración.'
    ]
  },

  // 3. Residencia
  'IS-2024-003891': {
    codigo: 'IS-2024-003891',
    nombreCliente: 'Ana Sofía Rodríguez',
    tipoCaso: 'Residencia Permanente',
    fechaInicio: '10 de enero de 2024',
    estado: 'En Proceso',
    abogadoAsignado: 'Ismail T. Shahtakhtinski, Esq.',
    emailAbogado: 'ismail@islawfirm.com',
    telefonoAbogado: '(703) 527-1779',
    ultimaActualizacion: '25 de noviembre de 2024',
    descripcionCaso: 'Solicitud de residencia permanente basada en petición familiar. Caso en etapa de entrevista.',
    porcentajeProgreso: 75,
    eventos: [
      {
        fecha: '10 de enero de 2024',
        titulo: 'Caso iniciado',
        descripcion: 'Inicio del proceso de residencia permanente.',
        tipo: 'completado'
      },
      {
        fecha: '25 de enero de 2024',
        titulo: 'Petición familiar presentada',
        descripcion: 'Formulario I-130 presentado y aprobado.',
        tipo: 'completado'
      },
      {
        fecha: '15 de marzo de 2024',
        titulo: 'Solicitud de ajuste de estatus',
        descripcion: 'Formulario I-485 presentado a USCIS.',
        tipo: 'completado'
      },
      {
        fecha: '20 de abril de 2024',
        titulo: 'Biometría completada',
        descripcion: 'Proceso de biometría finalizado.',
        tipo: 'completado'
      },
      {
        fecha: '15 de octubre de 2024',
        titulo: 'Entrevista programada',
        descripcion: 'Entrevista programada para el 10 de diciembre de 2024 a las 9:00 AM.',
        tipo: 'en-proceso'
      },
      {
        fecha: '10 de diciembre de 2024',
        titulo: 'Entrevista de residencia',
        descripcion: 'Entrevista en la oficina de USCIS en Fairfax, VA.',
        tipo: 'pendiente'
      }
    ],
    documentos: [
      {
        nombre: 'Formulario I-130',
        tipo: 'PDF',
        fecha: '25 de enero de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Formulario I-485',
        tipo: 'PDF',
        fecha: '15 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Examen médico',
        tipo: 'PDF',
        fecha: '10 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Notificación de entrevista',
        tipo: 'PDF',
        fecha: '15 de octubre de 2024',
        estado: 'aprobado',
        url: '#'
      }
    ],
    documentosPendientes: [
      'Documentos de identificación actualizados',
      'Pruebas de relación familiar adicionales'
    ],
    notasAbogado: [
      'La entrevista está programada. Por favor, llegue 30 minutos antes de la hora programada.',
      'Traiga todos los documentos originales y copias adicionales.',
      'Estaremos disponibles para cualquier consulta antes de la entrevista.'
    ]
  },

  // 4. Asilo
  'IS-2024-004512': {
    codigo: 'IS-2024-004512',
    nombreCliente: 'José Luis Hernández',
    tipoCaso: 'Solicitud de Asilo',
    fechaInicio: '5 de febrero de 2024',
    estado: 'En Proceso',
    abogadoAsignado: 'Furkan Bayraktar, Abogado Esq.',
    emailAbogado: 'furkan@islawfirm.com',
    telefonoAbogado: '(703) 527-1779',
    ultimaActualizacion: '22 de noviembre de 2024',
    descripcionCaso: 'Solicitud de asilo político basada en persecución por motivos políticos. Caso en revisión por el juez de inmigración.',
    porcentajeProgreso: 50,
    eventos: [
      {
        fecha: '5 de febrero de 2024',
        titulo: 'Caso iniciado',
        descripcion: 'Solicitud de asilo presentada dentro del plazo de un año.',
        tipo: 'completado'
      },
      {
        fecha: '20 de febrero de 2024',
        titulo: 'Entrevista de temor creíble',
        descripcion: 'Entrevista completada exitosamente. Caso referido a corte de inmigración.',
        tipo: 'completado'
      },
      {
        fecha: '15 de marzo de 2024',
        titulo: 'Audiencia preliminar',
        descripcion: 'Primera audiencia en corte de inmigración. Fecha de audiencia final programada.',
        tipo: 'completado'
      },
      {
        fecha: '10 de octubre de 2024',
        titulo: 'Presentación de evidencia',
        descripcion: 'Toda la documentación y evidencia presentada ante la corte.',
        tipo: 'completado'
      },
      {
        fecha: '15 de marzo de 2025',
        titulo: 'Audiencia final',
        descripcion: 'Audiencia final programada. El juez emitirá su decisión.',
        tipo: 'pendiente'
      }
    ],
    documentos: [
      {
        nombre: 'Formulario I-589',
        tipo: 'PDF',
        fecha: '5 de febrero de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Declaración personal',
        tipo: 'PDF',
        fecha: '10 de febrero de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Evidencia de persecución',
        tipo: 'PDF',
        fecha: '25 de febrero de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Notificación de audiencia',
        tipo: 'PDF',
        fecha: '15 de marzo de 2024',
        estado: 'aprobado',
        url: '#'
      }
    ],
    documentosPendientes: [
      'Testimonios adicionales de testigos',
      'Documentación médica de lesiones'
    ],
    notasAbogado: [
      'El caso está siendo procesado según el cronograma establecido.',
      'Es importante mantener la confidencialidad de los detalles del caso.',
      'Continuaremos preparando la estrategia de defensa para la audiencia final.'
    ]
  },

  // 5. Permiso de Estudio
  'IS-2024-005678': {
    codigo: 'IS-2024-005678',
    nombreCliente: 'Roberto Chen Wei',
    tipoCaso: 'Permiso de Estudio',
    fechaInicio: '18 de mayo de 2024',
    estado: 'Completado',
    abogadoAsignado: 'Ismail T. Shahtakhtinski, Esq.',
    emailAbogado: 'ismail@islawfirm.com',
    telefonoAbogado: '(703) 527-1779',
    ultimaActualizacion: '10 de noviembre de 2024',
    descripcionCaso: 'Solicitud de visa F-1 para estudios de maestría en universidad estadounidense. Caso completado exitosamente.',
    porcentajeProgreso: 100,
    eventos: [
      {
        fecha: '18 de mayo de 2024',
        titulo: 'Caso iniciado',
        descripcion: 'Inicio del proceso de solicitud de visa de estudiante.',
        tipo: 'completado'
      },
      {
        fecha: '25 de mayo de 2024',
        titulo: 'Formulario I-20 recibido',
        descripcion: 'Documento I-20 recibido de la universidad.',
        tipo: 'completado'
      },
      {
        fecha: '5 de junio de 2024',
        titulo: 'Solicitud de visa presentada',
        descripcion: 'Solicitud presentada en el consulado estadounidense.',
        tipo: 'completado'
      },
      {
        fecha: '20 de junio de 2024',
        titulo: 'Entrevista consular',
        descripcion: 'Entrevista completada exitosamente en el consulado.',
        tipo: 'completado'
      },
      {
        fecha: '25 de junio de 2024',
        titulo: 'Visa aprobada',
        descripcion: 'Visa F-1 aprobada. Pasaporte con visa devuelto.',
        tipo: 'completado'
      },
      {
        fecha: '15 de agosto de 2024',
        titulo: 'Ingreso a Estados Unidos',
        descripcion: 'Estudiante ingresó exitosamente a Estados Unidos con visa F-1.',
        tipo: 'completado'
      }
    ],
    documentos: [
      {
        nombre: 'Formulario I-20',
        tipo: 'PDF',
        fecha: '25 de mayo de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'Visa F-1',
        tipo: 'Imagen',
        fecha: '25 de junio de 2024',
        estado: 'aprobado',
        url: '#'
      },
      {
        nombre: 'I-94 (Registro de entrada)',
        tipo: 'PDF',
        fecha: '15 de agosto de 2024',
        estado: 'aprobado',
        url: '#'
      }
    ],
    documentosPendientes: [],
    notasAbogado: [
      '¡Felicitaciones! Su visa de estudiante ha sido aprobada y ya está estudiando en Estados Unidos.',
      'Recuerde mantener su estatus de estudiante cumpliendo con los requisitos académicos.',
      'Puede solicitar permiso de trabajo después de completar un año académico si es elegible.'
    ]
  }
};

export default function RevisarEstado() {
  const [codigo, setCodigo] = useState('');
  const [casoInfo, setCasoInfo] = useState<CasoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setCasoInfo(null);
    setError(null);
    
    setTimeout(() => {
      setCargando(false);
      
      const codigoNormalizado = codigo.trim().toUpperCase();
      const formatoValido = /^IS-\d{4}-\d{6}$/.test(codigoNormalizado);
      
      if (!formatoValido) {
        setError('El código ingresado no tiene el formato correcto. Por favor, verifique que haya ingresado el número del caso correctamente. El formato debe ser: IS-AAAA-NNNNNN (ejemplo: IS-2024-001234)');
        return;
      }
      
      const caso = casosRegistrados[codigoNormalizado];
      
      if (caso) {
        setCasoInfo(caso);
        setError(null);
      } else {
        setError('El código ingresado no se encuentra registrado en nuestra base de datos. Por favor, verifique que haya ingresado el número del caso correctamente o contacte a nuestra oficina si cree que esto es un error.');
      }
    }, 1500);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'En Proceso':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Pendiente':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-white">
      {/* Formulario de búsqueda */}
      <div className="bg-white border-b-2 border-[#8B0000] shadow-md py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-[#8B0000] text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Revisar Estado del Caso
            </h1>
            <p className="text-[#666666] text-lg md:text-xl">
              Ingrese el código de su caso para consultar el estado actual y todos los detalles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                  setError(null);
                  setCasoInfo(null);
                }}
                required
                className="flex-1 px-6 py-4 rounded-lg bg-[#F5F0E8] text-[#000000] placeholder-[#666666] border-2 border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30 transition-all text-lg uppercase"
                placeholder="Ejemplo: IS-2024-001234"
              />
              <button
                type="submit"
                disabled={cargando}
                className="bg-[#8B0000] hover:bg-[#9B0000] disabled:bg-[#666666] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none whitespace-nowrap"
              >
                {cargando ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
            <p className="text-[#666666] text-sm mt-3 text-center">
              Formato: IS-AAAA-NNNNNN
            </p>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-6 max-w-2xl mx-auto p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-red-700 text-xl font-bold mb-2">Error en la Consulta</h3>
                  <p className="text-red-600 text-base leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información del caso - Ocupa toda la pantalla */}
      {casoInfo && (
        <div className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {/* Header del caso */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-[#8B0000]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 bg-[#8B0000] rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-[#8B0000] text-3xl md:text-4xl font-bold">{casoInfo.codigo}</h2>
                      <p className="text-[#666666] text-lg">{casoInfo.nombreCliente}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className={`inline-block px-6 py-3 rounded-full text-base font-semibold border-2 ${getEstadoColor(casoInfo.estado)}`}>
                    {casoInfo.estado}
                  </span>
                  <p className="text-[#666666] text-sm">Última actualización: {casoInfo.ultimaActualizacion}</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#666666] font-semibold">Progreso del caso</span>
                  <span className="text-[#8B0000] font-bold">{casoInfo.porcentajeProgreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${casoInfo.porcentajeProgreso}%` }}
                  ></div>
                </div>
              </div>

              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-[#CCCCCC]">
                <div>
                  <p className="text-[#666666] text-sm font-semibold mb-1">Tipo de Caso</p>
                  <p className="text-[#000000] text-lg font-semibold">{casoInfo.tipoCaso}</p>
                </div>
                <div>
                  <p className="text-[#666666] text-sm font-semibold mb-1">Fecha de Inicio</p>
                  <p className="text-[#000000] text-lg">{casoInfo.fechaInicio}</p>
                </div>
                <div>
                  <p className="text-[#666666] text-sm font-semibold mb-1">Abogado Asignado</p>
                  <p className="text-[#000000] text-lg">{casoInfo.abogadoAsignado}</p>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-6 pt-6 border-t border-[#CCCCCC]">
                <p className="text-[#666666] text-sm font-semibold mb-2">Descripción del Caso</p>
                <p className="text-[#000000] text-base leading-relaxed">{casoInfo.descripcionCaso}</p>
              </div>
            </div>

            {/* Timeline de eventos */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border-2 border-[#8B0000]">
              <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold mb-6">Cronograma de Eventos</h3>
              <div className="relative">
                {casoInfo.eventos.map((evento, index) => (
                  <div key={index} className="relative pb-8 last:pb-0">
                    {index < casoInfo.eventos.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#CCCCCC]"></div>
                    )}
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        evento.tipo === 'completado' ? 'bg-green-500' :
                        evento.tipo === 'en-proceso' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`}>
                        {evento.tipo === 'completado' && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {evento.tipo === 'en-proceso' && (
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                        )}
                        {evento.tipo === 'pendiente' && (
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h4 className="text-[#000000] text-lg font-bold">{evento.titulo}</h4>
                          <span className="text-[#666666] text-sm font-semibold">{evento.fecha}</span>
                        </div>
                        <p className="text-[#666666] text-base leading-relaxed">{evento.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos y Notas - Grid de 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Documentos */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-[#8B0000]">
                <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold mb-6">Documentos</h3>
                <div className="space-y-4">
                  {casoInfo.documentos.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D0] transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.estado === 'aprobado' ? 'bg-green-100' :
                          doc.estado === 'pendiente' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          {doc.estado === 'aprobado' ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[#000000] font-semibold">{doc.nombre}</p>
                          <p className="text-[#666666] text-sm">{doc.tipo} • {doc.fecha}</p>
                        </div>
                      </div>
                      {doc.url && (
                        <button className="text-[#8B0000] hover:text-[#9B0000] font-semibold px-4 py-2 rounded-lg hover:bg-white transition-colors">
                          Ver
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {casoInfo.documentosPendientes.length > 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h4 className="text-yellow-800 text-lg font-bold mb-3">Documentos Pendientes</h4>
                    <ul className="space-y-2">
                      {casoInfo.documentosPendientes.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2 text-yellow-700">
                          <span className="text-yellow-800 mt-1">⚠</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Notas del Abogado */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-[#8B0000]">
                <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold mb-6">Notas del Abogado</h3>
                <div className="space-y-4">
                  {casoInfo.notasAbogado.map((nota, index) => (
                    <div key={index} className="p-4 bg-[#F5F0E8] rounded-lg border-l-4 border-[#8B0000]">
                      <p className="text-[#000000] text-base leading-relaxed">{nota}</p>
                    </div>
                  ))}
                </div>

                {/* Información de contacto */}
                <div className="mt-6 p-4 bg-[#8B0000] rounded-lg text-white">
                  <h4 className="font-bold text-lg mb-3">Información de Contacto</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Abogado:</span> {casoInfo.abogadoAsignado}</p>
                    <p><span className="font-semibold">Email:</span> {casoInfo.emailAbogado}</p>
                    <p><span className="font-semibold">Teléfono:</span> {casoInfo.telefonoAbogado}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
