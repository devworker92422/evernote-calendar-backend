import { Injectable } from "@nestjs/common";
import { Prisma, TodoList } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()

export class TodoListService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: Prisma.TodoListCreateInput): Promise<TodoList> {
        return this.prisma.todoList.create({
            data
        });
    }

    update(update: Prisma.TodoListUpdateInput, id: number) {
        return this.prisma.todoList.update({
            where: { id },
            data: update
        });
    }

    findAll(ownerId: number): Promise<TodoList[]> {
        return this.prisma.todoList.findMany({
            where: {
                ownerId
            },
            orderBy: {
                dueDate: 'asc',
            }
        })
    }

    findAllByDay(day: string, ownerId: number): Promise<TodoList[]> {
        return this.prisma.todoList.findMany({
            where: {
                dueDate: day,
                ownerId,
                workspaceId: null
            },
            orderBy: {
                startTime: 'asc'
            }
        })
    }

    remove(id: number): Promise<TodoList> {
        return this.prisma.todoList.delete({
            where: { id }
        })
    }

}