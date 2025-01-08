import {
    InventorySparePartRepository
} from "../../../../application/inventoryManagement/repositories/InventorySparePartRepository";
import { InventorySparePart } from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import { Result, VoidResult } from "../../../../shared/Result";
import { AbstractKnexRepository } from "../AbstractKnexRepository";

export class KnexInventorySparePartRepository extends AbstractKnexRepository implements InventorySparePartRepository {
    protected tableName: string = "spare_parts";

    async find(reference: string): Promise<Result<InventorySparePart>> {
        try {
            const sparePartRow = await this.getQuery().where('reference', reference).first() as any;
            if (!sparePartRow) return Result.FailureStr("Spare part not found");

            const inventorySparePart = new InventorySparePart(
                sparePartRow.reference,
                sparePartRow.name,
            );

            return Result.Success<InventorySparePart>(inventorySparePart);
        } catch (e) {
            console.error(e);
            return Result.FailureStr("An error occurred while getting spare part");
        }
    }

    async create(inventorySparePart: InventorySparePart): Promise<VoidResult> {
        const transaction = await this.connection.transaction();

        try {
            await transaction(this.tableName).insert({
                reference: inventorySparePart.reference,
                name: inventorySparePart.name
            });
            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e)
            return Result.FailureStr("An error occurred while creating spare part");
        }
    }

    async update(inventorySparePart: InventorySparePart): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try {
            await transaction(this.tableName).where('reference', inventorySparePart.reference).update({
                name: inventorySparePart.name
            });
            await transaction.commit();
            return Result.SuccessVoid();
        } catch (e) {
            await transaction.rollback();
            console.error(e)
            return Result.FailureStr("An error occurred while updating spare part");
        }
    }

}