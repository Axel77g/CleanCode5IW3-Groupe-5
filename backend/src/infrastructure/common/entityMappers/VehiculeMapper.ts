import { Vehicule, VehiculeDTO } from "@domain/maintenance/entities/Vehicule";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { VehiculeVin } from "@domain/maintenance/value-object/VehiculeVin";
import { MappedEntity } from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {Period} from "@domain/testDrive/value-object/Period";

export class VehiculeMapper {
    static toDomain(vehiculeRaw: any): Vehicule | ApplicationException {
        const immatriculation = VehiculeImmatriculation.create(vehiculeRaw.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;
        const vin = VehiculeVin.create(vehiculeRaw.vin);
        if (vin instanceof ApplicationException) return vin;
        const maintenanceInterval = VehiculeMaintenanceInterval.create(vehiculeRaw.maintenanceInterval.duration, vehiculeRaw.maintenanceInterval.mileage, vehiculeRaw.maintenanceInterval.lastMaintenance);
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;
        const warranty = Period.create(vehiculeRaw.warranty.periodStart, vehiculeRaw.warranty.periodEnd);
        if (warranty instanceof ApplicationException) return warranty;
        return new Vehicule(
            immatriculation,
            vehiculeRaw.brand,
            vehiculeRaw.model,
            vehiculeRaw.year,
            vin,
            vehiculeRaw.mileage,
            maintenanceInterval,
            vehiculeRaw.status,
            warranty,
        )
    }

    static toPersistence(vehicule: Vehicule): MappedEntity<VehiculeDTO> {
        return new MappedEntity<VehiculeDTO>({
            immatriculation: vehicule.immatriculation.getValue(),
            brand: vehicule.brand,
            model: vehicule.model,
            year: vehicule.year,
            vin: vehicule.vin,
            mileage: vehicule.mileage,
            maintenanceInterval: {
                duration: vehicule.maintenanceInterval.duration,
                mileage: vehicule.maintenanceInterval.mileage,
                lastMaintenanceDate: vehicule.maintenanceInterval.lastMaintenance.date,
                lastMaintenanceMileage: vehicule.maintenanceInterval.lastMaintenance.mileage
            },
            status: vehicule.status,
            warranty: {
                periodStart: vehicule.warranty.startDate,
                periodEnd: vehicule.warranty.endDate
            }
        });
    }

    static toDomainList(vehiculesRaw: any[]): Vehicule[] {
        return vehiculesRaw.map(vehicule => {
            return VehiculeMapper.toDomain(vehicule);
        }).filter(vehicule => !(vehicule instanceof Error)) as Vehicule[];
    }

    static toPersistenceList(vehicules: Vehicule[]): MappedEntity<VehiculeDTO>[] {
        return vehicules.map(vehicule => {
            return VehiculeMapper.toPersistence(vehicule);
        });
    }
}