import { createUnregisterVehiculeUseCase, UnregisterVehiculeUseCase } from "@application/maintenance/usecases/vehicule/UnregisterVehiculeUseCase";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {immatriculationRequest} from "@infrastructureCore/requests/maintenance/vehiculeImmatriculationRequest";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";


export const unregisterVehiculeUseCase: UseCaseImplementation<typeof immatriculationRequest, UnregisterVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createUnregisterVehiculeUseCase(maintenanceEventRepository, vehiculeRepository)
    return useCase({ immatriculation })
}