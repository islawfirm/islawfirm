import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar que se proporcionaron email y contraseña
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar el admin en la base de datos
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Si no existe el admin
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar si el admin está activo
    if (!admin.activo) {
      return NextResponse.json(
        { success: false, error: 'Cuenta desactivada. Contacte al administrador.' },
        { status: 403 }
      );
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Actualizar último acceso
    await prisma.admin.update({
      where: { id: admin.id },
      data: { ultimoAcceso: new Date() },
    });

    // Crear token de sesión (simple, se puede mejorar con JWT después)
    const sessionToken = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');

    // Retornar éxito con datos del admin (sin la contraseña)
    return NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        nombre: admin.nombre,
        token: sessionToken,
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

