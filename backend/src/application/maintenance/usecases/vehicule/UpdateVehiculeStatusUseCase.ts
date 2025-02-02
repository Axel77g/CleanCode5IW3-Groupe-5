import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { UpdateVehiculeStatusEvent } from "@domain/maintenance/events/vehicule/UpdateVehiculeStatusEvent";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import { VehiculeRepository } from '../../repositories/VehiculeRepository';
import { RegisterVehiculeUseCase } from "./RegisterVehiculeUseCase";

interface UpdateVehiculeStatusInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation,
    status: VehiculeStatusEnum
}
export type UpdateVehiculeStatusUseCase = IUseCase<UpdateVehiculeStatusInput, Result>

const registerVehiculeErrors = {
    NOT_FOUND_VEHICULE: new ApplicationException('UpdateVehiculeStatusUseCase.NotFoundVehicule', 'Cannot update status for not found vehicule')
}

export const createUpdateVehiculeStatusUseCase = (_eventRepositoru: EventRepository, _vehiculeRepository: VehiculeRepository): RegisterVehiculeUseCase => {
    return async (input: UpdateVehiculeStatusInput) => {
        const vehiculeResponse = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!vehiculeResponse.success) return Result.Failure(registerVehiculeErrors.NOT_FOUND_VEHICULE)
        if(vehiculeResponse.empty) return Result.Failure(registerVehiculeErrors.NOT_FOUND_VEHICULE)
        const vehicule = vehiculeResponse.value.applyStatus(input.status)
        if(vehicule instanceof ApplicationException) return Result.Failure(vehicule)

        const updateVehiculeStatusEvent = new UpdateVehiculeStatusEvent({
            immatriculation: input.immatriculation,
            status: input.status
        })
        const repositoryResponse = await _eventRepositoru.storeEvent(updateVehiculeStatusEvent);
        if (!repositoryResponse.success) return repositoryResponse
        return Result.Success("Vehicule status updated successfully")
    }
}