/*
  Warnings:

  - Added the required column `ownerId` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_workspace` DROP FOREIGN KEY `User_WorkSpace_workspaceId_fkey`;

-- AlterTable
ALTER TABLE `workspace` ADD COLUMN `ownerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkSpace` ADD CONSTRAINT `WorkSpace_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_WorkSpace` ADD CONSTRAINT `User_WorkSpace_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `WorkSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
