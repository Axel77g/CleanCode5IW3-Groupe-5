import { ProjectionJob } from "@application/shared/projections/ProjectionJob";
import { ProjectionJobRepository } from "@application/shared/repositories/ProjectionJobRepository";
import { AbstractMongoRepository } from "@infrastructure/common/repositories/mongo/AbstractMongoRepository";
import { Result, VoidResult } from "@shared/Result";

export abstract class MongoProjectionJobRepository extends AbstractMongoRepository implements ProjectionJobRepository {
    protected abstract collectionName: string;

    async failJob(job: ProjectionJob): Promise<VoidResult> {
        return Result.SuccessVoid();
        const session = this.getSessionTransaction()
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ jobId: job.jobId });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    getPendingJobs(): Promise<Result<ProjectionJob[]>> {
        return this.catchError(
            async () => {
                const projectionJobsDocuments = await this.getCollection().find();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const projectionJobs = await projectionJobsDocuments.toArray() as ProjectionJob[];
                return Result.Success<ProjectionJob[]>(projectionJobs);
            },
        )
    }

    storeJob(job: ProjectionJob): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().insertOne(job);

                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    terminateJob(job: ProjectionJob): Promise<VoidResult> {
        const session = this.getSessionTransaction()
        return this.catchError(
            async () => {
                session.startTransaction();
                await this.getCollection().deleteOne({ jobId: job.jobId });
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session),
        )
    }

    watchJob(onJob: () => void, interval: number = 1000): Promise<VoidResult> {
        return this.catchError(
            async () => {
                setInterval(() => {
                    onJob();
                }, interval)
                return Result.SuccessVoid();
            },
        )
    }

}