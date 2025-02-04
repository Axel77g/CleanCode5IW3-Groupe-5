import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { NotFoundEntityException } from "@shared/ApplicationException";
import { VehiculeRepository } from "@application/maintenance/repositories/VehiculeRepository";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";
import {Period} from "@domain/testDrive/value-object/Period";

interface UpdateVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
    maintenanceInterval?: VehiculeMaintenanceInterval,
    status?: VehiculeStatusEnum,
    warranty?: Period,
}

export type UpdateVehiculeUseCase = IUseCase<UpdateVehiculeInput, Result>;

const updateVehiculeErrors = {
    NOT_FOUND_VEHICULE: NotFoundEntityException.create("Cannot update vehicule for not found vehicule")
};

export const createUpdateVehiculeUseCase = (_eventRepository: any, _vehiculeRepository: VehiculeRepository): UpdateVehiculeUseCase => {
    return async (input: UpdateVehiculeInput) => {
        const existingVehicule = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        console.log("Existing vehicule", existingVehicule);
        if (!existingVehicule.success) return existingVehicule;
        if(existingVehicule.empty) return Result.Failure(updateVehiculeErrors.NOT_FOUND_VEHICULE);
        const vehicule = existingVehicule.value.update({
            maintenanceInterval: input.maintenanceInterval,
            status: input.status,
            warranty: input.warranty
        })
        const response = await _eventRepository.storeEvent(vehicule.updateEvent());
        if (!response.success) return Result.Failure(response.error);

        return Result.Success("Vehicule updated");
    };
};
