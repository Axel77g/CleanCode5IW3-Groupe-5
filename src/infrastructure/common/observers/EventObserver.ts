import {IEvent} from "@shared/AbstractEvent";
import {EventCallbackHandler, IEventObserver} from "@application/shared/observers/IEventObserver";

export class EventObserver implements IEventObserver{
    private subscribers : Record<string, EventCallbackHandler[]> = {}
    constructor() {}
    subscribe(eventType: string, callback : EventCallbackHandler): void {
        console.log("[EventObserver] New subscription to event", eventType)
        if(!(eventType in this.subscribers)) this.subscribers[eventType] = []
        this.subscribers[eventType].push(callback)
    }

    emit(event : IEvent){
        console.log("Event dispatched", event)
        const subscribers = this.subscribers[event.type]
        if(!subscribers) return
        for(const subscriberCallback of subscribers){
            subscriberCallback(event)
        }
    }

}