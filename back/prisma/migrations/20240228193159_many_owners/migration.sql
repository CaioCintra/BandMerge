/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Item` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ItemUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "ItemUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemUser_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "sound" TEXT,
    "type" TEXT NOT NULL DEFAULT 'band'
);
INSERT INTO "new_Item" ("id", "img", "name", "sound", "type") SELECT "id", "img", "name", "sound", "type" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ItemUser_userId_itemId_key" ON "ItemUser"("userId", "itemId");
