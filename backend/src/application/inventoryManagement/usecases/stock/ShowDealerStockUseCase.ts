import { IInputUseCase,  IUseCase} from "../../../../shared/IUseCase";
import {DealerSiret} from "../../../../domain/inventoryManagement/value-object/DealerSiret";
import {StockRepository} from "../../repositories/StockRepository";
import {StockInventorySparePart} from "../../../../domain/inventoryManagement/value-object/StockInventorySparePart";
import {Result} from "../../../../shared/Result";

interface ShowDealerStockInput extends IInputUseCase{
    dealerSiret: DealerSiret,
}

type ShowDealerStockResult = Result<StockInventorySparePart[]>
export type ShowDealerStockUseCase = IUseCase<ShowDealerStockInput, ShowDealerStockResult>
export const showDealerStockUseCase = (_stockRepository: StockRepository): ShowDealerStockUseCase => {
    return async (input: ShowDealerStockInput) => {
        const getStockResponse = await _stockRepository.getStock(input.dealerSiret);
        if(!getStockResponse.success) return Result.FailureStr("Cannot get dealer stock")
        return getStockResponse
    }
}