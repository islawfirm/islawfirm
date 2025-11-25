import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nota: El middleware del servidor no puede acceder a localStorage
  // La autenticación se maneja en el cliente a través de DashboardLayout
  // Este middleware solo redirige si hay un token explícito en cookies/headers
  // Para una implementación completa, se debería usar cookies httpOnly o JWT en headers
  
  // Por ahora, permitir el acceso y dejar que DashboardLayout maneje la autenticación
  // En producción, implementar cookies httpOnly o JWT en headers Authorization
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
  ],
};

