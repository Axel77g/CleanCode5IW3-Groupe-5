import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";
import {VehicleStatusEnum} from "@domain/maintenance/enums/VehicleStatusEnum";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
import {EventRepository} from "@application/shared/repositories/EventRepository";

interface UpdateVehicleInput extends IInputUseCase {
    immatriculation: VehicleImmatriculation;
    mileage?: number;
    status?: VehicleStatusEnum;
    maintenanceInterval?: VehicleMaintenanceInterval
}

export type UpdateVehicleUseCase = IUseCase<UpdateVehicleInput, Result>;

const updateVehicleErrors = {
    NOT_FOUND_Vehicle: NotFoundEntityException.create("Cannot update vehicle for not found vehicle")
};

export const createUpdateVehicleUseCase = (_eventRepository: EventRepository, _vehicleRepository: VehicleRepository): UpdateVehicleUseCase => {
    return async (input: UpdateVehicleInput) => {
        const existingVehicle = await _vehicleRepository.getByImmatriculation(input.immatriculation);
        if (!existingVehicle.success) return existingVehicle;
        if (existingVehicle.empty) return Result.Failure(updateVehicleErrors.NOT_FOUND_Vehicle);
        const vehicle = existingVehicle.value.update(input);
        if (vehicle instanceof ApplicationException) return Result.Failure(vehicle);
        const response = await _eventRepository.storeEvent(vehicle.updateEvent());
        if (!response.success) return response
        return Result.Success("Vehicle updated");
    };
};
