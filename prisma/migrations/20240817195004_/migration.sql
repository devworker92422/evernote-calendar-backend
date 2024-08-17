/*
  Warnings:

  - You are about to drop the `workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `emailVerify` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `workspace`;
