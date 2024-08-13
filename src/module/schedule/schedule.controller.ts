import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    HttpStatus
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ScheduleService } from "./schedule.service";


@Controller('schedule')

export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService
    ) { }

    @Post()
    async create(@Body() body: Prisma.ScheduleCreateInput) {
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
    async findByDay(@Query('day') day: string) {
        return await this.scheduleService.findByDay(day);
    }

    @Get()
    async findAll() {
        return await this.scheduleService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.scheduleService.remove(parseInt(id))
        }
    }
}