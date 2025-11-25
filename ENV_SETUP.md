# Configuración de Variables de Entorno

## Archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# ============================================
# CONFIGURACIÓN DE SUPABASE
# ============================================

# URL del proyecto de Supabase
# Encuéntrala en: Settings > API > Project URL
# Formato: https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://mrmdgyihjkzkoflpgjsq.supabase.co

# Clave Anónima (Pública) - Para operaciones del cliente
# Encuéntrala en: Settings > API > Project API keys > anon public
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Clave de Servicio (Privada) - Solo para operaciones del servidor
# Encuéntrala en: Settings > API > Project API keys > service_role secret
# ⚠️ NUNCA expongas esta clave en el cliente
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# URL de conexión a la base de datos PostgreSQL
# Reemplaza [YOUR-PASSWORD] con tu contraseña de base de datos
# Session Pooler (puerto 5432) - Para conexiones de sesión
DATABASE_URL=postgresql://postgres.mrmdgyihjkzkoflpgjsq:[YOUR-PASSWORD]@aws-1-us-east-2.pooler.supabase.com:5432/postgres

# Transaction Pooler (puerto 6543) - Para transacciones
# Opcional, puedes usar la misma DATABASE_URL cambiando el puerto
DATABASE_URL_TRANSACTION=postgresql://postgres.mrmdgyihjkzkoflpgjsq:[YOUR-PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres

# ============================================
# CONFIGURACIÓN DEL PANEL ADMIN
# ============================================

# Contraseña para el panel de administración
NEXT_PUBLIC_ADMIN_PASSWORD=tu_password_seguro_aqui

# ============================================
# CONFIGURACIÓN DE CLOUDFLARE R2 (Almacenamiento de Archivos)
# ============================================

# Account ID de Cloudflare
# Encuéntralo en: Dashboard > Right sidebar > Account ID
CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui

# Access Key ID para R2
# Se crea en: R2 > Manage R2 API Tokens > Create API Token
CLOUDFLARE_R2_ACCESS_KEY_ID=tu_access_key_id_aqui

# Secret Access Key para R2
# Se obtiene al crear el API Token (solo se muestra una vez)
CLOUDFLARE_R2_SECRET_ACCESS_KEY=tu_secret_access_key_aqui

# Nombre del bucket de R2
# El nombre del bucket que crees en: R2 > Create bucket
CLOUDFLARE_R2_BUCKET_NAME=islawfirm-documents

# Endpoint de R2 (para la región)
# Formato: https://[account-id].r2.cloudflarestorage.com
# Reemplaza [account-id] con tu Account ID real
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

# NOTA: NO necesitas CLOUDFLARE_R2_PUBLIC_URL
# Los archivos son PRIVADOS y se usan URLs firmadas temporales para acceso seguro
```

## Cómo obtener las claves de Supabase

1. **Ve a tu dashboard de Supabase**: https://supabase.com/dashboard
2. **Selecciona tu proyecto**
3. **Ve a Settings > API**
4. **Copia los siguientes valores:**
   - **Project URL**: `https://mrmdgyihjkzkoflpgjsq.supabase.co` (ya lo tienes)
   - **anon public key**: La clave que dice "anon" o "public"
   - **service_role secret key**: La clave que dice "service_role" (⚠️ MANTÉN ESTA SECRETA)

## Contraseña de la base de datos

- La contraseña es la que configuraste cuando creaste el proyecto de Supabase
- Si la olvidaste, puedes cambiarla en: **Settings > Database > Database Password**

## Cómo obtener las credenciales de Cloudflare R2

### 1. Obtener el Account ID
1. Ve a tu dashboard de Cloudflare: https://dash.cloudflare.com
2. En la barra lateral derecha, verás tu **Account ID**
3. Cópialo y pégalo en `CLOUDFLARE_ACCOUNT_ID`

### 2. Crear un Bucket en R2
1. En el dashboard de Cloudflare, ve a **R2** (en el menú lateral)
2. Si es tu primera vez, haz clic en **Get started** o **Create bucket**
3. Crea un bucket con un nombre (ej: `islawfirm-documents`)
4. Anota el nombre del bucket para `CLOUDFLARE_R2_BUCKET_NAME`

### 3. Crear API Token para R2
1. En R2, ve a **Manage R2 API Tokens**
2. Haz clic en **Create API Token**
3. Configura el token:
   - **Token name**: `islawfirm-r2-token` (o el nombre que prefieras)
   - **Permissions**: Selecciona **Object Read & Write** o **Admin Read & Write**
   - **TTL**: Opcional, puedes dejarlo sin límite
   - **Bucket access**: Selecciona el bucket que creaste o **All buckets**
4. Haz clic en **Create API Token**
5. **IMPORTANTE**: Copia inmediatamente:
   - **Access Key ID** → `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
   - ⚠️ **El Secret Access Key solo se muestra UNA VEZ**. Guárdalo de forma segura.

### 4. Configurar el Endpoint
- El endpoint por defecto es: `https://[account-id].r2.cloudflarestorage.com`
- Reemplaza `[account-id]` con tu Account ID real
- Ejemplo: `https://abc123def456.r2.cloudflarestorage.com`

## Ejemplo de configuración completa

```env
# Cloudflare R2 (Documentos PRIVADOS - URLs firmadas temporales)
CLOUDFLARE_ACCOUNT_ID=abc123def456789
CLOUDFLARE_R2_ACCESS_KEY_ID=1a2b3c4d5e6f7g8h9i0j
CLOUDFLARE_R2_SECRET_ACCESS_KEY=tu_secret_key_muy_largo_aqui
CLOUDFLARE_R2_BUCKET_NAME=islawfirm-documents
CLOUDFLARE_R2_ENDPOINT=https://abc123def456789.r2.cloudflarestorage.com

# NOTA: Los archivos son PRIVADOS
# NO necesitas CLOUDFLARE_R2_PUBLIC_URL
# El sistema usa URLs firmadas temporales para acceso seguro
```

## Notas importantes

- ⚠️ **NUNCA** subas el archivo `.env.local` al repositorio (ya está en `.gitignore`)
- ⚠️ **NUNCA** expongas `SUPABASE_SERVICE_ROLE_KEY` en el código del cliente
- ⚠️ **NUNCA** expongas `CLOUDFLARE_R2_SECRET_ACCESS_KEY` en el código del cliente
- ⚠️ **Guarda el Secret Access Key de forma segura** - solo se muestra una vez al crearlo
- Para producción (Vercel), configura estas variables en: **Settings > Environment Variables**
- Cloudflare R2 tiene un plan gratuito generoso (10 GB de almacenamiento y 1 millón de operaciones al mes)

