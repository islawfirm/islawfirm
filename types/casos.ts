// Tipos compartidos para el sistema de casos

export type EstadoCaso = 'En Proceso' | 'Aprobado' | 'Pendiente' | 'Rechazado' | 'Completado';
export type TipoEvento = 'completado' | 'en-proceso' | 'pendiente';
export type EstadoDocumento = 'aprobado' | 'pendiente' | 'rechazado' | 'sin-estado';

export interface Evento {
  id?: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: TipoEvento;
}

export interface Documento {
  id?: string;
  nombre: string;
  tipo: string;
  fecha: string;
  url?: string;
  estado: EstadoDocumento | null; // null o 'sin-estado' para documentos sin estado (cédulas, pasaportes, etc.)
  // Para almacenamiento temporal (base64)
  base64?: string;
  // Para migración futura a Cloudflare
  cloudflareId?: string;
  // Control de visibilidad: solo el cliente puede ver si es true, admin siempre puede ver todos
  visibleParaCliente?: boolean;
}

export interface CasoInfo {
  codigo: string;
  nombreCliente: string;
  tipoCaso: string;
  fechaInicio: string;
  estado: EstadoCaso;
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
  // Campos adicionales para admin
  fechaCreacion?: string;
  fechaModificacion?: string;
  creadoPor?: string;
}

// Tipo para crear un nuevo caso (sin código, se genera automáticamente)
export type CasoNuevo = Omit<CasoInfo, 'codigo' | 'ultimaActualizacion'> & {
  ultimaActualizacion?: string;
};

// Tipo para actualizar un caso
export type CasoUpdate = Partial<CasoInfo> & {
  codigo: string; // El código siempre es requerido para actualizar
};

// Respuesta del servicio
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}


