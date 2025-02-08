import {Vehicle, VehicleDTO} from "@domain/maintenance/entities/Vehicle";
import {MappedEntity} from "@infrastructure/common/entityMappers/MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";
import {Period} from "@domain/testDrive/value-object/Period";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
import {VehicleVin} from "@domain/maintenance/value-object/VehicleVin";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

export class VehicleMapper {
    static toDomain(vehicleRaw: any): Vehicle | ApplicationException {
        const immatriculation = VehicleImmatriculation.create(vehicleRaw.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;

        const vin = VehicleVin.create(vehicleRaw.vin);
        if (vin instanceof ApplicationException) return vin;

        const maintenanceIntervalRaw = vehicleRaw.maintenanceInterval || {};
        const lastMaintenance = maintenanceIntervalRaw.lastMaintenance || {date: null, mileage: 0};

        const maintenanceInterval = VehicleMaintenanceInterval.create(
            maintenanceIntervalRaw.duration,
            maintenanceIntervalRaw.mileage,
            lastMaintenance
        );
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;

        const warrantyRaw = vehicleRaw.warranty || {periodStart: null, periodEnd: null};
        const warranty = Period.create(warrantyRaw.periodStart, warrantyRaw.periodEnd);
        if (warranty instanceof ApplicationException) return warranty;

        return Vehicle.create(
            {
                immatriculation,
                brand: vehicleRaw.brand,
                model: vehicleRaw.model,
                year : vehicleRaw.year,
                vin,
                mileage : vehicleRaw.mileage,
                maintenanceInterval,
                status : vehicleRaw.status,
                warranty,
            }
        );
    }

    static toPersistence(vehicle: Vehicle): MappedEntity<VehicleDTO> {
        return new MappedEntity<VehicleDTO>({
            immatriculation: vehicle.immatriculation.getValue(),
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            vin: vehicle.vin.getValue(),
            mileage: vehicle.mileage,
            maintenanceInterval: {
                mileage: vehicle.maintenanceInterval.mileage,
                duration: vehicle.maintenanceInterval.duration,
                lastMaintenance: {
                    date: vehicle.maintenanceInterval?.lastMaintenance?.date,
                    mileage: vehicle.maintenanceInterval?.lastMaintenance?.mileage,
                },
            },
            status: vehicle.status,
            warranty: {
                periodStart: vehicle.warranty.startDate,
                periodEnd: vehicle.warranty.endDate,
            }
        });
    }

    static toPersistenceList(vehicles: Vehicle[]): MappedEntity<VehicleDTO>[] {
        return vehicles.map(VehicleMapper.toPersistence);
    }

    static toDomainList(vehiclesRaw: any[]): Vehicle[] {
        return vehiclesRaw.map(vehicle => {
            return this.toDomain(vehicle);
        }).filter(vehicle => !(vehicle instanceof ApplicationException)) as Vehicle[];
    }
}