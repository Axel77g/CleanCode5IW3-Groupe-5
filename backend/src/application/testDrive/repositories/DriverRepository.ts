import {IRepository} from "@shared/IRepository";
import {Driver} from "@domain/testDrive/entities/Driver";
import {OptionalResult, PaginatedResult, VoidResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";

export interface DriverRepository extends IRepository{
    store(driver: Driver): Promise<VoidResult>;
    getByLicenseId(driverLicenseId: DriverLicenseId): Promise<OptionalResult<Driver>>;
    listDrivers(pagination : PaginatedInput): Promise<PaginatedResult<Driver>>;
}