import {VehicleBreakdownRepository} from "@application/maintenance/repositories/VehicleBreakdownRepository";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {
    AssignBreakdownToMaintenanceEvent
} from "@domain/maintenance/events/breakdown/AssignBreakdownToMaintenanceEvent";
import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {MaintenanceRepository} from "@application/maintenance/repositories/MaintenanceRepository";
import {ApplicationException} from "@shared/ApplicationException";

interface AssignBreakdownToMaintenanceInput extends IInputUseCase {
    vehicleBreakdownId: string,
    maintenanceId: string
}

export type AssignVehicleToMaintenanceUseCase = IUseCase<AssignBreakdownToMaintenanceInput, Result>

export const createAssignVehicleBreakdownToMaintenanceUseCase   = (_eventRepository: EventRepository, _vehicleBreakdownRepository: VehicleBreakdownRepository, _maintenanceRepository: MaintenanceRepository): AssignVehicleToMaintenanceUseCase => {
    return async (input: AssignBreakdownToMaintenanceInput) => {
        const vehicleBreakdown = await _vehicleBreakdownRepository.getBreakdownById(input.vehicleBreakdownId)
        if (!vehicleBreakdown.success) return vehicleBreakdown
        if (vehicleBreakdown.empty) return Result.FailureStr("Vehicle breakdown not found")
        const maintenance = await _maintenanceRepository.getByMaintenanceId(input.maintenanceId)
        if (!maintenance.success) return maintenance
        if (maintenance.empty) return Result.FailureStr("Maintenance not found")
        const updatedVehicleBreakdown = vehicleBreakdown.value.assignToMaintenance(maintenance.value.maintenanceId)
        if (updatedVehicleBreakdown instanceof ApplicationException) return Result.Failure(updatedVehicleBreakdown)
        const response = await _eventRepository.storeEvent(updatedVehicleBreakdown.assignToMaintenanceEvent() as AssignBreakdownToMaintenanceEvent)
        if (!response.success) return response
        return Result.Success("Vehicle breakdown assigned to maintenance")
    }
}