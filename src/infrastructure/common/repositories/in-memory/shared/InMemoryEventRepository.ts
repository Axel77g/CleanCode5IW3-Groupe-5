import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {AbstractEvent, IEvent} from "@shared/AbstractEvent";
import {Result, VoidResult} from "@shared/Result";

export class InMemoryEventRepository extends AbstractInMemoryRepository<IEvent> implements EventRepository{

    getEventsById(eventId: string[]): Promise<Result<IEvent[]>> {
        return Promise.resolve(
            Result.Success(
                this.collection
                    .filter(event => eventId.includes(event.eventId))
                    .toArray()
            )
        );
    }

    storeEvent(event: AbstractEvent): Promise<VoidResult> {
        this.collection.add(event);
        return Promise.resolve(Result.SuccessVoid());
    }

}