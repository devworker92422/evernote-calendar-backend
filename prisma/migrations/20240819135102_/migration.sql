/*
  Warnings:

  - You are about to drop the column `ownerId` on the `workspace` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `WorkSpace_ownerId_fkey` ON `workspace`;

-- AlterTable
ALTER TABLE `workspace` DROP COLUMN `ownerId`;
