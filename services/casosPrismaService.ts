/**
 * Servicio para gestión de casos usando Prisma
 * Reemplaza el servicio de localStorage
 */

import { prisma } from '@/lib/prisma';
import type { 
  CasoInfo, 
  CasoNuevo, 
  CasoUpdate, 
  ServiceResponse,
  Evento,
  Documento,
  EstadoCaso,
  TipoEvento,
  EstadoDocumento
} from '@/types/casos';

export class CasosPrismaService {
  // Generar código único para nuevo caso
  private static async generarCodigo(): Promise<string> {
    const año = new Date().getFullYear();
    
    // Buscar el último número de caso del año
    const ultimoCaso = await prisma.caso.findFirst({
      where: {
        codigo: {
          startsWith: `IS-${año}-`
        }
      },
      orderBy: {
        codigo: 'desc'
      }
    });

    let numero = 1;
    if (ultimoCaso) {
      const partes = ultimoCaso.codigo.split('-');
      const ultimoNumero = parseInt(partes[2] || '0', 10);
      numero = ultimoNumero + 1;
    }

    const codigoNumero = numero.toString().padStart(6, '0');
    return `IS-${año}-${codigoNumero}`;
  }

  // Validar formato de código
  static validarCodigo(codigo: string): boolean {
    return /^IS-\d{4}-\d{6}$/.test(codigo.trim().toUpperCase());
  }

  // Normalizar código
  static normalizarCodigo(codigo: string): string {
    return codigo.trim().toUpperCase();
  }

  // Convertir Prisma Caso a CasoInfo
  // soloVisiblesParaCliente: si es true, solo devuelve documentos con visibleParaCliente=true (para clientes)
  // si es false o undefined, devuelve todos los documentos (para admin)
  private static convertirCasoPrismaACasoInfo(caso: any, soloVisiblesParaCliente: boolean = false): CasoInfo {
    // Filtrar documentos según visibilidad
    let documentos = caso.documentos || [];
    if (soloVisiblesParaCliente) {
      documentos = documentos.filter((d: any) => d.visibleParaCliente === true);
    }

    return {
      codigo: caso.codigo,
      nombreCliente: caso.nombreCliente,
      tipoCaso: caso.tipoCaso,
      fechaInicio: this.formatearFecha(caso.fechaInicio),
      estado: caso.estado as EstadoCaso,
      abogadoAsignado: caso.abogadoAsignado,
      emailAbogado: caso.emailAbogado,
      telefonoAbogado: caso.telefonoAbogado,
      ultimaActualizacion: this.formatearFecha(caso.ultimaActualizacion),
      descripcionCaso: caso.descripcionCaso || '',
      eventos: caso.eventos.map((e: any) => ({
        id: e.id,
        fecha: this.formatearFecha(e.fecha),
        titulo: e.titulo,
        descripcion: e.descripcion,
        tipo: e.tipo as TipoEvento
      })),
      documentos: documentos.map((d: any) => ({
        id: d.id,
        nombre: d.nombre,
        tipo: d.tipo,
        fecha: this.formatearFecha(d.fecha),
        url: d.url || undefined,
        estado: (d.estado || null) as EstadoDocumento | null,
        base64: d.base64 || undefined,
        cloudflareId: d.cloudflareId || undefined,
        visibleParaCliente: d.visibleParaCliente ?? false
      })),
      documentosPendientes: caso.documentosPendientes || [],
      notasAbogado: caso.notasAbogado || [],
      imagenCaso: caso.imagenCaso || undefined,
      porcentajeProgreso: caso.porcentajeProgreso,
      fechaCreacion: this.formatearFecha(caso.fechaCreacion),
      fechaModificacion: this.formatearFecha(caso.fechaModificacion),
      creadoPor: caso.creadoPor || undefined
    };
  }

  // Formatear fecha a formato legible
  private static formatearFecha(fecha: Date | string): string {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Calcular progreso basado en eventos
  private static calcularProgreso(eventos: Evento[]): number {
    if (eventos.length === 0) return 0;
    const completados = eventos.filter(e => e.tipo === 'completado').length;
    return Math.round((completados / eventos.length) * 100);
  }

  // ============ CRUD OPERATIONS ============

  // Obtener todos los casos
  static async getAllCasos(): Promise<ServiceResponse<CasoInfo[]>> {
    try {
      const casos = await prisma.caso.findMany({
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        },
        orderBy: {
          fechaCreacion: 'desc'
        }
      });

      const casosInfo = casos.map(caso => this.convertirCasoPrismaACasoInfo(caso));
      return { success: true, data: casosInfo };
    } catch (error) {
      console.error('Error al obtener casos:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Obtener un caso por código
  // soloVisiblesParaCliente: si es true, solo devuelve documentos visibles para el cliente (para página pública)
  // si es false o undefined, devuelve todos los documentos (para admin)
  static async getCaso(codigo: string, soloVisiblesParaCliente: boolean = false): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        }
      });

      if (!caso) {
        return { success: false, error: 'Caso no encontrado' };
      }

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso, soloVisiblesParaCliente) };
    } catch (error) {
      console.error('Error al obtener caso:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Crear nuevo caso
  static async createCaso(casoNuevo: CasoNuevo, creadoPor?: string): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigo = await this.generarCodigo();
      const fechaInicio = new Date(casoNuevo.fechaInicio);

      // Calcular progreso inicial
      const progreso = casoNuevo.eventos && casoNuevo.eventos.length > 0
        ? this.calcularProgreso(casoNuevo.eventos)
        : 0;

      const caso = await prisma.caso.create({
        data: {
          codigo,
          nombreCliente: casoNuevo.nombreCliente,
          tipoCaso: casoNuevo.tipoCaso,
          fechaInicio,
          estado: casoNuevo.estado,
          abogadoAsignado: casoNuevo.abogadoAsignado,
          emailAbogado: casoNuevo.emailAbogado,
          telefonoAbogado: casoNuevo.telefonoAbogado,
          descripcionCaso: casoNuevo.descripcionCaso || '',
          documentosPendientes: casoNuevo.documentosPendientes || [],
          notasAbogado: casoNuevo.notasAbogado || [],
          imagenCaso: casoNuevo.imagenCaso,
          porcentajeProgreso: progreso,
          creadoPor,
          eventos: {
            create: (casoNuevo.eventos || []).map(evento => ({
              fecha: new Date(evento.fecha),
              titulo: evento.titulo,
              descripcion: evento.descripcion,
              tipo: evento.tipo
            }))
          },
          documentos: {
            create: (casoNuevo.documentos || []).map(doc => ({
              nombre: doc.nombre,
              tipo: doc.tipo,
              fecha: new Date(doc.fecha),
              url: doc.url,
              estado: doc.estado,
              base64: doc.base64,
              cloudflareId: doc.cloudflareId,
              visibleParaCliente: doc.visibleParaCliente ?? false
            }))
          }
        },
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso) };
    } catch (error) {
      console.error('Error al crear caso:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Actualizar caso existente
  static async updateCaso(update: CasoUpdate): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(update.codigo!);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      // Obtener caso actual para calcular progreso
      const casoActual = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: { eventos: true }
      });

      if (!casoActual) {
        return { success: false, error: 'Caso no encontrado' };
      }

      // Calcular progreso si hay eventos actualizados
      let progreso = casoActual.porcentajeProgreso;
      if (update.eventos) {
        progreso = this.calcularProgreso(update.eventos);
      }

      const dataUpdate: any = {};
      
      if (update.nombreCliente !== undefined) dataUpdate.nombreCliente = update.nombreCliente;
      if (update.tipoCaso !== undefined) dataUpdate.tipoCaso = update.tipoCaso;
      if (update.fechaInicio !== undefined) dataUpdate.fechaInicio = new Date(update.fechaInicio);
      if (update.estado !== undefined) dataUpdate.estado = update.estado;
      if (update.abogadoAsignado !== undefined) dataUpdate.abogadoAsignado = update.abogadoAsignado;
      if (update.emailAbogado !== undefined) dataUpdate.emailAbogado = update.emailAbogado;
      if (update.telefonoAbogado !== undefined) dataUpdate.telefonoAbogado = update.telefonoAbogado;
      if (update.descripcionCaso !== undefined) dataUpdate.descripcionCaso = update.descripcionCaso;
      if (update.documentosPendientes !== undefined) dataUpdate.documentosPendientes = update.documentosPendientes;
      if (update.notasAbogado !== undefined) dataUpdate.notasAbogado = update.notasAbogado;
      if (update.imagenCaso !== undefined) dataUpdate.imagenCaso = update.imagenCaso;
      if (update.porcentajeProgreso !== undefined) dataUpdate.porcentajeProgreso = update.porcentajeProgreso;
      else dataUpdate.porcentajeProgreso = progreso;

      const caso = await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: dataUpdate,
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso) };
    } catch (error) {
      console.error('Error al actualizar caso:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // Eliminar caso
  static async deleteCaso(codigo: string): Promise<ServiceResponse<boolean>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      if (!this.validarCodigo(codigoNormalizado)) {
        return { success: false, error: 'Formato de código inválido' };
      }

      await prisma.caso.delete({
        where: { codigo: codigoNormalizado }
      });

      return { success: true, data: true };
    } catch (error) {
      console.error('Error al eliminar caso:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // ============ GESTIÓN DE EVENTOS ============

  static async addEvento(codigo: string, evento: Omit<Evento, 'id'>): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const caso = await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: {
          eventos: {
            create: {
              fecha: new Date(evento.fecha),
              titulo: evento.titulo,
              descripcion: evento.descripcion,
              tipo: evento.tipo
            }
          }
        },
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        }
      });

      // Recalcular progreso
      const eventos = caso.eventos.map(e => ({
        id: e.id,
        fecha: this.formatearFecha(e.fecha),
        titulo: e.titulo,
        descripcion: e.descripcion,
        tipo: e.tipo as TipoEvento
      }));
      const progreso = this.calcularProgreso(eventos);

      await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: { porcentajeProgreso: progreso }
      });

      const casoActualizado = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(casoActualizado!) };
    } catch (error) {
      console.error('Error al agregar evento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  static async updateEvento(
    codigo: string, 
    eventoId: string, 
    evento: Partial<Evento>
  ): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const dataUpdate: any = {};
      if (evento.fecha !== undefined) dataUpdate.fecha = new Date(evento.fecha);
      if (evento.titulo !== undefined) dataUpdate.titulo = evento.titulo;
      if (evento.descripcion !== undefined) dataUpdate.descripcion = evento.descripcion;
      if (evento.tipo !== undefined) dataUpdate.tipo = evento.tipo;

      await prisma.evento.update({
        where: { id: eventoId },
        data: dataUpdate
      });

      // Recalcular progreso
      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: { eventos: true }
      });

      if (caso) {
        const eventos = caso.eventos.map(e => ({
          id: e.id,
          fecha: this.formatearFecha(e.fecha),
          titulo: e.titulo,
          descripcion: e.descripcion,
          tipo: e.tipo as TipoEvento
        }));
        const progreso = this.calcularProgreso(eventos);

        await prisma.caso.update({
          where: { codigo: codigoNormalizado },
          data: { porcentajeProgreso: progreso }
        });
      }

      const casoActualizado = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(casoActualizado!) };
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  static async deleteEvento(codigo: string, eventoId: string): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      await prisma.evento.delete({
        where: { id: eventoId }
      });

      // Recalcular progreso
      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: { eventos: true }
      });

      if (caso) {
        const eventos = caso.eventos.map(e => ({
          id: e.id,
          fecha: this.formatearFecha(e.fecha),
          titulo: e.titulo,
          descripcion: e.descripcion,
          tipo: e.tipo as TipoEvento
        }));
        const progreso = this.calcularProgreso(eventos);

        await prisma.caso.update({
          where: { codigo: codigoNormalizado },
          data: { porcentajeProgreso: progreso }
        });
      }

      const casoActualizado = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(casoActualizado!) };
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // ============ GESTIÓN DE DOCUMENTOS ============

  static async addDocumento(
    codigo: string, 
    documento: Omit<Documento, 'id'>
  ): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const caso = await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: {
          documentos: {
            create: {
              nombre: documento.nombre,
              tipo: documento.tipo,
              fecha: new Date(documento.fecha),
              url: documento.url,
              estado: documento.estado,
              base64: documento.base64,
              cloudflareId: documento.cloudflareId,
              visibleParaCliente: documento.visibleParaCliente ?? false
            }
          }
        },
        include: {
          eventos: {
            orderBy: { fecha: 'asc' }
          },
          documentos: {
            orderBy: { fecha: 'desc' }
          }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso) };
    } catch (error) {
      console.error('Error al agregar documento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  static async updateDocumento(
    codigo: string, 
    documentoId: string, 
    documento: Partial<Documento>
  ): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const dataUpdate: any = {};
      if (documento.nombre !== undefined) dataUpdate.nombre = documento.nombre;
      if (documento.tipo !== undefined) dataUpdate.tipo = documento.tipo;
      if (documento.fecha !== undefined) dataUpdate.fecha = new Date(documento.fecha);
      if (documento.url !== undefined) dataUpdate.url = documento.url;
      if (documento.estado !== undefined) dataUpdate.estado = documento.estado;
      if (documento.base64 !== undefined) dataUpdate.base64 = documento.base64;
      if (documento.cloudflareId !== undefined) dataUpdate.cloudflareId = documento.cloudflareId;

      await prisma.documento.update({
        where: { id: documentoId },
        data: dataUpdate
      });

      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso!) };
    } catch (error) {
      console.error('Error al actualizar documento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  static async deleteDocumento(codigo: string, documentoId: string): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      await prisma.documento.delete({
        where: { id: documentoId }
      });

      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(caso!) };
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  // ============ GESTIÓN DE NOTAS ============

  static async addNota(codigo: string, nota: string): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado }
      });

      if (!caso) {
        return { success: false, error: 'Caso no encontrado' };
      }

      const notasActualizadas = [...(caso.notasAbogado || []), nota];

      const casoActualizado = await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: { notasAbogado: notasActualizadas },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(casoActualizado) };
    } catch (error) {
      console.error('Error al agregar nota:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }

  static async deleteNota(codigo: string, notaIndex: number): Promise<ServiceResponse<CasoInfo>> {
    try {
      const codigoNormalizado = this.normalizarCodigo(codigo);
      
      const caso = await prisma.caso.findUnique({
        where: { codigo: codigoNormalizado }
      });

      if (!caso) {
        return { success: false, error: 'Caso no encontrado' };
      }

      const notasActualizadas = (caso.notasAbogado || []).filter((_, i) => i !== notaIndex);

      const casoActualizado = await prisma.caso.update({
        where: { codigo: codigoNormalizado },
        data: { notasAbogado: notasActualizadas },
        include: {
          eventos: { orderBy: { fecha: 'asc' } },
          documentos: { orderBy: { fecha: 'desc' } }
        }
      });

      return { success: true, data: this.convertirCasoPrismaACasoInfo(casoActualizado) };
    } catch (error) {
      console.error('Error al eliminar nota:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  }
}

