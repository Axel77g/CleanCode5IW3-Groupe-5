import {Controller} from "@expressApp/types/Controller";
import {registerOrderRequest} from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {createRegisterOrderUseCase} from "@application/inventoryManagement/usecases/order/RegisterOrderUseCase";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {Response} from "@expressApp/core/Response";
import {Siret} from "@domain/shared/value-object/Siret";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {inventorySparePartRepository} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {ApplicationException} from "@shared/ApplicationException";

export const registerOrderController : Controller<typeof registerOrderRequest> = async (payload) => {
    const dealerSiret = Siret.create(payload.dealerSiret)
    if(dealerSiret instanceof Error) return Response.Fail(400, dealerSiret.message)
    const orderLines = payload.orderLines.map((line) => {
        return OrderLine.create(line)
    })
    const error = orderLines.find(line => line instanceof ApplicationException) as ApplicationException | undefined
    if(error) return Response.Fail(400, error.message)
    const registerOrderUseCase = createRegisterOrderUseCase(inventoryManagementEventRepository, dealerRepository, inventorySparePartRepository)
    const result = await registerOrderUseCase({
        ...payload,
        dealer: dealerSiret,
        orderLines: orderLines as OrderLine[]
    })
    if(!result.success) return Response.Fail(400, result.error.message)
    return Response.Success(result.value)
}