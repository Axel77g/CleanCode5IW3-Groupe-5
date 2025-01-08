import {AbstractMongoRepository} from "./AbstractMongoRepository";
import {TestDriveEventRepository} from "../../../../application/testDrive/repositories/TestDriveEventRepository";
import {AbstractEvent} from "../../../../shared/AbstractEvent";
import {PaginatedResult, Result, VoidResult} from "../../../../shared/Result";
import {IEventAggregate} from "../../../../shared/IEventAggregate";
import {PaginatedInput} from "../../../../shared/PaginatedInput";
import {EventAggregateMapper} from "../../../../application/testDrive/EventAggregateMapper";

export class MongoTestDriveEventRepository extends AbstractMongoRepository implements TestDriveEventRepository{
    protected collectionName: string = 'testDriveEvents';

    async storeEvent(event: AbstractEvent): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        try{
            session.startTransaction();
            await this.getQuery().insertOne(event);
            await session.commitTransaction();
        }catch (e){
            await session.abortTransaction();
            console.error(e);
            return Promise.resolve(Result.FailureStr("An error occurred while storing event"));
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

    async getEvents<T extends IEventAggregate<unknown>>(streamId: string, eventAggregateMapper : EventAggregateMapper<T>): Promise<Result<T>> {
        try{
            const events = await this.getQuery().find({
                streamId: {
                    $startWith: streamId
                }
            });
            const eventAggregatesArray = await events.toArray();
            const eventAggregates = eventAggregateMapper.map(eventAggregatesArray);
            return Promise.resolve(Result.Success<T>(eventAggregates));
        }catch (e){
            console.error(e);
            return Promise.resolve(Result.FailureStr("An error occurred while getting events"));
        }
    }

    async getPaginatedEvents<T extends IEventAggregate<unknown>>(streamIdStart: string, eventAggregateMapper : EventAggregateMapper<T>, pagination: PaginatedInput): Promise<PaginatedResult<T>> {
        const {limit, page} = pagination;
        try{
            const events = await this.getQuery().aggregate([
                {
                    $match: {
                        streamId: {
                            $startWith: streamIdStart
                        }
                    }
                },
                {
                    $group: {
                        _id: "$streamId",
                        events: {
                            $push: "$$ROOT"
                        }
                    }
                },
                {
                    $skip: limit * (page - 1)
                },
                {
                    $limit: limit
                }
            ]);

            const total = await this.getQuery().countDocuments({
                streamId: {
                    $startWith: streamIdStart
                }
            });

            const eventAggregatesArray = await events.toArray()
            const eventAggregates = eventAggregatesArray.map(eventAggregateMapper.map);
            return Result.SuccessPaginated<T>(eventAggregates, total, page, limit);
        }catch (e){
            console.error(e);
            return Promise.resolve(Result.FailureStr("An error occurred while getting paginated events"));
        }
    }


}