'use client';

import { useEffect, useState, useMemo } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import type { CasoInfo } from '@/types/casos';
import Link from 'next/link';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, isAfter, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale/es';

const COLORS = ['#8B0000', '#9B0000', '#A52A2A', '#DC143C', '#FF6347', '#FF7F50'];

export default function DashboardPage() {
  const [casos, setCasos] = useState<CasoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    enProceso: 0,
    aprobados: 0,
    pendientes: 0,
    completados: 0,
    rechazados: 0,
  });

  useEffect(() => {
    loadCasos();
  }, []);

  const loadCasos = async () => {
    try {
      const response = await fetch('/api/casos');
      const data = await response.json();
      
      if (data.success && data.data) {
        setCasos(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Error al cargar casos:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (casosData: CasoInfo[]) => {
    const stats = {
      total: casosData.length,
      enProceso: 0,
      aprobados: 0,
      pendientes: 0,
      completados: 0,
      rechazados: 0,
    };

    casosData.forEach((caso) => {
      switch (caso.estado) {
        case 'En Proceso':
          stats.enProceso++;
          break;
        case 'Aprobado':
          stats.aprobados++;
          break;
        case 'Pendiente':
          stats.pendientes++;
          break;
        case 'Completado':
          stats.completados++;
          break;
        case 'Rechazado':
          stats.rechazados++;
          break;
      }
    });

    setStats(stats);
  };

  // Datos para gráfico de distribución por tipo
  const distribucionPorTipo = useMemo(() => {
    const tipoCount: Record<string, number> = {};
    casos.forEach(caso => {
      tipoCount[caso.tipoCaso] = (tipoCount[caso.tipoCaso] || 0) + 1;
    });
    return Object.entries(tipoCount).map(([name, value]) => ({ name, value }));
  }, [casos]);

  // Datos para gráfico de progreso mensual (últimos 6 meses)
  const progresoMensual = useMemo(() => {
    const meses = [];
    const ahora = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const fecha = subMonths(ahora, i);
      const inicioMes = startOfMonth(fecha);
      const finMes = endOfMonth(fecha);
      
      const casosDelMes = casos.filter(caso => {
        const fechaCaso = new Date(caso.fechaCreacion || caso.fechaInicio);
        return fechaCaso >= inicioMes && fechaCaso <= finMes;
      });
      
      meses.push({
        mes: format(fecha, 'MMM yyyy', { locale: es }),
        casos: casosDelMes.length,
        completados: casosDelMes.filter(c => c.estado === 'Completado' || c.estado === 'Aprobado').length,
      });
    }
    
    return meses;
  }, [casos]);

  // Alertas: Documentos pendientes
  const casosConDocumentosPendientes = useMemo(() => {
    return casos.filter(caso => 
      caso.documentosPendientes && caso.documentosPendientes.length > 0
    ).slice(0, 5);
  }, [casos]);

  // Alertas: Casos sin actualizar (más de 30 días)
  const casosSinActualizar = useMemo(() => {
    const ahora = new Date();
    return casos.filter(caso => {
      if (!caso.ultimaActualizacion) return false;
      const fechaActualizacion = new Date(caso.ultimaActualizacion);
      const diasSinActualizar = differenceInDays(ahora, fechaActualizacion);
      return diasSinActualizar > 30 && caso.estado !== 'Completado' && caso.estado !== 'Rechazado';
    }).slice(0, 5);
  }, [casos]);

  // Alertas: Próximas fechas importantes (eventos pendientes en los próximos 7 días)
  const proximasFechasImportantes = useMemo(() => {
    const ahora = new Date();
    const en7Dias = new Date();
    en7Dias.setDate(ahora.getDate() + 7);
    
    const eventosProximos: Array<{ caso: CasoInfo; evento: any; fecha: Date }> = [];
    
    casos.forEach(caso => {
      if (caso.eventos) {
        caso.eventos.forEach(evento => {
          if (evento.tipo === 'pendiente' || evento.tipo === 'en-proceso') {
            try {
              const fechaEvento = new Date(evento.fecha);
              if (fechaEvento >= ahora && fechaEvento <= en7Dias) {
                eventosProximos.push({ caso, evento, fecha: fechaEvento });
              }
            } catch (e) {
              // Ignorar fechas inválidas
            }
          }
        });
      }
    });
    
    return eventosProximos
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
      .slice(0, 5);
  }, [casos]);

  const casosRecientes = casos
    .sort((a, b) => {
      const dateA = new Date(a.fechaCreacion || a.fechaInicio);
      const dateB = new Date(b.fechaCreacion || b.fechaInicio);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B0000]"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Título */}
      <div className="pb-2">
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-[#8B0000] to-[#9B0000] bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">Resumen general de casos y estadísticas</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total de Casos"
          value={stats.total}
          color="blue"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatsCard
          title="En Proceso"
          value={stats.enProceso}
          color="yellow"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Aprobados"
          value={stats.aprobados}
          color="green"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Pendientes"
          value={stats.pendientes}
          color="blue"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Completados"
          value={stats.completados}
          color="green"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <StatsCard
          title="Rechazados"
          value={stats.rechazados}
          color="red"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de distribución por tipo */}
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 hover:shadow-soft-hover transition-all duration-300">
          <h2 className="text-xl font-serif font-bold bg-gradient-to-r from-[#8B0000] to-[#9B0000] bg-clip-text text-transparent mb-6">Distribución por Tipo de Caso</h2>
          {distribucionPorTipo.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionPorTipo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribucionPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No hay datos para mostrar
            </div>
          )}
        </div>

        {/* Gráfico de progreso mensual */}
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 hover:shadow-soft-hover transition-all duration-300">
          <h2 className="text-xl font-serif font-bold bg-gradient-to-r from-[#8B0000] to-[#9B0000] bg-clip-text text-transparent mb-6">Progreso Mensual (Últimos 6 Meses)</h2>
          {progresoMensual.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progresoMensual}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="casos" fill="#8B0000" name="Casos Creados" />
                <Bar dataKey="completados" fill="#22c55e" name="Completados" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No hay datos para mostrar
            </div>
          )}
        </div>
      </div>

      {/* Alertas y Casos Recientes - Grid de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas */}
        <div className="space-y-6">
          {/* Documentos Pendientes */}
          {casosConDocumentosPendientes.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-l-4 border-yellow-400 rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Documentos Pendientes
                </h3>
                <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                  {casosConDocumentosPendientes.length}
                </span>
              </div>
              <div className="space-y-3">
                {casosConDocumentosPendientes.map((caso) => (
                  <Link
                    key={caso.codigo}
                    href={`/admin/dashboard/casos/${caso.codigo}`}
                    className="block p-3 bg-white rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{caso.codigo}</p>
                        <p className="text-sm text-gray-600">{caso.nombreCliente}</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          {caso.documentosPendientes?.length} documento(s) pendiente(s)
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Casos Sin Actualizar */}
          {casosSinActualizar.length > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Casos Sin Actualizar (30+ días)
                </h3>
                <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                  {casosSinActualizar.length}
                </span>
              </div>
              <div className="space-y-3">
                {casosSinActualizar.map((caso) => {
                  const diasSinActualizar = differenceInDays(new Date(), new Date(caso.ultimaActualizacion || caso.fechaInicio));
                  return (
                    <Link
                      key={caso.codigo}
                      href={`/admin/dashboard/casos/${caso.codigo}`}
                      className="block p-3 bg-white rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{caso.codigo}</p>
                          <p className="text-sm text-gray-600">{caso.nombreCliente}</p>
                          <p className="text-xs text-orange-700 mt-1">
                            {diasSinActualizar} días sin actualizar
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Próximas Fechas Importantes */}
          {proximasFechasImportantes.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Próximas Fechas Importantes
                </h3>
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                  {proximasFechasImportantes.length}
                </span>
              </div>
              <div className="space-y-3">
                {proximasFechasImportantes.map((item, index) => (
                  <Link
                    key={`${item.caso.codigo}-${index}`}
                    href={`/admin/dashboard/casos/${item.caso.codigo}`}
                    className="block p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{item.caso.codigo}</p>
                        <p className="text-sm text-gray-600">{item.evento.titulo}</p>
                        <p className="text-xs text-blue-700 mt-1">
                          {format(item.fecha, 'dd MMM yyyy', { locale: es })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sin alertas */}
          {casosConDocumentosPendientes.length === 0 && 
           casosSinActualizar.length === 0 && 
           proximasFechasImportantes.length === 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-green-800">¡Todo al día!</h3>
              </div>
              <p className="text-sm text-green-700 mt-2">No hay alertas pendientes en este momento.</p>
            </div>
          )}
        </div>

        {/* Casos Recientes */}
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Casos Recientes</h2>
            <Link
              href="/admin/dashboard/casos"
              className="text-[#8B0000] hover:text-[#9B0000] font-medium text-sm flex items-center gap-2"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {casosRecientes.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 mb-4">No hay casos registrados</p>
              <Link
                href="/admin/dashboard/casos/nuevo"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#9B0000] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Primer Caso
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {casosRecientes.map((caso) => (
                <Link
                  key={caso.codigo}
                  href={`/admin/dashboard/casos/${caso.codigo}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold text-[#8B0000]">{caso.codigo}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caso.estado === 'Aprobado' || caso.estado === 'Completado'
                            ? 'bg-green-100 text-green-800'
                            : caso.estado === 'En Proceso'
                            ? 'bg-yellow-100 text-yellow-800'
                            : caso.estado === 'Pendiente'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {caso.estado}
                        </span>
                      </div>
                      <p className="text-gray-900 font-medium">{caso.nombreCliente}</p>
                      <p className="text-sm text-gray-500">{caso.tipoCaso}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{caso.fechaInicio}</p>
                      <div className="mt-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#8B0000] to-[#9B0000] h-2 rounded-full"
                            style={{ width: `${caso.porcentajeProgreso}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{caso.porcentajeProgreso}%</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
