import {MongoClient} from 'mongodb'
export abstract class AbstractMongoRepository {
    protected abstract collectionName: string;
    protected constructor(
        protected connection: MongoClient,
        protected dbName: string
    ) {}

    protected getQuery(collectionName: string = this.collectionName)
    {
        return this.connection.db().collection(collectionName);
    }

    protected getSessionTransaction(){
        return this.connection.startSession();
    }

}