import { createUnregisterVehiculeUseCase, UnregisterVehiculeUseCase } from "@application/maintenance/usecases/vehicule/UnregisterVehiculeUseCase";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { vehiculeRepository } from "../../repositories/maintenance/vehiculeRepository";
import { immatriculationRequest } from "../../requests/maintenance/vehiculeImmatriculationRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const unregisterVehiculeUseCase: UseCaseImplementation<typeof immatriculationRequest, UnregisterVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const useCase = createUnregisterVehiculeUseCase(maintenanceEventRepository, vehiculeRepository)
    return useCase({ immatriculation })
}