import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    createRegisterOrderUseCase,
    RegisterOrderUseCase
} from "@application/inventoryManagement/usecases/order/RegisterOrderUseCase";
import {registerOrderRequest} from "@infrastructureCore/requests/inventoryManagement/registerOrderRequest";
import {Siret} from "@domain/shared/value-object/Siret";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {OrderLine} from "@domain/inventoryManagement/value-object/OrderLine";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";
import {
    inventorySparePartRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventorySparePartRepository";
import {
    createCheckSparesPartsReferenceExist
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";

export const registerOrderUseCase : UseCaseImplementation<typeof registerOrderRequest, RegisterOrderUseCase> = async (input) =>{
    const dealerSiret = Siret.create(input.dealerSiret)
    if(dealerSiret instanceof ApplicationException) return Result.Failure(dealerSiret)
    const orderLines = input.orderLines.map((line) =>  OrderLine.create(line))
    const error = orderLines.find(line => line instanceof ApplicationException) as ApplicationException | undefined
    if(error) return Result.Failure(error)
    const checkSparePartReferencesExistUseCase = createCheckSparesPartsReferenceExist(inventorySparePartRepository)
    const useCase = createRegisterOrderUseCase(inventoryManagementEventRepository, dealerRepository,checkSparePartReferencesExistUseCase)
    return useCase({
        ...input,
        dealer: dealerSiret,
        orderLines: orderLines as OrderLine[]
    })
}