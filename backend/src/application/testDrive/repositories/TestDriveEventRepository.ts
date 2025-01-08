import {AbstractEvent} from "../../../shared/AbstractEvent";
import {PaginatedResult, Result, VoidResult} from "../../../shared/Result";
import {IEventAggregate} from "../../../shared/IEventAggregate";
import {PaginatedInput} from "../../../shared/PaginatedInput";
import {EventAggregateMapper} from "../EventAggregateMapper";

export interface TestDriveEventRepository {
    storeEvent(event: AbstractEvent): Promise<VoidResult>;
    getEvents<T extends IEventAggregate<unknown>>(streamId: string, eventAggregateMapper : EventAggregateMapper<T>,): Promise<Result<T>>;
    getPaginatedEvents<T extends IEventAggregate<unknown>>(streamIdStart: string, eventAggregateMapper : EventAggregateMapper<T>, pagination: PaginatedInput): Promise<PaginatedResult<T>>;
    exists(streamId: string): Promise<Result<true>>;
}