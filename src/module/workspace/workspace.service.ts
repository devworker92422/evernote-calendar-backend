import { Injectable } from "@nestjs/common";
import { Prisma, WorkSpace } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()

export class WorkSpaceService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.WorkSpaceCreateInput, id: number): Promise<WorkSpace> {
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
        })
    }

    invite(workspaceId: number, userId: number): Promise<WorkSpace> {
        return this.prisma.workSpace.update({
            data: {
                invitedWorkSpace: {
                    create: {
                        user: {
                            connect: {
                                id: userId
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
}