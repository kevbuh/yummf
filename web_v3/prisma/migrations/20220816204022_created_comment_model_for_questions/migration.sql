/*
  Warnings:

  - You are about to drop the column `questionId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_questionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "questionId";

-- CreateTable
CREATE TABLE "QuestionComment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionId" INTEGER,

    CONSTRAINT "QuestionComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionComment" ADD CONSTRAINT "QuestionComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionComment" ADD CONSTRAINT "QuestionComment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
