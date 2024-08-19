import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WorkSpaceService } from "./workspace.service";
import { WorkSpaceController } from "./workspace.controller";

@Module({
    imports: [],
    controllers: [WorkSpaceController],
    providers: [PrismaService, WorkSpaceService],
})

export class WorkSpaceModule { }