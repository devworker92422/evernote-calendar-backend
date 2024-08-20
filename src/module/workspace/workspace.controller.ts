import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Query,
    Req,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { WorkSpaceService } from "./workspace.service";

@Controller('workspace')
@UseGuards(AuthGuard('jwt'))

export class WorkSpaceController {
    constructor(
        private workspaceService: WorkSpaceService
    ) { }

    @Post()
    async create(@Body() body: Prisma.WorkSpaceCreateInput, @Req() req: any) {
        body.owner = { connect: { id: req.user.id } };
        return await this.workspaceService.create(body);
    }

    @Get()
    async findAll(@Req() req: any) {
        return await this.workspaceService.findAll(req.user.id);
    }

    @Put(':id')
    async update(@Body() body: Prisma.WorkSpaceUpdateInput, @Param('id') id: string) {
        return await this.workspaceService.update(body, parseInt(id));
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.workspaceService.remove(parseInt(id));
    }

    @Get('invite')
    async invite(@Query('email') email: string, @Query('workspaceId') workspaceId: string) {
        return await this.workspaceService.invite(parseInt(workspaceId), email);
    }

    @Get('note/:id')
    async findAllNote(@Param('id') id: string) {
        return await this.workspaceService.findAllNote(parseInt(id));
    }

    @Get('schedule/:id')
    async findAllSchedule(@Param('id') id: string) {
        return await this.workspaceService.findAllSchedule(parseInt(id));
    }

    @Get('todolist/:id')
    async findAllTodoList(@Param('id') id: string) {
        return await this.workspaceService.findAllTodoList(parseInt(id));
    }

    @Get('member/:id')
    async findAllMembers(@Param('id') id: string) {
        return await this.workspaceService.findAllMembers(parseInt(id));
    }

}