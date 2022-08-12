/*
  Warnings:

  - You are about to drop the `_QuestionToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_B_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_QuestionToUser";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
