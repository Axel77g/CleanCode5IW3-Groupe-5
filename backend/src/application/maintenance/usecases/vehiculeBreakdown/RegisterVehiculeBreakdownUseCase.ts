import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {VehiculeBreakdown} from "@domain/maintenance/entities/VehiculeBreakdown";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

interface RegisterVehiculeBreakdownInput extends IInputUseCase {
    vehiculeImmatriculation: VehiculeImmatriculation;
    description: string;
    date: Date;
    maintenanceId?: string,
}

export type RegisterVehiculeBreakdownUseCase = IUseCase<RegisterVehiculeBreakdownInput, Result>

export const createRegisterVehiculeBreakdownUseCase = (_eventRepository: EventRepository, _vehiculeRepository : VehiculeRepository): RegisterVehiculeBreakdownUseCase => {
    return async (input: RegisterVehiculeBreakdownInput) => {
        const vehiculeImmatriculation = await _vehiculeRepository.getByImmatriculation(input.vehiculeImmatriculation);
        if (!vehiculeImmatriculation.success) return Result.FailureStr("Cannot find vehicules with this immatriculation")
        if (vehiculeImmatriculation.empty) return Result.FailureStr("Vehicule not found")
        const vehiculeBreakdown = VehiculeBreakdown.create({
            vehiculeImmatriculation: input.vehiculeImmatriculation,
            description: input.description,
            date: input.date,
            maintenanceId: input.maintenanceId,
        })
        const storeResponse = await _eventRepository.storeEvent(vehiculeBreakdown.registerEvent());
        if (!storeResponse.success) return Result.FailureStr("Cannot register vehicules breakdown")
        return Result.Success("Vehicule breakdown registered")
    }
}