-- AlterTable
ALTER TABLE `note` ADD COLUMN `workspaceId` INTEGER NULL,
    MODIFY `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `WorkSpace`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
