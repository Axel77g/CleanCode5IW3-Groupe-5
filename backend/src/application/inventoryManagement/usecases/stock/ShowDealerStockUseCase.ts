import { StockInventorySparePart } from "@domain/inventoryManagement/value-object/StockInventorySparePart";
import { Siret } from '@domain/shared/value-object/Siret';
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { StockRepository } from "../../repositories/StockRepository";

interface ShowDealerStockInput extends IInputUseCase {
    siret: Siret,
}

type ShowDealerStockResult = Result<StockInventorySparePart[]>
export type ShowDealerStockUseCase = IUseCase<ShowDealerStockInput, ShowDealerStockResult>
export const createShowDealerStockUseCase = (_stockRepository: StockRepository): ShowDealerStockUseCase => {
    return async (input: ShowDealerStockInput) => {
        const getStockResponse = await _stockRepository.getStock(input.siret);
        if (!getStockResponse.success) return Result.FailureStr("Cannot get dealer stock")
        return getStockResponse
    }
}