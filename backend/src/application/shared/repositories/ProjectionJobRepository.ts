import {ProjectionJob} from "@application/shared/projections/ProjectionJob";
import {Result, VoidResult} from "@shared/Result";

export interface ProjectionJobRepository{
    storeJob(job: ProjectionJob): Promise<VoidResult>
    getPendingJobs(): Promise<Result<ProjectionJob[]>>
    terminateJob(job: ProjectionJob): Promise<VoidResult>
    failJob(job: ProjectionJob): Promise<VoidResult>
    watchJob(onJob: () => void, interval : number): Promise<VoidResult>
}