import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {
    InventorySparePartRepository
} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {OptionalResult, PaginatedResult, Result, VoidResult} from "@shared/Result";
import {
    InventorySparePart,
    InventorySparePartDTO
} from "@domain/inventoryManagement/entities/InventorySparePart";
import {
    ListInventorySparePartInput
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";
import {ApplicationException} from "@shared/ApplicationException";

export class MongoInventorySparePartRepository extends AbstractMongoRepository implements InventorySparePartRepository {
    protected collectionName: string = 'inventorySpareParts';

    constructor(...args: [any]){
        super(...args);
        this.createTextIndex().then();
    }

    private async createTextIndex() {
        const collection = this.getCollection();
        const existingIndexes = await collection.indexes();

        // Vérifie si un index texte existe déjà
        const textIndexExists = existingIndexes.some(index =>
            index.key.name === "text" || index.key.reference === "text"
        );

        if (!textIndexExists) {
            await collection.createIndex({ name: "text", reference: "text" }, { name: "textIndex" });
        }
    }



    find(reference: string): Promise<OptionalResult<InventorySparePart>> {
        return this.catchError(
            async () => {
                const inventorySparePartDocument = await this.getCollection().findOne({
                    reference: reference
                });
                if(!inventorySparePartDocument) return Result.SuccessVoid();
                const inventorySparePart = InventorySparePart.fromObject(inventorySparePartDocument as any);
                if(inventorySparePart instanceof ApplicationException) return Result.Failure(inventorySparePart);
                return Result.Success<InventorySparePart>(inventorySparePart);
            }
        )
    }

    findAll(references: string[]): Promise<Result<InventorySparePart[]>> {
        return this.catchError(
            async()=>{
                const inventorySparePartDocuments = await this.getCollection().find({
                    reference: {
                        $in: references
                    }
                }).toArray();
                const inventorySpareParts = inventorySparePartDocuments.map((document : any) => InventorySparePart.fromObject(document as InventorySparePartDTO));
                const inventorySparePartsSafe = inventorySpareParts.filter((inventorySparePart : InventorySparePart | any) => !(inventorySparePart instanceof ApplicationException)) as InventorySparePart[];
                if(inventorySparePartsSafe.length !== inventorySpareParts.length) console.warn("[WARNING] Some inventory spare parts could not be loaded");
                return Result.Success<InventorySparePart[]>(inventorySparePartsSafe);
            }
        )
    }

    store(inventorySparePart: InventorySparePart): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError<VoidResult>(
            async () => {
                session.startTransaction();
                await this.getCollection().updateOne(
                    { reference: inventorySparePart.reference },
                    {
                        $set: {
                            reference: inventorySparePart.reference,
                            name: inventorySparePart.name
                        }
                    },
                    { upsert: true }
                );
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        );
    }

    list(pagination: ListInventorySparePartInput): Promise<PaginatedResult<InventorySparePart>> {
        const {page, limit, search} = pagination;
        return this.catchError(
            async () =>{
                const filters = search ? {
                    $text: {
                        $search: search
                    }
                } : {}
                const inventorySparePartDocuments = await this.getCollection().find(filters).skip((page - 1) * limit).limit(limit).toArray();
                const inventorySparePartTotal = await this.getCollection().countDocuments(filters);
                const inventorySpareParts = inventorySparePartDocuments
                    .map((document : any) => InventorySparePart.fromObject(document as InventorySparePartDTO))
                const inventorySparePartSafe = inventorySpareParts.filter((inventorySparePart : InventorySparePart | any) => !(inventorySparePart instanceof ApplicationException)) as InventorySparePart[];
                if(inventorySparePartSafe.length !== inventorySpareParts.length) console.warn("[WARNING] Some inventory spare parts could not be loaded");
                return Result.SuccessPaginated<InventorySparePart>(inventorySparePartSafe, inventorySparePartTotal, page, limit);
            }
        );
    }
}