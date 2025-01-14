import { Result } from "@shared/Result";
import { MongoClient } from 'mongodb';
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
            console.error("[MONGO ERROR]", message);
            return Result.FailureStr(message) as T;
        }
    }

}