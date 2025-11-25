# Plan de Implementación: Dashboard de Administración Profesional

## Análisis y Requisitos

### Objetivos del Dashboard
1. **Gestión Completa de Casos**: Crear, editar, eliminar y visualizar todos los casos
2. **Monitoreo en Tiempo Real**: Estadísticas y KPIs actualizados
3. **Eficiencia Operativa**: Filtros, búsqueda y navegación rápida
4. **Experiencia Profesional**: UI moderna, intuitiva y responsive

### Funcionalidades Principales

#### 1. Layout Base
- **Sidebar**: Navegación principal con iconos
  - Dashboard (inicio)
  - Casos (lista)
  - Nuevo Caso
  - Configuración (futuro)
  - Logout
- **Header**: 
  - Información del usuario
  - Notificaciones (futuro)
  - Búsqueda global (futuro)
- **Protección**: Middleware para rutas admin

#### 2. Dashboard Principal (`/admin/dashboard`)
- **Estadísticas Principales (Cards)**:
  - Total de Casos
  - Casos en Proceso
  - Casos Aprobados
  - Casos Pendientes
  - Casos Completados
  - Casos Rechazados
- **Gráficos** (opcional):
  - Distribución por tipo de caso
  - Progreso mensual
- **Casos Recientes**: Últimos 5 casos creados
- **Alertas**:
  - Documentos pendientes
  - Próximas fechas importantes
  - Casos sin actualizar (más de 30 días)

#### 3. Lista de Casos (`/admin/dashboard/casos`)
- **Tabla de Casos**:
  - Columnas: Código, Cliente, Tipo, Estado, Abogado, Fecha Inicio, Progreso, Acciones
  - Ordenamiento por columna
  - Paginación
- **Filtros**:
  - Por estado (dropdown)
  - Por tipo de caso (dropdown)
  - Por abogado (dropdown)
  - Por fecha (date range)
- **Búsqueda**:
  - Por código
  - Por nombre de cliente
- **Acciones**:
  - Ver detalle
  - Editar
  - Eliminar (con confirmación)
- **Botón "Nuevo Caso"**

#### 4. Crear Caso (`/admin/dashboard/casos/nuevo`)
- **Formulario Multi-sección**:
  1. **Información Básica**:
     - Nombre del cliente (requerido)
     - Tipo de caso (texto libre)
     - Fecha de inicio (date picker)
     - Estado (select)
     - Abogado asignado (texto libre)
     - Email abogado
     - Teléfono abogado
     - Descripción (textarea)
  2. **Eventos Iniciales** (opcional):
     - Agregar múltiples eventos
     - Fecha, título, descripción, tipo
  3. **Documentos Iniciales** (opcional):
     - Lista de documentos pendientes (texto)
  4. **Notas Iniciales** (opcional):
     - Agregar notas
- **Validación**: Campos requeridos
- **Generación automática de código**

#### 5. Vista Detallada de Caso (`/admin/dashboard/casos/[codigo]`)
- **Header del Caso**:
  - Código, cliente, estado, progreso
  - Botones: Editar, Eliminar
- **Tabs/Secciones**:
  1. **Información General**:
     - Formulario editable con todos los campos
     - Guardar cambios
  2. **Timeline de Eventos**:
     - Lista de eventos ordenados por fecha
     - Botón "Agregar Evento"
     - Editar/eliminar eventos
     - Indicadores visuales (completado, en-proceso, pendiente)
  3. **Documentos**:
     - Lista de documentos
     - Botón "Agregar Documento" (estructura preparada)
     - Cambiar estado de documentos
     - Ver/descargar documentos
     - Eliminar documentos
  4. **Documentos Pendientes**:
     - Lista editable
     - Agregar/eliminar items
  5. **Notas del Abogado**:
     - Lista de notas
     - Editor para agregar nota
     - Eliminar notas
- **Actualización en tiempo real**

#### 6. Editar Caso (`/admin/dashboard/casos/[codigo]/editar`)
- Similar a crear caso pero con datos precargados
- Validación
- Confirmación de cambios

## Estructura de Archivos

```
app/
  admin/
    dashboard/
      layout.tsx (Layout con sidebar y header)
      page.tsx (Dashboard principal)
      casos/
        page.tsx (Lista de casos)
        nuevo/
          page.tsx (Crear caso)
        [codigo]/
          page.tsx (Vista detallada)
          editar/
            page.tsx (Editar caso)

components/
  admin/
    DashboardLayout.tsx (Layout wrapper)
    Sidebar.tsx (Navegación lateral)
    Header.tsx (Header con usuario)
    StatsCard.tsx (Card de estadística)
    CasosTable.tsx (Tabla de casos)
    CasoForm.tsx (Formulario de caso)
    EventosEditor.tsx (Editor de eventos)
    DocumentosManager.tsx (Gestor de documentos)
    NotasEditor.tsx (Editor de notas)
    FiltersBar.tsx (Barra de filtros)
    SearchBar.tsx (Barra de búsqueda)

middleware.ts (Protección de rutas)
```

## Tecnologías y Patrones

- **Next.js 14**: App Router, Server Components donde sea posible
- **TypeScript**: Tipado fuerte
- **Tailwind CSS**: Estilos consistentes
- **React Hooks**: useState, useEffect, useCallback
- **Context API**: Para estado global (opcional)
- **API Routes**: Backend para todas las operaciones

## Diseño Visual

- **Colores**:
  - Primario: #8B0000 (rojo oscuro)
  - Secundario: #9B0000
  - Fondo: #F5F0E8 / Blanco
  - Texto: #000000 / #666666
- **Tipografía**: Serif para títulos, Sans-serif para contenido
- **Espaciado**: Consistente, generoso
- **Sombras**: Suaves, profesionales
- **Bordes**: Redondeados (rounded-lg, rounded-xl)
- **Iconos**: Heroicons o similar

## Prioridades de Implementación

### Fase 1: Base (Alta Prioridad)
1. ✅ Middleware de protección
2. ✅ Layout con sidebar y header
3. ✅ Dashboard principal con estadísticas
4. ✅ Lista de casos básica

### Fase 2: CRUD (Alta Prioridad)
5. ✅ Crear caso
6. ✅ Vista detallada de caso
7. ✅ Editar caso
8. ✅ Eliminar caso

### Fase 3: Gestión Avanzada (Media Prioridad)
9. ✅ Gestión de eventos
10. ✅ Gestión de documentos
11. ✅ Gestión de notas
12. ✅ Filtros y búsqueda avanzada

### Fase 4: Mejoras (Baja Prioridad)
13. Gráficos y visualizaciones
14. Exportación de datos
15. Notificaciones
16. Historial de cambios

## Consideraciones Técnicas

1. **Autenticación**: Verificar token en cada request
2. **Validación**: Frontend y backend
3. **Manejo de Errores**: Mensajes claros y útiles
4. **Loading States**: Indicadores de carga
5. **Responsive**: Mobile-first approach
6. **Accesibilidad**: ARIA labels, navegación por teclado
7. **Performance**: Lazy loading, optimización de queries

