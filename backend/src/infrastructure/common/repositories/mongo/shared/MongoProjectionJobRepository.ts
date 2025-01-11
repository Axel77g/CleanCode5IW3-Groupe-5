import {AbstractMongoRepository} from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import {ProjectionJobRepository} from "@application/shared/repositories/ProjectionJobRepository";
import {ProjectionJob} from "@application/shared/projections/ProjectionJob";
import {undefined} from "zod";
import {Result, VoidResult} from "@shared/Result";

export abstract class MongoProjectionJobRepository extends AbstractMongoRepository implements ProjectionJobRepository{
    protected abstract collectionName: string;

    async failJob(job: ProjectionJob): Promise<VoidResult> {
        return Result.SuccessVoid();
        const session = this.getSessionTransaction()
        return this.catchError(
            async()=> {
                session.startTransaction();
                await this.getQuery().deleteOne({jobId: job.jobId});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    getPendingJobs(): Promise<Result<ProjectionJob[]>> {
        return this.catchError(
            async()=>{
                const projectionJobsDocuments = await this.getQuery().find();
                // @ts-ignore
                const projectionJobs = await projectionJobsDocuments.toArray() as ProjectionJob[];
                return Result.Success<ProjectionJob[]>(projectionJobs);
            },
        )
    }

    storeJob(job: ProjectionJob): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async()=> {
                session.startTransaction();
                await this.getQuery().insertOne(job);

                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    terminateJob(job: ProjectionJob): Promise<VoidResult> {
        const session = this.getSessionTransaction()
        return this.catchError(
            async()=> {
                session.startTransaction();
                await this.getQuery().deleteOne({jobId: job.jobId});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    watchJob(onJob: () => void, interval : number = 1000): Promise<VoidResult> {
        return this.catchError(
             async ()=> {
                setInterval(()=>{
                    onJob();
                }, 1000)
                return Result.SuccessVoid();
            },
        )
    }

}