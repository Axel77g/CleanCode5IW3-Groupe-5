import { VehiculeModelEnum } from "@domain/maintenance/enums/VehiculeModelEnum";
import { VehiculeStatusEnum } from "@domain/maintenance/enums/VehiculeStatusEnum";
import { Period } from "@domain/testDrive/value-object/Period";
import { ApplicationException } from "@shared/ApplicationException";
import { RegisterVehiculeEvent } from "../events/vehicule/RegisterVehiculeEvent";
import { VehiculeImmatriculation } from "../value-object/VehiculeImmatriculation";
import { VehiculeVin, VehiculeVinDTO } from "../value-object/VehiculeVin";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {UnregisterVehiculeEvent} from "@domain/maintenance/events/vehicule/UnregisterVehiculeEvent";
import {UpdateVehiculeEvent} from "@domain/maintenance/events/vehicule/UpdateVehiculeEvent";

export interface VehiculeDTO {
    immatriculation: string;
    brand: 'Triumph';
    model: VehiculeModelEnum;
    year: number;
    vin: VehiculeVinDTO;
    mileage: number;
    maintenanceInterval: {
        mileage: number,
        duration : number
        lastMaintenanceDate : Date,
        lastMaintenanceMileage : number
    };
    status: VehiculeStatusEnum;
    warranty : {
        periodStart: Date,
        periodEnd: Date
    }
}

export class Vehicule {
    static ApplicationExceptions = {
        INVALID_BRAND: new ApplicationException('Vehicule', 'Brand is not valid, must be Triumph'),
        INVALID_YEAR: new ApplicationException('Vehicule', 'Year is not valid, must be between 1902 and current year'),
        INVALID_MILEAGE: new ApplicationException('Vehicule', 'Mileage is not valid, must be greater than 0'),
        INVALID_MODEL: new ApplicationException('Vehicule', 'Model is not valid'),
        INVALID_STATUS: new ApplicationException('Vehicule', 'Status is not valid'),
    }

    available(): Vehicule | ApplicationException {
        if (this.status === VehiculeStatusEnum.AVAILABLE) {
            return new ApplicationException('Vehicule', 'Vehicule is already available');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, VehiculeStatusEnum.AVAILABLE, this.warranty);
    }

    sold(): Vehicule | ApplicationException {
        if (this.status === VehiculeStatusEnum.SOLD) {
            return new ApplicationException('Vehicule', 'Vehicule is already sold');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, VehiculeStatusEnum.SOLD, this.warranty);
    }

    maintenance(): Vehicule | ApplicationException {
        if (this.status === VehiculeStatusEnum.IN_MAINTENANCE) {
            return new ApplicationException('Vehicule', 'Vehicule is already in maintenance');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, VehiculeStatusEnum.IN_MAINTENANCE, this.warranty);
    }

    testDrive(): Vehicule | ApplicationException {
        if (this.status === VehiculeStatusEnum.IN_TEST_DRIVE) {
            return new ApplicationException('Vehicule', 'Vehicule is already in test drive');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, VehiculeStatusEnum.IN_TEST_DRIVE, this.warranty);
    }

    reserved(): Vehicule | ApplicationException {
        if (this.status === VehiculeStatusEnum.RESERVED) {
            return new ApplicationException('Vehicule', 'Vehicule is already reserved');
        }
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, VehiculeStatusEnum.RESERVED, this.warranty);
    }

    validBrand(): Vehicule | ApplicationException {
        if (this.brand !== 'Triumph') return Vehicule.ApplicationExceptions.INVALID_BRAND;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, this.status, this.warranty);
    }

    validYear(): Vehicule | ApplicationException {
        if (this.year < 1902 || this.year > new Date().getFullYear()) return Vehicule.ApplicationExceptions.INVALID_YEAR;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, this.status, this.warranty);
    }

    validMileage(): Vehicule | ApplicationException {
        if (this.mileage <= 0) return Vehicule.ApplicationExceptions.INVALID_MILEAGE;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, this.status, this.warranty);
    }

    validModel(): Vehicule | ApplicationException {
        if (!Object.values(VehiculeModelEnum).includes(this.model)) return Vehicule.ApplicationExceptions.INVALID_MODEL;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, this.status, this.warranty);
    }

    validStatus(): Vehicule | ApplicationException {
        if (!Object.values(VehiculeStatusEnum).includes(this.status)) return Vehicule.ApplicationExceptions.INVALID_STATUS;
        return new Vehicule(this.immatriculation, this.brand, this.model, this.year, this.vin, this.mileage, this.maintenanceInterval, this.status, this.warranty);
    }

    applyStatus(status: VehiculeStatusEnum): Vehicule | ApplicationException {
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
                return Vehicule.ApplicationExceptions.INVALID_STATUS;
        }
    }

    constructor(
        public readonly immatriculation: VehiculeImmatriculation,
        public readonly brand: 'Triumph',
        public readonly model: VehiculeModelEnum,
        public readonly year: number,
        public readonly vin: VehiculeVin,
        public readonly mileage: number,
        public readonly maintenanceInterval: VehiculeMaintenanceInterval,
        public readonly status: VehiculeStatusEnum = VehiculeStatusEnum.AVAILABLE,
        public readonly warranty : Period
    ) { }

    static fromObject(vehicule: VehiculeDTO): Vehicule | ApplicationException {
        const immatriculation = VehiculeImmatriculation.create(vehicule.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;
        const vin = VehiculeVin.create(vehicule.vin);
        if (vin instanceof ApplicationException) return vin;
        const warranty = Period.create(vehicule.warranty.periodStart, vehicule.warranty.periodEnd);
        if(warranty instanceof ApplicationException) return warranty;
        const maintenanceInterval = VehiculeMaintenanceInterval.create(vehicule.maintenanceInterval.duration, vehicule.maintenanceInterval.mileage, {
            date: vehicule.maintenanceInterval.lastMaintenanceDate,
            mileage: vehicule.maintenanceInterval.lastMaintenanceMileage
        });
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;
        return new Vehicule(immatriculation, vehicule.brand, vehicule.model, vehicule.year, vin, vehicule.mileage, maintenanceInterval, vehicule.status,warranty);
    }

    static create(object: {
        immatriculation: VehiculeImmatriculation,
        brand: 'Triumph',
        model: VehiculeModelEnum,
        year: number,
        vin: VehiculeVin,
        mileage: number,
        maintenanceInterval: VehiculeMaintenanceInterval,
        status: VehiculeStatusEnum,
        warranty: Period
    }) : Vehicule | ApplicationException {
        return new Vehicule(object.immatriculation, object.brand, object.model, object.year, object.vin, object.mileage, object.maintenanceInterval, object.status, object.warranty);
    }

    registerEvent(): RegisterVehiculeEvent {
        return new RegisterVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
            brand: this.brand,
            model: this.model,
            year: this.year,
            vin: this.vin,
            mileage: this.mileage,
            maintenanceInterval: {
                mileage: this.maintenanceInterval.mileage,
                duration: this.maintenanceInterval.duration,
                lastMaintenanceDate: this.maintenanceInterval.lastMaintenance.date,
                lastMaintenanceMileage: this.maintenanceInterval.lastMaintenance.mileage
            },
            status: this.status,
            warranty: {
                periodStart: this.warranty.startDate,
                periodEnd: this.warranty.endDate
            }
        })
    }

    unregisterEvent(): UnregisterVehiculeEvent {
        return new UnregisterVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
        })
    }

    updateEvent(): UpdateVehiculeEvent {
        return new UpdateVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
            mileage: this.mileage,
            maintenanceInterval: {
                mileage: this.maintenanceInterval.mileage,
                duration: this.maintenanceInterval.duration,
                lastMaintenanceDate: this.maintenanceInterval.lastMaintenance.date,
                lastMaintenanceMileage: this.maintenanceInterval.lastMaintenance.mileage
            }
        })
    }

    update(object: {
        immatriculation: VehiculeImmatriculation,
        brand: 'Triumph',
        model: VehiculeModelEnum,
        year: number,
        vin: VehiculeVin,
        mileage: number,
        maintenanceInterval: VehiculeMaintenanceInterval,
        status: VehiculeStatusEnum,
        warranty: Period
    }) {
        return new Vehicule(object.immatriculation, object.brand, object.model, object.year, object.vin, object.mileage, object.maintenanceInterval, object.status, object.warranty);
    }
}