import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LibraryController } from "./library.controller";
import { LibraryService } from "./library.service";

@Module({
    imports: [],
    controllers: [LibraryController],
    providers: [PrismaService, LibraryService]
})

export class LibraryModule { };