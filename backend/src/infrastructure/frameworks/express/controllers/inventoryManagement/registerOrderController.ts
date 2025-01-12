import {Controller} from "@expressApp/types/Controller";
import {registerOrderRequest} from "@expressApp/requests/inventoryManagement/registerOrderRequest";
import {
    inventoryManagementEventRepository
} from "@expressApp/repositories/inventoryManagement/inventoryManagementEventRepository";
import {createRegisterOrderUseCase} from "@application/inventoryManagement/usecases/order/RegisterOrderUseCase";
import {dealerRepository} from "@expressApp/repositories/inventoryManagement/dealerRepository";
import {Response} from "@expressApp/core/Response";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {inventorySparePartRepository} from "@expressApp/repositories/inventoryManagement/inventorySparePartRepository";

export const registerOrderController : Controller<typeof registerOrderRequest> = async (payload) => {
    const dealerSiret = Siret.create(payload.dealer)
    if(dealerSiret instanceof Error) return Response.Fail(400, dealerSiret.message)
    const orderLines = payload.orderLines.map((line) => {
        return OrderLine.create(line)
    })
    const registerOrderUseCase = createRegisterOrderUseCase(inventoryManagementEventRepository, dealerRepository, inventorySparePartRepository)
    const result = await registerOrderUseCase({
        ...payload,
        dealer: dealerSiret,
        orderLines
    })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}