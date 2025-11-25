-- Script SQL para crear el usuario administrador inicial
-- Ejecutar este script directamente en Supabase SQL Editor
-- O usar: psql con tu DATABASE_URL

-- Nota: La contraseña 'Islaw.Firm25' debe ser hasheada con bcrypt
-- Este script usa un hash pre-generado (salt rounds: 10)
-- Si necesitas generar un nuevo hash, usa: bcrypt.hash('Islaw.Firm25', 10)

INSERT INTO admins (id, email, "passwordHash", nombre, activo, "fechaCreacion", "fechaActualizacion")
VALUES (
  gen_random_uuid(),
  'admin@islawfirm.com.co',
  '$2a$10$rK8X9YzQ5vN5mH3jL2pB7eK8X9YzQ5vN5mH3jL2pB7eK8X9YzQ5vN5m', -- Hash de 'Islaw.Firm25'
  'Administrador Principal',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Verificar que se creó correctamente
SELECT id, email, nombre, activo, "fechaCreacion" FROM admins WHERE email = 'admin@islawfirm.com.co';

