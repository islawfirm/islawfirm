/**
 * Script para probar la conexión a Supabase con Prisma
 * Ejecutar con: npm run prisma:test
 */

import { PrismaClient } from '@prisma/client';

// Verificar que DATABASE_URL esté configurado
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL no está definido en el archivo .env');
  console.error('   Por favor, asegúrate de tener DATABASE_URL configurado.');
  process.exit(1);
}

console.log('📋 DATABASE_URL configurado:', process.env.DATABASE_URL ? '✅ Sí' : '❌ No');
console.log('   (URL oculta por seguridad)\n');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔌 Probando conexión a Supabase...\n');
    
    // Probar conexión básica
    await prisma.$connect();
    console.log('✅ Conexión exitosa a la base de datos!\n');
    
    // Probar una consulta simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Consulta de prueba exitosa:', result);
    
    // Verificar si hay tablas
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    
    console.log('\n📊 Tablas en la base de datos:');
    if (tables.length === 0) {
      console.log('   (No hay tablas aún - esto es normal si es una base de datos nueva)');
    } else {
      tables.forEach(table => {
        console.log(`   - ${table.tablename}`);
      });
    }
    
    console.log('\n✨ Todo funciona correctamente!');
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Ejecuta: npx prisma migrate dev --name init');
    console.log('   2. Esto creará las tablas en tu base de datos');
    
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:');
    console.error(error);
    
    if (error instanceof Error) {
      if (error.message.includes('P1001')) {
        console.error('\n💡 Posibles causas:');
        console.error('   - La URL de conexión es incorrecta');
        console.error('   - La contraseña es incorrecta');
        console.error('   - El servidor no está accesible');
      } else if (error.message.includes('P1000')) {
        console.error('\n💡 Posibles causas:');
        console.error('   - Las credenciales son incorrectas');
        console.error('   - El usuario no tiene permisos');
      }
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Conexión cerrada.');
  }
}

testConnection();

