/*
  Warnings:

  - Added the required column `originName` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `library` ADD COLUMN `originName` VARCHAR(191) NOT NULL;
