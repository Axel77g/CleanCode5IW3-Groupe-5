import {ApplicationException} from "@shared/ApplicationException";

export class VehiculeMaintenanceInterval {
    private constructor(public readonly duration: number, public readonly mileage: number, public readonly lastMaintenance: {
        date: Date,
        mileage: number
    }) {
    }

    static errors = {
        INVALID_DURATION: new ApplicationException("VehiculeMaintenanceInterval.invalidDuration", "The duration must be greater than 0"),
        INVALID_MILEAGE: new ApplicationException("VehiculeMaintenanceInterval.invalidMileage", "The mileage must be greater than 0"),
    };

    static create(duration: number, mile: number, lastMaintenance: {
        date: Date,
        mileage: number
    }): VehiculeMaintenanceInterval | ApplicationException {
        if (duration <= 0) return VehiculeMaintenanceInterval.errors.INVALID_DURATION;
        if (mile <= 0) return VehiculeMaintenanceInterval.errors.INVALID_MILEAGE;
        return new VehiculeMaintenanceInterval(duration, mile, lastMaintenance);
    }
}
