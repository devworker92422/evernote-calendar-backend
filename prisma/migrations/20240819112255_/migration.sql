/*
  Warnings:

  - Added the required column `ownerId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todolist` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TodoList` ADD CONSTRAINT `TodoList_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
