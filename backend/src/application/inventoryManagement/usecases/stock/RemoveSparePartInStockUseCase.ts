import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {StockRepository} from "../../repositories/StockRepository";
import {NotificationServices} from "../../services/NotificationServices";

interface RemoveSparePartInStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
    sparePart: InventorySparePart,
    quantity: number
}

interface RemoveSparePartInStockOutput extends IOutputUseCase{}

class CannotRemoveSparePartInStock extends AbstractUseCaseException implements RemoveSparePartInStockOutput{
    constructor(input : RemoveSparePartInStockInput){
        super(`Cannot remove spare part ${input.sparePart.reference} in stock of dealer ${input.dealerSiret.getValue()}`);
    }
}

class StockRunOut extends AbstractUseCaseException implements RemoveSparePartInStockOutput{
    constructor(input : RemoveSparePartInStockInput){
        super(`Stock run out for spare part ${input.sparePart.reference} in stock of dealer ${input.dealerSiret.getValue()}`);
    }
}

export class RemoveSparePartInStockUseCase implements IUseCase<RemoveSparePartInStockInput, RemoveSparePartInStockOutput> {

    constructor(
        private _stockRepository: StockRepository,
        private _notificationService: NotificationServices
    ) {}

    async execute(input: RemoveSparePartInStockInput): Promise<RemoveSparePartInStockOutput> {
        const stockQuantityResponse = await this._stockRepository.getStockQuantity(input.sparePart, input.dealerSiret);
        if(stockQuantityResponse.hasError()){
            return new CannotRemoveSparePartInStock(input)
        }

        if(stockQuantityResponse.value == null || stockQuantityResponse.value < input.quantity){
            return new StockRunOut(input)
        }


        const removeResponse = await this._stockRepository.remove(input.sparePart, input.dealerSiret, input.quantity);
        if(removeResponse.hasError()){
            return new CannotRemoveSparePartInStock(input)
        }

        const newStockQuantity = stockQuantityResponse.value - input.quantity;
        if(newStockQuantity === 5){
            this._notificationService.notifyLowStock(input.dealerSiret, input.sparePart)
        }

        return {
            message: "Spare part remove from the stock",
            error: false
        }
    }
}