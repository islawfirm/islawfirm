import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';

// DELETE - Eliminar una nota por índice
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codigo: string; index: string } }
) {
  try {
    const { codigo, index } = params;
    const notaIndex = parseInt(index, 10);

    if (isNaN(notaIndex) || notaIndex < 0) {
      return NextResponse.json(
        { success: false, error: 'Índice de nota inválido' },
        { status: 400 }
      );
    }

    const response = await CasosPrismaService.deleteNota(codigo, notaIndex);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en DELETE /api/casos/[codigo]/notas/[index]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar nota' },
      { status: 500 }
    );
  }
}

