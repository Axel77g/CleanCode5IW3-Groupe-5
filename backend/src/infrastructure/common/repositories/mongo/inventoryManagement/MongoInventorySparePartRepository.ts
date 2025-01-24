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

export class MongoInventorySparePartRepository extends AbstractMongoRepository implements InventorySparePartRepository{
    protected collectionName: string = 'inventorySpareParts';

    constructor(...args: [any]){
        super(...args);
        //this.createTextIndex().then();
    }

    private async createTextIndex() {
        const existingIndexes = await this.getQuery().listIndexes().toArray();
        const textIndex = existingIndexes.find((index: any) => index.name === "text");
        if (textIndex) return;
        await this.getQuery().createIndex({ name: "text", reference: "text" });
    }


    find(reference: string): Promise<OptionalResult<InventorySparePart>> {
        return this.catchError(
            async () => {
                const inventorySparePartDocument = await this.getQuery().findOne({
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
                const inventorySparePartDocuments = await this.getQuery().find({
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
                await this.getQuery().updateOne(
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
                const inventorySparePartDocuments = await this.getQuery().find(filters).skip((page - 1) * limit).limit(limit).toArray();
                const inventorySparePartTotal = await this.getQuery().countDocuments(filters);
                const inventorySpareParts = inventorySparePartDocuments
                    .map((document : any) => InventorySparePart.fromObject(document as InventorySparePartDTO))
                const inventorySparePartSafe = inventorySpareParts.filter((inventorySparePart : InventorySparePart | any) => !(inventorySparePart instanceof ApplicationException)) as InventorySparePart[];
                if(inventorySparePartSafe.length !== inventorySpareParts.length) console.warn("[WARNING] Some inventory spare parts could not be loaded");
                return Result.SuccessPaginated<InventorySparePart>(inventorySparePartSafe, inventorySparePartTotal, page, limit);
            }
        );
    }
}