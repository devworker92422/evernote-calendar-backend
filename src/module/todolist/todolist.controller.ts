import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Req
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Prisma, TodoList, User } from "@prisma/client";
import { TodoListService } from "./todolist.service";


@Controller('task')
@UseGuards(AuthGuard('jwt'))

export class TodoListController {

    constructor(
        private todolistService: TodoListService
    ) { }

    @Post()
    async create(@Body() body: Prisma.TodoListCreateInput, @Req() req: any) {
        return await this.todolistService.create(body, req.user.id);
    }

    @Get()
    async findAll(@Req() req: any) {
        const todolist = await this.todolistService.findAll(req.user.id);
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

    @Get('day')
    async findAllByDay(@Query('day') day: string, @Req() req: any) {
        return await this.todolistService.findAllByDay(day, req.user.id);
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