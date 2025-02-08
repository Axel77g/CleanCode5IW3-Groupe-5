import {IEvent} from "@shared/AbstractEvent";

export interface ProjectionJob{
    jobId: string;
    eventId: string;
    projectionName: string;
    createdAt: Date;
}

export interface ProjectionJobWithEvent extends ProjectionJob {
    event: IEvent
}