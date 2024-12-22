import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {
    InventorySparePartRepository
} from "../../../../application/inventoryManagement/repositories/InventorySparePartRepository";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {KnexRepositoryResponse} from "../KnexRepositoryResponse";

export class KnexInventorySparePartRepository extends AbstractKnexRepository implements InventorySparePartRepository{
    protected tableName: string = "spare_parts";

    async find(reference: string): Promise<KnexRepositoryResponse<InventorySparePart>> {
        try{
            const sparePartRow = await this.getQuery().where('reference', reference).first() as any;
            if(!sparePartRow) {
                return new KnexRepositoryResponse<InventorySparePart>();
            }
            const inventorySparePart = new InventorySparePart(
                sparePartRow.reference,
                sparePartRow.name,
            );

            return new KnexRepositoryResponse<InventorySparePart>(inventorySparePart);
        }catch (e){
            return new KnexRepositoryResponse<InventorySparePart>(undefined, true);
        }
    }

    async create(inventorySparePart: InventorySparePart): Promise<KnexRepositoryResponse<void>> {
        const transaction = await this.connection.transaction();
        try{
            await transaction(this.tableName).insert({
                reference: inventorySparePart.reference,
                name: inventorySparePart.name
            });
            await transaction.commit();
            return new KnexRepositoryResponse(undefined, false);
        }catch (e){
            await transaction.rollback();
            return new KnexRepositoryResponse(undefined, true);
        }
    }

    async update(inventorySparePart: InventorySparePart): Promise<KnexRepositoryResponse<void>> {
        const transaction = await this.connection.transaction();
        try{
            await transaction(this.tableName).where('reference', inventorySparePart.reference).update({
                name: inventorySparePart.name
            });
            await transaction.commit();
            return new KnexRepositoryResponse(undefined, false);
        }catch (e){
            await transaction.rollback();
            return new KnexRepositoryResponse(undefined, true);
        }
    }

}