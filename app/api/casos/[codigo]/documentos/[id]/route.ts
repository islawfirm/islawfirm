import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { Documento } from '@/types/casos';

// PUT - Actualizar un documento
export async function PUT(
  request: NextRequest,
  { params }: { params: { codigo: string; id: string } }
) {
  try {
    const { codigo, id } = params;
    const body = await request.json();
    const documento: Partial<Documento> = body.documento;

    const response = await CasosPrismaService.updateDocumento(codigo, id, documento);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en PUT /api/casos/[codigo]/documentos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar documento' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un documento
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codigo: string; id: string } }
) {
  try {
    const { codigo, id } = params;
    const response = await CasosPrismaService.deleteDocumento(codigo, id);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en DELETE /api/casos/[codigo]/documentos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar documento' },
      { status: 500 }
    );
  }
}

