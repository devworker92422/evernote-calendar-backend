/*
  Warnings:

  - Added the required column `endTime` to the `TodoList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todolist` ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL;
