
export interface IEvent{
    readonly streamId: string;
    readonly createdAt: Date;
}
export abstract class AbstractEvent implements IEvent{
    readonly createdAt: Date = new Date()
    abstract readonly streamId: string;
}