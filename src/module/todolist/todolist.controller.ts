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
import { Prisma, TodoList } from "@prisma/client";
import { TodoListService } from "./todolist.service";
import { NewTaskDTO } from "src/dto/todolist.dto";


@Controller('task')
@UseGuards(AuthGuard('jwt'))

export class TodoListController {

    constructor(
        private todolistService: TodoListService
    ) { }

    @Post()
    async create(@Body() body: NewTaskDTO, @Req() req: any) {
        const data: Prisma.TodoListCreateInput = body;
        data.owner = { connect: { id: req.user.id } };
        if (body.workspaceId)
            data.workspace = { connect: { id: body.workspaceId } };
        delete body.workspaceId;
        return await this.todolistService.create(data);
    }

    @Get()
    async findAll(@Req() req: any) {
        const todolist = await this.todolistService.findAll(req.user.id);
        let result: Array<{ date: string, todolist: TodoList[] }> = [];
        if (todolist.length > 0) {
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
        }
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

    @Get('workspace')
    async findAllTodoListOnWorkSpaces(
        @Req() req: any,
        @Query('dueDate') dueDate: string
    ) {
        return await this.todolistService.findAllTodoListOnWorkSpaces(req.user.id, dueDate);
    }
}