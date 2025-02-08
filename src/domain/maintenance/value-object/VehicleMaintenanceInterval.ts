import {ApplicationException} from "@shared/ApplicationException";

export class VehicleMaintenanceInterval {
    private constructor(public readonly duration: number, public readonly mileage: number, public readonly lastMaintenance: {
        date: Date,
        mileage: number
    }) {
    }

    static errors = {
        INVALID_DURATION: new ApplicationException("VehicleMaintenanceInterval.invalidDuration", "The duration must be greater than 0"),
        INVALID_MILEAGE: new ApplicationException("VehicleMaintenanceInterval.invalidMileage", "The mileage must be greater than 0"),
    };

    static create(duration: number, mile: number, lastMaintenance: {
        date: Date,
        mileage: number
    }): VehicleMaintenanceInterval | ApplicationException {
        if (duration <= 0) return VehicleMaintenanceInterval.errors.INVALID_DURATION;
        if (mile <= 0) return VehicleMaintenanceInterval.errors.INVALID_MILEAGE;
        return new VehicleMaintenanceInterval(duration, mile, lastMaintenance);
    }
}
