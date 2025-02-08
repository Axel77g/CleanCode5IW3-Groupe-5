import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";

interface UpdateVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
    mileage?: number;
    status?: VehiculeStatusEnum;
    maintenanceInterval?: VehiculeMaintenanceInterval
}

export type UpdateVehiculeUseCase = IUseCase<UpdateVehiculeInput, Result>;

const updateVehiculeErrors = {
    NOT_FOUND_VEHICULE: NotFoundEntityException.create("Cannot update vehicule for not found vehicule")
};

export const createUpdateVehiculeUseCase = (_eventRepository: any, _vehiculeRepository: VehiculeRepository): UpdateVehiculeUseCase => {
    return async (input: UpdateVehiculeInput) => {
        const existingVehicule = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!existingVehicule.success) return existingVehicule;
        if (existingVehicule.empty) return Result.Failure(updateVehiculeErrors.NOT_FOUND_VEHICULE);
        const vehicule = existingVehicule.value.update(input);
        if (vehicule instanceof ApplicationException) return Result.Failure(vehicule);
        const response = await _eventRepository.storeEvent(vehicule.updateEvent());
        if (!response.success) return response
        return Result.Success("Vehicule updated");
    };
};
