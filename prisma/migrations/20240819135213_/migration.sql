/*
  Warnings:

  - Added the required column `ownerId` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workspace` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkSpace` ADD CONSTRAINT `WorkSpace_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
