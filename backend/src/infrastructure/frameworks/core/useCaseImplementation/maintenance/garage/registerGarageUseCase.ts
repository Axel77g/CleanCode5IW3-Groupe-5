import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {registerGarageRequest} from "@infrastructureCore/requests/maintenance/garage/registerGarageRequest";
import {
    createRegisterGarageUseCase,
    RegisterGarageUseCase
} from "@application/maintenance/usecases/garage/RegisterGarageUseCase";
import {Address} from "@domain/shared/value-object/Address";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {Siret} from "@domain/shared/value-object/Siret";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {garageRepository} from "@infrastructureCore/repositories/maintenance/garageRepository";

export const registerGarageUseCase : UseCaseImplementation<typeof registerGarageRequest, RegisterGarageUseCase> = async (input) =>{
    const address = Address.create(input.address)
    if(address instanceof ApplicationException) return Result.Failure(address)
    const siret = Siret.create(input.siret)
    if(siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createRegisterGarageUseCase(maintenanceEventRepository,garageRepository)
    return useCase({
        siret,
        name: input.name,
        address,
        phoneNumber: input.phoneNumber
    })
}