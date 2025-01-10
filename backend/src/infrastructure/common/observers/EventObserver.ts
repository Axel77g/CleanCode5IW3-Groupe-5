import {IEvent} from "../../../shared/AbstractEvent";
import {EventCallbackHandler, IEventObserver} from "../../../application/shared/observers/IEventObserver";

export class EventObserver implements IEventObserver{
    private subscribers : Record<string, EventCallbackHandler[]> = {}
    constructor() {
    }
    subscribe(eventType: string, callback : EventCallbackHandler): void {
        if(!(eventType in this.subscribers)) this.subscribers[eventType] = []
        this.subscribers[eventType].push(callback)
    }

    emit(event : IEvent){
        console.log("Event dispatched", event)
        let subscribers = this.subscribers[event.type]
        if(!subscribers) return
        for(let subscriberCallback of subscribers){
            subscriberCallback(event)
        }
    }

}