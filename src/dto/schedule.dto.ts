import { Schedule } from "@prisma/client";

export interface NewScheduleDTO {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    color: string;
    width: number;
    type: string;
    workspaceId?: number;
}
