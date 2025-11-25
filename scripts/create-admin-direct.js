/**
 * Script para crear el admin directamente usando bcrypt y luego insertar manualmente
 * Este script genera el hash y muestra el SQL para ejecutar
 */

const bcrypt = require('bcryptjs');

async function generateAdminHash() {
  const email = 'admin@islawfirm.com.co';
  const password = 'Islaw.Firm25';
  
  console.log('🔐 Generando hash de contraseña...\n');
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  
  console.log('✅ Hash generado exitosamente!\n');
  console.log('📋 Ejecuta este SQL en Supabase SQL Editor:\n');
  console.log('---');
  console.log(`INSERT INTO admins (id, email, "passwordHash", nombre, activo, "fechaCreacion", "fechaActualizacion")`);
  console.log(`VALUES (`);
  console.log(`  gen_random_uuid(),`);
  console.log(`  '${email}',`);
  console.log(`  '${passwordHash}',`);
  console.log(`  'Administrador Principal',`);
  console.log(`  true,`);
  console.log(`  NOW(),`);
  console.log(`  NOW()`);
  console.log(`)`);
  console.log(`ON CONFLICT (email) DO NOTHING;`);
  console.log('---\n');
  console.log('O usa la API route cuando el servidor esté corriendo:');
  console.log('POST http://localhost:3000/api/admin/create-initial');
  console.log('Body: { "secret": "create-admin-2024" }');
}

generateAdminHash().catch(console.error);

