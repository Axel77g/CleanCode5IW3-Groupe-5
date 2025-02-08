import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehicleRepository} from "@application/maintenance/repositories/VehicleRepository";
import {VehicleBreakdown} from "@domain/maintenance/entities/VehicleBreakdown";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

interface RegisterVehicleBreakdownInput extends IInputUseCase {
    vehicleImmatriculation: VehicleImmatriculation;
    description: string;
    date: Date;
    maintenanceId?: string,
}

export type RegisterVehicleBreakdownUseCase = IUseCase<RegisterVehicleBreakdownInput, Result>

export const createRegisterVehicleBreakdownUseCase = (_eventRepository: EventRepository, _vehicleRepository : VehicleRepository): RegisterVehicleBreakdownUseCase => {
    return async (input: RegisterVehicleBreakdownInput) => {
        const vehicleImmatriculation = await _vehicleRepository.getByImmatriculation(input.vehicleImmatriculation);
        if (!vehicleImmatriculation.success) return Result.FailureStr("Cannot find vehicles with this immatriculation")
        if (vehicleImmatriculation.empty) return Result.FailureStr("Vehicle not found")
        const vehicleBreakdown = VehicleBreakdown.create({
            vehicleImmatriculation: input.vehicleImmatriculation,
            description: input.description,
            date: input.date,
            maintenanceId: input.maintenanceId,
        })
        const storeResponse = await _eventRepository.storeEvent(vehicleBreakdown.registerEvent());
        if (!storeResponse.success) return Result.FailureStr("Cannot register vehicles breakdown")
        return Result.Success("Vehicle breakdown registered")
    }
}