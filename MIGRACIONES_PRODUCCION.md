# 🔧 Solución: Error al Crear Casos en Producción

## ❌ Problema Identificado

El error `Invalid prisma.caso.create() invocation: The column (not available) does not exist in the current database` ocurre porque:

1. **El esquema de Prisma** tiene el campo `visibleParaCliente` en el modelo `Documento`
2. **El código** intenta crear documentos con este campo (línea 234 de `services/casosPrismaService.ts`)
3. **La base de datos de producción** NO tiene esta columna porque la migración no se ha ejecutado

## ✅ Solución: Ejecutar Migraciones Pendientes

### Paso 1: Verificar Variables de Entorno

Asegúrate de tener la variable `DATABASE_URL` configurada con la URL de tu base de datos de producción:

```bash
# En tu servidor de producción o localmente con la URL de producción
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/database?schema=public"
```

### Paso 2: Ejecutar Migraciones en Producción

**⚠️ IMPORTANTE**: Usa `prisma migrate deploy` para producción (NO uses `prisma migrate dev`)

```bash
# Opción 1: Usando el script npm (recomendado)
npm run prisma:deploy

# Opción 2: Directamente con Prisma
npx prisma migrate deploy
```

Este comando aplicará TODAS las migraciones pendientes:
- ✅ `20251125002148_add_admin_table` - Tabla de administradores
- ✅ `20251125162555_allow_null_estado_documentos` - Permite NULL en estado de documentos
- ✅ `20251125172334_add_visible_para_cliente` - **Esta es la que falta** ⚠️

### Paso 3: Regenerar el Cliente de Prisma

Después de ejecutar las migraciones, regenera el cliente:

```bash
npm run prisma:generate
```

### Paso 4: Verificar

Prueba crear un caso nuevamente. El error debería desaparecer.

## 🔍 Verificar Estado de Migraciones

Para ver qué migraciones se han aplicado:

```bash
npx prisma migrate status
```

Esto mostrará:
- ✅ Migraciones aplicadas
- ⚠️ Migraciones pendientes

## 🚨 Si el Error Persiste

Si después de ejecutar las migraciones el error continúa:

1. **Verifica la conexión a la base de datos correcta**:
   ```bash
   npm run prisma:test
   ```

2. **Verifica manualmente en la base de datos**:
   ```sql
   -- Conectarte a tu base de datos PostgreSQL y ejecutar:
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'documentos';
   ```
   
   Deberías ver la columna `visibleParaCliente` de tipo `boolean`.

3. **Si la columna no existe**, ejecuta manualmente la migración:
   ```sql
   ALTER TABLE "documentos" ADD COLUMN "visibleParaCliente" BOOLEAN NOT NULL DEFAULT false;
   CREATE INDEX "documentos_visibleParaCliente_idx" ON "documentos"("visibleParaCliente");
   ```

## 📝 Notas Importantes

- **NUNCA uses `prisma migrate dev` en producción** - Este comando es solo para desarrollo
- **Siempre usa `prisma migrate deploy` en producción** - Este comando solo aplica migraciones existentes sin crear nuevas
- **Haz un backup** de tu base de datos antes de ejecutar migraciones en producción
- Las migraciones son **idempotentes** - Prisma solo aplicará las que falten

## 🔄 Proceso Completo de Despliegue

```bash
# 1. Asegúrate de tener la URL de producción
export DATABASE_URL="postgresql://..."

# 2. Ejecuta migraciones pendientes
npm run prisma:deploy

# 3. Regenera el cliente
npm run prisma:generate

# 4. Verifica el estado
npx prisma migrate status

# 5. Prueba la aplicación
npm run build
npm start
```

