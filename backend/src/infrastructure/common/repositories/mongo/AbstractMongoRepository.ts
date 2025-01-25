import {MongoClient} from 'mongodb'
import {Result} from "@shared/Result";
import {InternalErrorException} from "@shared/ApplicationException";
export abstract class AbstractMongoRepository {
    protected abstract collectionName: string;
    public constructor(
        protected connection: MongoClient,
    ) { }

    public getCollection(collectionName: string = this.collectionName) {
        return this.connection.db().collection(collectionName);
    }

    protected getSessionTransaction() {
        return this.connection.startSession();
    }

    protected async catchError<T>(callback: () => Promise<T>, onError: () => Promise<unknown> = async () => { }, defaultMessageError: string = 'An error occurred'): Promise<T> {
        try {
            return await callback();
        } catch (e) {
            await onError();
            const message = e instanceof Error ? e.message : defaultMessageError;
            console.error("[MONGO ERROR]", e);
            return Result.Failure(InternalErrorException.create(message)) as T;
        }
    }

}