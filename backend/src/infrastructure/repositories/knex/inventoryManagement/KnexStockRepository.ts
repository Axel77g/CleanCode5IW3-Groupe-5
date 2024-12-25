import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {StockRepository} from "../../../../application/inventoryManagement/repositories/StockRepository"
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {StockInventorySparePart} from "../../../../domain/inventoryManagement/value-object/StockInventorySparePart";
import {Result, VoidResult} from "../../../../shared/Result";
export class KnexStockRepository extends AbstractKnexRepository implements StockRepository{
    protected tableName: string = "dealers_stock_transactions";

    async add(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try{
            await transaction(this.tableName).insert({
                spare_part_reference: sparePart.reference,
                dealer_siret: dealerSiret.getValue(),
                quantity: quantity,
                transaction_at: new Date()
            });
            await transaction.commit();
            return Result.SuccessVoid();
        }catch (e){
            console.error(e);
            return Result.FailureStr("An error occurred while adding spare part in stock");
        }
    }

    async getStock(dealerSiret: DealerSiret): Promise<Result<StockInventorySparePart[]>> {
        try{
            const allTransactions = await this.getQuery().where('dealer_siret', dealerSiret.getValue()) as any[];
            const stockInventorySpareParts: Map<string,StockInventorySparePart> = new Map();

            for(const allTransaction of allTransactions){
                const sparePartReference = allTransaction.spare_part_reference;
                const quantity = allTransaction.quantity;
                if(stockInventorySpareParts.has(sparePartReference)){
                    // @ts-ignore It cannot be undefined
                    stockInventorySpareParts.get(sparePartReference).add(quantity);
                }else{
                    stockInventorySpareParts.set(sparePartReference, new StockInventorySparePart(sparePartReference, quantity));
                }
            }

            return Result.Success<StockInventorySparePart[]>(Array.from(stockInventorySpareParts.values()));
        }catch (e){
            console.error(e);
            return Result.FailureStr("An error occurred while getting stock");
        }
    }

    async getStockQuantity(sparePart: InventorySparePart, dealerSiret: DealerSiret): Promise<Result<number>> {
        try{
            const stockTransactionsForSparePart = await this.getQuery()
                .select('spare_part_reference')
                .sum('quantity as total_quantity')
                .where('dealer_siret', dealerSiret.getValue())
                .andWhere('spare_part_reference', sparePart.reference)
                .groupBy('spare_part_reference')
                .first() as any;

            const quantity = stockTransactionsForSparePart ? stockTransactionsForSparePart.total_quantity : 0;
            return Result.Success<number>(quantity);
        }catch (e){
            console.error(e);
            return Result.FailureStr("An error occurred while getting stock quantity");
        }
    }

    async remove(sparePart: InventorySparePart, dealerSiret: DealerSiret, quantity: number): Promise<VoidResult> {
        const transaction = await this.connection.transaction();
        try{
            await transaction(this.tableName).insert({
                spare_part_reference: sparePart.reference,
                dealer_siret: dealerSiret.getValue(),
                quantity: -quantity
            });
            await transaction.commit();
            return Result.SuccessVoid();
        }catch (e){
            console.error(e);
            return Result.FailureStr("An error occurred while removing spare part from stock");
        }
    }

}