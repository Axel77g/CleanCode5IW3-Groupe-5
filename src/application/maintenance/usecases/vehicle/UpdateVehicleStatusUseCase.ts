import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehicleStatusEnum } from "@domain/maintenance/enums/VehicleStatusEnum";
import { UpdateVehicleStatusEvent } from "@domain/maintenance/events/vehicle/UpdateVehicleStatusEvent";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { VehicleRepository } from '../../repositories/VehicleRepository';
import { RegisterVehicleUseCase } from "./RegisterVehicleUseCase";

interface UpdateVehicleStatusInput extends IInputUseCase {
    immatriculation: VehicleImmatriculation,
    status: VehicleStatusEnum
}
export type UpdateVehicleStatusUseCase = IUseCase<UpdateVehicleStatusInput, Result>

const registerVehicleErrors = {
    NOT_FOUND_Vehicle: new ApplicationException('UpdateVehicleStatusUseCase.NotFoundVehicle', 'Cannot update status for not found vehicles')
}

export const createUpdateVehicleStatusUseCase = (_eventRepository: EventRepository, _vehicleRepository: VehicleRepository): RegisterVehicleUseCase => {
    return async (input: UpdateVehicleStatusInput) => {
        const vehicleResponse = await _vehicleRepository.getByImmatriculation(input.immatriculation);
        if (!vehicleResponse.success) return Result.Failure(registerVehicleErrors.NOT_FOUND_Vehicle)
        if(vehicleResponse.empty) return Result.Failure(registerVehicleErrors.NOT_FOUND_Vehicle)
        const vehicle = vehicleResponse.value.applyStatus(input.status)
        if(vehicle instanceof ApplicationException) return Result.Failure(vehicle)

        const updateVehicleStatusEvent = new UpdateVehicleStatusEvent({
            immatriculation: input.immatriculation,
            status: input.status
        })
        const repositoryResponse = await _eventRepository.storeEvent(updateVehicleStatusEvent);
        if (!repositoryResponse.success) return repositoryResponse
        return Result.Success("Vehicle status updated successfully")
    }
}