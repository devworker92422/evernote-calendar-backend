import { Injectable } from "@nestjs/common";
import { Prisma, Schedule } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SchedulesOnWorkSpaces } from "src/dto";
import { title } from "process";

@Injectable()

export class ScheduleService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
        return this.prisma.schedule.create({
            data
        });
    }

    update(id: number, data: Prisma.ScheduleUpdateInput): Promise<Schedule> {
        return this.prisma.schedule.update({
            where: { id },
            data
        })
    }

    remove(id: number): Promise<Schedule> {
        return this.prisma.schedule.delete({
            where: {
                id
            }
        })
    }

    findAll(ownerId: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: {
                ownerId
            },
            orderBy: {
                startDate: 'asc'
            }
        });
    }

    findByDay(day: string, ownerId: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: {
                startDate: {
                    gte: day
                },
                ownerId,
                workspaceId: null
            },
            orderBy: {
                startDate: 'desc'
            }
        })
    }

    findAllScheduleOnWorkSpaces(userId: number, dueDate: string): Promise<Array<SchedulesOnWorkSpaces>> {
        return this.prisma.workSpace.findMany({
            where: {
                invitedWorkSpace: {
                    some: {
                        userId
                    }
                },
                schedules: {
                    some: {
                        startDate: {
                            gte: dueDate
                        }
                    }
                }
            },
            select: {
                id: true,
                title: true,
                schedules: true
            }
        })
    }

}