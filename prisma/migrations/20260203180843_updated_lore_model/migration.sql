/*
  Warnings:

  - You are about to drop the `Edge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_loreId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_toId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_loreId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_sourceId_fkey";

-- AlterTable
ALTER TABLE "Lore" ADD COLUMN     "characters" JSONB DEFAULT '[]',
ADD COLUMN     "connections" JSONB DEFAULT '[]',
ADD COLUMN     "edges" JSONB DEFAULT '[]',
ADD COLUMN     "events" JSONB DEFAULT '[]',
ADD COLUMN     "nodes" JSONB DEFAULT '[]';

-- DropTable
DROP TABLE "Edge";

-- DropTable
DROP TABLE "Node";

-- DropEnum
DROP TYPE "NodeType";
