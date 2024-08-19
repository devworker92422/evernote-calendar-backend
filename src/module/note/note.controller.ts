import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NoteService } from "./note.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('note')
@UseGuards(AuthGuard('jwt'))

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

    @Get('/day')
    async findAllByDay(@Query('day') day: string) {
        return await this.noteService.findAllByDay(day);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.noteService.remove(parseInt(id));
    }

}