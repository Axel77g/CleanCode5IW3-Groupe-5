import { ProjectionJobWithEvent } from "@application/shared/projections/ProjectionJob";
import { ProjectionJobScheduler } from "@application/shared/projections/ProjectionJobScheduler";
import { IEvent } from "@shared/AbstractEvent";
import { Result, SuccessResult, VoidResult } from "@shared/Result";

export abstract class AbstractProjection {
    /**
     * Initialize the projection to listen specific events
     * @param projectionJobScheduler
     */
    abstract init(projectionJobScheduler: ProjectionJobScheduler): void

    /**
     * Bind events type to their handlers
     */
    abstract bindEvents(): { [key: string]: (event: any) => Promise<VoidResult> }
    async apply(projectionJobs: ProjectionJobWithEvent[]): Promise<SuccessResult<string[][]>> {
        const results: string[][] = [[], []]
        for (const job of projectionJobs) {
            const result = await this.applyEvent(job.event)
            if (result.success) {
                results[0].push(job.jobId)
            } else {
                console.error("[PROJECTION] error occurred during projection : ", result.error)
                results[1].push(job.jobId)
            }
        }
        return Result.Success<string[][]>(results)
    }

    async applyEvent(event: IEvent): Promise<VoidResult> {
        const events = this.bindEvents()
        const eventHandler = events[event.type]
        if (!eventHandler) return Result.FailureStr("Event not found")
        return eventHandler.bind(this)(event)
    }
}