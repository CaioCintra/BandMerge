/*
  Warnings:

  - You are about to drop the `ItemUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ItemUser_userId_itemId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "sound" TEXT,
    "type" TEXT NOT NULL DEFAULT 'band',
    "ownerId" TEXT,
    CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "img", "name", "sound", "type") SELECT "id", "img", "name", "sound", "type" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
