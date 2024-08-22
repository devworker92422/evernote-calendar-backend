export interface NewTaskDTO {
    title: string;
    description: string;
    dueDate: string;
    startTime: string;
    endTime: string;
    workspaceId?: number;
}