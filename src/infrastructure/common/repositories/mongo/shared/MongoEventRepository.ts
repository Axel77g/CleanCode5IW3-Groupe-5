import { IEventObserver } from "@application/shared/observers/IEventObserver";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { AbstractEvent, IEvent } from "@shared/AbstractEvent";
import { Result, VoidResult } from "@shared/Result";
import { MongoClient } from "mongodb";
import * as console from "node:console";
import { AbstractMongoRepository } from "../AbstractMongoRepository";

export abstract class MongoEventRepository extends AbstractMongoRepository implements EventRepository {
    protected abstract collectionName: string;

    constructor(connection: MongoClient, private _eventObserver: IEventObserver) {
        super(connection);
    }

    async storeEvent(event: AbstractEvent): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        try {
            session.startTransaction();
            await this.getCollection().insertOne(event);
            await session.commitTransaction();
            this._eventObserver.emit(event)
            return Result.SuccessVoid()
        } catch (e) {
            console.error(e);
            await session.abortTransaction();
            return Result.FailureStr("An error occurred while storing event");
        }
    }


    getEventsById(eventId: string[]): Promise<Result<IEvent[]>> {
        return this.catchError(async () => {
            const events = await this.getCollection().find({ eventId: { $in: eventId } });
            return Result.Success<IEvent[]>(await events.toArray() as any[]);
        });
    }

}