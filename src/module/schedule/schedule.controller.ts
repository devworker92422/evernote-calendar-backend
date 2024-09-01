import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    HttpStatus,
    UseGuards,
    Req
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { ScheduleService } from "./schedule.service";
import { NewScheduleDTO } from "src/dto";

@Controller('schedule')
@UseGuards(AuthGuard('jwt'))

export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService
    ) { }

    @Post()
    async create(@Body() body: NewScheduleDTO, @Req() req: any) {
        const data: Prisma.ScheduleCreateInput = body;
        data.owner = { connect: { id: req.user.id } };
        if (body.workspaceId)
            data.workspace = { connect: { id: body.workspaceId } };
        delete body.workspaceId;
        return await this.scheduleService.create(data);
    }

    @Put(':id')
    async update(@Body() body: Prisma.ScheduleUpdateInput, @Param('id') id: string) {
        return await this.scheduleService.update(parseInt(id), body);
    }

    @Get('day')
    async findByDay(@Query('day') day: string, @Req() req: any) {
        return await this.scheduleService.findByDay(day, req.user.id);
    }

    @Get()
    async findAll(@Req() req: any) {
        return await this.scheduleService.findAll(req.user.id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.scheduleService.remove(parseInt(id));
    }

    @Get('workspace')
    async findAllScheduleOnWorkSpaces(
        @Query('dueDate') dueDate: string,
        @Req() req: any
    ) {
        return await this.scheduleService.findAllScheduleOnWorkSpaces(req.user.id, dueDate);
    }
}