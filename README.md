# I.S. Law Firm - Sitio Web

Sitio web profesional para I.S. Law Firm, especializada en servicios de inmigración, lesiones personales y derecho empresarial.

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React** - Biblioteca UI
- **Context API** - Gestión de estado global

## Estructura del Proyecto

```
/
├── app/                    # Páginas y rutas (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── servicios/         # Páginas de servicios
│   ├── revisar-estado/    # Portal de consulta de casos
│   ├── reservar-consulta/ # Reserva de consultas
│   ├── sobre-nosotros/    # Sobre la firma
│   ├── contacto/          # Página de contacto
│   └── admin/             # Panel de administración (en desarrollo)
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Barra de navegación
│   ├── Footer.tsx         # Pie de página
│   └── FloatingButton.tsx # Botón flotante
├── contexts/              # Context API
│   └── CasosContext.tsx  # Contexto de casos
├── services/              # Servicios de negocio
│   ├── casosService.ts    # Servicio de casos
│   ├── storageService.ts  # Servicio de almacenamiento
│   └── authService.ts     # Servicio de autenticación
├── types/                 # Tipos TypeScript
│   └── casos.ts           # Tipos de casos
└── public/               # Archivos estáticos
```

## Servicios

1. Solicitud de Trabajo
2. Permiso de Trabajo
3. Residencia
4. Asilo
5. Permiso de Estudio

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build para Producción

```bash
npm run build
npm start
```

## Características

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Navegación con dropdown de servicios
- ✅ Header sticky con menú móvil
- ✅ Footer completo con información de contacto
- ✅ Portal de consulta de estado de casos
- ✅ Sistema de reserva de consultas
- ✅ Páginas de servicios detalladas
- ✅ Panel de administración (en desarrollo)
- ✅ Gestión de casos con localStorage (preparado para Supabase)
- ✅ Paleta de colores profesional

## Panel de Administración

El panel de administración permite gestionar casos, eventos, documentos y notas. Actualmente utiliza localStorage para almacenamiento, pero está preparado para migrar a Supabase.

### Funcionalidades del Panel Admin

- 🔐 Autenticación básica
- 📊 Dashboard con estadísticas
- 📝 CRUD completo de casos
- 📅 Gestión de eventos del timeline
- 📄 Gestión de documentos
- 💬 Gestión de notas del abogado
- 🔍 Búsqueda y filtrado de casos

## Variables de Entorno

Crea un archivo `.env.local` para configurar:

```env
NEXT_PUBLIC_ADMIN_PASSWORD=tu_password_seguro
```

**⚠️ IMPORTANTE:** No subas el archivo `.env.local` al repositorio. Está incluido en `.gitignore`.

