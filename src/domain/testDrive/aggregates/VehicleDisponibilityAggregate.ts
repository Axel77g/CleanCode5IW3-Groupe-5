import {Period} from "@domain/testDrive/value-object/Period";

export class VehicleDisponibilityAggregate{
    constructor(private testDrivesPeriods : Period[]) {}

    isAvailable(period: Period): boolean {
        return !this.testDrivesPeriods.some(testDrivePeriod => testDrivePeriod.isOverlapping(period));
    }
}