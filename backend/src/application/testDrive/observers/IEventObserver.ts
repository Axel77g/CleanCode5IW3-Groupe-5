import {IEvent} from "../../../shared/AbstractEvent";

export type EventCallbackHandler = (event : IEvent) => void

export interface IEventObserver{
    subscribe(eventType : string, callback : EventCallbackHandler) : void
    emit(event : IEvent) : void
}