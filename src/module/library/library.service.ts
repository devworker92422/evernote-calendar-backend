import { Injectable } from "@nestjs/common";
import { Prisma, Library } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()

export class LibraryService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.LibraryCreateInput): Promise<Library> {
        return this.prisma.library.create({ data });
    }

    remove(id: number): Promise<Library> {
        return this.prisma.library.delete({ where: { id } })
    }

    findAll(ownerId: number): Promise<Library[]> {
        return this.prisma.library.findMany({
            where: {
                ownerId
            }
        });
    }

    findOne(fileName: string): Promise<Library> {
        return this.prisma.library.findFirst({
            where: {
                fileName
            }
        });
    }

}