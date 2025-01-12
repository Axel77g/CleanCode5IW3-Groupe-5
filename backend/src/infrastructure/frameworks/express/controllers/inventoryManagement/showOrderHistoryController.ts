import {siretRequest} from "@expressApp/requests/inventoryManagement/siretRequest";
import {Controller} from "@expressApp/types/Controller";
import {Siret} from "@domain/shared/value-object/Siret";
import {Response} from "@expressApp/core/Response";
import {createShowOrderHistoryUseCase} from "@application/inventoryManagement/usecases/order/ShowOrderHistoryUseCase";
import {createShowDealerUseCase} from "@application/inventoryManagement/usecases/dealer/ShowDealerUseCase";
import {dealerRepository} from "@expressApp/repositories/inventoryManagement/dealerRepository";
import {orderRepository} from "@expressApp/repositories/inventoryManagement/orderRepository";


export const showOrderHistoryController : Controller<typeof siretRequest> = async (payload) => {
    const siret = Siret.create(payload.siret)
    if(siret instanceof Error) return Response.Fail(400, siret.message)
    const showDealerUseCase = createShowDealerUseCase(dealerRepository)
    const showOrderHistoryUseCase = createShowOrderHistoryUseCase(showDealerUseCase, orderRepository)
    const response = await showOrderHistoryUseCase({siret})
    if(!response.success) return Response.Fail(400, response.error.message)
    return Response.Success(response.value)
}