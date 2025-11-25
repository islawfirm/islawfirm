'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import type { CasoInfo, Evento, Documento, EstadoCaso, TipoEvento, EstadoDocumento } from '@/types/casos';

export default function CasoDetallePage() {
  const router = useRouter();
  const params = useParams();
  const codigo = params.codigo as string;

  const [caso, setCaso] = useState<CasoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'eventos' | 'documentos' | 'pendientes' | 'notas'>('info');
  const [saving, setSaving] = useState(false);

  // Estados para edición
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<CasoInfo>>({});

  // Estados para agregar elementos
  const [nuevoEvento, setNuevoEvento] = useState<Omit<Evento, 'id'>>({
    fecha: new Date().toISOString().split('T')[0],
    titulo: '',
    descripcion: '',
    tipo: 'pendiente' as TipoEvento,
  });
  const [nuevoDocumentoPendiente, setNuevoDocumentoPendiente] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');

  useEffect(() => {
    loadCaso();
  }, [codigo]);

  const loadCaso = async () => {
    try {
      const response = await fetch(`/api/casos/${codigo}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setCaso(data.data);
        setEditData(data.data);
      } else {
        setError(data.error || 'Caso no encontrado');
      }
    } catch (err) {
      console.error('Error al cargar caso:', err);
      setError('Error al cargar el caso');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInfo = async () => {
    if (!caso) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setEditMode(false);
        setError(null);
      } else {
        setError(data.error || 'Error al guardar');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const handleAddEvento = async () => {
    if (!nuevoEvento.titulo || !nuevoEvento.fecha) {
      alert('Complete el título y fecha del evento');
      return;
    }

    try {
      const response = await fetch(`/api/casos/${codigo}/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evento: nuevoEvento }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setNuevoEvento({
          fecha: new Date().toISOString().split('T')[0],
          titulo: '',
          descripcion: '',
          tipo: 'pendiente' as TipoEvento,
        });
      } else {
        setError(data.error || 'Error al agregar evento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleDeleteEvento = async (eventoId: string) => {
    if (!confirm('¿Eliminar este evento?')) return;

    try {
      const response = await fetch(`/api/casos/${codigo}/eventos/${eventoId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
      } else {
        setError(data.error || 'Error al eliminar evento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleAddDocumentoPendiente = async () => {
    if (!nuevoDocumentoPendiente.trim()) return;

    if (!caso) return;
    const nuevos = [...(caso.documentosPendientes || []), nuevoDocumentoPendiente];
    
    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentosPendientes: nuevos }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setNuevoDocumentoPendiente('');
      } else {
        setError(data.error || 'Error al agregar documento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleRemoveDocumentoPendiente = async (index: number) => {
    if (!caso) return;
    const nuevos = caso.documentosPendientes.filter((_, i) => i !== index);
    
    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentosPendientes: nuevos }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
      } else {
        setError(data.error || 'Error al eliminar documento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleAddNota = async () => {
    if (!nuevaNota.trim()) return;

    try {
      const response = await fetch(`/api/casos/${codigo}/notas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota: nuevaNota }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setNuevaNota('');
      } else {
        setError(data.error || 'Error al agregar nota');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleDeleteNota = async (index: number) => {
    if (!confirm('¿Eliminar esta nota?')) return;

    try {
      const response = await fetch(`/api/casos/${codigo}/notas/${index}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
      } else {
        setError(data.error || 'Error al eliminar nota');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleDeleteCaso = async () => {
    if (!confirm(`¿Está seguro de eliminar el caso ${codigo}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/admin/dashboard/casos');
      } else {
        setError(data.error || 'Error al eliminar caso');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B0000]"></div>
          <p className="mt-4 text-gray-600">Cargando caso...</p>
        </div>
      </div>
    );
  }

  if (error && !caso) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/dashboard/casos"
          className="text-[#8B0000] hover:text-[#9B0000] inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Casos
        </Link>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!caso) return null;

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

  const estados: EstadoCaso[] = ['Pendiente', 'En Proceso', 'Aprobado', 'Rechazado', 'Completado'];
  const tiposEvento: TipoEvento[] = ['completado', 'en-proceso', 'pendiente'];
  const estadosDocumento: EstadoDocumento[] = ['aprobado', 'pendiente', 'rechazado'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard/casos"
            className="text-[#8B0000] hover:text-[#9B0000] mb-4 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Casos
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-serif font-bold text-gray-900">{caso.codigo}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getEstadoColor(caso.estado)}`}>
              {caso.estado}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{caso.nombreCliente}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/dashboard/casos/${codigo}/editar`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </Link>
          <button
            onClick={handleDeleteCaso}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Barra de progreso */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-semibold">Progreso del Caso</span>
          <span className="text-[#8B0000] font-bold text-xl">{caso.porcentajeProgreso}%</span>
        </div>
        <div className="w-full bg-gray-200/50 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] h-4 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${caso.porcentajeProgreso}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'info', name: 'Información', icon: '📋' },
              { id: 'eventos', name: 'Eventos', icon: '📅' },
              { id: 'documentos', name: 'Documentos', icon: '📄' },
              { id: 'pendientes', name: 'Pendientes', icon: '⚠️' },
              { id: 'notas', name: 'Notas', icon: '📝' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#8B0000] text-[#8B0000]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Información */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {editMode ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Cliente</label>
                      <input
                        type="text"
                        value={editData.nombreCliente || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, nombreCliente: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Caso</label>
                      <input
                        type="text"
                        value={editData.tipoCaso || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, tipoCaso: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                      <input
                        type="date"
                        value={editData.fechaInicio ? new Date(editData.fechaInicio).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, fechaInicio: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <select
                        value={editData.estado || 'Pendiente'}
                        onChange={(e) => setEditData(prev => ({ ...prev, estado: e.target.value as EstadoCaso }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      >
                        {estados.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Abogado Asignado</label>
                      <input
                        type="text"
                        value={editData.abogadoAsignado || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, abogadoAsignado: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email del Abogado</label>
                      <input
                        type="email"
                        value={editData.emailAbogado || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, emailAbogado: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del Abogado</label>
                      <input
                        type="tel"
                        value={editData.telefonoAbogado || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, telefonoAbogado: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      value={editData.descripcionCaso || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, descripcionCaso: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveInfo}
                      disabled={saving}
                      className="px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditData(caso);
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nombre del Cliente</p>
                      <p className="text-lg font-semibold text-gray-900">{caso.nombreCliente}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tipo de Caso</p>
                      <p className="text-lg font-semibold text-gray-900">{caso.tipoCaso}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fecha de Inicio</p>
                      <p className="text-lg text-gray-900">{caso.fechaInicio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Abogado Asignado</p>
                      <p className="text-lg text-gray-900">{caso.abogadoAsignado}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email del Abogado</p>
                      <p className="text-lg text-gray-900">{caso.emailAbogado}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Teléfono del Abogado</p>
                      <p className="text-lg text-gray-900">{caso.telefonoAbogado}</p>
                    </div>
                  </div>
                  {caso.descripcionCaso && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Descripción</p>
                      <p className="text-gray-900">{caso.descripcionCaso}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                  >
                    Editar Información
                  </button>
                </>
              )}
            </div>
          )}

          {/* Tab: Eventos */}
          {activeTab === 'eventos' && (
            <div className="space-y-6">
              {/* Formulario para agregar evento */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Agregar Nuevo Evento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <input
                      type="date"
                      value={nuevoEvento.fecha}
                      onChange={(e) => setNuevoEvento(prev => ({ ...prev, fecha: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                    <select
                      value={nuevoEvento.tipo}
                      onChange={(e) => setNuevoEvento(prev => ({ ...prev, tipo: e.target.value as TipoEvento }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                    >
                      {tiposEvento.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo === 'completado' ? 'Completado' : tipo === 'en-proceso' ? 'En Proceso' : 'Pendiente'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={nuevoEvento.titulo}
                      onChange={(e) => setNuevoEvento(prev => ({ ...prev, titulo: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                      placeholder="Ej: Caso iniciado"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      value={nuevoEvento.descripcion}
                      onChange={(e) => setNuevoEvento(prev => ({ ...prev, descripcion: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                      placeholder="Descripción del evento..."
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddEvento}
                  className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                >
                  Agregar Evento
                </button>
              </div>

              {/* Lista de eventos */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Timeline de Eventos</h3>
                {caso.eventos && caso.eventos.length > 0 ? (
                  <div className="relative">
                    {caso.eventos.map((evento, index) => (
                      <div key={evento.id || index} className="relative pb-8 last:pb-0">
                        {index < caso.eventos.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300"></div>
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
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-bold text-gray-900">{evento.titulo}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{evento.fecha}</span>
                                <button
                                  onClick={() => evento.id && handleDeleteEvento(evento.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-600">{evento.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay eventos registrados</p>
                )}
              </div>
            </div>
          )}

          {/* Tab: Documentos */}
          {activeTab === 'documentos' && (
            <div className="space-y-6">
              {/* Formulario para subir documento */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">Subir Nuevo Documento</h3>
                    <p className="text-sm text-gray-600 mt-1">Agregue documentos relacionados con este caso</p>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
                    const file = fileInput?.files?.[0];
                    
                    if (!file) {
                      alert('Por favor selecciona un archivo');
                      return;
                    }

                    try {
                      setLoading(true);
                      
                      // Subir archivo a R2
                      const uploadFormData = new FormData();
                      uploadFormData.append('file', file);
                      
                      const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadFormData,
                      });
                      
                      const uploadData = await uploadResponse.json();
                      
                      if (!uploadData.success) {
                        throw new Error(uploadData.error || 'Error al subir el archivo');
                      }

                      // Crear el documento en la base de datos
                      const estadoSeleccionado = formData.get('estado') as string;
                      const documentoData = {
                        nombre: formData.get('nombre') as string || file.name,
                        tipo: formData.get('tipoDocumento') as string || 'Documento',
                        fecha: (formData.get('fecha') as string) || new Date().toISOString().split('T')[0],
                        estado: estadoSeleccionado === 'sin-estado' ? null : (estadoSeleccionado || 'pendiente'),
                        cloudflareId: uploadData.data.key,
                        visibleParaCliente: formData.get('visibleParaCliente') === 'on',
                      };

                      const docResponse = await fetch(`/api/casos/${caso.codigo}/documentos`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ documento: documentoData }),
                      });

                      const docData = await docResponse.json();
                      
                      if (docData.success) {
                        loadCaso();
                        e.currentTarget.reset();
                        // Mostrar mensaje de éxito
                        const successMsg = document.createElement('div');
                        successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
                        successMsg.innerHTML = `
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span class="font-semibold">Documento subido exitosamente</span>
                        `;
                        document.body.appendChild(successMsg);
                        setTimeout(() => {
                          successMsg.remove();
                        }, 3000);
                      } else {
                        throw new Error(docData.error || 'Error al guardar el documento');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      alert(error instanceof Error ? error.message : 'Error al subir el documento');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="space-y-6"
                >
                  {/* Primera fila: Tipo de Documento y Estado */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Documento *
                      </label>
                      <select
                        name="tipoDocumento"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900 font-medium"
                      >
                        <option value="">Seleccione el tipo de documento</option>
                        <option value="Cédula">Cédula</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Formato de Visa">Formato de Visa</option>
                        <option value="Certificado de Antecedentes Penales">Certificado de Antecedentes Penales</option>
                        <option value="Certificado de Nacimiento">Certificado de Nacimiento</option>
                        <option value="Certificado de Matrimonio">Certificado de Matrimonio</option>
                        <option value="Diploma o Título">Diploma o Título</option>
                        <option value="Certificado de Estudios">Certificado de Estudios</option>
                        <option value="Extracto Bancario">Extracto Bancario</option>
                        <option value="Carta de Recomendación">Carta de Recomendación</option>
                        <option value="Contrato">Contrato</option>
                        <option value="Otro">Otro</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Seleccione el tipo de documento que está subiendo</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado del Documento
                      </label>
                      <select
                        name="estado"
                        defaultValue="sin-estado"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900 font-medium"
                      >
                        <option value="sin-estado">Sin Estado (Cédula, Pasaporte, etc.)</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Documentos como cédulas y pasaportes no requieren estado
                      </p>
                    </div>
                  </div>

                  {/* Segunda fila: Nombre y Fecha */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Documento *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
                        placeholder="Ej: Pasaporte actualizado 2024"
                      />
                      <p className="text-xs text-gray-500 mt-1">Nombre descriptivo para identificar el documento</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha del Documento *
                      </label>
                      <input
                        type="date"
                        name="fecha"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
                      />
                      <p className="text-xs text-gray-500 mt-1">Fecha de emisión o relevancia del documento</p>
                    </div>
                  </div>

                  {/* Tercera fila: Archivo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Archivo a Subir *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B0000] file:text-white hover:file:bg-[#9B0000] file:cursor-pointer"
                      />
                    </div>
                    <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">Requisitos del archivo:</p>
                          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li>Tamaño máximo: 10MB</li>
                            <li>Formatos permitidos: JPG, PNG, GIF, WEBP, PDF, DOC, DOCX, XLS, XLSX</li>
                            <li>El archivo se almacenará de forma segura y privada</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox de visibilidad para el cliente */}
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <input
                      type="checkbox"
                      name="visibleParaCliente"
                      id="visibleParaCliente"
                      className="mt-1 w-5 h-5 text-[#8B0000] border-gray-300 rounded focus:ring-[#8B0000] cursor-pointer"
                    />
                    <div>
                      <label htmlFor="visibleParaCliente" className="block text-sm font-semibold text-yellow-800 mb-1 cursor-pointer">
                        Visible para el Cliente
                      </label>
                      <p className="text-xs text-yellow-700">
                        Si está marcado, el cliente podrá ver este documento cuando consulte su caso. Si no está marcado, solo el administrador podrá verlo.
                      </p>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget.closest('form');
                        if (form) form.reset();
                      }}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Limpiar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-[#8B0000] to-[#9B0000] text-white rounded-lg hover:from-[#9B0000] hover:to-[#8B0000] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subiendo...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Subir Documento
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de documentos */}
              <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-xl font-serif font-bold text-gray-900">Documentos del Caso</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {caso.documentos && caso.documentos.length > 0 
                      ? `${caso.documentos.length} documento(s) registrado(s)`
                      : 'No hay documentos registrados'}
                  </p>
                </div>

                {caso.documentos && caso.documentos.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {caso.documentos.map((doc, index) => (
                      <div key={doc.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Icono de estado */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              !doc.estado || doc.estado === 'sin-estado' ? 'bg-gray-100' :
                              doc.estado === 'aprobado' ? 'bg-green-100' :
                              doc.estado === 'pendiente' ? 'bg-yellow-100' :
                              'bg-red-100'
                            }`}>
                              {!doc.estado || doc.estado === 'sin-estado' ? (
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              ) : doc.estado === 'aprobado' ? (
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : doc.estado === 'pendiente' ? (
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>

                            {/* Información del documento */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{doc.nombre}</h4>
                                {doc.estado && doc.estado !== 'sin-estado' && (
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                    doc.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                                    doc.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {doc.estado}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                  </svg>
                                  {doc.tipo}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {doc.fecha}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Acciones */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {(doc.url || doc.cloudflareId) && (
                              <button
                                onClick={async () => {
                                  if (!doc.url && doc.cloudflareId) {
                                    try {
                                      const response = await fetch(`/api/documents/${encodeURIComponent(doc.cloudflareId)}?expiresIn=3600`);
                                      const data = await response.json();
                                      if (data.success && data.data.url) {
                                        window.open(data.data.url, '_blank');
                                      } else {
                                        alert('Error al generar enlace del documento');
                                      }
                                    } catch (error) {
                                      console.error('Error:', error);
                                      alert('Error al acceder al documento');
                                    }
                                  } else if (doc.url) {
                                    window.open(doc.url, '_blank');
                                  }
                                }}
                                className="p-2 text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-lg transition-colors"
                                title="Ver documento"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                const estadoActual = doc.estado || 'sin-estado';
                                const nuevoEstado = prompt(
                                  `Cambiar estado del documento "${doc.nombre}"\n\nOpciones: sin-estado, aprobado, pendiente, rechazado`,
                                  estadoActual
                                );
                                if (nuevoEstado && ['sin-estado', 'aprobado', 'pendiente', 'rechazado'].includes(nuevoEstado.toLowerCase())) {
                                  try {
                                    const estadoFinal = nuevoEstado.toLowerCase() === 'sin-estado' ? null : nuevoEstado.toLowerCase();
                                    const response = await fetch(`/api/casos/${caso.codigo}/documentos/${doc.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                        documento: { estado: estadoFinal }
                                      }),
                                    });
                                    const data = await response.json();
                                    if (data.success) {
                                      loadCaso();
                                    } else {
                                      alert(data.error || 'Error al actualizar el documento');
                                    }
                                  } catch (error) {
                                    console.error('Error:', error);
                                    alert('Error al actualizar el documento');
                                  }
                                }
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar estado"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`¿Está seguro de eliminar el documento "${doc.nombre}"? Esta acción no se puede deshacer.`)) {
                                  try {
                                    const response = await fetch(`/api/casos/${caso.codigo}/documentos/${doc.id}`, {
                                      method: 'DELETE',
                                    });
                                    const data = await response.json();
                                    if (data.success) {
                                      loadCaso();
                                    } else {
                                      alert(data.error || 'Error al eliminar el documento');
                                    }
                                  } catch (error) {
                                    console.error('Error:', error);
                                    alert('Error al eliminar el documento');
                                  }
                                }
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar documento"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium mb-2">No hay documentos registrados</p>
                    <p className="text-sm text-gray-400">Sube un documento usando el formulario de arriba</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Documentos Pendientes */}
          {activeTab === 'pendientes' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Agregar Documento Pendiente</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevoDocumentoPendiente}
                    onChange={(e) => setNuevoDocumentoPendiente(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDocumentoPendiente())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                    placeholder="Ej: Certificado de antecedentes penales"
                  />
                  <button
                    onClick={handleAddDocumentoPendiente}
                    className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {caso.documentosPendientes && caso.documentosPendientes.length > 0 ? (
                <div className="space-y-2">
                  {caso.documentosPendientes.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-gray-900">{doc}</span>
                      <button
                        onClick={() => handleRemoveDocumentoPendiente(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No hay documentos pendientes</p>
              )}
            </div>
          )}

          {/* Tab: Notas */}
          {activeTab === 'notas' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Agregar Nota</h3>
                <div className="space-y-2">
                  <textarea
                    value={nuevaNota}
                    onChange={(e) => setNuevaNota(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                    placeholder="Escriba una nota sobre el caso..."
                  />
                  <button
                    onClick={handleAddNota}
                    className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                  >
                    Agregar Nota
                  </button>
                </div>
              </div>

              {caso.notasAbogado && caso.notasAbogado.length > 0 ? (
                <div className="space-y-3">
                  {caso.notasAbogado.map((nota, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-[#8B0000]">
                      <p className="flex-1 text-gray-900">{nota}</p>
                      <button
                        onClick={() => handleDeleteNota(index)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No hay notas registradas</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

