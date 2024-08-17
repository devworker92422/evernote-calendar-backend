/*
  Warnings:

  - You are about to drop the column `firstNaem` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstNaem`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL;
