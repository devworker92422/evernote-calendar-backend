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
import { Prisma, TodoList } from "@prisma/client";
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
        const todolist = await this.todolistService.findAll();
        let result: Array<{ date: string, todolist: TodoList[] }> = [];
        let activeDate = todolist[0].dueDate;
        let tmpList: TodoList[] = [];
        for (let task of todolist) {
            if (task.dueDate == activeDate) {
                tmpList.push(task);
            } else {
                result.push({
                    date: activeDate,
                    todolist: tmpList
                });
                tmpList = [];
                tmpList.push(task);
                activeDate = task.dueDate;
            }
        }
        result.push({
            date: activeDate,
            todolist: tmpList
        });
        return result;
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