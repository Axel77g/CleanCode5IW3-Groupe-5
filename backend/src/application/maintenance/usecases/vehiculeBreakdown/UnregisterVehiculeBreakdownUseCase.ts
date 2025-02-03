import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {UnregisterDealerUseCase} from "@application/inventoryManagement/usecases/dealer/UnregisterDealerUseCase";
import {UnregisterVehiculeBreakdownEvent} from "@domain/maintenance/events/breakdown/UnregisterVehiculeBreakdownEvent";

interface UnregisterVehiculeBreakdownInput extends IInputUseCase
{
    vehiculeBreakdownId: string
}

export type UnregisterVehiculeBreakdownUseCase = IUseCase<UnregisterVehiculeBreakdownInput, Result>

const unregisterVehiculeBreakdownErrors = {
    VEHICULE_BREAKDOWN_NOT_FOUND: NotFoundEntityException.create("Cannot unregister vehicule breakdown, vehicule breakdown not found")
}

export const createUnregisterVehiculeBreakdownUseCase = (_eventRepository: EventRepository, _vehiculeBreakdownRepository : VehiculeBreakdownRepository): UnregisterVehiculeBreakdownUseCase => {
    return async (input: UnregisterVehiculeBreakdownInput) => {
        const vehiculeBreakdown = await _vehiculeBreakdownRepository.findById(input.vehiculeBreakdownId);
        if(!vehiculeBreakdown.success) return vehiculeBreakdown
        if(vehiculeBreakdown.empty) return Result.Failure(unregisterVehiculeBreakdownErrors.VEHICULE_BREAKDOWN_NOT_FOUND)
        const deleteResponse = await _eventRepository.storeEvent(vehiculeBreakdown.value.unregisterEvent())
        if (!deleteResponse.success) return Result.FailureStr("Cannot unregister vehicule breakdown")
        return Result.Success("Vehicule breakdown unregistered")
    }
}