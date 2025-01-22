import {ProjectionJobRepository} from "@application/shared/repositories/ProjectionJobRepository";
import {AbstractProjection} from "@application/shared/projections/AbstractProjection";
import {Result} from "@shared/Result";
import {ProjectionJob, ProjectionJobWithEvent} from "@application/shared/projections/ProjectionJob";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {IEvent} from "@shared/AbstractEvent";
import {randomUUID} from "node:crypto";

export class ProjectionsWorker {
    private readonly identifier : string = randomUUID()
    private readonly interval : number = 1000
    constructor(
        protected _projectionJobRepository : ProjectionJobRepository,
        protected _eventRepository : EventRepository,
        private projections : AbstractProjection[]
    ){
        console.log('[ProjectionsWorker] Starting worker')
        this.work().then(() => this.watchForNewJobs().then())

    }

    async getPendingJobs() : Promise<Result<ProjectionJob[]>> {
        const pendingJobsResult = await this._projectionJobRepository.getPendingJobs()
        return pendingJobsResult
    }


    fetchAllEvents(eventsIds : string[]) : Promise<Result<IEvent[]>> {
        return this._eventRepository.getEventsById(eventsIds)
    }


    async watchForNewJobs(){
        const result = await this._projectionJobRepository.watchJob(async () => {
            this.work().then()
        }, this.interval)
        if(!result.success){
            console.error(result.error)
        }
    }

    async work() {
        const pendingJobsResult = await this.getPendingJobs()
        if(!pendingJobsResult.success){
            return console.error(pendingJobsResult.error)
        }
        const pendingJobs = pendingJobsResult.value
        pendingJobs.sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime())

        const events = await this.fetchAllEvents(pendingJobs.map(job => job.eventId))
        if(!events.success){
            return console.error(events.error)
        }

        const jobsWithEvents : ProjectionJobWithEvent[] = pendingJobs.map((job) => {
            const event = events.value.find(event => event.eventId === job.eventId)
            if(!event){
                console.error("[Projection Worker] - Critical Error - Try to process an event that do not exist ! deleting the job...")
                this._projectionJobRepository.terminateJob(job)
                return;
            }
            return {
                ...job,
                event: event
            }
        }).filter(Boolean) as ProjectionJobWithEvent[]

        for(const projection of this.projections){
            const jobs = jobsWithEvents.filter(job => job.projectionName === projection.constructor.name)
            const result = await projection.apply(jobs)
            const [jobIdsSuccess,jobIdsFailed] = result.value
            for(const jobId of jobIdsSuccess){
                const job = jobs.find(job => job.jobId === jobId) as ProjectionJobWithEvent
                await this._projectionJobRepository.terminateJob(job)
            }
            for(const jobId of jobIdsFailed){
                const job = jobs.find(job => job.jobId === jobId) as ProjectionJobWithEvent
                await this._projectionJobRepository.failJob(job)
            }
        }
    }
}