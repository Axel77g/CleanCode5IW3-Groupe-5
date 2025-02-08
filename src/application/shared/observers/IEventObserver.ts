import {IEvent} from "@shared/AbstractEvent";

export type EventCallbackHandler = (event : IEvent) => unknown

export interface IEventObserver{
    subscribe(eventType : string, callback : EventCallbackHandler) : void
    emit(event : IEvent) : void
}