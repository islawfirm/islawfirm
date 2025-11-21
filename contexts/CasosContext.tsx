'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CasoInfo, CasoNuevo, CasoUpdate, ServiceResponse } from '@/types/casos';
import { CasosService } from '@/services/casosService';

interface CasosContextType {
  casos: Record<string, CasoInfo>;
  loading: boolean;
  error: string | null;
  // CRUD
  getAllCasos: () => Promise<void>;
  getCaso: (codigo: string) => Promise<CasoInfo | null>;
  createCaso: (caso: CasoNuevo) => Promise<ServiceResponse<CasoInfo>>;
  updateCaso: (update: CasoUpdate) => Promise<ServiceResponse<CasoInfo>>;
  deleteCaso: (codigo: string) => Promise<ServiceResponse<boolean>>;
  // Eventos
  addEvento: (codigo: string, evento: Omit<import('@/types/casos').Evento, 'id'>) => Promise<ServiceResponse<CasoInfo>>;
  updateEvento: (codigo: string, eventoId: string, evento: Partial<import('@/types/casos').Evento>) => Promise<ServiceResponse<CasoInfo>>;
  deleteEvento: (codigo: string, eventoId: string) => Promise<ServiceResponse<CasoInfo>>;
  // Documentos
  addDocumento: (codigo: string, documento: Omit<import('@/types/casos').Documento, 'id'>) => Promise<ServiceResponse<CasoInfo>>;
  updateDocumento: (codigo: string, documentoId: string, documento: Partial<import('@/types/casos').Documento>) => Promise<ServiceResponse<CasoInfo>>;
  deleteDocumento: (codigo: string, documentoId: string) => Promise<ServiceResponse<CasoInfo>>;
  // Notas
  addNota: (codigo: string, nota: string) => Promise<ServiceResponse<CasoInfo>>;
  deleteNota: (codigo: string, notaIndex: number) => Promise<ServiceResponse<CasoInfo>>;
}

const CasosContext = createContext<CasosContextType | undefined>(undefined);

export function CasosProvider({ children }: { children: React.ReactNode }) {
  const [casos, setCasos] = useState<Record<string, CasoInfo>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los casos
  const getAllCasos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = CasosService.getAllCasos();
      if (response.success && response.data) {
        setCasos(response.data);
      } else {
        setError(response.error || 'Error al cargar casos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un caso específico
  const getCaso = useCallback(async (codigo: string): Promise<CasoInfo | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = CasosService.getCaso(codigo);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Error al obtener caso');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear caso
  const createCaso = useCallback(async (caso: CasoNuevo): Promise<ServiceResponse<CasoInfo>> => {
    setLoading(true);
    setError(null);
    try {
      const response = CasosService.createCaso(caso);
      if (response.success && response.data) {
        await getAllCasos(); // Recargar lista
      } else {
        setError(response.error || 'Error al crear caso');
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [getAllCasos]);

  // Actualizar caso
  const updateCaso = useCallback(async (update: CasoUpdate): Promise<ServiceResponse<CasoInfo>> => {
    setLoading(true);
    setError(null);
    try {
      const response = CasosService.updateCaso(update);
      if (response.success && response.data) {
        await getAllCasos(); // Recargar lista
      } else {
        setError(response.error || 'Error al actualizar caso');
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [getAllCasos]);

  // Eliminar caso
  const deleteCaso = useCallback(async (codigo: string): Promise<ServiceResponse<boolean>> => {
    setLoading(true);
    setError(null);
    try {
      const response = CasosService.deleteCaso(codigo);
      if (response.success) {
        await getAllCasos(); // Recargar lista
      } else {
        setError(response.error || 'Error al eliminar caso');
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [getAllCasos]);

  // Eventos
  const addEvento = useCallback(async (codigo: string, evento: Omit<import('@/types/casos').Evento, 'id'>): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.addEvento(codigo, evento);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  const updateEvento = useCallback(async (codigo: string, eventoId: string, evento: Partial<import('@/types/casos').Evento>): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.updateEvento(codigo, eventoId, evento);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  const deleteEvento = useCallback(async (codigo: string, eventoId: string): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.deleteEvento(codigo, eventoId);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  // Documentos
  const addDocumento = useCallback(async (codigo: string, documento: Omit<import('@/types/casos').Documento, 'id'>): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.addDocumento(codigo, documento);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  const updateDocumento = useCallback(async (codigo: string, documentoId: string, documento: Partial<import('@/types/casos').Documento>): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.updateDocumento(codigo, documentoId, documento);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  const deleteDocumento = useCallback(async (codigo: string, documentoId: string): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.deleteDocumento(codigo, documentoId);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  // Notas
  const addNota = useCallback(async (codigo: string, nota: string): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.addNota(codigo, nota);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  const deleteNota = useCallback(async (codigo: string, notaIndex: number): Promise<ServiceResponse<CasoInfo>> => {
    const response = await CasosService.deleteNota(codigo, notaIndex);
    if (response.success) {
      await getAllCasos();
    }
    return response;
  }, [getAllCasos]);

  // Cargar casos al montar
  useEffect(() => {
    getAllCasos();
  }, [getAllCasos]);

  const value: CasosContextType = {
    casos,
    loading,
    error,
    getAllCasos,
    getCaso,
    createCaso,
    updateCaso,
    deleteCaso,
    addEvento,
    updateEvento,
    deleteEvento,
    addDocumento,
    updateDocumento,
    deleteDocumento,
    addNota,
    deleteNota,
  };

  return <CasosContext.Provider value={value}>{children}</CasosContext.Provider>;
}

export function useCasos() {
  const context = useContext(CasosContext);
  if (context === undefined) {
    throw new Error('useCasos debe usarse dentro de CasosProvider');
  }
  return context;
}


