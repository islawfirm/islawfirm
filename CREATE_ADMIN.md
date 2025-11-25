# Crear Usuario Administrador

## Opción 1: Ejecutar SQL en Supabase (Recomendado)

1. Ve a tu proyecto en Supabase Dashboard
2. Abre el **SQL Editor**
3. Ejecuta este SQL:

```sql
INSERT INTO admins (id, email, "passwordHash", nombre, activo, "fechaCreacion", "fechaActualizacion")
VALUES (
  gen_random_uuid(),
  'admin@islawfirm.com.co',
  '$2b$10$ca1aZa6OMrjqNkZihj4SiuC9tbIQ1JbxqVf5BFirOq9N9fjcwYTfO',
  'Administrador Principal',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
```

4. Verifica que se creó:
```sql
SELECT id, email, nombre, activo FROM admins WHERE email = 'admin@islawfirm.com.co';
```

## Opción 2: Usar API Route (Requiere servidor corriendo)

1. Inicia el servidor: `npm run dev`
2. En otra terminal o usando Postman/Thunder Client:
   - URL: `POST http://localhost:3000/api/admin/create-initial`
   - Body (JSON): `{ "secret": "create-admin-2024" }`

## Credenciales

- **Email:** `admin@islawfirm.com.co`
- **Contraseña:** `Islaw.Firm25`

## Nota

El hash de la contraseña se genera con bcrypt (10 salt rounds). Si necesitas generar un nuevo hash, ejecuta:
```bash
npm run admin:create
```

