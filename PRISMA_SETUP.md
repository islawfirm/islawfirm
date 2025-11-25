# Configuración de Prisma con Supabase

## ✅ Instalación Completada

Prisma está instalado y configurado para trabajar con Supabase PostgreSQL.

## 📋 Archivos Creados

- `prisma/schema.prisma` - Schema de la base de datos con modelos: Caso, Evento, Documento
- `prisma.config.ts` - Configuración de Prisma 7
- `lib/prisma.ts` - Cliente singleton de Prisma para Next.js
- `scripts/test-connection.ts` - Script para probar la conexión

## 🧪 Probar la Conexión

**Antes de probar, asegúrate de que tu archivo `.env` o `.env.local` tenga:**
- `DATABASE_URL` con tu contraseña de Supabase

**Luego ejecuta:**

```bash
npm run prisma:test
```

Este comando:
- ✅ Verifica que la conexión a Supabase funcione
- ✅ Muestra las tablas existentes en la base de datos
- ✅ Te indica si hay errores de configuración

## 📊 Crear las Tablas en la Base de Datos

Una vez que la conexión funcione, crea las tablas ejecutando:

```bash
npm run prisma:migrate
```

Esto creará las tablas:
- `casos` - Casos principales
- `eventos` - Eventos del timeline
- `documentos` - Documentos de cada caso

## 🛠️ Comandos Útiles

```bash
# Generar el cliente de Prisma (después de cambios en schema)
npm run prisma:generate

# Crear migración y aplicar cambios
npm run prisma:migrate

# Abrir Prisma Studio (interfaz visual para ver/editar datos)
npm run prisma:studio

# Probar conexión
npm run prisma:test
```

## 📝 Uso en el Código

```typescript
import { prisma } from '@/lib/prisma';

// Ejemplo: Obtener todos los casos
const casos = await prisma.caso.findMany({
  include: {
    eventos: true,
    documentos: true,
  },
});
```

## ⚠️ Notas Importantes

- La base de datos está vacía, necesitas ejecutar la migración para crear las tablas
- El archivo `.env` debe tener `DATABASE_URL` con tu contraseña de Supabase
- Prisma 7 usa `prisma.config.ts` para la configuración de la URL

