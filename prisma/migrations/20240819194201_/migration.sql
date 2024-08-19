-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `workspaceId` INTEGER NULL,
    MODIFY `ownerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `todolist` ADD COLUMN `workspaceId` INTEGER NULL,
    MODIFY `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `WorkSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoList` ADD CONSTRAINT `TodoList_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `WorkSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
