import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToR2 } from '@/lib/cloudflare-r2';

/**
 * POST /api/upload
 * Sube un archivo a Cloudflare R2
 * 
 * Body (form-data):
 * - file: Archivo a subir
 * - fileName: Nombre del archivo (opcional, se usa el del archivo si no se proporciona)
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar que las variables de entorno estén configuradas
    const requiredEnvVars = [
      'CLOUDFLARE_ACCOUNT_ID',
      'CLOUDFLARE_R2_ACCESS_KEY_ID',
      'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
      'CLOUDFLARE_R2_BUCKET_NAME',
      'CLOUDFLARE_R2_ENDPOINT',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Faltan variables de entorno: ${missingVars.join(', ')}` 
        },
        { status: 500 }
      );
    }

    // Obtener el FormData
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      console.error('❌ No se proporcionó ningún archivo');
      return NextResponse.json(
        { success: false, error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }
    
    console.log('📄 Archivo recibido:', file.name, 'Tamaño:', file.size, 'Tipo:', file.type);

    // Validar tamaño del archivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'El archivo es demasiado grande. Tamaño máximo: 10MB' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo (solo imágenes y documentos)
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tipo de archivo no permitido. Tipos permitidos: imágenes (JPG, PNG, GIF, WEBP) y documentos (PDF, DOC, DOCX, XLS, XLSX)' 
        },
        { status: 400 }
      );
    }

    // Convertir File a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Obtener nombre del archivo
    const fileName = formData.get('fileName') as string || file.name;

    // Subir a R2 (archivo PRIVADO - solo retorna la clave, no URL pública)
    console.log('☁️ Subiendo a Cloudflare R2...');
    const { key } = await uploadFileToR2(
      buffer,
      fileName,
      file.type
    );
    
    console.log('✅ Archivo subido exitosamente. Key:', key);

    return NextResponse.json({
      success: true,
      data: {
        key, // Solo retornamos la clave, NO la URL pública
        fileName: file.name,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error('❌ Error completo al subir archivo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al subir el archivo';
    console.error('💬 Mensaje de error:', errorMessage);
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

