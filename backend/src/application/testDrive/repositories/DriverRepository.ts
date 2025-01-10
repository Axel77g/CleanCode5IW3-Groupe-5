import {IRepository} from "@shared/IRepository";
import {Driver} from "@domain/testDrive/entities/Driver";
import {PaginatedResult, Result, VoidResult} from "@shared/Result";
import {PaginatedInput} from "@shared/PaginatedInput";

export interface DriverRepository extends IRepository{
    store(driver: Driver): Promise<VoidResult>;
    getByLicenseId(driverLicenseId: string): Promise<Result<Driver>>;
    listDrivers(pagination : PaginatedInput): Promise<PaginatedResult<Driver>>;
}