import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";

interface AssignBreakdownToMaintenanceInput extends IInputUseCase {
    vehiculeBreakdownId: string,
    maintenanceId: string
}

export type AssignVehiculeToMaintenanceUseCase = IUseCase<AssignBreakdownToMaintenanceInput, Result>

export const createAssignVehiculeBreakdownToMaintenanceUseCase   = (_eventRepository: EventRepository, _vehiculeBreakdownRepository: VehiculeBreakdownRepository, _maintenanceRepository: MaintenanceRepository): AssignVehiculeToMaintenanceUseCase => {
    return async (input: AssignBreakdownToMaintenanceInput) => {
        const vehiculeBreakdownResponse = await _vehiculeBreakdownRepository.getBreakdownByVehicule(input.vehiculeBreakdownId);
        if (!vehiculeBreakdownResponse.success) return vehiculeBreakdownResponse
        if (vehiculeBreakdownResponse.empty) return Result.FailureStr("Vehicule breakdown not found")

        const maintenanceResponse = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId);
        if (!maintenanceResponse.success) return maintenanceResponse
        if (maintenanceResponse.empty) return Result.FailureStr("Maintenance not found")

        const assignBreakdownToMaintenanceEvent = new AssignBreakdownToMaintenanceEvent({
            vehiculeBreakDownId: input.vehiculeBreakdownId,
            maintenanceId: input.maintenanceId
        })

        if (assignBreakdownToMaintenanceEvent instanceof Error) return Result.FailureStr(assignBreakdownToMaintenanceEvent.message)
        const storeResponse = await _eventRepository.storeEvent(assignBreakdownToMaintenanceEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot assign breakdown to maintenances")
        return Result.Success("Breakdown assigned to maintenances")
    }
}