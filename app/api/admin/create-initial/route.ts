import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Solo permitir en desarrollo o con una clave secreta
    // Si no hay secret en el body, verificar si estamos en desarrollo
    const body = await request.json().catch(() => ({}));
    const secret = body.secret || '';
    const adminCreateSecret = process.env.ADMIN_CREATE_SECRET || 'create-admin-2024';
    
    // Permitir en desarrollo sin secret, o con secret correcto
    if (process.env.NODE_ENV === 'production' && secret !== adminCreateSecret) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const email = 'admin@islawfirm.com.co';
    const password = 'Islaw.Firm25';

    // Verificar si el admin ya existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'El usuario administrador ya existe.',
      });
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

    return NextResponse.json({
      success: true,
      message: 'Usuario administrador creado exitosamente',
      data: {
        id: admin.id,
        email: admin.email,
        nombre: admin.nombre,
      },
    });

  } catch (error) {
    console.error('Error al crear admin:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear el administrador' },
      { status: 500 }
    );
  }
}

