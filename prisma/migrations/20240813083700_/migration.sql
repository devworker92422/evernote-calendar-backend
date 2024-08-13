/*
  Warnings:

  - Added the required column `type` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `type` VARCHAR(191) NOT NULL;
