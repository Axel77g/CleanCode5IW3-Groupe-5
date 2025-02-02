import { Vehicule, VehiculeDTO } from "@domain/maintenance/entities/Vehicule";
import { VehiculeImmatriculation } from "@domain/maintenance/value-object/VehiculeImmatriculation";
import { VehiculeVin } from "@domain/maintenance/value-object/VehiculeVin";
import { MappedEntity } from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class VehiculeMapper {
    static toDomain(vehiculeRaw: any): Vehicule | ApplicationException {
        const immatriculation = VehiculeImmatriculation.create(vehiculeRaw.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;
        const vin = VehiculeVin.create(vehiculeRaw.vin);
        if (vin instanceof ApplicationException) return vin;
        const maintenanceDate = new Date(vehiculeRaw.maintenanceDate);
        return new Vehicule({
            immatriculation,
            brand: vehiculeRaw.brand,
            model: vehiculeRaw.model,
            year: vehiculeRaw.year,
            vin,
            mileage: vehiculeRaw.mileage,
            maintenanceDate: vehiculeRaw.maintenanceDate,
            status: vehiculeRaw.status
            }
    }

    static toPersistence(vehicule: Vehicule): MappedEntity<VehiculeDTO> {
        return new MappedEntity<VehiculeDTO>({
            immatriculation: vehicule.immatriculation.getValue(),
            brand: vehicule.brand,
            model: vehicule.model,
            year: vehicule.year,
            vin: vehicule.vin,
            mileage: vehicule.mileage,
            maintenanceDate: vehicule.maintenanceDate,
            status: vehicule.status
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