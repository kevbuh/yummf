/*
  Warnings:

  - You are about to drop the column `num_saves` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "num_saves",
DROP COLUMN "rating",
ADD COLUMN     "avgRating" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "numSaves" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "secret" BOOLEAN NOT NULL DEFAULT false;
