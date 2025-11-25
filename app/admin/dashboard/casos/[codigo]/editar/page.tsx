'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/services/authService';
import type { CasoInfo, Evento, EstadoCaso, TipoEvento } from '@/types/casos';

export default function EditarCasoPage() {
  const router = useRouter();
  const params = useParams();
  const codigo = params.codigo as string;

  const [caso, setCaso] = useState<CasoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(1);

  const [formData, setFormData] = useState<Partial<CasoInfo>>({});
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
        setFormData(data.data);
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

  const handleInputChange = (field: keyof CasoInfo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEvento = async () => {
    if (!nuevoEvento.titulo || !nuevoEvento.fecha) {
      alert('Por favor complete el título y fecha del evento');
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
        setFormData(data.data);
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

  const handleRemoveEvento = async (eventoId: string) => {
    if (!confirm('¿Eliminar este evento?')) return;

    try {
      const response = await fetch(`/api/casos/${codigo}/eventos/${eventoId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setFormData(data.data);
      } else {
        setError(data.error || 'Error al eliminar evento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleAddDocumentoPendiente = async () => {
    if (!nuevoDocumentoPendiente.trim()) return;
    
    const documentos = [...(formData.documentosPendientes || []), nuevoDocumentoPendiente];
    handleInputChange('documentosPendientes', documentos);
    
    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentosPendientes: documentos }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setFormData(data.data);
        setNuevoDocumentoPendiente('');
      } else {
        setError(data.error || 'Error al agregar documento');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleRemoveDocumentoPendiente = async (index: number) => {
    const documentos = (formData.documentosPendientes || []).filter((_, i) => i !== index);
    handleInputChange('documentosPendientes', documentos);
    
    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentosPendientes: documentos }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setFormData(data.data);
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
        setFormData(data.data);
        setNuevaNota('');
      } else {
        setError(data.error || 'Error al agregar nota');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleRemoveNota = async (index: number) => {
    if (!confirm('¿Eliminar esta nota?')) return;

    try {
      const response = await fetch(`/api/casos/${codigo}/notas/${index}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCaso(data.data);
        setFormData(data.data);
      } else {
        setError(data.error || 'Error al eliminar nota');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Redirigir a la vista del caso
        router.push(`/admin/dashboard/casos/${codigo}`);
      } else {
        setError(data.error || 'Error al actualizar el caso');
        setSaving(false);
      }
    } catch (err) {
      console.error('Error al actualizar caso:', err);
      setError('Error de conexión. Por favor, intente nuevamente.');
      setSaving(false);
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

  const estados: EstadoCaso[] = ['Pendiente', 'En Proceso', 'Aprobado', 'Rechazado', 'Completado'];
  const tiposEvento: TipoEvento[] = ['completado', 'en-proceso', 'pendiente'];

  // Función helper para formatear fechas de manera segura
  const formatDateForInput = (dateValue: any): string => {
    if (!dateValue) return '';
    
    try {
      // Si ya es una cadena en formato YYYY-MM-DD, devolverla directamente
      if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue;
      }
      
      // Intentar crear un objeto Date
      const date = new Date(dateValue);
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return '';
      }
      
      // Formatear a YYYY-MM-DD
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  };

  const sections = [
    { id: 1, name: 'Información Básica', icon: '📋' },
    { id: 2, name: 'Eventos', icon: '📅' },
    { id: 3, name: 'Documentos Pendientes', icon: '📄' },
    { id: 4, name: 'Notas', icon: '📝' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/admin/dashboard/casos/${codigo}`}
            className="text-[#8B0000] hover:text-[#9B0000] mb-4 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Caso
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Editar Caso: {codigo}</h1>
          <p className="text-gray-600 mt-1">{caso.nombreCliente}</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Navegación de secciones */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-[#8B0000] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{section.icon}</span>
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sección 1: Información Básica */}
        {activeSection === 1 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Información Básica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Cliente <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nombreCliente || ''}
                  onChange={(e) => handleInputChange('nombreCliente', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Caso <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tipoCaso || ''}
                  onChange={(e) => handleInputChange('tipoCaso', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formatDateForInput(formData.fechaInicio)}
                  onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.estado || 'Pendiente'}
                  onChange={(e) => handleInputChange('estado', e.target.value as EstadoCaso)}
                  required
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
                  value={formData.abogadoAsignado || ''}
                  onChange={(e) => handleInputChange('abogadoAsignado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email del Abogado</label>
                <input
                  type="email"
                  value={formData.emailAbogado || ''}
                  onChange={(e) => handleInputChange('emailAbogado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del Abogado</label>
                <input
                  type="tel"
                  value={formData.telefonoAbogado || ''}
                  onChange={(e) => handleInputChange('telefonoAbogado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Caso</label>
              <textarea
                value={formData.descripcionCaso || ''}
                onChange={(e) => handleInputChange('descripcionCaso', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Sección 2: Eventos */}
        {activeSection === 2 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Eventos
            </h2>

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
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={nuevoEvento.descripcion}
                    onChange={(e) => setNuevoEvento(prev => ({ ...prev, descripcion: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddEvento}
                className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
              >
                Agregar Evento
              </button>
            </div>

            {formData.eventos && formData.eventos.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Eventos Existentes</h3>
                {formData.eventos.map((evento, index) => (
                  <div key={evento.id || index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{evento.titulo}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          evento.tipo === 'completado' ? 'bg-green-100 text-green-800' :
                          evento.tipo === 'en-proceso' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {evento.tipo === 'completado' ? 'Completado' : evento.tipo === 'en-proceso' ? 'En Proceso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{evento.descripcion}</p>
                      <p className="text-xs text-gray-500">{evento.fecha}</p>
                    </div>
                    {evento.id && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEvento(evento.id!)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sección 3: Documentos Pendientes */}
        {activeSection === 3 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Documentos Pendientes
            </h2>

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
                  type="button"
                  onClick={handleAddDocumentoPendiente}
                  className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                >
                  Agregar
                </button>
              </div>
            </div>

            {formData.documentosPendientes && formData.documentosPendientes.length > 0 && (
              <div className="space-y-2">
                {formData.documentosPendientes.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-gray-900">{doc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocumentoPendiente(index)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sección 4: Notas */}
        {activeSection === 4 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Notas del Abogado
            </h2>

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
                  type="button"
                  onClick={handleAddNota}
                  className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
                >
                  Agregar Nota
                </button>
              </div>
            </div>

            {formData.notasAbogado && formData.notasAbogado.length > 0 && (
              <div className="space-y-3">
                {formData.notasAbogado.map((nota, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-[#8B0000]">
                    <p className="flex-1 text-gray-900">{nota}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveNota(index)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <Link
            href={`/admin/dashboard/casos/${codigo}`}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2 bg-gradient-to-r from-[#8B0000] to-[#9B0000] text-white rounded-lg hover:from-[#9B0000] hover:to-[#8B0000] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

