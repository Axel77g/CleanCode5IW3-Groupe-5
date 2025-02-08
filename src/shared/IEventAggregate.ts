import {AbstractEvent} from "./AbstractEvent";

export interface IEventAggregate<T>{
    events: AbstractEvent[];
    aggregate() : T | null;
    applyEvent(event: AbstractEvent): T | null;
}