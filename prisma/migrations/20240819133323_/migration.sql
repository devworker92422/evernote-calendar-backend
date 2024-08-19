/*
  Warnings:

  - The primary key for the `user_workspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `user_workspace` table. All the data in the column will be lost.
  - Added the required column `userId` to the `User_WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_workspace` DROP FOREIGN KEY `User_WorkSpace_ownerId_fkey`;

-- AlterTable
ALTER TABLE `user_workspace` DROP PRIMARY KEY,
    DROP COLUMN `ownerId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `workspaceId`);

-- AddForeignKey
ALTER TABLE `User_WorkSpace` ADD CONSTRAINT `User_WorkSpace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
