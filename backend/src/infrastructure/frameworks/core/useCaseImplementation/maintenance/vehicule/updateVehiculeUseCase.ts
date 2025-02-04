import {
    createUpdateVehiculeUseCase,
    UpdateVehiculeUseCase
} from "@application/maintenance/usecases/vehicule/UpdateVehiculeUseCase";
import {maintenanceEventRepository} from "@infrastructureCore/repositories/maintenance/maintenanceEventRepository";
import {vehiculeRepository} from "@infrastructureCore/repositories/maintenance/vehiculeRepository";
import {Result} from "@shared/Result";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {updateVehiculeRequest} from "@infrastructureCore/requests/maintenance/vehicule/updateVehiculeRequest";

export const updateVehiculeUseCase: UseCaseImplementation<typeof updateVehiculeRequest, UpdateVehiculeUseCase> = async (input) => {
    const immatriculation = VehiculeImmatriculation.create(input.immatriculation);
    if (immatriculation instanceof ApplicationException) return Result.Failure(immatriculation);
    const useCase = createUpdateVehiculeUseCase(maintenanceEventRepository, vehiculeRepository);
    return useCase({
        immatriculation,
    });
};
