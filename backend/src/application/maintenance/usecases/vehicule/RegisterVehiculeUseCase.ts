import { EventRepository } from "@application/shared/repositories/EventRepository";
import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { RegisterVehiculeEvent } from "@domain/maintenance/events/vehicule/RegisterVehiculeEvent";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { VehiculeVinDTO } from "@domain/maintenance/value-object/VehiculeVin";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";

interface RegisterVehicleInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
    brand: 'Triumph';
    model: VehiculeModelEnum;
    year: number;
    vin: VehiculeVinDTO;
    mileage: number;
    maintenanceDate: Date;
    status: VehiculeStatusEnum;
}

export type RegisterVehiculeUseCase = IUseCase<RegisterVehicleInput, Result>
export const createRegisterVehiculeUseCase = (_eventRepository: EventRepository): RegisterVehiculeUseCase => {
    return async (input: RegisterVehicleInput) => {
        const registerVehiculeEvent = new RegisterVehiculeEvent({
            immatriculation: input.immatriculation,
            brand: input.brand,
            model: input.model,
            year: input.year,
            vin: input.vin,
            mileage: input.mileage,
            maintenanceDate: input.maintenanceDate,
            status: input.status
        })
        const storeResponse = await _eventRepository.storeEvent(registerVehiculeEvent);
        if (!storeResponse.success) return Result.FailureStr("Cannot register vehicule")
        return Result.Success('Vehicule registered')
    }
}