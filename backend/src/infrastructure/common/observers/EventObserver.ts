import {IEvent} from "../../../shared/AbstractEvent";
import {EventCallbackHandler, IEventObserver} from "../../../application/testDrive/observers/IEventObserver";

export class EventObserver implements IEventObserver{
    private subscribers : Record<string, EventCallbackHandler[]> = {}
    constructor() {
    }
    subscribe(eventType: string, callback : EventCallbackHandler): void {
        if(!(eventType in this.subscribers)) this.subscribers[eventType] = []
        this.subscribers[eventType].push(callback)
    }

    emit(event : IEvent){
        let subscribers = this.subscribers[event.type]
        for(let subscriberCallback of subscribers){
            subscriberCallback(event)
        }
    }

}