-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `todolist` DROP FOREIGN KEY `TodoList_ownerId_fkey`;

-- CreateTable
CREATE TABLE `User_WorkSpace` (
    `ownerId` INTEGER NOT NULL,
    `workspaceId` INTEGER NOT NULL,

    PRIMARY KEY (`ownerId`, `workspaceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoList` ADD CONSTRAINT `TodoList_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_WorkSpace` ADD CONSTRAINT `User_WorkSpace_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_WorkSpace` ADD CONSTRAINT `User_WorkSpace_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `WorkSpace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
