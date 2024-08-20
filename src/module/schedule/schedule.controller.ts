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

@Controller('schedule')
@UseGuards(AuthGuard('jwt'))

export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService
    ) { }

    @Post()
    async create(@Body() body: Prisma.ScheduleCreateInput, @Req() req: any) {
        if (!body.workspace)
            body.owner = { connect: { id: req.user.id } }
        return await this.scheduleService.create(body);
    }

    @Put(':id')
    async update(@Body() body: Prisma.ScheduleUpdateInput, @Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.scheduleService.update(parseInt(id), body)
        }
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
        return {
            statusCode: HttpStatus.OK,
            data: await this.scheduleService.remove(parseInt(id))
        }
    }
}