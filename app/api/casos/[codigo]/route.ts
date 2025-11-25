import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { CasoUpdate } from '@/types/casos';

// GET - Obtener un caso por código
// Query param: soloVisiblesParaCliente=true para filtrar documentos (página pública)
export async function GET(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const searchParams = request.nextUrl.searchParams;
    const soloVisiblesParaCliente = searchParams.get('soloVisiblesParaCliente') === 'true';
    
    const response = await CasosPrismaService.getCaso(codigo, soloVisiblesParaCliente);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 404 }
      );
    }

    // Headers de caché para optimización (2 minutos para casos individuales)
    const headers = new Headers();
    headers.set('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=300');
    
    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Error en GET /api/casos/[codigo]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener caso' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un caso
export async function PUT(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const body = await request.json();
    const update: CasoUpdate = {
      codigo,
      ...body
    };

    const response = await CasosPrismaService.updateCaso(update);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en PUT /api/casos/[codigo]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar caso' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un caso
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const response = await CasosPrismaService.deleteCaso(codigo);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en DELETE /api/casos/[codigo]:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar caso' },
      { status: 500 }
    );
  }
}

