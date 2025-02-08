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
    // return async (input: AssignBreakdownToMaintenanceInput) => {
    //     const vehiculeBreakdown = await _vehiculeBreakdownRepository.getVehiculeBreakdownById(input.vehiculeBreakdownId)
    //     if (!vehiculeBreakdown) return Result.Failure("Breakdown not found")
    //     const maintenance = await _maintenanceRepository.getMaintenanceById(input.maintenanceId)
    //     if (!maintenance) return Result.fail("Maintenance not found")
    //     const event = new AssignBreakdownToMaintenanceEvent({vehiculeBreakdown, maintenance})
    //     await _eventRepository.save(event)
    //     return Result.ok()
    // }
}