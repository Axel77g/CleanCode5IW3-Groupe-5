import { createRegisterVehiculeUseCase, RegisterVehiculeUseCase } from "@application/maintenance/usecases/vehicule/RegisterVehiculeUseCase";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { VehiculeVin } from "@domain/maintenance/value-object/VehiculeVin";
import { ApplicationException } from "@shared/ApplicationException";
import { Result } from "@shared/Result";
import { maintenanceEventRepository } from "../../repositories/maintenance/maintenanceEventRepository";
import { vehiculeRepository } from "../../repositories/maintenance/vehiculeRepository";
import { registerVehiculeRequest } from "../../requests/maintenance/registerVehiculeRequest";
import { UseCaseImplementation } from "../UseCaseImplementation";

export const registerVehiculeUseCase: UseCaseImplementation<typeof registerVehiculeRequest, RegisterVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation)
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation)
    const vin = VehiculeVin.create(input.vin)
    if (vin instanceof ApplicationException) return Result.Failure(vin)
    const useCase = createRegisterVehiculeUseCase(maintenanceEventRepository, vehiculeRepository)
    return useCase({
        immatriculation: immatriculation,
        brand: 'Triumph',
        model: input.model,
        year: input.year,
        vin: vin,
        mileage: input.mileage,
        maintenanceDate: input.maintenanceDate,
    })
}