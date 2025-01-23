import { VehiculeImmatriculation } from "../../maintenance/value-object/VehiculeImmatriculation";
import { DriverLicenseId } from "../value-object/DriverLicenseId";
import { Period } from "../value-object/Period";

export interface TestDriveDTO {
    testDriveId: string;
    driverLicenseId: string;
    vehicleImmatriculation: string;
    periodStart: Date;
    periodEnd: Date;
}

export class TestDrive {
    constructor(
        public readonly testDriveId: string,
        public readonly driverLicenseId: DriverLicenseId,
        public readonly vehicleImmatriculation: VehiculeImmatriculation,
        public readonly period: Period
    ) { }

    static fromObject(testDrive: TestDriveDTO): TestDrive | Error {
        const driverLicenseId = DriverLicenseId.create(testDrive.driverLicenseId)
        if (driverLicenseId instanceof Error) return driverLicenseId

        const vehicleImmatriculation = VehiculeImmatriculation.create(testDrive.vehicleImmatriculation)
        if (vehicleImmatriculation instanceof Error) return vehicleImmatriculation

        const period = Period.create(testDrive.periodStart, testDrive.periodEnd)
        if (period instanceof Error) return period

        return new TestDrive(
            testDrive.testDriveId,
            driverLicenseId,
            vehicleImmatriculation,
            period
        )
    }
}