import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {
    assignVehiculeToCustomerRequest
} from "@infrastructureCore/requests/maintenance/vehicule/assignVehiculeToCustomerRequest";
import {
    AssignVehiculeToCustomerUseCase, createAssignVehiculeToCustomerUseCase
} from "@application/maintenance/usecases/vehicule/AssignVehiculeToCustomerUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {customerRepository} from "@infrastructureCore/repositories/maintenance/customerRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {ApplicationException} from "@shared/ApplicationException";
import {Result} from "@shared/Result";

export const assignVehiculeToCustomerUseCase : UseCaseImplementation<typeof assignVehiculeToCustomerRequest, AssignVehiculeToCustomerUseCase> = async (input) => {
    const vehiculeImmatriculation = VehiculeImmatriculation.create(input.vehiculeImmatriculation)
    if (vehiculeImmatriculation instanceof ApplicationException) return Result.Failure(vehiculeImmatriculation)
    const useCase = createAssignVehiculeToCustomerUseCase(maintenanceEventRepository, customerRepository, vehiculeRepository);
    return useCase({
        ...input,
        vehiculeImmatriculation
    })
}