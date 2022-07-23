/*
  Warnings:

  - You are about to drop the column `value` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `easeRating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallRating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentationRating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasteRating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueRating` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "value",
ADD COLUMN     "easeRating" INTEGER NOT NULL,
ADD COLUMN     "overallRating" INTEGER NOT NULL,
ADD COLUMN     "presentationRating" INTEGER NOT NULL,
ADD COLUMN     "tasteRating" INTEGER NOT NULL,
ADD COLUMN     "valueRating" INTEGER NOT NULL;
