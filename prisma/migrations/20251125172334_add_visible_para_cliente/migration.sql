-- AlterTable
ALTER TABLE "documentos" ADD COLUMN     "visibleParaCliente" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "documentos_visibleParaCliente_idx" ON "documentos"("visibleParaCliente");
