import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {registerDealerRequest} from "@infrastructureCore/requests/inventoryManagement/registerDealerRequest";
import {
    createRegisterDealerUseCase,
    RegisterDealerUseCase
} from "@application/inventoryManagement/usecases/dealer/RegisterDealerUseCase";
import {Address} from "@domain/shared/value-object/Address";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {Siret} from "@domain/shared/value-object/Siret";
import {
    inventoryManagementEventRepository
} from "@infrastructureCore/repositories/inventoryManagement/inventoryManagementEventRepository";
import {dealerRepository} from "@infrastructureCore/repositories/inventoryManagement/dealerRepository";

export const registerDealerUseCase : UseCaseImplementation<typeof registerDealerRequest, RegisterDealerUseCase> = async (input) =>{
    const address = Address.create(input.address)
    if(address instanceof ApplicationException) return Result.Failure(address)
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createRegisterDealerUseCase(inventoryManagementEventRepository,dealerRepository)
    return useCase({
        siret,
        name: input.name,
        address,
        phoneNumber: input.phoneNumber
    })
}