import {Document} from "mongodb";

export class EventAggregateMapper<T>{
    constructor(private readonly aggregateClass: any) {}

    map(date : Document[]) : T[] {
        return date.map((data) => {
            return new this.aggregateClass(data);
        });
    }
}