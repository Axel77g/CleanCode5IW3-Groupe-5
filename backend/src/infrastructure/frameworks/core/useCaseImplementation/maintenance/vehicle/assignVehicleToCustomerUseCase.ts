import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    assignVehicleToCustomerRequest
} from "@infrastructureCore/requests/maintenance/vehicle/assignVehicleToCustomerRequest";
import {
    AssignVehicleToCustomerUseCase, createAssignVehicleToCustomerUseCase
} from "@application/maintenance/usecases/vehicle/AssignVehicleToCustomerUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";
import {vehicleRepository} from "@infrastructureCore/repositories/maintenance/vehicleRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";

export const assignVehicleToCustomerUseCase : UseCaseImplementation<typeof assignVehicleToCustomerRequest, AssignVehicleToCustomerUseCase> = async (input) => {
    const vehicleImmatriculation = VehicleImmatriculation.create(input.vehicleImmatriculation)
    if (vehicleImmatriculation instanceof ApplicationException) return Result.Failure(vehicleImmatriculation)
    const useCase = createAssignVehicleToCustomerUseCase(maintenanceEventRepository, customerRepository, vehicleRepository);
    return useCase({
        ...input,
        vehicleImmatriculation
    })
}