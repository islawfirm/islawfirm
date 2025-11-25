/**
 * Script para crear el usuario administrador inicial
 * Ejecutar con: npx tsx scripts/create-admin.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@islawfirm.com.co';
    const password = 'Islaw.Firm25';

    // Verificar si el admin ya existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('⚠️  El usuario administrador ya existe.');
      console.log('   Si deseas actualizar la contraseña, elimina el usuario primero.');
      return;
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear el admin
    const admin = await prisma.admin.create({
      data: {
        email,
        passwordHash,
        nombre: 'Administrador Principal',
        activo: true,
      },
    });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log(`   Email: ${admin.email}`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Nombre: ${admin.nombre}`);
    console.log(`   Activo: ${admin.activo ? 'Sí' : 'No'}`);

  } catch (error) {
    console.error('❌ Error al crear el administrador:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

