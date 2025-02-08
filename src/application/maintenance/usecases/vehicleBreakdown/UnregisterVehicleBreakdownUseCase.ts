import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";

interface UnregisterVehicleBreakdownInput extends IInputUseCase
{
    vehicleBreakdownId: string
}

export type UnregisterVehicleBreakdownUseCase = IUseCase<UnregisterVehicleBreakdownInput, Result>

const unregisterVehicleBreakdownErrors = {
    Vehicle_BREAKDOWN_NOT_FOUND: NotFoundEntityException.create("Cannot unregister vehicles breakdown, vehicles breakdown not found")
}

export const createUnregisterVehicleBreakdownUseCase = (_eventRepository: EventRepository, _vehicleBreakdownRepository : VehicleBreakdownRepository): UnregisterVehicleBreakdownUseCase => {
    return async (input: UnregisterVehicleBreakdownInput) => {
        const vehicleBreakdown = await _vehicleBreakdownRepository.getBreakdownById(input.vehicleBreakdownId);
        if (!vehicleBreakdown.success) return vehicleBreakdown;
        if (vehicleBreakdown.empty) return Result.Failure(unregisterVehicleBreakdownErrors.Vehicle_BREAKDOWN_NOT_FOUND);
        const unregisterEvent = vehicleBreakdown.value.unregisterEvent();
        const storeResponse = await _eventRepository.storeEvent(unregisterEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot unregister breakdown");
        return Result.Success("Breakdown unregistered");
    }
}