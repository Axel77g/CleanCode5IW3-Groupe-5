import {AbstractInMemoryRepository} from "@infrastructure/common/repositories/in-memory/AbstractInMemoryRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {StockRepository} from "@application/inventoryManagement/repositories/StockRepository";
import {Result, VoidResult} from "@shared/Result";
import {StockInventorySparePart} from "@domain/inventoryManagement/value-object/StockInventorySparePart";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";
import {ApplicationException} from "@shared/ApplicationException";


export class InMemoryInventoryStockRepository extends AbstractInMemoryRepository<StockInventorySparePart> implements StockRepository{
    async deleteByDealerSiret(siret: Siret): Promise<VoidResult> {
        this.collection.remove('siret', siret);
        return Result.SuccessVoid();
    }

    async getStock(siret: Siret): Promise<Result<StockInventorySparePart[]>> {
        const stock = this.collection.findMany('siret', siret).toArray();
        return Result.Success(stock);
    }

    async getStockQuantity(sparePart: InventorySparePart, siret: Siret): Promise<Result<number>> {
        const stock = this.collection
            .findMany('siret', siret)
            .findOne('sparePartReference', sparePart.reference);
        return Result.Success(stock?.quantity ?? 0);
    }

    async update(sparePart: InventorySparePart, siret: Siret, quantity: number): Promise<VoidResult> {
        const stock = this.collection
            .findMany('siret', siret)
            .findOne('sparePartReference', sparePart.reference);
        let stockInventorySparePart;
        if (stock) {
            const newStock = stock.quantity + quantity;
            stockInventorySparePart = StockInventorySparePart.create({
                sparePartReference : sparePart.reference,
                quantity: newStock,
                siret
            })
        } else {
            stockInventorySparePart = StockInventorySparePart
                .create({
                    sparePartReference : sparePart.reference,
                    quantity,
                    siret
                })
        }
        if(stockInventorySparePart instanceof ApplicationException) return Result.Failure(stockInventorySparePart);
        this.collection.upsert(['siret', 'sparePartReference'], [siret, sparePart.reference], stockInventorySparePart);
        return Result.SuccessVoid();
    }

}