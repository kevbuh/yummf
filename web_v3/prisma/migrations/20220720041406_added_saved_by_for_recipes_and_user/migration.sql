-- CreateTable
CREATE TABLE "_UserSaved" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSaved_AB_unique" ON "_UserSaved"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSaved_B_index" ON "_UserSaved"("B");

-- AddForeignKey
ALTER TABLE "_UserSaved" ADD CONSTRAINT "_UserSaved_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSaved" ADD CONSTRAINT "_UserSaved_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
