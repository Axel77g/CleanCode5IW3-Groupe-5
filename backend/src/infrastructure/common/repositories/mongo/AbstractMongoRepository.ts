import {MongoClient} from 'mongodb'
import {Result} from "@shared/Result";
export abstract class AbstractMongoRepository {
    protected abstract collectionName: string;
    public constructor(
        protected connection: MongoClient,
    ) {}

    public getQuery(collectionName: string = this.collectionName)
    {
        return this.connection.db().collection(collectionName);
    }

    protected getSessionTransaction(){
        return this.connection.startSession();
    }

    protected async catchError<T>(callback: () => Promise<T>, onError: () => Promise<unknown> = async () => {}, defaultMessageError: string = 'An error occurred') : Promise<T> {
        try{
            return await callback();
        }catch (e) {
            await onError();
            const message = e instanceof Error ? e.message : defaultMessageError;
            return Result.FailureStr(message) as T;
        }
    }

}