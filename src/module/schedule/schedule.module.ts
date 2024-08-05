import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";

@Module({
    controllers: [ScheduleController],
    providers: [PrismaService, ScheduleService]
})

export class ScheduleModule { }