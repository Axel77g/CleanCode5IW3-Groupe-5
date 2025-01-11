import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {
    InventorySparePartRepository
} from "@application/inventoryManagement/repositories/InventorySparePartRepository";
import {Result, VoidResult} from "@shared/Result";
import {
    InventorySparePart,
    InventorySparePartDTO
} from "@domain/inventoryManagement/entities/InventorySparePart";

export class MongoInventorySparePartRepository extends AbstractMongoRepository implements InventorySparePartRepository{
    protected collectionName: string = 'inventorySpareParts';

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
}