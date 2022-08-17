-- DropIndex
DROP INDEX "Recipe_authorId_key";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "image_url" TEXT;
