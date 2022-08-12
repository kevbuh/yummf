/*
  Warnings:

  - You are about to drop the column `easeRating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `overallRating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `presentationRating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `tasteRating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `valueRating` on the `Rating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "easeRating",
DROP COLUMN "overallRating",
DROP COLUMN "presentationRating",
DROP COLUMN "tasteRating",
DROP COLUMN "valueRating";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "overallRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qualityRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tasteRating" INTEGER NOT NULL DEFAULT 0;
