import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {TestDriveEventRepository} from "../../../../../application/testDrive/repositories/TestDriveEventRepository";
import {AbstractEvent} from "../../../../../shared/AbstractEvent";
import {PaginatedResult, Result, VoidResult} from "../../../../../shared/Result";
import {IEventAggregate} from "../../../../../shared/IEventAggregate";
import {PaginatedInput} from "../../../../../shared/PaginatedInput";
import {EventAggregateMapper} from "../../../../../application/testDrive/EventAggregateMapper";
import {IEventObserver} from "../../../../../application/testDrive/observers/IEventObserver";
import {MongoClient} from "mongodb";
export class MongoTestDriveEventRepository extends AbstractMongoRepository implements TestDriveEventRepository{
    protected collectionName: string = 'testDriveEvents';

    constructor(connection : MongoClient, private _eventObserver : IEventObserver) {
        super(connection);
    }

    async storeEvent(event: AbstractEvent): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        try{
            session.startTransaction();
            await this.getQuery().insertOne(event);
            await session.commitTransaction();
            this._eventObserver.emit(event)
            return Result.SuccessVoid()
        }catch (e){
            await session.abortTransaction();
            console.error(e);
            return Result.FailureStr("An error occurred while storing event");
        }
    }

    async exists(streamId: string): Promise<Result<true>> {
        try{
            const count = await this.getQuery().countDocuments(
                {
                    streamId: {
                        $startWith: streamId
                    }
                }
            );
            if(count === 0) return Result.FailureStr("Event not found");
            return Result.Success<true>(true);
        }catch (e){
            console.error(e);
            return Promise.resolve(Result.FailureStr("An error occurred while checking if event exists"));
        }
    }

}