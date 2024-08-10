import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";

@Module({
    imports: [],
    controllers: [NoteController],
    providers: [PrismaService, NoteService]
})

export class NoteModule { };