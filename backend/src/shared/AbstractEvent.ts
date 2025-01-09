
export interface IEvent{
    readonly type : string;
    readonly streamId: string;
    readonly createdAt: Date;
    readonly payload: object;
    version: number;
}
export abstract class AbstractEvent implements IEvent {
    public abstract readonly type : string
    public abstract readonly streamId: string;
    public readonly createdAt: Date = new Date()
    public abstract readonly payload: object
    public version = 1;
}