import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Maintenance } from "@domain/maintenance/entities/Maintenance";
import { MaintenanceSparePart } from "@domain/maintenance/value-object/MaintenanceSparePart";
import { Result } from "@shared/Result";
import { Siret } from "@domain/shared/value-object/Siret";
import {ApplicationException, NotFoundEntityException} from "@shared/ApplicationException";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {VehiculeRepository} from "@application/maintenance/repositories/VehiculeRepository";
import {
    CheckSparesPartsReferencesExistUseCase
} from "@application/inventoryManagement/usecases/inventorySparePart/CheckSparesPartsReferencesExistUseCase";

interface RegisterMaintenanceInput extends IInputUseCase {
    vehiculeImmatriculation: VehiculeImmatriculation,
    garageSiret: Siret,
    status: MaintenanceStatusEnum,
    maintenanceSpareParts: MaintenanceSparePart[],
    recommendation: string,
    date: Date
}

export type RegisterMaintenanceUseCase = IUseCase<RegisterMaintenanceInput, Result>;

const registerMaintenanceErrors = {
    NOT_FOUND_GARAGE: NotFoundEntityException.create("Cannot create maintenances record for not found garages"),
    CANNOT_CREATE_MAINTENANCE_WITH_NOT_FOUND_REFERENCE:  NotFoundEntityException.create("Cannot create maintenances with not found reference"),
    NOT_FOUND_VEHICULE:  NotFoundEntityException.create("Cannot create maintenances record for not found vehicules")
};

export const createRegisterMaintenanceUseCase = (_eventRepository: EventRepository, _garageRepository: GarageRepository, _checkSparesPartsReferencesExitUseCase : CheckSparesPartsReferencesExistUseCase, _vehiculeRepository : VehiculeRepository): RegisterMaintenanceUseCase => {
    return async (input: RegisterMaintenanceInput) => {
        const garage = await _garageRepository.getBySiret(input.garageSiret);
        if (!garage.success) return garage;
        if (garage.empty) return Result.Failure(registerMaintenanceErrors.NOT_FOUND_GARAGE);

        const vehicule = await _vehiculeRepository.getByImmatriculation(input.vehiculeImmatriculation);
        if (!vehicule.success) return vehicule;
        if (vehicule.empty) return Result.Failure(registerMaintenanceErrors.NOT_FOUND_VEHICULE);

        const sparesPartsExistsResponse = await _checkSparesPartsReferencesExitUseCase({
            spareParts: input.maintenanceSpareParts
        });
        if(!sparesPartsExistsResponse.success) return sparesPartsExistsResponse;
        if(!sparesPartsExistsResponse.value) return Result.Failure(registerMaintenanceErrors.CANNOT_CREATE_MAINTENANCE_WITH_NOT_FOUND_REFERENCE);


        const maintenance = Maintenance.create({
            vehiculeImmatriculation: input.vehiculeImmatriculation,
            garageSiret: input.garageSiret,
            status: input.status,
            maintenanceSpareParts: input.maintenanceSpareParts,
            recommendation: input.recommendation,
            date: input.date
        });

        if (maintenance instanceof ApplicationException) return Result.Failure(maintenance);

        const repositoryResponse = await _eventRepository.storeEvent(maintenance.registerEvent());
        if (!repositoryResponse.success) return repositoryResponse;

        return Result.Success("Maintenance registered successfully");
    }
}