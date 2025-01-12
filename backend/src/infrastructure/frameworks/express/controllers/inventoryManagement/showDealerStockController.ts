import {Controller} from "@expressApp/types/Controller";
import {siretRequest} from "@expressApp/requests/inventoryManagement/siretRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {Response} from "@expressApp/core/Response";
import {createShowDealerStockUseCase} from "@application/inventoryManagement/usecases/stock/ShowDealerStockUseCase";
import {stockRepository} from "@expressApp/repositories/inventoryManagement/stockRepository";

export const showDealerStockController : Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if (siret instanceof Error) return Response.Fail(400, siret.message)

    const showDealerUseCase = createShowDealerStockUseCase(stockRepository)
    const response = await showDealerUseCase({siret})

    if (!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}