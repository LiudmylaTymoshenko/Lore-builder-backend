-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_loreId_fkey";

-- DropForeignKey
ALTER TABLE "Lore" DROP CONSTRAINT "Lore_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_loreId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_loreId_fkey";

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "positionX" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "positionY" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Edge_loreId_idx" ON "Edge"("loreId");

-- CreateIndex
CREATE INDEX "Node_loreId_idx" ON "Node"("loreId");

-- CreateIndex
CREATE INDEX "Source_loreId_idx" ON "Source"("loreId");

-- AddForeignKey
ALTER TABLE "Lore" ADD CONSTRAINT "Lore_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_loreId_fkey" FOREIGN KEY ("loreId") REFERENCES "Lore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_loreId_fkey" FOREIGN KEY ("loreId") REFERENCES "Lore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_loreId_fkey" FOREIGN KEY ("loreId") REFERENCES "Lore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
