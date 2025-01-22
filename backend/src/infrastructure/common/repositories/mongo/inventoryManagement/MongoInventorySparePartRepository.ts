import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {
    InventorySparePartRepository
} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {
    InventorySparePart,
    InventorySparePartDTO
} from "@domain/inventoryManagement/entities/InventorySparePart";
import {
    ListInventorySparePartInput
} from "@application/inventoryManagement/usecases/inventorySparePart/ListInventorySparePartUseCase";

export class MongoInventorySparePartRepository extends AbstractMongoRepository implements InventorySparePartRepository{
    protected collectionName: string = 'inventorySpareParts';

    constructor(...args: [any]){
        super(...args);
        this.createTextIndex().then();
    }

    private async createTextIndex() {
        await this.getQuery().createIndex({ name: "text", reference: "text" });
    }


    find(reference: string): Promise<Result<InventorySparePart>> {
        return this.catchError<Result<InventorySparePart>>(
            async () => {
                const inventorySparePartDocument = await this.getQuery().findOne({
                    reference: reference
                });
                const inventorySparePart = InventorySparePart.fromObject(inventorySparePartDocument as any);
                return Result.Success<InventorySparePart>(inventorySparePart);
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
                const inventorySpareParts = inventorySparePartDocuments.map((document : any) => InventorySparePart.fromObject(document as InventorySparePartDTO));
                return Result.SuccessPaginated<InventorySparePart>(inventorySpareParts, inventorySparePartTotal, page, limit);
            }
        );
    }
}