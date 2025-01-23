import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { ApplicationException } from "@shared/ApplicationException";
import { VehiculeImmatriculation } from "../value-object/VehiculeImmatriculation";
import { VehiculeVin, VehiculeVinDTO } from "../value-object/VehiculeVin";

export interface VehiculeDTO {
    immatriculation: string;
    brand: 'Triumph';
    model: VehiculeModelEnum;
    year: number;
    vin: VehiculeVinDTO;
    mileage: number;
    maintenanceDate: Date;
    status: VehiculeStatusEnum;
}

export class Vehicule {
    static errors = {
        INVALID_BRAND: new ApplicationException('Vehicule', 'Brand is not valid, must be Triumph'),
        INVALID_YEAR: new ApplicationException('Vehicule', 'Year is not valid, must be between 1902 and current year'),
        INVALID_VIN: new ApplicationException('Vehicule', 'VIN is not valid'),
        INVALID_MILEAGE: new ApplicationException('Vehicule', 'Mileage is not valid, must be greater than 0'),
        INVALID_MODEL: new ApplicationException('Vehicule', 'Model is not valid'),
        INVALID_STATUS: new ApplicationException('Vehicule', 'Status is not valid'),
    }

    available(): Vehicule | Error {
        if (this.status === VehiculeStatusEnum.AVAILABLE) {
            return new ApplicationException('Vehicule', 'Vehicule is already available');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, VehiculeStatusEnum.AVAILABLE);
    }

    sold(): Vehicule | Error {
        if (this.status === VehiculeStatusEnum.SOLD) {
            return new ApplicationException('Vehicule', 'Vehicule is already sold');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, VehiculeStatusEnum.SOLD);
    }

    maintenance(): Vehicule | Error {
        if (this.status === VehiculeStatusEnum.IN_MAINTENANCE) {
            return new ApplicationException('Vehicule', 'Vehicule is already in maintenance');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, VehiculeStatusEnum.IN_MAINTENANCE);
    }

    testDrive(): Vehicule | Error {
        if (this.status === VehiculeStatusEnum.IN_TEST_DRIVE) {
            return new ApplicationException('Vehicule', 'Vehicule is already in test drive');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, VehiculeStatusEnum.IN_TEST_DRIVE);
    }

    reserved(): Vehicule | Error {
        if (this.status === VehiculeStatusEnum.RESERVED) {
            return new ApplicationException('Vehicule', 'Vehicule is already reserved');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, VehiculeStatusEnum.RESERVED);
    }

    validBrand(): Vehicule | Error {
        if (this.brand !== 'Triumph') return Vehicule.errors.INVALID_BRAND;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceDate, this.status);
    }

    applyStatus(status: VehiculeStatusEnum): Vehicule | Error {
        switch (status) {
            case VehiculeStatusEnum.AVAILABLE:
                return this.available();
            case VehiculeStatusEnum.SOLD:
                return this.sold();
            case VehiculeStatusEnum.IN_MAINTENANCE:
                return this.maintenance();
            case VehiculeStatusEnum.IN_TEST_DRIVE:
                return this.testDrive();
            case VehiculeStatusEnum.RESERVED:
                return this.reserved();
            default:
                return Vehicule.errors.INVALID_STATUS;
        }
    }

    constructor(
        public readonly immatriculation: VehiculeImmatriculation,
        public readonly brand: 'Triumph',
        public readonly model: VehiculeModelEnum,
        public readonly year: number,
        public readonly vin: VehiculeVin,
        public readonly mileage: number,
        public readonly maintenanceDate: Date,
        public readonly status: VehiculeStatusEnum = VehiculeStatusEnum.AVAILABLE
    ) { }

    static fromObject(vehicule: VehiculeDTO): Vehicule | Error {
        const immatriculation = VehiculeImmatriculation.create(vehicule.immatriculation);
        if (immatriculation instanceof Error) return immatriculation;
        const vin = VehiculeVin.create(vehicule.vin);
        if (vin instanceof Error) return vin;

        return new Vehicule(immatriculation, vehicule.brand, vehicule.model, vehicule.year, vin, vehicule.mileage, vehicule.maintenanceDate, vehicule.status);
    }

}