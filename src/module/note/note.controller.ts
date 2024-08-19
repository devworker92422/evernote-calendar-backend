import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    Req
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
    async create(@Body() body: Prisma.NoteCreateInput, @Req() req: any) {
        return await this.noteService.create(body, req.user.id);
    }

    @Put(':id')
    async update(@Body() body: Prisma.NoteUpdateInput, @Param('id') id: string) {
        return await this.noteService.update(body, parseInt(id));
    }

    @Get()
    async findAll(@Req() req: any) {
        return await this.noteService.findAll(req.user.id);
    }

    @Get('/day')
    async findAllByDay(@Query('day') day: string, @Req() req: any) {
        return await this.noteService.findAllByDay(day, req.user.id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.noteService.remove(parseInt(id));
    }

}