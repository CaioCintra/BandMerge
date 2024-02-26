/*
  Warnings:

  - You are about to drop the column `First` on the `Merge` table. All the data in the column will be lost.
  - You are about to drop the column `New` on the `Merge` table. All the data in the column will be lost.
  - You are about to drop the column `Second` on the `Merge` table. All the data in the column will be lost.
  - Added the required column `FirstId` to the `Merge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NewId` to the `Merge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SecondId` to the `Merge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Merge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "FirstId" TEXT NOT NULL,
    "SecondId" TEXT NOT NULL,
    "NewId" TEXT NOT NULL,
    CONSTRAINT "Merge_FirstId_fkey" FOREIGN KEY ("FirstId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Merge_SecondId_fkey" FOREIGN KEY ("SecondId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Merge_NewId_fkey" FOREIGN KEY ("NewId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Merge" ("id") SELECT "id" FROM "Merge";
DROP TABLE "Merge";
ALTER TABLE "new_Merge" RENAME TO "Merge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
