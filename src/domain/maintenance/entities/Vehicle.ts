import {VehicleModelEnum} from "@domain/maintenance/enums/VehicleModelEnum";
import {VehicleStatusEnum} from "@domain/maintenance/enums/VehicleStatusEnum";
import {Period} from "@domain/testDrive/value-object/Period";
import {ApplicationException} from "@shared/ApplicationException";
import {RegisterVehicleEvent} from "../events/vehicle/RegisterVehicleEvent";
import {VehicleImmatriculation} from "../value-object/VehicleImmatriculation";
import {VehicleVin} from "../value-object/VehicleVin";
import {VehicleMaintenanceInterval} from "@domain/maintenance/value-object/VehicleMaintenanceInterval";
import {UnregisterVehicleEvent} from "@domain/maintenance/events/vehicle/UnregisterVehicleEvent";
import {UpdateVehicleEvent} from "@domain/maintenance/events/vehicle/UpdateVehicleEvent";
import {AssignVehicleToCustomerEvent} from "@domain/maintenance/events/vehicle/AssignVehicleToCustomerEvent";

export interface VehicleDTO {
    immatriculation: string;
    brand: 'Triumph';
    model: VehicleModelEnum;
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
    status: VehicleStatusEnum;
    warranty: {
        periodStart: Date,
        periodEnd: Date
    }
}

export class Vehicle {
    private constructor(
        public readonly immatriculation: VehicleImmatriculation,
        public readonly brand: 'Triumph',
        public readonly model: VehicleModelEnum,
        public readonly year: number,
        public readonly vin: VehicleVin,
        public readonly mileage: number,
        public readonly maintenanceInterval: VehicleMaintenanceInterval,
        public readonly status: VehicleStatusEnum,
        public readonly warranty: Period
    ) {
    }

    static ApplicationExceptions = {
        INVALID_BRAND: new ApplicationException('INVALID_BRAND', 'Brand is not valid, must be Triumph'),
        INVALID_YEAR: new ApplicationException('INVALID_YEAR', 'Year is not valid, must be between 1902 and current year'),
        INVALID_MILEAGE: new ApplicationException('INVALID_MILEAGE', 'Mileage is not valid, must be greater than 0'),
        CANNOT_HAVE_A_MILEAGE_LESS_THAN_PREVIOUS: new ApplicationException('CANNOT_HAVE_A_MILEAGE_LESS_THAN_PREVIOUS', 'Mileage cannot be less than previous mileage'),
        INVALID_LAST_MILEAGE: new ApplicationException('INVALID_LAST_MILEAGE', 'Last maintenances mileage is not valid must be less than current mileage'),
        INVALID_MODEL: new ApplicationException('INVALID_MODEL', 'Model is not valid'),
        INVALID_STATUS: new ApplicationException('INVALID_STATUS', 'Status is not valid'),
        INVALID_WARRANTY: new ApplicationException('INVALID_WARRANTY', 'Warranty is not valid, cannot be more than 2 years')
    }


    static fromObject(vehicle: VehicleDTO): Vehicle | ApplicationException {
        const immatriculation = VehicleImmatriculation.create(vehicle.immatriculation);
        if (immatriculation instanceof ApplicationException) return immatriculation;

        const vin = VehicleVin.create(vehicle.vin);
        if (vin instanceof ApplicationException) return vin;

        const warranty = Period.create(vehicle.warranty.periodStart, vehicle.warranty.periodEnd);
        if (warranty instanceof ApplicationException) return warranty;

        const maintenanceInterval = VehicleMaintenanceInterval.create(vehicle.maintenanceInterval.mileage, vehicle.maintenanceInterval.duration, vehicle.maintenanceInterval.lastMaintenance);
        if (maintenanceInterval instanceof ApplicationException) return maintenanceInterval;

        return new Vehicle(immatriculation, vehicle.brand, vehicle.model, vehicle.year, vin, vehicle.mileage, maintenanceInterval, vehicle.status, warranty);
    }

    static create(object: {
        immatriculation: VehicleImmatriculation;
        brand: "Triumph";
        model: VehicleModelEnum;
        year: number;
        vin: VehicleVin;
        mileage: number;
        maintenanceInterval: VehicleMaintenanceInterval;
        status: VehicleStatusEnum;
        warranty: Period
    }): Vehicle | ApplicationException {
        if (object.brand !== 'Triumph') return Vehicle.ApplicationExceptions.INVALID_BRAND;
        if (object.year < 1902 || object.year > new Date().getFullYear()) return Vehicle.ApplicationExceptions.INVALID_YEAR;
        if (object.mileage <= 0) return Vehicle.ApplicationExceptions.INVALID_MILEAGE;
        if (object.maintenanceInterval.mileage > object.mileage) return Vehicle.ApplicationExceptions.INVALID_LAST_MILEAGE;
        if (!Object.values(VehicleModelEnum).includes(object.model)) return Vehicle.ApplicationExceptions.INVALID_MODEL;
        if (!Object.values(VehicleStatusEnum).includes(object.status)) return Vehicle.ApplicationExceptions.INVALID_STATUS;
        if (object.warranty.endDate.getFullYear() - object.warranty.startDate.getFullYear() > 2) return Vehicle.ApplicationExceptions.INVALID_WARRANTY;
        return new Vehicle(object.immatriculation, object.brand, object.model, object.year, object.vin, object.mileage, object.maintenanceInterval, object.status, object.warranty);
    }

    registerEvent(): RegisterVehicleEvent {
        return new RegisterVehicleEvent({
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

    assignToCustomerEvent(customerId: string): AssignVehicleToCustomerEvent {
        return new AssignVehicleToCustomerEvent({
            customerId: customerId,
            immatriculation: this.immatriculation.getValue()
        })
    }

    unregisterEvent(): UnregisterVehicleEvent {
        return new UnregisterVehicleEvent({
            immatriculation: this.immatriculation.getValue(),
        })
    }

    update(object: {
        mileage?: number,
        maintenanceInterval?: VehicleMaintenanceInterval,
        status?: VehicleStatusEnum
        warranty?: Period,
    }) {
        if (object.maintenanceInterval && object.maintenanceInterval.mileage > this.mileage) return Vehicle.ApplicationExceptions.CANNOT_HAVE_A_MILEAGE_LESS_THAN_PREVIOUS;
        if (object.maintenanceInterval && object.mileage && object.maintenanceInterval.lastMaintenance.mileage > this.mileage) return Vehicle.ApplicationExceptions.INVALID_LAST_MILEAGE;
        return new Vehicle(
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

    updateEvent(): UpdateVehicleEvent {
        return new UpdateVehicleEvent({
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