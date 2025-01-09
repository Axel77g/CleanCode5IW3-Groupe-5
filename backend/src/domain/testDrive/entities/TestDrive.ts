import {VehicleImmatriculation} from "../../shared/value-object/VehicleImmatriculation";
import {Period} from "../value-object/Period";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export interface TestDriveDTO{
    testDriveId: string;
    driverLicenseId: string;
    vehicleImmatriculation: string;
    periodStart: Date;
    periodEnd: Date;
}

export class TestDrive{
    constructor(
        public readonly id: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly vehicleImmatriculation: VehicleImmatriculation,
        public readonly period : Period
    ) {}

    static fromObject(testDrive: TestDriveDTO) : TestDrive | Error {
        const driverLicenseId = DriverLicenseId.create(testDrive.driverLicenseId)
        if(driverLicenseId instanceof Error) return driverLicenseId

        const vehicleImmatriculation = VehicleImmatriculation.create(testDrive.vehicleImmatriculation)
        if(vehicleImmatriculation instanceof Error) return vehicleImmatriculation

        return new TestDrive(
            testDrive.testDriveId,
            driverLicenseId,
            vehicleImmatriculation,
            new Period(
                testDrive.periodStart,
                testDrive.periodEnd
            )
        )
    }
}