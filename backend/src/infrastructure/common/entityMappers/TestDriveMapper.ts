import {TestDrive, TestDriveDTO} from "@domain/testDrive/entities/TestDrive";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {VehicleImmatriculation} from "@domain/shared/value-object/VehicleImmatriculation";
import {Period} from "@domain/testDrive/value-object/Period";
import {MappedEntities, MappedEntity} from "./MappedEntity";

export class TestDriveMapper{
    static toDomain(testDrive: any) : TestDrive | Error{

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

    static toPersistence(testDrive: TestDrive) : MappedEntity<TestDriveDTO> {
        return new MappedEntity<TestDriveDTO>({
            testDriveId: testDrive.testDriveId,
            driverLicenseId: testDrive.driverLicenseId.getValue(),
            vehicleImmatriculation: testDrive.vehicleImmatriculation.getValue(),
            periodStart: testDrive.period.startDate,
            periodEnd: testDrive.period.endDate
        })
    }

    static toPersistenceList(testDrives: TestDrive[]) : MappedEntities<TestDriveDTO> {
        return new MappedEntities(testDrives.map(testDrive => {
            return TestDriveMapper.toPersistence(testDrive);
        }))
    }

    static toDomainList(testDrives: any[]) : TestDrive[] {
        return testDrives.map(testDrive => {
            return TestDriveMapper.toDomain(testDrive);
        }).filter(testDrive => !(testDrive instanceof Error)) as TestDrive[]
    }
}