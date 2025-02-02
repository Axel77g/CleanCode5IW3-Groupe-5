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

interface RegisterVehiculeInput extends IInputUseCase {
    immatriculation: VehiculeImmatriculation;
    brand: 'Triumph',
    model: VehiculeModelEnum;
    year: number;
    vin: VehiculeVin;
    mileage: number;
    maintenanceDate: Date;
    status: VehiculeStatusEnum;
}

export type RegisterVehiculeUseCase = IUseCase<RegisterVehiculeInput, Result>

const registeredVehiculeErrors = {
    VEHICULE_ALREADY_EXISTS: new ApplicationException("RegisterVehiculeUseCase", "Vehicule already exists with this immatriculation")
}

export const createRegisterVehiculeUseCase = (_eventRepository: EventRepository, _vehiculeRepository: VehiculeRepository): RegisterVehiculeUseCase => {
    return async (input: RegisterVehiculeInput) => {
        const vehiculeImmatriculation = await _vehiculeRepository.getByImmatriculation(input.immatriculation);
        if (!vehiculeImmatriculation.success) return vehiculeImmatriculation
        if (vehiculeImmatriculation.empty) return Result.Failure(registeredVehiculeErrors.VEHICULE_ALREADY_EXISTS)

        const vehicule = Vehicule.create({
            immatriculation: input.immatriculation,
            brand: input.brand,
            model: input.model,
            year: input.year,
            vin: input.vin,
            mileage: input.mileage,
            maintenanceDate: input.maintenanceDate,
            status: input.status
        })

        if (vehicule instanceof ApplicationException) return Result.Failure(vehicule)
        const repositoryResponse = await _eventRepository.storeEvent(vehicule.vehicule.registerEvent());
        if (!repositoryResponse.success) return repositoryResponse
        return Result.Success("Vehicule registered successfully")
    }
}