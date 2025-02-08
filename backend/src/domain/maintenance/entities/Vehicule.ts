import {VehiculeModelEnum} from "@domain/maintenance/enums/VehiculeModelEnum";
import {VehiculeStatusEnum} from "@domain/maintenance/enums/VehiculeStatusEnum";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {RegisterVehiculeEvent} from "../events/vehicule/RegisterVehiculeEvent";
import {VehiculeImmatriculation} from "../value-object/VehiculeImmatriculation";
import {VehiculeVin} from "../value-object/VehiculeVin";
import {VehiculeMaintenanceInterval} from "@domain/maintenance/value-object/VehiculeMaintenanceInterval";
import {UnregisterVehiculeEvent} from "@domain/maintenance/events/vehicule/UnregisterVehiculeEvent";
import {UpdateVehiculeEvent} from "@domain/maintenance/events/vehicule/UpdateVehiculeEvent";
import {AssignVehiculeToCustomerEvent} from "@domain/maintenance/events/vehicule/AssignVehiculeToCustomerEvent";

export interface VehiculeDTO {
    immatriculation: string;
    brand: 'Triumph';
    model: VehiculeModelEnum;
    year: number;
    vin: string;
    mileage: number;
    maintenanceInterval: {
        mileage: number,
        duration: number
        lastMaintenance: {
            date: Date,
            mileage: number
        }
    };
    status: VehiculeStatusEnum;
    warranty: {
        periodStart: Date,
        periodEnd: Date
    }
}

export class Vehicule {
    private constructor(
        public readonly immatriculation: VehiculeImmatriculation,
        public readonly brand: 'Triumph',
        public readonly model: VehiculeModelEnum,
        public readonly year: number,
        public readonly vin: VehiculeVin,
        public readonly mileage: number,
        public readonly maintenanceInterval: VehiculeMaintenanceInterval,
        public readonly status: VehiculeStatusEnum,
        public readonly warranty: Period
    ) {
    }

    static ApplicationExceptions = {
        INVALID_BRAND: new ApplicationException('INVALID_BRAND', 'Brand is not valid, must be Triumph'),
        INVALID_YEAR: new ApplicationException('INVALID_YEAR', 'Year is not valid, must be between 1902 and current year'),
        INVALID_MILEAGE: new ApplicationException('INVALID_MILEAGE', 'Mileage is not valid, must be greater than 0'),
        INVALID_LAST_MILEAGE: new ApplicationException('INVALID_LAST_MILEAGE', 'Last maintenances mileage is not valid must be less than current mileage'),
        INVALID_MODEL: new ApplicationException('INVALID_MODEL', 'Model is not valid'),
        INVALID_STATUS: new ApplicationException('INVALID_STATUS', 'Status is not valid'),
        INVALID_WARRANTY: new ApplicationException('INVALID_WARRANTY', 'Warranty is not valid, cannot be more than 2 years')
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
            return new ApplicationException('Vehicule', 'Vehicule is already in maintenances');
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

    validBrand(brand: string): boolean | ApplicationException {
        if (brand !== 'Triumph') {
            return new ApplicationException('Vehicule', 'Brand is not valid, must be Triumph');
        }
        return true;
    }

    static fromObject(vehicule: VehiculeDTO): Vehicule | ApplicationException {
        const immatriculation = VehiculeImmatriculation.create(vehicule.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;

        const vin = VehiculeVin.create(vehicule.vin);
        if (vin instanceof ApplicationException) return vin;

        const warranty = Period.create(vehicule.warranty.periodStart, vehicule.warranty.periodEnd);
        if (warranty instanceof ApplicationException) return warranty;

        const maintenanceInterval = VehiculeMaintenanceInterval.create(vehicule.maintenanceInterval.mileage, vehicule.maintenanceInterval.duration, vehicule.maintenanceInterval.lastMaintenance);
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;

        return new Vehicule(immatriculation, vehicule.brand, vehicule.model, vehicule.year, vin, vehicule.mileage, maintenanceInterval, vehicule.status, warranty);
    }

    static create(object: {
        immatriculation: VehiculeImmatriculation;
        brand: "Triumph";
        model: VehiculeModelEnum;
        year: number;
        vin: VehiculeVin;
        mileage: number;
        maintenanceInterval: VehiculeMaintenanceInterval;
        status: VehiculeStatusEnum;
        warranty: Period
    }): Vehicule | ApplicationException {
        if (object.brand !== 'Triumph') return Vehicule.ApplicationExceptions.INVALID_BRAND;
        if (object.year < 1902 || object.year > new Date().getFullYear()) return Vehicule.ApplicationExceptions.INVALID_YEAR;
        if (object.mileage <= 0) return Vehicule.ApplicationExceptions.INVALID_MILEAGE;
        if (object.maintenanceInterval.mileage > object.mileage) return Vehicule.ApplicationExceptions.INVALID_LAST_MILEAGE;
        if (!Object.values(VehiculeModelEnum).includes(object.model)) return Vehicule.ApplicationExceptions.INVALID_MODEL;
        if (!Object.values(VehiculeStatusEnum).includes(object.status)) return Vehicule.ApplicationExceptions.INVALID_STATUS;
        if (object.warranty.endDate.getFullYear() - object.warranty.startDate.getFullYear() > 2) return Vehicule.ApplicationExceptions.INVALID_WARRANTY;
        return new Vehicule(object.immatriculation, object.brand, object.model, object.year, object.vin, object.mileage, object.maintenanceInterval, object.status, object.warranty);
    }

    registerEvent(): RegisterVehiculeEvent {
        return new RegisterVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
            brand: this.brand,
            model: this.model,
            year: this.year,
            vin: this.vin.getValue(),
            mileage: this.mileage,
            maintenanceInterval: {
                mileage: this.maintenanceInterval.mileage,
                duration: this.maintenanceInterval.duration,
                lastMaintenance: {
                    date: this.maintenanceInterval.lastMaintenance.date,
                    mileage: this.maintenanceInterval.lastMaintenance.mileage
                }
            },
            status: this.status,
            warranty: {
                periodStart: this.warranty.startDate,
                periodEnd: this.warranty.endDate
            }
        })
    }

    assignToCustomerEvent(customerId: string): AssignVehiculeToCustomerEvent {
        return new AssignVehiculeToCustomerEvent({
            customerId: customerId,
            immatriculation: this.immatriculation.getValue()
        })
    }

    unregisterEvent(): UnregisterVehiculeEvent {
        return new UnregisterVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
        })
    }

    update(object: {
        mileage?: number,
        maintenanceInterval?: VehiculeMaintenanceInterval,
        status?: VehiculeStatusEnum
        warranty?: Period,
    }) {
        if (object.mileage && object?.mileage < this.mileage) return new ApplicationException("NONE", "Mileage cannot be greater than current mileage");
        if (object.maintenanceInterval && object.mileage && object.maintenanceInterval.lastMaintenance.mileage > this.mileage) return Vehicule.ApplicationExceptions.INVALID_LAST_MILEAGE;
        return new Vehicule(
            this.immatriculation,
            this.brand, this.model,
            this.year,
            this.vin,
            object.mileage || this.mileage,
            object.maintenanceInterval || this.maintenanceInterval,
            object.status || this.status,
            object.warranty || this.warranty
        )
    }

    updateEvent(): UpdateVehiculeEvent {
        return new UpdateVehiculeEvent({
            immatriculation: this.immatriculation.getValue(),
            mileage: this.mileage,
            maintenanceInterval: {
                mileage: this.maintenanceInterval.mileage,
                duration: this.maintenanceInterval.duration,
                lastMaintenance: {
                    date: this.maintenanceInterval.lastMaintenance.date,
                    mileage: this.maintenanceInterval.lastMaintenance.mileage
                }
            },
            status: this.status,
            warranty: {
                periodStart: this.warranty.startDate,
                periodEnd: this.warranty.endDate
            }
        })
    }
    needMaintenance(): boolean {
        return this.mileage - this.maintenanceInterval.lastMaintenance.mileage >= this.maintenanceInterval.mileage;
    }
}