import { Injectable } from "@nestjs/common";
import { Prisma, Note } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()

export class NoteService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.NoteCreateInput): Promise<Note> {
        return this.prisma.note.create({ data });
    }

    update(update: Prisma.NoteUpdateInput, id: number): Promise<Note> {
        return this.prisma.note.update({
            where: { id },
            data: update
        });
    }

    findAll(ownerId: number): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: {
                ownerId,
                workspaceId: null
            },
            orderBy: {
                createAt: 'desc'
            }
        });
    }

    remove(id: number): Promise<Note> {
        return this.prisma.note.delete({
            where: { id }
        });
    }
}