import {ProjectionJobRepository} from "@application/shared/repositories/ProjectionJobRepository";
import {EventObserver} from "@infrastructure/common/observers/EventObserver";
import {ProjectionJob} from "@application/shared/projections/ProjectionJob";
import {randomUUID} from "node:crypto";

/**
 * Schedule a projection job when an event is triggered,
 * This class is responsible for scheduling a projection job when an event is triggered and bind it to a specific projection
 */
export class ProjectionJobScheduler{
    constructor(
        private _projectionJobRepository : ProjectionJobRepository,
        private _eventObserver: EventObserver)
    {}
    schedule(eventType: string, projectionName : string){
        this._eventObserver.subscribe(eventType, async ({eventId}) => {
            const projectionJob : ProjectionJob = {
                jobId: randomUUID(),
                eventId,
                projectionName,
                createdAt: new Date(),
            }
            await this._projectionJobRepository.storeJob(projectionJob)
        })
    }
}