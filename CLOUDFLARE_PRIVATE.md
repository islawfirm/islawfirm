# 🔒 Sistema de Documentos Privados con Cloudflare R2

## ✅ Solución Implementada: URLs Firmadas Temporales

He cambiado completamente la implementación para usar **URLs firmadas temporales** en lugar de acceso público. Esto es mucho más seguro para documentos privados.

## 🔐 ¿Cómo Funciona?

### 1. **Archivos Privados**
- Los archivos se suben a R2 **SIN acceso público**
- Solo se guarda la **clave (key)** en la base de datos
- Los archivos NO son accesibles directamente desde internet

### 2. **URLs Firmadas Temporales**
- Cuando un cliente necesita ver un documento, se genera una **URL firmada temporal**
- Esta URL:
  - ✅ Expira después de un tiempo (por defecto: 1 hora)
  - ✅ Solo funciona para ese archivo específico
  - ✅ No puede ser compartida después de expirar
  - ✅ Es única y segura

### 3. **Flujo Completo**

```
┌─────────────────────────────────────────┐
│  Admin sube documento                   │
│  ↓                                        │
│  Archivo → R2 (PRIVADO)                  │
│  Se guarda solo la clave:                │
│  "documents/pasaporte-123.pdf"           │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Base de Datos                          │
│  documento.cloudflareId = "documents/..."│
│  documento.url = null (no hay URL pública)│
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Cliente revisa su caso                 │
│  Hace clic en "Ver" documento           │
│  ↓                                        │
│  Sistema genera URL firmada temporal    │
│  GET /api/documents/[key]?expiresIn=3600│
│  ↓                                        │
│  URL firmada válida por 1 hora          │
│  Cliente puede ver/descargar            │
└─────────────────────────────────────────┘
```

## 📋 Variables de Entorno Necesarias

**YA NO necesitas `CLOUDFLARE_R2_PUBLIC_URL`** ❌

Solo necesitas:

```env
# Cloudflare R2 - Configuración PRIVADA
CLOUDFLARE_ACCOUNT_ID=tu_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=tu_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=tu_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=islawfirm-documents
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
```

## 🔒 Ventajas de Seguridad

1. **Archivos Privados**: Los documentos NO son accesibles públicamente
2. **URLs Temporales**: Expiran después de un tiempo (configurable)
3. **Control de Acceso**: Solo se pueden generar URLs desde el servidor
4. **No Compartibles**: Las URLs expiran, no se pueden compartir indefinidamente
5. **Auditoría**: Puedes rastrear cuándo se accede a cada documento

## 🛠️ Configuración del Bucket

**IMPORTANTE**: Asegúrate de que tu bucket de R2 **NO tenga acceso público habilitado**:

1. Ve a tu bucket en Cloudflare R2
2. Settings > Public Access
3. **Deshabilita** el acceso público
4. Los archivos deben ser privados por defecto

## 📝 Cambios Realizados

### 1. `lib/cloudflare-r2.ts`
- ✅ `uploadFileToR2()` ahora solo retorna la clave (key), NO la URL
- ✅ `getSignedUrlForFile()` genera URLs firmadas temporales
- ✅ Eliminada la función `extractKeyFromUrl()` (ya no se usa)

### 2. `app/api/upload/route.ts`
- ✅ Retorna solo la clave, no la URL pública

### 3. `app/api/documents/[key]/route.ts` (NUEVO)
- ✅ Endpoint para generar URLs firmadas temporales
- ✅ Parámetro `expiresIn` para controlar la expiración (60s - 7 días)

### 4. `app/admin/dashboard/casos/[codigo]/page.tsx`
- ✅ Guarda solo `cloudflareId` (clave), no `url`
- ✅ Genera URL firmada al hacer clic en "Ver"

### 5. `app/revisar-estado/page.tsx`
- ✅ Genera URL firmada al hacer clic en "Ver"
- ✅ Los clientes pueden ver documentos de forma segura

## 🎯 Uso

### Para el Admin:
1. Sube un documento desde el panel de admin
2. El sistema guarda solo la clave en la base de datos
3. Puede ver el documento haciendo clic en "Ver" (genera URL temporal)

### Para el Cliente:
1. Revisa su caso en "Revisar Estado"
2. Ve la lista de documentos
3. Hace clic en "Ver" para un documento
4. El sistema genera una URL firmada temporal
5. Puede ver/descargar el documento (URL válida por 1 hora)

## ⚙️ Configuración de Expiración

Puedes cambiar el tiempo de expiración de las URLs:

```typescript
// En el código, cuando se genera la URL:
const response = await fetch(`/api/documents/${key}?expiresIn=7200`); // 2 horas
```

Valores recomendados:
- **1 hora (3600s)**: Para documentos normales
- **24 horas (86400s)**: Para documentos que el cliente necesita revisar
- **7 días (604800s)**: Máximo permitido

## ✅ Ventajas vs. Acceso Público

| Característica | Acceso Público ❌ | URLs Firmadas ✅ |
|---------------|-------------------|------------------|
| Seguridad | Baja (cualquiera con URL puede acceder) | Alta (URLs temporales) |
| Privacidad | No (archivos públicos) | Sí (archivos privados) |
| Control | No (URLs permanentes) | Sí (expiración configurable) |
| Auditoría | Limitada | Completa |
| Compartir | Sí (indefinidamente) | No (expira) |

## 🎉 Resultado Final

- ✅ **Documentos completamente privados**
- ✅ **Acceso controlado y temporal**
- ✅ **Seguridad mejorada**
- ✅ **Sin necesidad de URL pública**
- ✅ **Funciona perfectamente para documentos sensibles**

