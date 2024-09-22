import { Injectable } from "@nestjs/common";
import { Prisma, Schedule } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SchedulesOnWorkSpaces } from "src/dto";

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
                    lte: day
                },
                endDate: {
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
                            lte: dueDate
                        },
                        endDate: {
                            gte: dueDate
                        }
                    }
                }
            },
            select: {
                id: true,
                title: true,
                schedules: true
            },
        })
    }

    findAllScheduleByMonth(ownerId: number, date: string) {
        return this.prisma.schedule.findMany({
            where: {
                OR: [
                    {
                        workspace: {
                            schedules: {
                                some: {
                                    startDate: {
                                        lte: date
                                    },
                                    endDate: {
                                        gte: date
                                    }
                                }
                            }
                        }
                    },
                    {
                        ownerId,
                        startDate: {
                            lte: date
                        },
                        endDate: {
                            gte: date
                        }
                    }
                ]
            },
            orderBy: {
                startDate: 'asc'
            }
        });
    }

}   