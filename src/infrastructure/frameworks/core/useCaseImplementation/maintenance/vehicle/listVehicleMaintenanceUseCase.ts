import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    paginatedWithImmatriculationRequest
} from "@infrastructureCore/requests/maintenance/vehicle/paginatedWithImmatriculationRequest";
import {
    createListVehicleMaintenanceUseCase,
    ListVehicleMaintenanceUseCase,
} from "@application/maintenance/usecases/vehicle/ListVehicleMaintenanceUseCase";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {maintenanceRepository} from "@infrastructureCore/repositories/maintenance/maintenanceRepository";

export const listVehicleMaintenanceUseCase : UseCaseImplementation<typeof paginatedWithImmatriculationRequest, ListVehicleMaintenanceUseCase> = async (input) => {
    const listVehicleMaintenanceUseCase = createListVehicleMaintenanceUseCase(vehicleRepository, maintenanceRepository)
    const vehicleImmatriculation = VehicleImmatriculation.create(input.immatriculation)
    if(vehicleImmatriculation instanceof ApplicationException) return Result.Failure(vehicleImmatriculation)
    return listVehicleMaintenanceUseCase({...input, vehicleImmatriculation})
}