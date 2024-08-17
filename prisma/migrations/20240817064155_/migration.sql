/*
  Warnings:

  - Added the required column `emailVerify` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstNaem` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailVerify` BOOLEAN NOT NULL,
    ADD COLUMN `firstNaem` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
