import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {ProjectionJob} from "@application/shared/projections/ProjectionJob";
import {ProjectionJobRepository} from "@application/shared/repositories/ProjectionJobRepository";
import {Result, VoidResult} from "@shared/Result";

export class InMemoryProjectionJobRepository extends AbstractInMemoryRepository<ProjectionJob> implements ProjectionJobRepository{
    failJob(job: ProjectionJob): Promise<VoidResult> {
        if(this.collection.exists('jobId', job.jobId)) {
            return Promise.resolve(Result.SuccessVoid());
        }else{
            return Promise.resolve(Result.FailureStr("Job not found"));
        }
    }

    getPendingJobs(): Promise<Result<ProjectionJob[]>> {
        return Promise.resolve(
            Result.Success(this.collection.toArray())
        );
    }

    storeJob(job: ProjectionJob): Promise<VoidResult> {
        this.collection.add(job);
        return Promise.resolve(Result.SuccessVoid());
    }

    terminateJob(job: ProjectionJob): Promise<VoidResult> {
        if(this.collection.exists('jobId', job.jobId)) {
            this.collection.remove('jobId', job.jobId);
            return Promise.resolve(Result.SuccessVoid());
        }else{
            return Promise.resolve(Result.FailureStr("Job not found"));
        }
    }

    watchJob(onJob: () => void, interval: number): Promise<VoidResult> {
        setInterval(onJob, interval);
        return Promise.resolve(Result.SuccessVoid());
    }

}