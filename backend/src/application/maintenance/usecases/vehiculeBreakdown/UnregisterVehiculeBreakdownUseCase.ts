import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";

interface UnregisterVehiculeBreakdownInput extends IInputUseCase
{
    vehiculeBreakdownId: string
}

export type UnregisterVehiculeBreakdownUseCase = IUseCase<UnregisterVehiculeBreakdownInput, Result>

const unregisterVehiculeBreakdownErrors = {
    VEHICULE_BREAKDOWN_NOT_FOUND: NotFoundEntityException.create("Cannot unregister vehicules breakdown, vehicules breakdown not found")
}

export const createUnregisterVehiculeBreakdownUseCase = (_eventRepository: EventRepository, _vehiculeBreakdownRepository : VehiculeBreakdownRepository): UnregisterVehiculeBreakdownUseCase => {
    return async (input: UnregisterVehiculeBreakdownInput) => {
        const vehiculeBreakdown = await _vehiculeBreakdownRepository.getBreakdownById(input.vehiculeBreakdownId);
        if (!vehiculeBreakdown.success) return vehiculeBreakdown;
        if (vehiculeBreakdown.empty) return Result.Failure(unregisterVehiculeBreakdownErrors.VEHICULE_BREAKDOWN_NOT_FOUND);
        const unregisterEvent = vehiculeBreakdown.value.unregisterEvent();
        const storeResponse = await _eventRepository.storeEvent(unregisterEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot unregister breakdown");
        return Result.Success("Breakdown unregistered");
    }
}