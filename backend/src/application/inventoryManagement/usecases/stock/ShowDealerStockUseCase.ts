import {AbstractUseCaseException, IInputUseCase, IOutputUseCase, IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {StockRepository} from "../../repositories/StockRepository";
import {StockInventorySparePart} from "../../../../domain/inventoryManagement/value-object/StockInventorySparePart";

interface ShowDealerStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
}

interface ShowDealerStockOutput extends IOutputUseCase{
    stock: StockInventorySparePart[]
}

class CannotGetDealerStock extends AbstractUseCaseException implements ShowDealerStockOutput{
    stock: StockInventorySparePart[] = [];
    constructor(input : ShowDealerStockInput){
        super(`Cannot get stock of dealer ${input.dealerSiret.getValue()}`);
    }

}

export class ShowDealerStockUseCase implements IUseCase<ShowDealerStockInput,ShowDealerStockOutput> {

    constructor(private _stockRepository: StockRepository)
    {}

    async execute(input: ShowDealerStockInput): Promise<ShowDealerStockOutput> {

        const getStockResponse = await this._stockRepository.getStock(input.dealerSiret);
        if(getStockResponse.hasError() || getStockResponse.empty()){
            return new CannotGetDealerStock(input)
        }

        return {
            stock: getStockResponse.value || [],
            message: "Spare part added in stock",
            error: false
        }
    }
}