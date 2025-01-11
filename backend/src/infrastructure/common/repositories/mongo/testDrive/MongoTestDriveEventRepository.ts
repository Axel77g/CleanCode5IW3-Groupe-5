import {MongoEventRepository} from "../shared/MongoEventRepository";
export class MongoTestDriveEventRepository extends MongoEventRepository{
    protected collectionName: string = 'testDriveEvents';
}