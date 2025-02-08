import {randomUUID} from "node:crypto";

export interface IEvent{
    readonly eventId : string;
    readonly type : string;
    readonly streamId: string;
    readonly createdAt: Date;
    readonly payload: object;
    version: number;
}
export abstract class AbstractEvent implements IEvent {
    public readonly eventId : string = randomUUID()
    public abstract readonly type : string
    public abstract readonly streamId: string;
    public readonly createdAt: Date = new Date()
    public abstract readonly payload: object
    public version = 1;
}