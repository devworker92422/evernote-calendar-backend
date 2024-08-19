import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Req,
    UseGuards
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { WorkSpaceService } from "./workspace.service";

@Controller('workspace')

export class WorkSpaceController {
    constructor(
        private workspaceService: WorkSpaceService
    ) { }

    @Post()
    async create(@Body() body: Prisma.WorkSpaceCreateInput, @Req() req: any) {
        return await this.workspaceService.create(body, req.user.id);
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

}