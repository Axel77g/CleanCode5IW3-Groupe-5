import {Document} from "mongodb";
import {IEvent} from "../../shared/AbstractEvent";

export class EventAggregateMapper<T>{
    constructor(private readonly aggregateClass: any) {}

    transform(data : Document[]) : T[] {
        return new this.aggregateClass(data as IEvent[]);
    }
}