import { IInputUseCase, IUseCase } from "@shared/IUseCase";
import { Maintenance } from "@domain/maintenance/entities/Maintenance";
import { MaintenanceSparePart } from "@domain/maintenance/value-object/MaintenanceSparePart";
import { Result } from "@shared/Result";
import { Siret } from "@domain/shared/value-object/Siret";
import { ApplicationException } from "@shared/ApplicationException";
import { EventRepository } from "@application/shared/repositories/EventRepository";
import { GarageRepository } from "@application/maintenance/repositories/GarageRepository";
import { MaintenanceStatusEnum } from "@domain/maintenance/enums/MaintenanceStatusEnum";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";
import {InventorySparePartRepository} from "@application/inventoryManagement/repositories/InventorySparePartRepository";

interface RegisterMaintenanceInput extends IInputUseCase {
    maintenanceId: string,
    vehiculeImmatriculation: VehiculeImmatriculation,
    garageSiret: Siret,
    status: MaintenanceStatusEnum,
    maintenanceSpareParts: MaintenanceSparePart[],
    recommendation: string,
    date: Date
}

export type RegisterMaintenanceUseCase = IUseCase<RegisterMaintenanceInput, Result>;

const registerMaintenanceErrors = {
    NOT_FOUND_GARAGE: new ApplicationException("RegisterMaintenanceUseCase.NotFoundGarage", "Cannot create maintenance record for not found garage"),
    CANNOT_CREATE_MAINTENANCE_WITH_NOT_FOUND_REFERENCE: new ApplicationException("RegisterMaintenanceUseCase.CannotCreateMaintenanceWithNotFoundReference", "Cannot create maintenance with not found reference"),
};

export const createRegisterMaintenanceUseCase = (_eventRepository: EventRepository, _garageRepository: GarageRepository, _inventorySparePartRepository : InventorySparePartRepository): RegisterMaintenanceUseCase => {
    return async (input: RegisterMaintenanceInput) => {
        const garage = await _garageRepository.getBySiret(input.garageSiret);
        if (!garage.success) return garage;
        if (garage.empty) return Result.Failure(registerMaintenanceErrors.NOT_FOUND_GARAGE);

        const sparePartReferences = input.maintenanceSpareParts.map(part => part.sparePartReference);
        const sparePartsResponse = await _inventorySparePartRepository.findAll(sparePartReferences);
        if (!sparePartsResponse.success) return sparePartsResponse;
        const missingReferences = sparePartReferences.filter(ref => !sparePartsResponse.value.some(sp => sp.reference === ref));
        if (missingReferences.length > 0) return Result.Failure(registerMaintenanceErrors.CANNOT_CREATE_MAINTENANCE_WITH_NOT_FOUND_REFERENCE);

        const maintenance = Maintenance.create({
            maintenanceId: input.maintenanceId,
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