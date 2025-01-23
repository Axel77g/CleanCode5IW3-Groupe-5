import {Driver, DriverDTO} from "@domain/testDrive/entities/Driver";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {MappedEntities, MappedEntity} from "./MappedEntity";
import {ApplicationException} from "@shared/ApplicationException";

export class DriverMapper{
    public static toPersistence(driver: Driver) : MappedEntity<DriverDTO> {
        return new MappedEntity<DriverDTO>({
            driverLicenseId: driver.driverLicenseId.getValue(),
            firstName: driver.firstName,
            lastName: driver.lastName,
            email: driver.email,
            driverLicensedAt: driver.driverLicensedAt,
            documents: driver.documents
        })
    }
    public static toDomain(driver: any) : Driver | ApplicationException {
        const driverLicenceId = DriverLicenseId.create(driver.driverLicenseId)
        if(driverLicenceId instanceof ApplicationException) return driverLicenceId
        return new Driver(
            driverLicenceId,
            driver.firstName,
            driver.lastName,
            driver.email,
            driver.driverLicensedAt,
            driver.documents
        )
    }

    public static toPersistenceList(drivers: Driver[]) : MappedEntities<DriverDTO> {
        return new MappedEntities(drivers.map(driver => {
            return DriverMapper.toPersistence(driver);
        }))
    }
    public static toDomainList(drivers: any[]) : Driver[]{
        return drivers.map(driver => {
            return DriverMapper.toDomain(driver);
        }).filter(driver => !(driver instanceof Error)) as Driver[];
    }
}