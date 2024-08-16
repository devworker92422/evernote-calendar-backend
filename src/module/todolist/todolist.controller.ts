import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { TodoListService } from "./todolist.service";


@Controller('task')


export class TodoListController {
    constructor(
        private todolistService: TodoListService
    ) { }

    @Post()
    async create(@Body() body: Prisma.TodoListCreateInput) {
        return await this.todolistService.create(body);
    }

    @Get()
    async findAll() {
        return await this.todolistService.findAll();
    }

    @Put(':id')
    async update(@Body() body: Prisma.TodoListUpdateInput, @Param('id') id: string) {
        return await this.todolistService.update(body, parseInt(id));
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.todolistService.remove(parseInt(id));
    }
}