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

export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() body: Prisma.ScheduleCreateInput, @Req() req: any) {
        return await this.scheduleService.create(body, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Body() body: Prisma.ScheduleUpdateInput, @Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.scheduleService.update(parseInt(id), body)
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('day')
    async findByDay(@Query('day') day: string, @Req() req: any) {
        return await this.scheduleService.findByDay(day, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Req() req: any) {
        return await this.scheduleService.findAll(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.scheduleService.remove(parseInt(id))
        }
    }
}