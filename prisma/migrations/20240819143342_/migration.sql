/*
  Warnings:

  - You are about to drop the column `ownerId` on the `workspace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `workspace` DROP FOREIGN KEY `WorkSpace_ownerId_fkey`;

-- AlterTable
ALTER TABLE `workspace` DROP COLUMN `ownerId`;
