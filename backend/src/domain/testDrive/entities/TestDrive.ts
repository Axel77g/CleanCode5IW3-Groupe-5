import {VehicleImmatriculation} from "../../shared/value-object/VehicleImmatriculation";
import {Period} from "../value-object/Period";
import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";

export interface TestDriveDTO{
    testDriveId: string;
    driverLicenseId: string;
    vehicleImmatriculation: string;
    periodStart: Date;
    periodEnd: Date;
}

export class TestDrive{
    constructor(
        public readonly testDriveId: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly period : Period
    ) {}

    static fromObject(testDrive: TestDriveDTO) : TestDrive | ApplicationException {
        const driverLicenseId = DriverLicenseId.create(testDrive.driverLicenseId)
        if(driverLicenseId instanceof ApplicationException) return driverLicenseId

        const vehicleImmatriculation = VehicleImmatriculation.create(testDrive.vehicleImmatriculation)
        if(vehicleImmatriculation instanceof ApplicationException) return vehicleImmatriculation

        const period = Period.create(testDrive.periodStart,testDrive.periodEnd)
        if(period instanceof ApplicationException) return period

        return new TestDrive(
            testDrive.testDriveId,
            driverLicenseId,
            vehicleImmatriculation,
            period
        )
    }
}