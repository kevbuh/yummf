-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorDisplayName" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "authorDisplayName" TEXT;

-- AlterTable
ALTER TABLE "QuestionComment" ADD COLUMN     "authorDisplayName" TEXT;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "authorDisplayName" TEXT;
