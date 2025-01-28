import { createRegisterGarageUseCase, RegisterGarageUseCase } from "@application/maintenance/usecases/garage/RegisterGarageUseCase";
import { Address } from "@domain/shared/value-object/Address";
import { Siret } from "@domain/shared/value-object/Siret";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import { garageRepository } from "../../repositories/maintenance/garageRepository";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { registerGarageRequest } from "../../requests/maintenance/registerGarageRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const registerGarageUseCase: UseCaseImplementation<typeof registerGarageRequest, RegisterGarageUseCase> = async (input) => {
    const address = Address.create(input.address)
    if (address instanceof ApplicationException) return Result.Failure(address)
    const siret = Siret.create(input.siret)
    if (siret instanceof ApplicationException) return Result.Failure(siret)
    const useCase = createRegisterGarageUseCase(maintenanceEventRepository, garageRepository)
    return useCase({
        siret,
        name: input.name,
        phoneNumber: input.phoneNumber,
        address
    })
}