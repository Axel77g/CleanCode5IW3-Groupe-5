import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {InventorySparePart} from "../../../../domain/inventoryManagement/entities/InventorySparePart";
import {StockRepository} from "../../repositories/StockRepository";
import {InventorySparePartRepository} from "../../repositories/InventorySparePartRepository";
import {UpsertInventorySparePartUseCase} from "../inventorySparePart/UpsertInventorySparePartUseCase";
import {GetInventorySparePartUseCase} from "../inventorySparePart/GetInventorySparePartUseCase";

interface AddSparePartInStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
    sparePart: InventorySparePart,
    quantity: number
}

interface AddSparePartInStockOutput extends IOutputUseCase{}

class CannotAddSparePartInStock extends AbstractUseCaseException implements AddSparePartInStockOutput{
    constructor(input : AddSparePartInStockInput){
        super(`Cannot add spare part ${input.sparePart.reference} in stock of dealer ${input.dealerSiret.getValue()}`);
    }
}

export class AddSparePartInStockUseCase implements IUseCase<AddSparePartInStockInput, AddSparePartInStockOutput> {

    constructor(private _stockRepository: StockRepository,  private _getInventorySparePartUseCase: GetInventorySparePartUseCase)
    {}

    async execute(input: AddSparePartInStockInput): Promise<AddSparePartInStockOutput> {
        const sparePartResponse = await this._getInventorySparePartUseCase.execute({reference: input.sparePart.reference});
        if(sparePartResponse.sparePart === null){
            return new CannotAddSparePartInStock(input)
        }

        const addResponse = await this._stockRepository.add(input.sparePart, input.dealerSiret, input.quantity);
        if(addResponse.hasError()) return new CannotAddSparePartInStock(input)

        return {
            message: "Spare part added in stock",
            error: false
        }
    }
}