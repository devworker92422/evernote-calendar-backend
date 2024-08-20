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
import { NewNoteDTO } from "src/dto";

@Controller('note')
@UseGuards(AuthGuard('jwt'))

export class NoteController {
    constructor(
        private noteService: NoteService
    ) { }

    @Post()
    async create(@Body() body: NewNoteDTO, @Req() req: any) {
        const data: Prisma.NoteCreateInput = body;
        data.owner = { connect: { id: req.user.id } };
        if (body.workspaceId)
            data.workspace = { connect: { id: body.workspaceId } };
        delete body.workspaceId;
        return await this.noteService.create(data);
    }

    @Put(':id')
    async update(@Body() body: Prisma.NoteUpdateInput, @Param('id') id: string) {
        return await this.noteService.update(body, parseInt(id));
    }

    @Get()
    async findAll(@Req() req: any) {
        return await this.noteService.findAll(req.user.id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.noteService.remove(parseInt(id));
    }

}