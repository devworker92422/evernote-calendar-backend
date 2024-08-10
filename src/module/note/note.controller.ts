import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    HttpStatus
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NoteService } from "./note.service";

@Controller('note')

export class NoteController {
    constructor(
        private noteService: NoteService
    ) { }

    @Post()
    async create(@Body() body: Prisma.NoteCreateInput) {
        return await this.noteService.create(body);
    }

    @Put(':id')
    async update(@Body() body: Prisma.NoteUpdateInput, @Param('id') id: string) {
        return await this.noteService.update(body, parseInt(id));
    }

    @Get()
    async findAll() {
        return await this.noteService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.noteService.remove(parseInt(id));
    }

}