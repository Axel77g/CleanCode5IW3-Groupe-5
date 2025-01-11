import {ProjectionJobRepository} from "@application/shared/repositories/ProjectionJobRepository";
import {EventObserver} from "@infrastructure/common/observers/EventObserver";
import {ProjectionJob} from "@application/shared/projections/ProjectionJob";
import {randomUUID} from "node:crypto";

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