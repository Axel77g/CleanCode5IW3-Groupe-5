import {IRepository} from "@shared/IRepository";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {PaginatedInput} from "@shared/PaginatedInput";
import {PaginatedResult, VoidResult} from "@shared/Result";
import {TestDrive} from "@domain/testDrive/entities/TestDrive";

export interface TestDriveRepository extends IRepository{
    listDriverTestDrives(driverLicenseId: DriverLicenseId, pagination : PaginatedInput): Promise<PaginatedResult<TestDrive>>;
    store(testDrive: TestDrive): Promise<VoidResult>;
}