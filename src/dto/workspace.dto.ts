import { TodoList } from "@prisma/client";

export interface WorkSpaceTodoListDTO {
    dueDate: string;
    todolist: Array<TodoList>
}