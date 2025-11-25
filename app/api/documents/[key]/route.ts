import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrlForFile } from '@/lib/cloudflare-r2';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/documents/[key]
 * Genera una URL firmada temporal para acceder a un documento privado
 * 
 * Query params:
 * - codigoCaso: Código del caso (REQUERIDO para validación de seguridad)
 * - expiresIn: Segundos hasta que expire la URL (default: 1800 = 30 minutos)
 * 
 * Esta ruta es SEGURA porque:
 * 1. Valida que el documento pertenece al caso especificado
 * 2. Valida que el documento está marcado como visibleParaCliente=true
 * 3. Solo genera URLs firmadas temporales
 * 4. Las URLs expiran después del tiempo especificado (30 min por defecto)
 * 5. Los archivos NO son accesibles públicamente
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const searchParams = request.nextUrl.searchParams;
    const codigoCaso = searchParams.get('codigoCaso');
    const expiresIn = parseInt(searchParams.get('expiresIn') || '1800', 10); // 30 minutos por defecto

    // Validar que la clave no esté vacía
    if (!key || key.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Clave del documento no proporcionada' },
        { status: 400 }
      );
    }

    // Validar que se proporcione el código del caso (REQUERIDO para seguridad)
    if (!codigoCaso || codigoCaso.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Código del caso es requerido para acceder al documento' },
        { status: 400 }
      );
    }

    // Validar expiresIn (mínimo 60 segundos, máximo 1 hora para mayor seguridad)
    if (expiresIn < 60 || expiresIn > 3600) {
      return NextResponse.json(
        { success: false, error: 'expiresIn debe estar entre 60 segundos y 1 hora (3600 segundos)' },
        { status: 400 }
      );
    }

    // Decodificar la clave (puede venir codificada en la URL)
    const decodedKey = decodeURIComponent(key);

    // Validar que el documento pertenece al caso y está visible para el cliente
    const documento = await prisma.documento.findFirst({
      where: {
        cloudflareId: decodedKey,
        caso: {
          codigo: codigoCaso.trim().toUpperCase()
        },
        visibleParaCliente: true // SOLO documentos visibles para el cliente
      },
      include: {
        caso: {
          select: {
            codigo: true
          }
        }
      }
    });

    if (!documento) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Documento no encontrado o no autorizado. El documento no pertenece a este caso o no está disponible para visualización.' 
        },
        { status: 403 }
      );
    }

    // Generar URL firmada temporal
    const signedUrl = await getSignedUrlForFile(decodedKey, expiresIn);

    return NextResponse.json({
      success: true,
      data: {
        url: signedUrl,
        expiresIn,
        key: decodedKey,
      },
    });
  } catch (error) {
    console.error('Error al generar URL firmada:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al generar URL del documento' 
      },
      { status: 500 }
    );
  }
}

