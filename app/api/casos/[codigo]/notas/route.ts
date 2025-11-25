import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';

// POST - Agregar nota a un caso
export async function POST(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const body = await request.json();
    const nota: string = body.nota;

    if (!nota || nota.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'La nota no puede estar vacía' },
        { status: 400 }
      );
    }

    const response = await CasosPrismaService.addNota(codigo, nota);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/casos/[codigo]/notas:', error);
    return NextResponse.json(
      { success: false, error: 'Error al agregar nota' },
      { status: 500 }
    );
  }
}

