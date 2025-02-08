import {Period} from "../value-object/Period";
import {DriverLicenseId} from "../value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";
import {RegisterTestDriveEvent} from "@domain/testDrive/Events/RegisterTestDriveEvent";
import {randomUUID} from "node:crypto";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

export interface TestDriveDTO{
    testDriveId: string;
    driverLicenseId: string;
    vehicleImmatriculation: string;
    periodStart: Date;
    periodEnd: Date;
}

export class TestDrive{
    private constructor(
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

        return TestDrive.create({
            testDriveId: testDrive.testDriveId,
            driverLicenseId,
            vehicleImmatriculation,
            period
        })
    }

    static create(testDrive: {
        testDriveId?: string,
        driverLicenseId: DriverLicenseId,
        vehicleImmatriculation: VehicleImmatriculation,
        period: Period
    }) {
        return new TestDrive(
            testDrive.testDriveId ?? randomUUID(),
            testDrive.driverLicenseId,
            testDrive.vehicleImmatriculation,
            testDrive.period
        )
    }

    registerEvent() : RegisterTestDriveEvent {
        return new RegisterTestDriveEvent({
            testDriveId: this.testDriveId,
            driverLicenseId: this.driverLicenseId.getValue(),
            vehicleImmatriculation: this.vehicleImmatriculation.getValue(),
            periodStart: this.period.startDate,
            periodEnd: this.period.endDate
        })
    }
}