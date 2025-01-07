import { Driver } from "../../domain/testDrive/entities/Driver";
import { DriverLicenseId } from "../../domain/testDrive/value-object/DriverLicenseId";
import { MappedEntity } from "./MappedEntity";

export class DriverMapper {
    public static toPersistence(driver: Driver): MappedEntity {
        return new MappedEntity({
            driver_licence_id: driver.driverLicenceId.getValue(),
            first_name: driver.firstName,
            last_name: driver.lastName,
            email: driver.email,
            driver_licensed_at: driver.driverLicensedAt,
        })
    }
    public static toDomain(driver: any) {
        return new Driver(
            new DriverLicenseId(driver.driver_licence_id),
            driver.first_name,
            driver.last_name,
            driver.email,
            driver.driver_licensed
        )
    }


    public static toPersistenceList(drivers: Driver[]) : MappedEntities {
        return new MappedEntities(drivers.map(driver => {
            return DriverMapper.toPersistence(driver);
        }))
    }
    public static toDomainList(drivers: any[]) {
        return drivers.map(driver => {
            return DriverMapper.toDomain(driver);
        })
    }
}