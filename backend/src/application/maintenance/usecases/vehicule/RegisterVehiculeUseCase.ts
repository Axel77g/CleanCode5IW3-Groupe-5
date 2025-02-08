import { VehiculeRepository } from "@application/maintenance/repositories/VehiculeRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { Vehicule } from "@domain/maintenance/entities/Vehicule";
import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { VehiculeVin } from "@domain/maintenance/value-object/VehiculeVin";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {Period} from "@domain/testDrive/value-object/Period";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";

interface RegisterVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
    brand: "Triumph",
    model: VehiculeModelEnum;
    year: number;
    vin: VehiculeVin;
    mileage: number;
    maintenanceInterval: VehiculeMaintenanceInterval,
    status: VehiculeStatusEnum;
    warranty: Period;
}

export type RegisterVehiculeUseCase = IUseCase<RegisterVehiculeInput, Result>

const registeredVehiculeErrors = {
    VEHICULE_ALREADY_EXISTS: new ApplicationException("RegisterVehiculeUseCase", "Vehicule already exists with this immatriculation"),
    VEHICULE_VIN_ALREADY_EXISTS: new ApplicationException("RegisterVehiculeUseCase", "Vehicule already exists with this vin"),
}

export const createRegisterVehiculeUseCase = (_eventRepository: EventRepository, _vehiculeRepository: VehiculeRepository): RegisterVehiculeUseCase => {
    return async (input: RegisterVehiculeInput) => {
        const existingVehicule = await _vehiculeRepository.getByImmatriculation(input.immatriculation)
        if(!existingVehicule.success) return existingVehicule
        if(!existingVehicule.empty) return Result.Failure(registeredVehiculeErrors.VEHICULE_ALREADY_EXISTS)

        const existingVin = await _vehiculeRepository.getByVin(input.vin)
        if(!existingVin.success) return existingVin
        if(!existingVin.empty) return Result.Failure(registeredVehiculeErrors.VEHICULE_VIN_ALREADY_EXISTS)

        const vehicule = Vehicule.create(input)
        if(vehicule instanceof ApplicationException) return Result.Failure(vehicule)
        const storeResponse = await _eventRepository.storeEvent(vehicule.registerEvent());
        if(!storeResponse.success) return Result.Failure(registeredVehiculeErrors.VEHICULE_ALREADY_EXISTS)
        return Result.Success("vehicule registered")
    }
}