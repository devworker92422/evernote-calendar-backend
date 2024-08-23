import { Injectable, BadRequestException } from "@nestjs/common";
import {
    Prisma,
    WorkSpace,
    Note,
    Schedule,
    TodoList,
    User
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UserDTO } from "src/dto";

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

    async invite(workspaceId: number, email: string, userId: number): Promise<UserDTO> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (user.id == userId)
            throw new BadRequestException("owner");
        if (!user)
            throw new BadRequestException("no-user");
        const invite = await this.prisma.user.findFirst({
            where: {
                email,
                invitedWorkSpace: {
                    some: {
                        workspaceId
                    }
                }
            }
        });
        if (invite)
            throw new BadRequestException("already-invited");
        const workspace = await this.prisma.workSpace.findFirst({
            where: { id: workspaceId }
        });
        if (!workspace)
            throw new BadRequestException("no-workspace");
        return this.prisma.user.update({
            data: {
                invitedWorkSpace: {
                    create: {
                        workspace: {
                            connect: {
                                id: workspaceId
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            },
            where: {
                id: user.id
            }
        })
    }

    async removeInvite(workspaceId: number, userId: number): Promise<UserDTO> {
        return this.prisma.user.update({
            data: {
                invitedWorkSpace: {
                    delete: {
                        userId_workspaceId: {
                            userId,
                            workspaceId
                        }
                    }
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            },
            where: {
                id: workspaceId
            }
        })
    }

    findAllUsers(email: string): Promise<UserDTO[]> {
        return this.prisma.user.findMany({
            where: {
                email: { contains: email }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            }
        })
    }

    findAllNote(workspaceId: number): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: {
                workspaceId
            },
            orderBy: {
                createAt: 'desc'
            }
        })
    }

    findAllSchedule(workspaceId: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: {
                workspaceId
            },
            orderBy: {
                createAt: 'desc'
            }
        })
    }

    findAllTodoList(workspaceId: number): Promise<TodoList[]> {
        return this.prisma.todoList.findMany({
            where: {
                workspaceId
            },
            orderBy: [
                { dueDate: 'desc' },
                { startTime: 'asc' }
            ]
        })
    }

    findAllMembers(workspaceId: number): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                invitedWorkSpace: {
                    some: {
                        workspaceId
                    },
                }
            }
        })
    }
}