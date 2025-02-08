import {AbstractEvent, IEvent} from "@shared/AbstractEvent";
import { Result, VoidResult} from "@shared/Result";

export interface EventRepository {
    storeEvent(event: AbstractEvent): Promise<VoidResult>;
    getEventsById(eventId: string[]): Promise<Result<IEvent[]>>;
}