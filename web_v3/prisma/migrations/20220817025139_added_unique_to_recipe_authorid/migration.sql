/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_authorId_key" ON "Recipe"("authorId");
