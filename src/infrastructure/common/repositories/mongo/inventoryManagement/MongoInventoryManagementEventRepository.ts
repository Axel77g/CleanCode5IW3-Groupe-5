import {MongoEventRepository} from "../shared/MongoEventRepository";
export class MongoInventoryManagementEventRepository extends MongoEventRepository{
    protected collectionName: string = "inventoryManagementEvents";
}