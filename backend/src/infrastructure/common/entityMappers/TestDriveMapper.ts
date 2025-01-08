import {TestDrive} from "../../../domain/testDrive/entities/TestDrive";
import {DriverLicenseId} from "../../../domain/testDrive/value-object/DriverLicenseId";
import {VehicleImmatriculation} from "../../../domain/shared/value-object/VehicleImmatriculation";
import {Period} from "../../../domain/testDrive/value-object/Period";
import {MappedEntities, MappedEntity} from "./MappedEntity";

export class TestDriveMapper{
    static toDomain(testDrive: any) : TestDrive{
        return new TestDrive(
            new DriverLicenseId(testDrive.driver_licence_id),
            new VehicleImmatriculation(testDrive.vehicle_immatriculation),
            new Period(
                testDrive.start_date,
                testDrive.end_date
            )
        )
    }

    static toPersistence(testDrive: TestDrive) : MappedEntity {
        return new MappedEntity({
            driver_licence_id: testDrive.driverLicenseId.getValue(),
            vehicle_immatriculation: testDrive.vehicleImmatriculation.getValue(),
            start_date: testDrive.period.startDate,
            end_date: testDrive.period.endDate
        })
    }

    static toPersistenceList(testDrives: TestDrive[]) : MappedEntities {
        return new MappedEntities(testDrives.map(testDrive => {
            return TestDriveMapper.toPersistence(testDrive);
        }))
    }

    static toDomainList(testDrives: any[]){
        return testDrives.map(testDrive => {
            return TestDriveMapper.toDomain(testDrive);
        })
    }
}