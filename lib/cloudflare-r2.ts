/**
 * Servicio para interactuar con Cloudflare R2
 * R2 es compatible con la API de S3, por lo que usamos @aws-sdk/client-s3
 * 
 * IMPORTANTE: Los archivos son PRIVADOS. Se usan URLs firmadas temporales para acceso seguro.
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configuración del cliente S3 para R2
const getR2Client = () => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Faltan credenciales de Cloudflare R2 en las variables de entorno');
  }

  return new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

/**
 * Subir un archivo a R2 (PRIVADO - sin acceso público)
 * @param file Buffer del archivo
 * @param fileName Nombre del archivo
 * @param contentType Tipo MIME del archivo
 * @returns Clave (key) del archivo en R2 (NO URL pública)
 */
export async function uploadFileToR2(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<{ key: string }> {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('CLOUDFLARE_R2_BUCKET_NAME no está configurado');
  }

  const client = getR2Client();
  
  // Generar un nombre único para el archivo
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = fileName.split('.').pop();
  const baseName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-');
  const uniqueFileName = `${baseName}-${timestamp}-${randomString}.${extension}`;
  const key = `documents/${uniqueFileName}`;

  // Subir el archivo (PRIVADO - sin ACL público)
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    // NO configuramos ACL público - el archivo es privado
  });

  await client.send(command);

  // Retornar solo la clave, NO la URL pública
  return { key };
}

/**
 * Eliminar un archivo de R2
 * @param key Clave del archivo en R2 (ruta completa)
 */
export async function deleteFileFromR2(key: string): Promise<void> {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('CLOUDFLARE_R2_BUCKET_NAME no está configurado');
  }

  const client = getR2Client();
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await client.send(command);
}

/**
 * Obtener una URL firmada temporal para un archivo privado
 * Esta es la forma SEGURA de acceder a archivos privados
 * @param key Clave del archivo en R2 (ej: "documents/pasaporte-123.pdf")
 * @param expiresIn Segundos hasta que expire (default: 1 hora = 3600 segundos)
 * @returns URL firmada temporal que expira después del tiempo especificado
 */
export async function getSignedUrlForFile(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('CLOUDFLARE_R2_BUCKET_NAME no está configurado');
  }

  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}

