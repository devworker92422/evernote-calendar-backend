/*
  Warnings:

  - Added the required column `mimeType` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `library` ADD COLUMN `mimeType` VARCHAR(191) NOT NULL;
