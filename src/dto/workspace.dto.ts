import { Note, Schedule, TodoList } from "@prisma/client";

export interface WorkSpaceTodoListDTO {
    dueDate: string;
    todolist: Array<TodoList>
}

export interface NotesOnWorkSpaces {
    id: number;
    title: string;
    notes: Note[];
}

export interface SchedulesOnWorkSpaces {
    id: number;
    title: string;
    schedules: Schedule[];
}

export interface TodoListOnWorkSpaces {
    id: number;
    title: string;
    todolists: TodoList[];
}