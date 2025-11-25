/**
 * Script para insertar el usuario admin directamente usando Prisma
 * Ejecutar con: node scripts/insert-admin.js
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

async function insertAdmin() {
  try {
    console.log('🔐 Conectando a la base de datos...\n');

    // Crear pool y adapter
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL no está definida en .env');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const email = 'admin@islawfirm.com.co';
    const password = 'Islaw.Firm25';

    // Verificar si ya existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('⚠️  El usuario administrador ya existe.');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   ID: ${existingAdmin.id}`);
      await prisma.$disconnect();
      await pool.end();
      return;
    }

    // Hashear la contraseña
    console.log('🔐 Generando hash de contraseña...');
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear el admin
    console.log('📝 Creando usuario administrador...\n');
    const admin = await prisma.admin.create({
      data: {
        email,
        passwordHash,
        nombre: 'Administrador Principal',
        activo: true,
      },
    });

    console.log('✅ Usuario administrador creado exitosamente!\n');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nombre: ${admin.nombre}`);
    console.log(`   Activo: ${admin.activo ? 'Sí' : 'No'}`);
    console.log(`   Fecha de creación: ${admin.fechaCreacion}\n`);

    await prisma.$disconnect();
    await pool.end();

    console.log('✨ Proceso completado exitosamente!');

  } catch (error) {
    console.error('❌ Error al crear el administrador:');
    console.error(error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

insertAdmin();

