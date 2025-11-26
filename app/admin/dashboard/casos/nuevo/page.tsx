'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/services/authService';
import type { CasoNuevo, Evento, EstadoCaso, TipoEvento } from '@/types/casos';

export default function NuevoCasoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(1);

  // Formulario principal
  const [formData, setFormData] = useState<Partial<CasoNuevo>>({
    nombreCliente: '',
    tipoCaso: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    estado: 'Pendiente' as EstadoCaso,
    abogadoAsignado: '',
    emailAbogado: '',
    telefonoAbogado: '',
    descripcionCaso: '',
    eventos: [],
    documentos: [],
    documentosPendientes: [],
    notasAbogado: [],
    porcentajeProgreso: 0,
  });

  // Estados para eventos
  const [nuevoEvento, setNuevoEvento] = useState<Omit<Evento, 'id'>>({
    fecha: new Date().toISOString().split('T')[0],
    titulo: '',
    descripcion: '',
    tipo: 'pendiente' as TipoEvento,
  });

  // Estados para documentos pendientes y notas
  const [nuevoDocumentoPendiente, setNuevoDocumentoPendiente] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  
  // Estados para documentos
  const [subiendoDocumento, setSubiendoDocumento] = useState(false);
  const [documentosSubidos, setDocumentosSubidos] = useState<Array<{
    nombre: string;
    tipo: string;
    fecha: string;
    estado: string | null;
    cloudflareId: string;
    visibleParaCliente: boolean;
  }>>([]);

  const estados: EstadoCaso[] = ['Pendiente', 'En Proceso', 'Aprobado', 'Rechazado', 'Completado'];
  const tiposEvento: TipoEvento[] = ['completado', 'en-proceso', 'pendiente'];

  const handleInputChange = (field: keyof CasoNuevo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEvento = () => {
    if (!nuevoEvento.titulo || !nuevoEvento.fecha) {
      alert('Por favor complete el título y fecha del evento');
      return;
    }

    const eventos = formData.eventos || [];
    handleInputChange('eventos', [...eventos, { ...nuevoEvento, id: Date.now().toString() }]);
    
    // Reset formulario de evento
    setNuevoEvento({
      fecha: new Date().toISOString().split('T')[0],
      titulo: '',
      descripcion: '',
      tipo: 'pendiente' as TipoEvento,
    });
  };

  const handleRemoveEvento = (index: number) => {
    const eventos = formData.eventos || [];
    handleInputChange('eventos', eventos.filter((_, i) => i !== index));
  };

  const handleAddDocumentoPendiente = () => {
    if (!nuevoDocumentoPendiente.trim()) return;
    
    const documentos = formData.documentosPendientes || [];
    handleInputChange('documentosPendientes', [...documentos, nuevoDocumentoPendiente]);
    setNuevoDocumentoPendiente('');
  };

  const handleRemoveDocumentoPendiente = (index: number) => {
    const documentos = formData.documentosPendientes || [];
    handleInputChange('documentosPendientes', documentos.filter((_, i) => i !== index));
  };

  const handleAddNota = () => {
    if (!nuevaNota.trim()) return;
    
    const notas = formData.notasAbogado || [];
    handleInputChange('notasAbogado', [...notas, nuevaNota]);
    setNuevaNota('');
  };

  const handleRemoveNota = (index: number) => {
    const notas = formData.notasAbogado || [];
    handleInputChange('notasAbogado', notas.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent | Event) => {
    if (e instanceof Event) {
      e.preventDefault();
    } else {
      e.preventDefault();
    }
    setError(null);
    setLoading(true);

    // Validaciones
    if (!formData.nombreCliente?.trim()) {
      setError('El nombre del cliente es requerido');
      setLoading(false);
      return;
    }

    if (!formData.tipoCaso?.trim()) {
      setError('El tipo de caso es requerido');
      setLoading(false);
      return;
    }

    if (!formData.estado) {
      setError('El estado es requerido');
      setLoading(false);
      return;
    }

    try {
      const user = AuthService.getCurrentUser();
      
      // Primero crear el caso
      const response = await fetch('/api/casos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caso: formData,
          creadoPor: user?.email || 'admin',
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        const codigoCaso = data.data.codigo;
        
        // Si hay documentos subidos, agregarlos al caso
        if (documentosSubidos.length > 0) {
          const documentosPromises = documentosSubidos.map(async (doc) => {
            try {
              const docResponse = await fetch(`/api/casos/${codigoCaso}/documentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documento: doc }),
              });
              const docData = await docResponse.json();
              if (!docData.success) {
                console.error(`Error al agregar documento ${doc.nombre}:`, docData.error);
              }
              return docData.success;
            } catch (err) {
              console.error(`Error al agregar documento ${doc.nombre}:`, err);
              return false;
            }
          });
          
          await Promise.all(documentosPromises);
        }
        
        // Redirigir a la vista del caso creado
        router.push(`/admin/dashboard/casos/${codigoCaso}`);
      } else {
        setError(data.error || 'Error al crear el caso');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error al crear caso:', err);
      setError('Error de conexión. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  const handleSubirDocumento = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevenir que el evento se propague al formulario padre
    }
    
    console.log('🔄 Iniciando subida de documento...');
    
    // Obtener el contenedor del formulario directamente por ID
    const formContainer = document.getElementById('formulario-documento') as HTMLElement;
    if (!formContainer) {
      console.error('❌ No se encontró el contenedor de documentos');
      alert('Error: No se encontró el contenedor de documentos');
      return false;
    }
    
    // Crear FormData manualmente desde los inputs
    const formData = new FormData();
    const tipoDocumento = (formContainer.querySelector('select[name="tipoDocumento"]') as HTMLSelectElement)?.value;
    const estado = (formContainer.querySelector('select[name="estado"]') as HTMLSelectElement)?.value;
    const nombre = (formContainer.querySelector('input[name="nombre"]') as HTMLInputElement)?.value;
    const fecha = (formContainer.querySelector('input[name="fecha"]') as HTMLInputElement)?.value;
    const visibleParaCliente = (formContainer.querySelector('#visibleParaClienteNuevo') as HTMLInputElement)?.checked || false;
    const fileInput = formContainer.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (!file) {
      console.error('❌ No se seleccionó ningún archivo');
      alert('Por favor selecciona un archivo');
      return false;
    }

    console.log('📄 Archivo seleccionado:', file.name, 'Tamaño:', file.size, 'Tipo:', file.type);

    // Validar tamaño del archivo (10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('❌ Archivo demasiado grande:', file.size);
      alert('El archivo es demasiado grande. El tamaño máximo es 10MB');
      return false;
    }

    try {
      setSubiendoDocumento(true);
      console.log('☁️ Subiendo archivo a Cloudflare R2...');
      
      // Subir archivo a R2
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      console.log('📡 Respuesta del servidor:', uploadResponse.status, uploadResponse.statusText);
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('❌ Error en la respuesta:', errorText);
        throw new Error(`Error del servidor: ${uploadResponse.status} - ${errorText}`);
      }
      
      const uploadData = await uploadResponse.json();
      console.log('✅ Datos recibidos:', uploadData);
      
      if (!uploadData.success) {
        console.error('❌ Error en uploadData:', uploadData.error);
        throw new Error(uploadData.error || 'Error al subir el archivo');
      }

      // Agregar documento a la lista
      const nuevoDocumento = {
        nombre: nombre || file.name,
        tipo: tipoDocumento || 'Documento',
        fecha: fecha || new Date().toISOString().split('T')[0],
        estado: estado === 'sin-estado' ? null : (estado || 'pendiente'),
        cloudflareId: uploadData.data.key,
        visibleParaCliente: visibleParaCliente,
      };

      console.log('📝 Documento creado:', nuevoDocumento);
      setDocumentosSubidos(prev => {
        const nuevos = [...prev, nuevoDocumento];
        console.log('📋 Total de documentos:', nuevos.length);
        return nuevos;
      });
      // Limpiar el formulario
      if (formContainer.querySelector('select[name="tipoDocumento"]')) {
        (formContainer.querySelector('select[name="tipoDocumento"]') as HTMLSelectElement).value = '';
      }
      if (formContainer.querySelector('select[name="estado"]')) {
        (formContainer.querySelector('select[name="estado"]') as HTMLSelectElement).value = 'sin-estado';
      }
      if (formContainer.querySelector('input[name="nombre"]')) {
        (formContainer.querySelector('input[name="nombre"]') as HTMLInputElement).value = '';
      }
      if (formContainer.querySelector('input[name="fecha"]')) {
        (formContainer.querySelector('input[name="fecha"]') as HTMLInputElement).value = new Date().toISOString().split('T')[0];
      }
      if (fileInput) {
        fileInput.value = '';
      }
      const checkbox = formContainer.querySelector('#visibleParaClienteNuevo') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
      console.log('✅ Formulario reseteado');
      
      // Mostrar mensaje de éxito mejorado
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-5';
      successMsg.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="font-semibold">Documento "${nuevoDocumento.nombre}" subido exitosamente</span>
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          successMsg.remove();
        }, 300);
      }, 3000);
      
      return false; // Prevenir cualquier comportamiento por defecto
    } catch (error) {
      console.error('❌ Error completo al subir documento:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error al subir el documento';
      console.error('💬 Mensaje de error:', errorMsg);
      
      // Mostrar mensaje de error mejorado
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
      errorDiv.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="font-semibold">${errorMsg}</span>
      `;
      document.body.appendChild(errorDiv);
      setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          errorDiv.remove();
        }, 300);
      }, 5000);
      
      return false;
    } finally {
      setSubiendoDocumento(false);
    }
  };

  const handleEliminarDocumento = (index: number) => {
    setDocumentosSubidos(prev => prev.filter((_, i) => i !== index));
  };

  const sections = [
    { id: 1, name: 'Información Básica', icon: '📋' },
    { id: 2, name: 'Eventos Iniciales', icon: '📅' },
    { id: 3, name: 'Documentos del Cliente', icon: '📎' },
    { id: 4, name: 'Documentos Pendientes', icon: '📄' },
    { id: 5, name: 'Notas', icon: '📝' },
  ];

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
          <h1 className="text-3xl font-serif font-bold text-gray-900">Crear Nuevo Caso</h1>
          <p className="text-gray-600 mt-1">Complete la información para crear un nuevo caso de inmigración</p>
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

      {/* Navegación de secciones - FUERA del formulario */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-4 mb-6">
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

      <form id="formulario-caso" onSubmit={handleSubmit} className="space-y-6">

        {/* Sección 1: Información Básica */}
        {activeSection === 1 && (
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Información Básica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre del Cliente */}
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
                  placeholder="Ej: Juan Pérez García"
                />
              </div>

              {/* Tipo de Caso */}
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
                  placeholder="Ej: Solicitud de Trabajo"
                />
              </div>

              {/* Fecha de Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.fechaInicio || ''}
                  onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                />
              </div>

              {/* Estado */}
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

              {/* Abogado Asignado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abogado Asignado
                </label>
                <input
                  type="text"
                  value={formData.abogadoAsignado || ''}
                  onChange={(e) => handleInputChange('abogadoAsignado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="Ej: Ismail T. Shahtakhtinski, Esq."
                />
              </div>

              {/* Email Abogado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email del Abogado
                </label>
                <input
                  type="email"
                  value={formData.emailAbogado || ''}
                  onChange={(e) => handleInputChange('emailAbogado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="abogado@islawfirm.com"
                />
              </div>

              {/* Teléfono Abogado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono del Abogado
                </label>
                <input
                  type="tel"
                  value={formData.telefonoAbogado || ''}
                  onChange={(e) => handleInputChange('telefonoAbogado', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  placeholder="+1 (804) 708-3837"
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Caso
              </label>
              <textarea
                value={formData.descripcionCaso || ''}
                onChange={(e) => handleInputChange('descripcionCaso', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none resize-none"
                placeholder="Descripción detallada del caso..."
              />
            </div>
          </div>
        )}

        {/* Sección 2: Eventos Iniciales */}
        {activeSection === 2 && (
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Eventos Iniciales (Opcional)
            </h2>

            {/* Formulario para agregar evento */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">Agregar Evento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={nuevoEvento.fecha}
                    onChange={(e) => setNuevoEvento(prev => ({ ...prev, fecha: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nuevoEvento.titulo}
                    onChange={(e) => setNuevoEvento(prev => ({ ...prev, titulo: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
                    placeholder="Ej: Caso iniciado"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
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
                type="button"
                onClick={handleAddEvento}
                className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
              >
                Agregar Evento
              </button>
            </div>

            {/* Lista de eventos agregados */}
            {formData.eventos && formData.eventos.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Eventos Agregados</h3>
                {formData.eventos.map((evento, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                    <button
                      type="button"
                      onClick={() => handleRemoveEvento(index)}
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

      {/* Sección 3: Documentos del Cliente - FUERA del formulario principal */}
      {activeSection === 3 && (
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Documentos del Cliente
            </h2>
            <p className="text-gray-600 text-sm">
              Suba los documentos del cliente relacionados con este caso. Los documentos se almacenarán de forma segura y privada.
            </p>

            {/* Formulario para subir documento - FUERA del formulario principal */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900">Subir Documento</h3>
              </div>

              <div 
                id="formulario-documento"
                className="space-y-4"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Documento *
                    </label>
                    <select
                      name="tipoDocumento"
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
                    >
                      <option value="">Seleccione el tipo</option>
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
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      name="estado"
                      defaultValue="sin-estado"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre del Documento *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
                      placeholder="Ej: Pasaporte actualizado 2024"
                    />
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
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-white text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Archivo * (Máximo 10MB)
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8B0000] file:text-white hover:file:bg-[#9B0000] file:cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos permitidos: Imágenes (JPG, PNG, GIF, WEBP) y Documentos (PDF, DOC, DOCX, XLS, XLSX)
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <input
                    type="checkbox"
                    id="visibleParaClienteNuevo"
                    className="mt-1 w-5 h-5 text-[#8B0000] border-gray-300 rounded focus:ring-[#8B0000] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="visibleParaClienteNuevo" className="block text-sm font-semibold text-yellow-800 mb-1 cursor-pointer">
                      Visible para el Cliente
                    </label>
                    <p className="text-xs text-yellow-700">
                      Si está marcado, el cliente podrá ver este documento cuando consulte su caso. Si no está marcado, solo el administrador podrá verlo.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={subiendoDocumento}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Llamar directamente a la función sin evento
                    await handleSubirDocumento();
                  }}
                  className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-[#8B0000] to-[#9B0000] text-white rounded-lg hover:from-[#9B0000] hover:to-[#8B0000] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                >
                  {subiendoDocumento ? (
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
            </div>

            {/* Lista de documentos subidos */}
            {documentosSubidos.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-serif font-bold text-gray-900">
                    Documentos Subidos ({documentosSubidos.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {documentosSubidos.map((doc, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            !doc.estado || doc.estado === 'sin-estado' ? 'bg-gray-100' :
                            doc.estado === 'aprobado' ? 'bg-green-100' :
                            doc.estado === 'pendiente' ? 'bg-yellow-100' :
                            'bg-red-100'
                          }`}>
                            {!doc.estado || doc.estado === 'sin-estado' ? (
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            ) : doc.estado === 'aprobado' ? (
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
                            <p className="font-semibold text-gray-900">{doc.nombre}</p>
                            <p className="text-sm text-gray-500">{doc.tipo} • {doc.fecha}</p>
                          </div>
                          {doc.estado && doc.estado !== 'sin-estado' && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              doc.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                              doc.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {doc.estado}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEliminarDocumento(index)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {documentosSubidos.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No hay documentos subidos aún</p>
                <p className="text-sm text-gray-400 mt-2">Use el formulario de arriba para subir documentos del cliente</p>
              </div>
            )}
          </div>
        )}

        {/* Sección 4: Documentos Pendientes - DENTRO del formulario principal */}
        {activeSection === 4 && (
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Documentos Pendientes (Opcional)
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

            {/* Lista de documentos pendientes */}
            {formData.documentosPendientes && formData.documentosPendientes.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Documentos Pendientes Agregados</h3>
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

        {/* Sección 5: Notas */}
        {activeSection === 5 && (
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#8B0000] border-b border-gray-200 pb-3">
              Notas del Abogado (Opcional)
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

            {/* Lista de notas */}
            {formData.notasAbogado && formData.notasAbogado.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Notas Agregadas</h3>
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
        <div className="flex items-center justify-between bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6">
          <Link
            href="/admin/dashboard/casos"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 bg-gradient-to-r from-[#8B0000] to-[#9B0000] text-white rounded-lg hover:from-[#9B0000] hover:to-[#8B0000] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Crear Caso</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

