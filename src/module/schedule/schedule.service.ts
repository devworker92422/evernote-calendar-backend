import { Injectable } from "@nestjs/common";
import { Prisma, Schedule } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

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
                startDate: 'asc'
            }
        })
    }
}