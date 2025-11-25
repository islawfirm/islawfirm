import { NextRequest, NextResponse } from 'next/server';
import { CasosPrismaService } from '@/services/casosPrismaService';
import type { Documento } from '@/types/casos';

// POST - Agregar documento a un caso
export async function POST(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  try {
    const { codigo } = params;
    const body = await request.json();
    const documento: Omit<Documento, 'id'> = body.documento;

    // Validaciones
    if (!documento.nombre || !documento.tipo || !documento.fecha) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos en el documento (nombre, tipo, fecha)' },
        { status: 400 }
      );
    }
    
    // El estado es opcional (puede ser null para documentos sin estado como cédulas, pasaportes)

    const response = await CasosPrismaService.addDocumento(codigo, documento);
    
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 400 }
      );
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/casos/[codigo]/documentos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al agregar documento' },
      { status: 500 }
    );
  }
}

