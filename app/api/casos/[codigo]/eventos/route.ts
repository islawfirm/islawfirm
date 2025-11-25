import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { Evento } from '@/types/casos';

// POST - Agregar evento a un caso
export async function POST(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const body = await request.json();
    const evento: Omit<Evento, 'id'> = body.evento;

    // Validaciones
    if (!evento.fecha || !evento.titulo || !evento.descripcion || !evento.tipo) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos en el evento' },
        { status: 400 }
      );
    }

    const response = await CasosPrismaService.addEvento(codigo, evento);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/casos/[codigo]/eventos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al agregar evento' },
      { status: 500 }
    );
  }
}

