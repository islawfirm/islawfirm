// Servicio abstracto para gestión de casos
// Ahora usa localStorage, después se puede cambiar a Supabase fácilmente

import type { 
  CasoInfo, 
  CasoNuevo, 
  CasoUpdate, 
  ServiceResponse,
  Evento,
  Documento
} from '@/types/casos';
import { StorageService } from './storageService';

export class CasosService {
  // Generar código único para nuevo caso
  private static generarCodigo(): string {
    const año = new Date().getFullYear();
    const numero = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `IS-${año}-${numero}`;
  }

  // Validar formato de código
  static validarCodigo(codigo: string): boolean {
    return /^IS-\d{4}-\d{6}$/.test(codigo.trim().toUpperCase());
  }

  // Normalizar código
  static normalizarCodigo(codigo: string): string {
    return codigo.trim().toUpperCase();
  }

  // ============ CRUD OPERATIONS ============

  // Obtener todos los casos
  static getAllCasos(): ServiceResponse<Record<string, CasoInfo>> {
    try {
      const casos = StorageService.getCasos();
      return { success: true, data: casos };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Obtener un caso por código
  static getCaso(codigo: string): ServiceResponse<CasoInfo> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      const casos = StorageService.getCasos();
      const caso = casos[codigoNormalizado];

      if (!caso) {
        return { success: false, error: 'Caso no encontrado' };
      }

      return { success: true, data: caso };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Crear nuevo caso
  static createCaso(casoNuevo: CasoNuevo): ServiceResponse<CasoInfo> {
    try {
      const codigo = this.generarCodigo();
      const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const caso: CasoInfo = {
        ...casoNuevo,
        codigo,
        ultimaActualizacion: fechaActual,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        eventos: casoNuevo.eventos || [],
        documentos: casoNuevo.documentos || [],
        documentosPendientes: casoNuevo.documentosPendientes || [],
        notasAbogado: casoNuevo.notasAbogado || [],
        porcentajeProgreso: casoNuevo.porcentajeProgreso || 0,
      };

      const casos = StorageService.getCasos();
      casos[codigo] = caso;

      if (StorageService.saveCasos(casos)) {
        return { success: true, data: caso };
      } else {
        return { success: false, error: 'Error al guardar el caso' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Actualizar caso existente
  static updateCaso(update: CasoUpdate): ServiceResponse<CasoInfo> {
    try {
      const codigoNormalizado = this.normalizarCodigo(update.codigo!);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      const casos = StorageService.getCasos();
      const casoExistente = casos[codigoNormalizado];

      if (!casoExistente) {
        return { success: false, error: 'Caso no encontrado' };
      }

      const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const casoActualizado: CasoInfo = {
        ...casoExistente,
        ...update,
        codigo: codigoNormalizado,
        ultimaActualizacion: fechaActual,
        fechaModificacion: fechaActual,
      };

      casos[codigoNormalizado] = casoActualizado;

      if (StorageService.saveCasos(casos)) {
        return { success: true, data: casoActualizado };
      } else {
        return { success: false, error: 'Error al guardar los cambios' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Eliminar caso
  static deleteCaso(codigo: string): ServiceResponse<boolean> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      const casos = StorageService.getCasos();
      
      if (!casos[codigoNormalizado]) {
        return { success: false, error: 'Caso no encontrado' };
      }

      delete casos[codigoNormalizado];

      if (StorageService.saveCasos(casos)) {
        return { success: true, data: true };
      } else {
        return { success: false, error: 'Error al eliminar el caso' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // ============ GESTIÓN DE EVENTOS ============

  static addEvento(codigo: string, evento: Omit<Evento, 'id'>): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    const nuevoEvento: Evento = {
      ...evento,
      id: Date.now().toString(),
    };

    caso.eventos.push(nuevoEvento);
    return this.updateCaso({ codigo, eventos: caso.eventos });
  }

  static updateEvento(
    codigo: string, 
    eventoId: string, 
    evento: Partial<Evento>
  ): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    const index = caso.eventos.findIndex(e => e.id === eventoId);
    
    if (index === -1) {
      return { success: false, error: 'Evento no encontrado' };
    }

    caso.eventos[index] = { ...caso.eventos[index], ...evento };
    return this.updateCaso({ codigo, eventos: caso.eventos });
  }

  static deleteEvento(codigo: string, eventoId: string): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    caso.eventos = caso.eventos.filter(e => e.id !== eventoId);
    return this.updateCaso({ codigo, eventos: caso.eventos });
  }

  // ============ GESTIÓN DE DOCUMENTOS ============

  static addDocumento(
    codigo: string, 
    documento: Omit<Documento, 'id'>
  ): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    const nuevoDocumento: Documento = {
      ...documento,
      id: Date.now().toString(),
    };

    caso.documentos.push(nuevoDocumento);
    return this.updateCaso({ codigo, documentos: caso.documentos });
  }

  static updateDocumento(
    codigo: string, 
    documentoId: string, 
    documento: Partial<Documento>
  ): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    const index = caso.documentos.findIndex(d => d.id === documentoId);
    
    if (index === -1) {
      return { success: false, error: 'Documento no encontrado' };
    }

    caso.documentos[index] = { ...caso.documentos[index], ...documento };
    return this.updateCaso({ codigo, documentos: caso.documentos });
  }

  static deleteDocumento(codigo: string, documentoId: string): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    caso.documentos = caso.documentos.filter(d => d.id !== documentoId);
    return this.updateCaso({ codigo, documentos: caso.documentos });
  }

  // ============ GESTIÓN DE NOTAS ============

  static addNota(codigo: string, nota: string): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    caso.notasAbogado.push(nota);
    return this.updateCaso({ codigo, notasAbogado: caso.notasAbogado });
  }

  static deleteNota(codigo: string, notaIndex: number): ServiceResponse<CasoInfo> {
    const response = this.getCaso(codigo);
    if (!response.success || !response.data) {
      return response;
    }

    const caso = response.data;
    caso.notasAbogado = caso.notasAbogado.filter((_, i) => i !== notaIndex);
    return this.updateCaso({ codigo, notasAbogado: caso.notasAbogado });
  }
}

