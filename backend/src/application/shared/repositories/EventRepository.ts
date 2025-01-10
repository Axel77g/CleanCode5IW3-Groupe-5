import {AbstractEvent} from "@shared/AbstractEvent";
import { Result, VoidResult} from "@shared/Result";

export interface EventRepository {
    storeEvent(event: AbstractEvent): Promise<VoidResult>;
    exists(streamId: string): Promise<Result<true>>;
}