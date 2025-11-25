'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CasoInfo } from '@/types/casos';

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
    
    const codigoNormalizado = codigo.trim().toUpperCase();
    const formatoValido = /^IS-\d{4}-\d{6}$/.test(codigoNormalizado);
    
    if (!formatoValido) {
      setCargando(false);
      setError('El código ingresado no tiene el formato correcto. Por favor, verifique que haya ingresado el número del caso correctamente. El formato debe ser: IS-AAAA-NNNNNN (ejemplo: IS-2024-001234)');
      return;
    }
    
    try {
      // Agregar parámetro para filtrar solo documentos visibles para el cliente
      const response = await fetch(`/api/casos/${codigoNormalizado}?soloVisiblesParaCliente=true`);
      const data = await response.json();
      
      setCargando(false);
      
      if (data.success && data.data) {
        setCasoInfo(data.data);
        setError(null);
      } else {
        setError(data.error || 'El código ingresado no se encuentra registrado en nuestra base de datos. Por favor, verifique que haya ingresado el número del caso correctamente o contacte a nuestra oficina si cree que esto es un error.');
      }
    } catch (err) {
      setCargando(false);
      setError('Error al consultar el caso. Por favor, intente nuevamente más tarde.');
      console.error('Error al consultar caso:', err);
    }
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
      <div className="bg-gradient-to-br from-white via-gray-50/30 to-white border-b border-[#8B0000]/20 shadow-soft py-8 md:py-12">
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
            <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl shadow-soft-hover p-6 md:p-8 mb-6 border border-[#8B0000]/20 backdrop-blur-sm">
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
              {casoInfo.descripcionCaso && (
                <div className="mt-6 pt-6 border-t border-[#CCCCCC]">
                  <p className="text-[#666666] text-sm font-semibold mb-2">Descripción del Caso</p>
                  <p className="text-[#000000] text-base leading-relaxed">{casoInfo.descripcionCaso}</p>
                </div>
              )}
            </div>

            {/* Timeline de eventos */}
            {casoInfo.eventos && casoInfo.eventos.length > 0 && (
              <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl shadow-soft-hover p-6 md:p-8 mb-6 border border-[#8B0000]/20 backdrop-blur-sm">
                <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold mb-6">Cronograma de Eventos</h3>
                <div className="relative">
                  {casoInfo.eventos.map((evento, index) => (
                    <div key={evento.id || index} className="relative pb-8 last:pb-0">
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
                          {evento.descripcion && (
                            <p className="text-[#666666] text-base leading-relaxed">{evento.descripcion}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentos y Notas - Grid de 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Documentos */}
              <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl shadow-soft-hover p-6 md:p-8 border border-[#8B0000]/20 backdrop-blur-sm">
                <h3 className="text-[#8B0000] text-2xl md:text-3xl font-bold mb-6">Documentos</h3>
                {casoInfo.documentos && casoInfo.documentos.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {casoInfo.documentos.map((doc, index) => (
                        <div key={doc.id || index} className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D0] transition-colors">
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
                              <p className="text-[#000000] font-semibold">{doc.nombre}</p>
                              <p className="text-[#666666] text-sm">{doc.tipo} • {doc.fecha}</p>
                            </div>
                          </div>
                          {(doc.url || doc.cloudflareId) && (
                            <a 
                              href={doc.url || '#'} 
                              onClick={async (e) => {
                                // Si no hay URL pero hay cloudflareId, generar URL firmada
                                if (!doc.url && doc.cloudflareId) {
                                  e.preventDefault();
                                  try {
                                    // Pasar el código del caso para validación de seguridad
                                    const response = await fetch(`/api/documents/${encodeURIComponent(doc.cloudflareId)}?codigoCaso=${encodeURIComponent(casoInfo.codigo)}&expiresIn=1800`);
                                    const data = await response.json();
                                    if (data.success && data.data.url) {
                                      window.open(data.data.url, '_blank');
                                    } else {
                                      alert(data.error || 'Error al generar enlace del documento');
                                    }
                                  } catch (error) {
                                    console.error('Error:', error);
                                    alert('Error al acceder al documento');
                                  }
                                }
                              }}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#8B0000] hover:text-[#9B0000] font-semibold px-4 py-2 rounded-lg hover:bg-white transition-colors"
                            >
                              Ver
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[#666666] text-center py-8">No hay documentos registrados aún.</p>
                )}

                {casoInfo.documentosPendientes && casoInfo.documentosPendientes.length > 0 && (
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
                {casoInfo.notasAbogado && casoInfo.notasAbogado.length > 0 ? (
                  <div className="space-y-4">
                    {casoInfo.notasAbogado.map((nota, index) => (
                      <div key={index} className="p-4 bg-[#F5F0E8] rounded-lg border-l-4 border-[#8B0000]">
                        <p className="text-[#000000] text-base leading-relaxed">{nota}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#666666] text-center py-8">No hay notas del abogado aún.</p>
                )}

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
