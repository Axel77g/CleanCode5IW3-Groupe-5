import {IEvent} from "./AbstractEvent";

export interface IProjection{
    receive(event: IEvent) : Promise<void>
}