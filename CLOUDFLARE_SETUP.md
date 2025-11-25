# 🚀 Guía Completa: Configuración de Cloudflare R2

Esta guía te ayudará a configurar Cloudflare R2 para almacenar documentos e imágenes en tu aplicación.

## 📋 ¿Qué es Cloudflare R2?

Cloudflare R2 es un servicio de almacenamiento de objetos (similar a AWS S3) que permite:
- ✅ Almacenar archivos (documentos, imágenes, PDFs, etc.)
- ✅ Acceso rápido global gracias a la red de Cloudflare
- ✅ Plan gratuito generoso (10 GB + 1M operaciones/mes)
- ✅ Sin costos de egress (salida de datos)

## 🔑 Variables de Entorno Necesarias

Agrega estas variables a tu archivo `.env.local`:

```env
# Cloudflare R2 - Configuración
CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui
CLOUDFLARE_R2_ACCESS_KEY_ID=tu_access_key_id_aqui
CLOUDFLARE_R2_SECRET_ACCESS_KEY=tu_secret_access_key_aqui
CLOUDFLARE_R2_BUCKET_NAME=islawfirm-documents
CLOUDFLARE_R2_PUBLIC_URL=https://islawfirm-documents.[account-id].r2.cloudflarestorage.com
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
```

## 📍 Dónde Encontrar Cada Credencial

### 1. Account ID (`CLOUDFLARE_ACCOUNT_ID`)

**Ubicación:**
1. Ve a https://dash.cloudflare.com
2. Inicia sesión en tu cuenta
3. En la **barra lateral derecha**, verás tu **Account ID**
4. Es un código alfanumérico (ej: `abc123def456789`)

**Ejemplo visual:**
```
┌─────────────────────────┐
│  Cloudflare Dashboard   │
├─────────────────────────┤
│                         │
│  Account ID:            │
│  abc123def456789  [📋]  │  ← Copia este
│                         │
└─────────────────────────┘
```

### 2. Access Key ID y Secret Access Key

**Ubicación:**
1. En el dashboard de Cloudflare, haz clic en **R2** (en el menú lateral izquierdo)
2. Si es tu primera vez, haz clic en **Get started** o **Subscribe**
3. En la página de R2, haz clic en **Manage R2 API Tokens**
4. Haz clic en **Create API Token**
5. Completa el formulario:
   - **Token name**: `islawfirm-r2-token` (o el nombre que prefieras)
   - **Permissions**: 
     - Para desarrollo: **Admin Read & Write**
     - Para producción: **Object Read & Write** (más seguro)
   - **TTL**: Opcional (puedes dejarlo vacío para que no expire)
   - **Bucket access**: 
     - Selecciona el bucket específico que creaste, O
     - Selecciona **All buckets** si quieres acceso a todos
6. Haz clic en **Create API Token**
7. **IMPORTANTE**: Se mostrarán dos valores:
   - **Access Key ID** → Copia este para `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - **Secret Access Key** → Copia este para `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
   - ⚠️ **El Secret Access Key solo se muestra UNA VEZ**. Guárdalo de forma segura.

**Ejemplo visual:**
```
┌─────────────────────────────────────┐
│  Create API Token                   │
├─────────────────────────────────────┤
│  Token name: islawfirm-r2-token     │
│  Permissions: Admin Read & Write    │
│  Bucket access: islawfirm-documents  │
│                                     │
│  [Create API Token]                 │
└─────────────────────────────────────┘

Después de crear:

┌─────────────────────────────────────┐
│  API Token Created                   │
├─────────────────────────────────────┤
│  Access Key ID:                     │
│  1a2b3c4d5e6f7g8h9i0j  [📋]         │
│                                     │
│  Secret Access Key:                 │
│  abc123def456...xyz789  [📋]        │
│  ⚠️ This will only be shown once!   │
└─────────────────────────────────────┘
```

### 3. Bucket Name (`CLOUDFLARE_R2_BUCKET_NAME`)

**Ubicación:**
1. En R2, haz clic en **Create bucket**
2. Ingresa un nombre (ej: `islawfirm-documents`)
3. Selecciona una ubicación (cualquiera funciona, Cloudflare es global)
4. Haz clic en **Create bucket**
5. El nombre que ingresaste es el que usarás en `CLOUDFLARE_R2_BUCKET_NAME`

**Ejemplo visual:**
```
┌─────────────────────────────────────┐
│  Create bucket                       │
├─────────────────────────────────────┤
│  Bucket name:                        │
│  [islawfirm-documents        ]      │  ← Este nombre
│                                     │
│  Location:                           │
│  [WNAM (US West)        ▼]          │
│                                     │
│  [Create bucket]                    │
└─────────────────────────────────────┘
```

### 4. Public URL (`CLOUDFLARE_R2_PUBLIC_URL`) - **REQUERIDO**

⚠️ **IMPORTANTE**: Esta variable es **NECESARIA** para que los clientes puedan ver los documentos e imágenes cuando revisen su caso.

**Cómo obtener la URL pública:**

1. En R2, selecciona tu bucket
2. Ve a **Settings** > **Public Access** o **Custom Domain**
3. Tienes dos opciones:

**Opción A: Usar dominio personalizado de R2 (Recomendado)**
- Cloudflare R2 proporciona una URL pública automática
- Formato: `https://pub-[random-id].r2.dev`
- Esta URL se muestra en la configuración del bucket
- Ejemplo: `https://pub-8be5495ddec74600bf045db755d6249e.r2.dev`

**Opción B: Configurar dominio personalizado**
- Si tienes un dominio propio, puedes configurarlo
- Ve a **Settings** > **Custom Domain**
- Agrega tu dominio (ej: `files.tudominio.com`)
- La URL será: `https://files.tudominio.com`

**⚠️ IMPORTANTE:**
- Sin esta URL pública, los clientes **NO podrán ver** los documentos e imágenes
- Los archivos se subirán correctamente, pero no serán accesibles desde el navegador
- Asegúrate de que el bucket tenga **Public Access** habilitado en la configuración

### 5. Endpoint (`CLOUDFLARE_R2_ENDPOINT`)

**Formato:**
```
https://[account-id].r2.cloudflarestorage.com
```

**Ejemplo:**
Si tu Account ID es `abc123def456789`, el endpoint será:
```
https://abc123def456789.r2.cloudflarestorage.com
```

## 📝 Ejemplo Completo de `.env.local`

```env
# ============================================
# CLOUDFLARE R2
# ============================================

# Account ID (barra lateral derecha del dashboard)
CLOUDFLARE_ACCOUNT_ID=abc123def456789

# Access Key ID (R2 > Manage R2 API Tokens > Create API Token)
CLOUDFLARE_R2_ACCESS_KEY_ID=1a2b3c4d5e6f7g8h9i0j

# Secret Access Key (se muestra solo una vez al crear el token)
CLOUDFLARE_R2_SECRET_ACCESS_KEY=tu_secret_key_muy_largo_aqui_abc123def456

# Nombre del bucket (el que creaste en R2)
CLOUDFLARE_R2_BUCKET_NAME=islawfirm-documents

# URL pública (opcional, configurar después si es necesario)
CLOUDFLARE_R2_PUBLIC_URL=https://islawfirm-documents.abc123def456789.r2.cloudflarestorage.com

# Endpoint (reemplaza [account-id] con tu Account ID real)
CLOUDFLARE_R2_ENDPOINT=https://abc123def456789.r2.cloudflarestorage.com
```

## ✅ Checklist de Configuración

- [ ] Tienes una cuenta de Cloudflare (gratis)
- [ ] Has activado R2 en tu cuenta
- [ ] Has creado un bucket en R2
- [ ] Has creado un API Token con permisos adecuados
- [ ] Has copiado el Account ID
- [ ] Has copiado el Access Key ID
- [ ] Has copiado el Secret Access Key (y lo guardaste de forma segura)
- [ ] Has agregado todas las variables al `.env.local`
- [ ] Has reemplazado los valores de ejemplo con tus credenciales reales

## 🔒 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env.local` al repositorio
- ⚠️ **NUNCA** expongas `CLOUDFLARE_R2_SECRET_ACCESS_KEY` en el código del cliente
- ⚠️ **Guarda el Secret Access Key de forma segura** - solo se muestra una vez
- Para producción, usa permisos más restrictivos en el API Token (Object Read & Write en lugar de Admin)

## 🚀 Próximos Pasos

Una vez configuradas las variables de entorno, el sistema estará listo para:
1. Subir documentos desde el panel de admin
2. Almacenar imágenes de casos
3. Gestionar archivos de forma segura en Cloudflare R2

## 📚 Recursos Adicionales

- [Documentación oficial de Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Guía de API Tokens de R2](https://developers.cloudflare.com/r2/api/s3/api/)
- [Precios de Cloudflare R2](https://developers.cloudflare.com/r2/pricing/)

