/*
  Warnings:

  - You are about to drop the column `udpateAt` on the `workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `workspace` DROP COLUMN `udpateAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
