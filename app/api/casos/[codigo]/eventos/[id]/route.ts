import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { Evento } from '@/types/casos';

// PUT - Actualizar un evento
export async function PUT(
  request: NextRequest,
  { params }: { params: { codigo: string; id: string } }
) {
  try {
    const { codigo, id } = params;
    const body = await request.json();
    const evento: Partial<Evento> = body.evento;

    const response = await CasosPrismaService.updateEvento(codigo, id, evento);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en PUT /api/casos/[codigo]/eventos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un evento
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codigo: string; id: string } }
) {
  try {
    const { codigo, id } = params;
    const response = await CasosPrismaService.deleteEvento(codigo, id);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en DELETE /api/casos/[codigo]/eventos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar evento' },
      { status: 500 }
    );
  }
}

