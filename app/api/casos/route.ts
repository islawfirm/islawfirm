import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { CasoNuevo } from '@/types/casos';

// GET - Listar todos los casos
export async function GET(request: NextRequest) {
  try {
    const response = await CasosPrismaService.getAllCasos();
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    // Headers de caché para optimización (5 minutos en producción)
    const headers = new Headers();
    headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Error en GET /api/casos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener casos' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo caso
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const casoNuevo: CasoNuevo = body.caso;
    const creadoPor = body.creadoPor; // Email del admin que crea el caso

    // Validaciones básicas
    if (!casoNuevo.nombreCliente || !casoNuevo.tipoCaso || !casoNuevo.estado) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const response = await CasosPrismaService.createCaso(casoNuevo, creadoPor);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/casos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear caso' },
      { status: 500 }
    );
  }
}

