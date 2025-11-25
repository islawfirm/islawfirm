-- CreateTable
CREATE TABLE "casos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "tipoCaso" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "abogadoAsignado" TEXT NOT NULL,
    "emailAbogado" TEXT NOT NULL,
    "telefonoAbogado" TEXT NOT NULL,
    "ultimaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcionCaso" TEXT,
    "documentosPendientes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notasAbogado" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imagenCaso" TEXT,
    "porcentajeProgreso" INTEGER NOT NULL DEFAULT 0,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,
    "creadoPor" TEXT,

    CONSTRAINT "casos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "casoId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "casoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "estado" TEXT NOT NULL,
    "base64" TEXT,
    "cloudflareId" TEXT,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "casos_codigo_key" ON "casos"("codigo");

-- CreateIndex
CREATE INDEX "casos_codigo_idx" ON "casos"("codigo");

-- CreateIndex
CREATE INDEX "casos_estado_idx" ON "casos"("estado");

-- CreateIndex
CREATE INDEX "casos_nombreCliente_idx" ON "casos"("nombreCliente");

-- CreateIndex
CREATE INDEX "eventos_casoId_idx" ON "eventos"("casoId");

-- CreateIndex
CREATE INDEX "eventos_fecha_idx" ON "eventos"("fecha");

-- CreateIndex
CREATE INDEX "documentos_casoId_idx" ON "documentos"("casoId");

-- CreateIndex
CREATE INDEX "documentos_estado_idx" ON "documentos"("estado");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "casos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "casos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
