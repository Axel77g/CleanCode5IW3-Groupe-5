import {Vehicule, VehiculeDTO} from "@domain/maintenance/entities/Vehicule";
import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";
import {Period} from "@domain/testDrive/value-object/Period";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {VehiculeVin} from "@domain/maintenance/value-object/VehiculeVin";
import {VehiculeImmatriculation} from "@domain/maintenance/value-object/VehiculeImmatriculation";

export class VehiculeMapper {
    static toDomain(vehiculeRaw: any): Vehicule | ApplicationException {
        const immatriculation = VehiculeImmatriculation.create(vehiculeRaw.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;

        const vin = VehiculeVin.create(vehiculeRaw.vin);
        if (vin instanceof ApplicationException) return vin;

        const maintenanceIntervalRaw = vehiculeRaw.maintenanceInterval || {};
        const lastMaintenance = maintenanceIntervalRaw.lastMaintenance || {date: null, mileage: 0};

        const maintenanceInterval = VehiculeMaintenanceInterval.create(
            maintenanceIntervalRaw.duration,
            maintenanceIntervalRaw.mileage,
            lastMaintenance
        );
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;

        const warrantyRaw = vehiculeRaw.warranty || {periodStart: null, periodEnd: null};
        const warranty = Period.create(warrantyRaw.periodStart, warrantyRaw.periodEnd);
        if (warranty instanceof ApplicationException) return warranty;

        return Vehicule.create(
            {
                immatriculation,
                brand: vehiculeRaw.brand,
                model: vehiculeRaw.model,
                year : vehiculeRaw.year,
                vin,
                mileage : vehiculeRaw.mileage,
                maintenanceInterval,
                status : vehiculeRaw.status,
                warranty,
            }
        );
    }

    static toPersistence(vehicule: Vehicule): MappedEntity<VehiculeDTO> {
        return new MappedEntity<VehiculeDTO>({
            immatriculation: vehicule.immatriculation.getValue(),
            brand: vehicule.brand,
            model: vehicule.model,
            year: vehicule.year,
            vin: vehicule.vin.getValue(),
            mileage: vehicule.mileage,
            maintenanceInterval: {
                mileage: vehicule.maintenanceInterval.mileage,
                duration: vehicule.maintenanceInterval.duration,
                lastMaintenance: {
                    date: vehicule.maintenanceInterval?.lastMaintenance?.date,
                    mileage: vehicule.maintenanceInterval?.lastMaintenance?.mileage,
                },
            },
            status: vehicule.status,
            warranty: {
                periodStart: vehicule.warranty.startDate,
                periodEnd: vehicule.warranty.endDate,
            }
        });
    }

    static toPersistenceList(vehicules: Vehicule[]): MappedEntity<VehiculeDTO>[] {
        return vehicules.map(VehiculeMapper.toPersistence);
    }

    static toDomainList(vehiculesRaw: any[]): Vehicule[] {
        return vehiculesRaw.map(vehicule => {
            return this.toDomain(vehicule);
        }).filter(vehicule => !(vehicule instanceof ApplicationException)) as Vehicule[];
    }
}