import {VehiculeBreakdownRepository} from "@application/maintenance/repositories/VehiculeBreakdownRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {ApplicationException} from "@shared/ApplicationException";

interface AssignBreakdownToMaintenanceInput extends IInputUseCase {
    vehiculeBreakdownId: string,
    maintenanceId: string
}

export type AssignVehiculeToMaintenanceUseCase = IUseCase<AssignBreakdownToMaintenanceInput, Result>

export const createAssignVehiculeBreakdownToMaintenanceUseCase   = (_eventRepository: EventRepository, _vehiculeBreakdownRepository: VehiculeBreakdownRepository, _maintenanceRepository: MaintenanceRepository): AssignVehiculeToMaintenanceUseCase => {
    return async (input: AssignBreakdownToMaintenanceInput) => {
        const vehiculeBreakdown = await _vehiculeBreakdownRepository.getBreakdownById(input.vehiculeBreakdownId)
        if (!vehiculeBreakdown.success) return vehiculeBreakdown
        if (vehiculeBreakdown.empty) return Result.FailureStr("Vehicule breakdown not found")
        const maintenance = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId)
        if (!maintenance.success) return maintenance
        if (maintenance.empty) return Result.FailureStr("Maintenance not found")
        const updatedVehiculeBreakdown = vehiculeBreakdown.value.assignToMaintenance(maintenance.value.maintenanceId)
        if (updatedVehiculeBreakdown instanceof ApplicationException) return Result.Failure(updatedVehiculeBreakdown)
        const response = await _eventRepository.storeEvent(updatedVehiculeBreakdown.assignToMaintenanceEvent() as AssignBreakdownToMaintenanceEvent)
        if (!response.success) return response
        return Result.Success("Vehicule breakdown assigned to maintenance")
    }
}