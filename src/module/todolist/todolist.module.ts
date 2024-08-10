import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TodoListService } from "./todolist.service";
import { TodoListController } from "./todolist.controller";

@Module({
    imports: [],
    controllers: [TodoListController],
    providers: [PrismaService, TodoListService]
})

export class TodoListModule { }