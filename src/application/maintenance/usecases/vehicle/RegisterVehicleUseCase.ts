import { VehicleRepository } from "@application/maintenance/repositories/VehicleRepository";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { Vehicle } from "@domain/maintenance/entities/Vehicle";
import { VehicleModelEnum } from "@domain/maintenance/enums/VehicleModelEnum";
import { VehicleStatusEnum } from "@domain/maintenance/enums/VehicleStatusEnum";
import { VehicleImmatriculation } from "@domain/maintenance/value-object/VehicleImmatriculation";
import { VehicleVin } from "@domain/maintenance/value-object/VehicleVin";
import { ApplicationException } from "@shared/ApplicationException";
import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Result } from "@shared/Result";
import {Period} from "@domain/testDrive/value-object/Period";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";

interface RegisterVehicleInput extends IInputUseCase {
    immatriculation: VehicleImmatriculation;
    brand: "Triumph",
    model: VehicleModelEnum;
    year: number;
    vin: VehicleVin;
    mileage: number;
    maintenanceInterval: VehicleMaintenanceInterval,
    status: VehicleStatusEnum;
    warranty: Period;
}

export type RegisterVehicleUseCase = IUseCase<RegisterVehicleInput, Result>

const registeredVehicleErrors = {
    Vehicle_ALREADY_EXISTS: new ApplicationException("RegisterVehicleUseCase", "Vehicle already exists with this immatriculation"),
    Vehicle_VIN_ALREADY_EXISTS: new ApplicationException("RegisterVehicleUseCase", "Vehicle already exists with this vin"),
}

export const createRegisterVehicleUseCase = (_eventRepository: EventRepository, _vehicleRepository: VehicleRepository): RegisterVehicleUseCase => {
    return async (input: RegisterVehicleInput) => {
        const existingVehicle = await _vehicleRepository.getByImmatriculation(input.immatriculation)
        if(!existingVehicle.success) return existingVehicle
        if(!existingVehicle.empty) return Result.Failure(registeredVehicleErrors.Vehicle_ALREADY_EXISTS)

        const existingVin = await _vehicleRepository.getByVin(input.vin)
        if(!existingVin.success) return existingVin
        if(!existingVin.empty) return Result.Failure(registeredVehicleErrors.Vehicle_VIN_ALREADY_EXISTS)

        const vehicle = Vehicle.create(input)
        if(vehicle instanceof ApplicationException) return Result.Failure(vehicle)
        const storeResponse = await _eventRepository.storeEvent(vehicle.registerEvent());
        if(!storeResponse.success) return Result.Failure(registeredVehicleErrors.Vehicle_ALREADY_EXISTS)
        return Result.Success("vehicle registered")
    }
}