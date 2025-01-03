import {IRepository} from "../../../shared/IRepository";
import {Driver} from "../../../domain/testDrive/entities/Driver";
import {PaginatedResult, Result, SuccessResult, VoidResult} from "../../../shared/Result";
import {DriverLicenseId} from "../../../domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "../../../shared/PaginatedInput";

export interface DriverRepository extends IRepository{
    store(driver: Driver): Promise<VoidResult>;
    update(driver: Driver): Promise<VoidResult>;
    getByLicenseId(driverLicenseId: DriverLicenseId): Promise<Result<Driver>>;
    listDrivers(pagination : PaginatedInput): Promise<PaginatedResult<Driver>>;
}