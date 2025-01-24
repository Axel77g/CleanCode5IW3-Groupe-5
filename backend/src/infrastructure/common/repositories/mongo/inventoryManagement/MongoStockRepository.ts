import {AbstractMongoRepository} from "../AbstractMongoRepository";
import {StockRepository} from "@application/inventoryManagement/repositories/StockRepository";
import {Siret} from "@domain/shared/value-object/Siret";
import {Result, VoidResult} from "@shared/Result";
import {StockInventorySparePart} from "@domain/inventoryManagement/value-object/StockInventorySparePart";
import {InventorySparePart} from "@domain/inventoryManagement/entities/InventorySparePart";

export class MongoStockRepository extends AbstractMongoRepository implements StockRepository{

    protected collectionName: string = 'stock';

    getStock(siret: Siret): Promise<Result<StockInventorySparePart[]>> {
        return this.catchError(
            async () => {
                const stockDocuments = await this.getQuery().find({siret: siret.getValue()}).toArray();
                const stockInventorySpareParts = stockDocuments.map((stockDocument : any) => StockInventorySparePart.create(stockDocument));
                const stockInventorySparePartsSafe = stockInventorySpareParts.filter((stockInventorySparePart) => stockInventorySparePart instanceof StockInventorySparePart) as StockInventorySparePart[];
                if(stockInventorySparePartsSafe.length !== stockInventorySpareParts.length) console.warn("Some stock inventory spare parts could not be created");
                return Result.Success<StockInventorySparePart[]>(stockInventorySparePartsSafe);
            }
        )
    }

    getStockQuantity(sparePart: InventorySparePart, siret: Siret): Promise<Result<number>> {
        return this.catchError(
            async () => {
                const stockDocument = await this.getQuery().findOne({siret: siret.getValue(), sparePartReference: sparePart.reference});
                if(!stockDocument) return Result.Success<number>(0);
                return Result.Success<number>(stockDocument.quantity);
            }
        )
    }

    update(sparePart: InventorySparePart, siret: Siret, quantity: number): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction({
                    readConcern: { level: 'snapshot' },
                    writeConcern: { w: 'majority' }
                });
                const actualQuantity = await this.getStockQuantity(sparePart, siret);
                if(!actualQuantity.success) return actualQuantity;
                const safeActualQuantity = actualQuantity.value || 0;
                const newQuantity = safeActualQuantity + quantity;
                await this.getQuery().updateOne({siret: siret.getValue(), sparePartReference: sparePart.reference}, {$set: {quantity: newQuantity}}, {upsert: true});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }

    deleteByDealerSiret(siret: Siret): Promise<VoidResult> {
        const session = this.getSessionTransaction();
        return this.catchError(
            async () => {
                session.startTransaction({
                    readConcern: { level: 'snapshot' },
                    writeConcern: { w: 'majority' }
                });
                await this.getQuery().deleteMany({siret: siret.getValue()});
                await session.commitTransaction();
                return Result.SuccessVoid();
            },
            session.abortTransaction.bind(session)
        )
    }
}