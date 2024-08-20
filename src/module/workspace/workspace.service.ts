import { Injectable } from "@nestjs/common";
import { Prisma, WorkSpace, Note, Schedule, TodoList, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()

export class WorkSpaceService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.WorkSpaceCreateInput): Promise<WorkSpace> {
        return this.prisma.workSpace.create({
            data
        })

    }

    update(data: Prisma.WorkSpaceUpdateInput, id: number): Promise<WorkSpace> {
        return this.prisma.workSpace.update({
            data,
            where: {
                id
            }
        })
    }

    remove(id: number): Promise<WorkSpace> {
        return this.prisma.workSpace.delete({
            where: {
                id
            }
        })
    }

    findAll(ownerId: number): Promise<WorkSpace[]> {
        return this.prisma.workSpace.findMany({
            where: {
                OR: [
                    {
                        ownerId
                    },
                    {
                        invitedWorkSpace: {
                            every: {
                                userId: ownerId
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createAt: 'desc'
            },
            include: {
                _count: {
                    select: {
                        notes: true,
                        schedules: true,
                        todolists: true
                    }
                }
            }

        })
    }

    async invite(workspaceId: number, email: string): Promise<WorkSpace> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        return this.prisma.workSpace.update({
            data: {
                invitedWorkSpace: {
                    create: {
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                }
            },
            where: {
                id: workspaceId
            }
        })
    }

    findAllNote(workspaceId: number): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: {
                workspaceId
            }
        })
    }

    findAllSchedule(workspaceId: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: {
                workspaceId
            }
        })
    }

    findAllTodoList(workspaceId: number): Promise<TodoList[]> {
        return this.prisma.todoList.findMany({
            where: {
                workspaceId
            }
        })
    }

    findAllMembers(workspaceId: number): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                invitedWorkSpace: {
                    some: {
                        workspaceId
                    }
                }
            }
        })
    }
}