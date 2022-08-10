/*
  Warnings:

  - The `directions` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "directions",
ADD COLUMN     "directions" TEXT[];
