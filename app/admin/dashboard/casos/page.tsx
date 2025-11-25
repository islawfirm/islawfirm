'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import type { CasoInfo } from '@/types/casos';

type SortField = 'codigo' | 'nombreCliente' | 'fechaInicio' | 'estado' | 'tipoCaso' | 'porcentajeProgreso';
type SortDirection = 'asc' | 'desc';

export default function CasosPage() {
  const [casos, setCasos] = useState<CasoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [filterAbogado, setFilterAbogado] = useState<string>('all');
  const [fechaDesde, setFechaDesde] = useState<string>('');
  const [fechaHasta, setFechaHasta] = useState<string>('');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Ordenamiento
  const [sortField, setSortField] = useState<SortField>('fechaInicio');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    loadCasos();
  }, []);

  const loadCasos = async () => {
    try {
      const response = await fetch('/api/casos');
      const data = await response.json();
      
      if (data.success && data.data) {
        setCasos(data.data);
      }
    } catch (error) {
      console.error('Error al cargar casos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (codigo: string) => {
    if (!confirm(`¿Está seguro de eliminar el caso ${codigo}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/casos/${codigo}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        loadCasos();
      } else {
        alert('Error al eliminar el caso: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error al eliminar caso:', error);
      alert('Error al eliminar el caso');
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtrar y ordenar casos
  const casosFiltradosYOrdenados = useMemo(() => {
    let filtered = casos.filter((caso) => {
      const matchSearch = 
        caso.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caso.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchEstado = filterEstado === 'all' || caso.estado === filterEstado;
      const matchTipo = filterTipo === 'all' || caso.tipoCaso.toLowerCase().includes(filterTipo.toLowerCase());
      const matchAbogado = filterAbogado === 'all' || caso.abogadoAsignado.toLowerCase().includes(filterAbogado.toLowerCase());
      
      // Filtro por fecha
      let matchFecha = true;
      if (fechaDesde || fechaHasta) {
        const fechaInicio = new Date(caso.fechaInicio);
        if (fechaDesde) {
          const desde = new Date(fechaDesde);
          desde.setHours(0, 0, 0, 0);
          if (fechaInicio < desde) matchFecha = false;
        }
        if (fechaHasta) {
          const hasta = new Date(fechaHasta);
          hasta.setHours(23, 59, 59, 999);
          if (fechaInicio > hasta) matchFecha = false;
        }
      }

      return matchSearch && matchEstado && matchTipo && matchAbogado && matchFecha;
    });

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'codigo':
          aValue = a.codigo;
          bValue = b.codigo;
          break;
        case 'nombreCliente':
          aValue = a.nombreCliente.toLowerCase();
          bValue = b.nombreCliente.toLowerCase();
          break;
        case 'fechaInicio':
          aValue = new Date(a.fechaInicio).getTime();
          bValue = new Date(b.fechaInicio).getTime();
          break;
        case 'estado':
          aValue = a.estado;
          bValue = b.estado;
          break;
        case 'tipoCaso':
          aValue = a.tipoCaso.toLowerCase();
          bValue = b.tipoCaso.toLowerCase();
          break;
        case 'porcentajeProgreso':
          aValue = a.porcentajeProgreso;
          bValue = b.porcentajeProgreso;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [casos, searchTerm, filterEstado, filterTipo, filterAbogado, fechaDesde, fechaHasta, sortField, sortDirection]);

  // Paginación
  const totalPages = Math.ceil(casosFiltradosYOrdenados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const casosPaginados = casosFiltradosYOrdenados.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterEstado, filterTipo, filterAbogado, fechaDesde, fechaHasta]);

  // Obtener valores únicos para filtros
  const estadosUnicos = Array.from(new Set(casos.map(c => c.estado))).sort();
  const tiposUnicos = Array.from(new Set(casos.map(c => c.tipoCaso))).sort();
  const abogadosUnicos = Array.from(new Set(casos.map(c => c.abogadoAsignado).filter(Boolean))).sort();

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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B0000]"></div>
          <p className="mt-4 text-gray-600">Cargando casos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Gestión de Casos</h1>
          <p className="text-gray-600 mt-1">Administra todos los casos de inmigración</p>
        </div>
        <Link
          href="/admin/dashboard/casos/nuevo"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B0000] to-[#9B0000] text-white rounded-lg hover:from-[#9B0000] hover:to-[#8B0000] transition-all shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Caso
        </Link>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Código o nombre del cliente..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
              />
            </div>
          </div>

          {/* Filtro por Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
            >
              <option value="all">Todos los estados</option>
              {estadosUnicos.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Caso
            </label>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
            >
              <option value="all">Todos los tipos</option>
              {tiposUnicos.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Abogado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abogado
            </label>
            <select
              value={filterAbogado}
              onChange={(e) => setFilterAbogado(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
            >
              <option value="all">Todos los abogados</option>
              {abogadosUnicos.map((abogado) => (
                <option key={abogado} value={abogado}>{abogado}</option>
              ))}
            </select>
          </div>

          {/* Filtro Fecha Desde */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Desde
            </label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
            />
          </div>

          {/* Filtro Fecha Hasta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Hasta
            </label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] outline-none"
            />
          </div>
        </div>

        {/* Botón limpiar filtros */}
        {(searchTerm || filterEstado !== 'all' || filterTipo !== 'all' || filterAbogado !== 'all' || fechaDesde || fechaHasta) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterEstado('all');
              setFilterTipo('all');
              setFilterAbogado('all');
              setFechaDesde('');
              setFechaHasta('');
            }}
            className="text-sm text-[#8B0000] hover:text-[#9B0000] font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Tabla de Casos */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 overflow-hidden">
        {casosFiltradosYOrdenados.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 mb-4">
              {casos.length === 0 
                ? 'No hay casos registrados' 
                : 'No se encontraron casos con los filtros aplicados'}
            </p>
            {casos.length === 0 && (
              <Link
                href="/admin/dashboard/casos/nuevo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Primer Caso
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('codigo')}
                    >
                      <div className="flex items-center gap-2">
                        Código
                        <SortIcon field="codigo" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('nombreCliente')}
                    >
                      <div className="flex items-center gap-2">
                        Cliente
                        <SortIcon field="nombreCliente" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('tipoCaso')}
                    >
                      <div className="flex items-center gap-2">
                        Tipo
                        <SortIcon field="tipoCaso" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('estado')}
                    >
                      <div className="flex items-center gap-2">
                        Estado
                        <SortIcon field="estado" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abogado
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('porcentajeProgreso')}
                    >
                      <div className="flex items-center gap-2">
                        Progreso
                        <SortIcon field="porcentajeProgreso" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {casosPaginados.map((caso) => (
                    <tr key={caso.codigo} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-[#8B0000]">{caso.codigo}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{caso.nombreCliente}</div>
                        <div className="text-sm text-gray-500">{caso.fechaInicio}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caso.tipoCaso}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(caso.estado)}`}>
                          {caso.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{caso.abogadoAsignado}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] h-2 rounded-full"
                              style={{ width: `${caso.porcentajeProgreso}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{caso.porcentajeProgreso}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/casos/${caso.codigo}`}
                            className="text-[#8B0000] hover:text-[#9B0000] transition-colors"
                            title="Ver detalle"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/admin/dashboard/casos/${caso.codigo}/editar`}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(caso.codigo)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold">{startIndex + 1}</span> a{' '}
                  <span className="font-semibold">{Math.min(endIndex, casosFiltradosYOrdenados.length)}</span> de{' '}
                  <span className="font-semibold">{casosFiltradosYOrdenados.length}</span> casos
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#8B0000] text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* Contador sin paginación */}
            {totalPages === 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold">{casosFiltradosYOrdenados.length}</span> de{' '}
                  <span className="font-semibold">{casos.length}</span> casos
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
